import crypto from 'crypto';
import { User } from '../models/User.js';
import { Payment } from '../models/Payment.js';

export const PLAN_PRICING = {
  free: { monthly: 0, yearly: 0, name: 'Starter' },
  pro: { monthly: 1499, yearly: 14388, name: 'Pro Creator' },
  studio: { monthly: 3999, yearly: 38388, name: 'Studio' }
};

/**
 * Create a new payment order for subscription
 */
export async function createOrder(req, res) {
  try {
    const userId = req.user.userId;
    const { planId, billingCycle = 'yearly' } = req.body;

    if (!planId || !PLAN_PRICING[planId]) {
      return res.status(400).json({ error: 'Invalid subscription plan selected.' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Handle free plan directly without payment
    if (planId === 'free') {
      user.subscription = {
        plan: 'free',
        billingCycle,
        status: 'active',
        startDate: new Date(),
        endDate: null,
        amount: 0,
        currency: 'INR',
        orderId: `free_${Date.now()}`,
        paymentId: `free_${Date.now()}`
      };
      await user.save();

      return res.json({
        success: true,
        isFree: true,
        message: 'Switched to Starter Free Plan!',
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          subscription: user.subscription
        }
      });
    }

    const planConfig = PLAN_PRICING[planId];
    const amountInRupees = billingCycle === 'yearly' ? planConfig.yearly : planConfig.monthly;
    const amountInPaise = amountInRupees * 100;

    const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
    const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;

    let orderId;
    let isSandbox = true;

    // If real Razorpay credentials are provided, create live order
    if (razorpayKeyId && razorpayKeySecret && razorpayKeyId.startsWith('rzp_')) {
      try {
        const basicAuth = Buffer.from(`${razorpayKeyId}:${razorpayKeySecret}`).toString('base64');
        const rzpResponse = await fetch('https://api.razorpay.com/v1/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${basicAuth}`
          },
          body: JSON.stringify({
            amount: amountInPaise,
            currency: 'INR',
            receipt: `rcpt_${Date.now().toString().slice(-8)}`,
            notes: {
              userId: user._id.toString(),
              planId,
              billingCycle
            }
          })
        });

        if (rzpResponse.ok) {
          const rzpData = await rzpResponse.json();
          orderId = rzpData.id;
          isSandbox = false;
        } else {
          console.warn('[Razorpay API] Fallback to sandbox due to API response');
          orderId = `order_sbx_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
        }
      } catch (err) {
        console.warn('[Razorpay] Network error, fallback to sandbox mode:', err.message);
        orderId = `order_sbx_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      }
    } else {
      // Sandbox test mode order
      orderId = `order_sbx_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    }

    // Record order in payments collection
    await Payment.create({
      userId: user._id,
      orderId,
      planId,
      billingCycle,
      amount: amountInRupees,
      currency: 'INR',
      status: 'created',
      paymentMethod: isSandbox ? 'Razorpay Sandbox' : 'Razorpay'
    });

    res.json({
      success: true,
      orderId,
      amount: amountInPaise,
      amountInRupees,
      currency: 'INR',
      keyId: razorpayKeyId || 'rzp_test_sandbox',
      isSandbox,
      plan: {
        id: planId,
        name: planConfig.name,
        billingCycle,
        amountInRupees
      },
      customer: {
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('[Payment Error] createOrder:', error);
    res.status(500).json({ error: error.message || 'Failed to initialize payment order.' });
  }
}

/**
 * Verify payment signature and activate subscription
 */
export async function verifyPayment(req, res) {
  try {
    const userId = req.user.userId;
    const { orderId, paymentId, signature, planId, billingCycle = 'yearly', isSandbox = false } = req.body;

    if (!orderId || !planId) {
      return res.status(400).json({ error: 'Missing order verification parameters.' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;

    // Verify HMAC signature if live Razorpay credentials are used
    if (!isSandbox && razorpayKeySecret && signature && paymentId) {
      const generatedSignature = crypto
        .createHmac('sha256', razorpayKeySecret)
        .update(`${orderId}|${paymentId}`)
        .digest('hex');

      if (generatedSignature !== signature) {
        return res.status(400).json({ error: 'Payment signature verification failed. Transaction flagged as invalid.' });
      }
    }

    const planConfig = PLAN_PRICING[planId] || PLAN_PRICING.pro;
    const amountInRupees = billingCycle === 'yearly' ? planConfig.yearly : planConfig.monthly;

    // Update payment record in database
    await Payment.findOneAndUpdate(
      { orderId },
      {
        paymentId: paymentId || `pay_sbx_${Date.now()}`,
        signature: signature || 'sandbox_verified',
        status: 'completed',
        gatewayResponse: { verifiedAt: new Date() }
      },
      { upsert: true }
    );

    // Calculate duration
    const startDate = new Date();
    const durationDays = billingCycle === 'yearly' ? 365 : 30;
    const endDate = new Date(startDate.getTime() + durationDays * 24 * 60 * 60 * 1000);

    // Update user's subscription
    user.subscription = {
      plan: planId,
      billingCycle,
      status: 'active',
      startDate,
      endDate,
      paymentId: paymentId || `pay_sbx_${Date.now()}`,
      orderId,
      amount: amountInRupees,
      currency: 'INR'
    };

    await user.save();

    res.json({
      success: true,
      message: `🎉 Payment successful! You are now subscribed to ${planConfig.name}.`,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        subscription: user.subscription
      }
    });
  } catch (error) {
    console.error('[Payment Error] verifyPayment:', error);
    res.status(500).json({ error: error.message || 'Payment verification failed.' });
  }
}

/**
 * Get current user subscription & recent payment history
 */
export async function getSubscription(req, res) {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId).select('subscription name email');
    const payments = await Payment.find({ userId }).sort({ createdAt: -1 }).limit(10);

    res.json({
      subscription: user?.subscription || { plan: 'free', status: 'active' },
      payments
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch subscription data.' });
  }
}
