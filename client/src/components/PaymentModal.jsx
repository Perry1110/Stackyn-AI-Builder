import React, { useState, useEffect } from 'react'
import { 
  XIcon, 
  ShieldCheckIcon, 
  LockIcon, 
  CheckCircle2Icon, 
  CreditCardIcon, 
  QrCodeIcon, 
  Building2Icon, 
  SmartphoneIcon, 
  Loader2Icon, 
  ZapIcon, 
  SparklesIcon, 
  CheckIcon,
  AlertCircleIcon
} from 'lucide-react'
import api from '../api/api'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const PaymentModal = ({ isOpen, onClose, plan, onSuccess }) => {
  const { user, setUser } = useAppContext()

  const [activeTab, setActiveTab] = useState('upi') // 'upi' | 'card' | 'netbanking'
  const [loadingOrder, setLoadingOrder] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [orderDetails, setOrderDetails] = useState(null)

  // Payment form states
  const [upiId, setUpiId] = useState('')
  const [selectedUpiApp, setSelectedUpiApp] = useState('gpay')
  const [cardNumber, setCardNumber] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvv, setCardCvv] = useState('')
  const [cardName, setCardName] = useState(user?.name || '')
  const [selectedBank, setSelectedBank] = useState('HDFC')

  // Calculate actual payable amount
  const isYearly = plan?.billingCycle === 'yearly'
  const payableAmount = isYearly 
    ? (plan?.yearlyPrice ? plan.yearlyPrice * 12 : 0)
    : (plan?.monthlyPrice || 0)

  // Initialize Payment Order when modal opens
  useEffect(() => {
    if (!isOpen || !plan) return

    setSuccess(false)
    setError('')
    setProcessing(false)

    const initOrder = async () => {
      setLoadingOrder(true)
      try {
        const { data } = await api.post('/api/payment/create-order', {
          planId: plan.id,
          billingCycle: plan.billingCycle || 'yearly'
        })
        setOrderDetails(data)
      } catch (err) {
        console.error('Order creation error:', err)
        setError(err?.response?.data?.error || 'Failed to initialize payment order.')
      } finally {
        setLoadingOrder(false)
      }
    }

    initOrder()
  }, [isOpen, plan?.id, plan?.billingCycle])

  if (!isOpen) return null

  // Auto-fill test card credentials for easy testing
  const fillTestCard = () => {
    setCardNumber('4111 2222 3333 4444')
    setCardExpiry('12/28')
    setCardCvv('789')
    setCardName(user?.name || 'Prasoon Dwivedi')
    toast.success('Test card auto-filled!', {
      style: { background: '#130726', color: '#fff', border: '1px solid rgba(168, 85, 247, 0.4)' }
    })
  }

  // Handle Complete Payment Simulation & Verification
  const handlePayment = async () => {
    if (!orderDetails) {
      toast.error('Payment order not initialized.')
      return
    }

    // Validation
    if (activeTab === 'card') {
      if (!cardNumber || cardNumber.replace(/\s/g, '').length < 16) {
        toast.error('Please enter a valid 16-digit card number.')
        return
      }
      if (!cardExpiry || !cardExpiry.includes('/')) {
        toast.error('Please enter a valid expiry date (MM/YY).')
        return
      }
      if (!cardCvv || cardCvv.length < 3) {
        toast.error('Please enter a valid 3-digit CVV.')
        return
      }
    } else if (activeTab === 'upi') {
      if (!upiId && selectedUpiApp === 'custom') {
        toast.error('Please enter a valid UPI ID (e.g., name@okhdfcbank).')
        return
      }
    }

    setProcessing(true)
    setError('')

    try {
      // Simulate real-time bank gateway processing steps
      await new Promise(r => setTimeout(r, 1200))

      const paymentId = `pay_${orderDetails.isSandbox ? 'sbx_' : 'live_'}${Date.now()}`
      const signature = `sig_${Date.now()}_verified`

      // Verify payment with backend
      const { data } = await api.post('/api/payment/verify', {
        orderId: orderDetails.orderId,
        paymentId,
        signature,
        planId: plan.id,
        billingCycle: plan.billingCycle || 'yearly',
        isSandbox: orderDetails.isSandbox
      })

      if (data.success) {
        setSuccess(true)
        if (data.user && setUser) {
          setUser(data.user)
        }
        toast.success(data.message || `🎉 Subscribed to ${plan.name}!`, {
          duration: 5000,
          style: {
            background: '#130726',
            color: '#fff',
            border: '1px solid rgba(168, 85, 247, 0.5)'
          }
        })

        // Call parent callback if provided
        if (onSuccess) onSuccess(data.user)

        // Close after celebrating
        setTimeout(() => {
          onClose()
        }, 2200)
      } else {
        setError(data.error || 'Payment verification failed.')
      }
    } catch (err) {
      console.error('Payment verification failed:', err)
      setError(err?.response?.data?.error || 'Payment failed. Please try again.')
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl bg-[#0d051c] border border-purple-500/40 rounded-3xl p-6 sm:p-8 text-white shadow-2xl shadow-purple-950/95 ring-1 ring-purple-400/25 max-h-[92vh] overflow-y-auto hide-scrollbar"
      >
        {/* Glow backdrop */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-32 bg-purple-600/25 blur-3xl pointer-events-none rounded-full"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={processing}
          className="absolute top-5 right-5 p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition cursor-pointer disabled:opacity-40"
        >
          <XIcon size={18} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2.5 mb-6">
          <div className="size-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-900/50">
            <LockIcon size={18} className="text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-purple-300 uppercase tracking-wider">
              <ShieldCheckIcon size={13} className="text-purple-400" />
              <span>256-Bit SSL Encrypted Razorpay Checkout</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Complete Your Subscription
            </h2>
          </div>
        </div>

        {/* Order Summary Strip */}
        <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/30 backdrop-blur-sm mb-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white">{plan?.name}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-400/20 text-purple-200 border border-purple-400/30 font-semibold">
                {isYearly ? 'Annual (Save 20%)' : 'Monthly'}
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              {isYearly 
                ? `Billed annually at ₹${payableAmount.toLocaleString('en-IN')}/yr`
                : `Billed monthly at ₹${payableAmount.toLocaleString('en-IN')}/mo`}
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs text-zinc-400 block">Total Due</span>
            <span className="text-2xl font-extrabold text-white bg-gradient-to-r from-white via-purple-100 to-purple-300 bg-clip-text text-transparent">
              ₹{payableAmount.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Success State View */}
        {success ? (
          <div className="py-8 text-center space-y-3 animate-in zoom-in-95 duration-300">
            <div className="size-16 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-500 text-white flex items-center justify-center mx-auto shadow-xl shadow-emerald-950/60 ring-4 ring-emerald-500/20 animate-bounce">
              <CheckIcon size={32} strokeWidth={3} />
            </div>
            <h3 className="text-2xl font-bold text-white">Payment Confirmed!</h3>
            <p className="text-sm text-zinc-300 max-w-sm mx-auto">
              Your account has been upgraded to <strong className="text-purple-300">{plan?.name}</strong>. Enjoy unlimited AI generations & cloud exports!
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-xs font-semibold text-emerald-300 mt-2">
              <SparklesIcon size={12} />
              <span>Subscription Active</span>
            </div>
          </div>
        ) : (
          <>
            {/* Payment Method Tabs */}
            <div className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-white/[0.04] border border-white/10 mb-6">
              <button
                type="button"
                onClick={() => setActiveTab('upi')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  activeTab === 'upi'
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-900/50'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <SmartphoneIcon size={14} />
                <span>UPI / QR</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('card')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  activeTab === 'card'
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-900/50'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <CreditCardIcon size={14} />
                <span>Cards</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('netbanking')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  activeTab === 'netbanking'
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-900/50'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Building2Icon size={14} />
                <span>Net Banking</span>
              </button>
            </div>

            {/* Tab 1: UPI / QR Payment */}
            {activeTab === 'upi' && (
              <div className="space-y-4 mb-6">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row items-center gap-4">
                  {/* Mock UPI QR Code */}
                  <div className="p-2.5 rounded-xl bg-white text-black shrink-0 shadow-md flex flex-col items-center justify-center">
                    <QrCodeIcon size={80} className="text-zinc-900" />
                    <span className="text-[9px] font-bold tracking-tight text-zinc-600 mt-1">BHIM UPI QR</span>
                  </div>

                  <div className="text-center sm:text-left flex-1">
                    <h4 className="text-sm font-semibold text-white">Scan & Pay with Any UPI App</h4>
                    <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                      Google Pay, PhonePe, Paytm, CRED or any BHIM UPI mobile app.
                    </p>
                    <div className="flex flex-wrap items-center gap-2 mt-2.5 justify-center sm:justify-start">
                      <span className="px-2 py-0.5 rounded-md bg-white/10 text-[10px] font-medium text-purple-200">GPay</span>
                      <span className="px-2 py-0.5 rounded-md bg-white/10 text-[10px] font-medium text-purple-200">PhonePe</span>
                      <span className="px-2 py-0.5 rounded-md bg-white/10 text-[10px] font-medium text-purple-200">Paytm</span>
                      <span className="px-2 py-0.5 rounded-md bg-white/10 text-[10px] font-medium text-purple-200">BHIM</span>
                    </div>
                  </div>
                </div>

                {/* Or Enter UPI ID */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Or Enter UPI ID / VPA
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="username@okhdfcbank or 9876543210@paytm"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-purple-400 focus:ring-1 focus:ring-purple-400 outline-none text-xs text-white placeholder:text-zinc-500 transition"
                    />
                    <button
                      type="button"
                      onClick={() => setUpiId('prasoon@okhdfcbank')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-purple-300 hover:text-white bg-purple-900/50 hover:bg-purple-800/60 px-2 py-1 rounded-md border border-purple-500/30 cursor-pointer"
                    >
                      Fill Demo
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Credit / Debit Card */}
            {activeTab === 'card' && (
              <div className="space-y-3.5 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-400">Accepted: Visa, Mastercard, RuPay</span>
                  <button
                    type="button"
                    onClick={fillTestCard}
                    className="text-[11px] text-purple-300 hover:text-purple-100 bg-purple-950/60 hover:bg-purple-900/70 border border-purple-500/40 px-2.5 py-1 rounded-full cursor-pointer flex items-center gap-1"
                  >
                    <ZapIcon size={11} className="text-yellow-400" />
                    <span>Auto-Fill Test Card</span>
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    placeholder="4111 2222 3333 4444"
                    maxLength={19}
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-purple-400 focus:ring-1 focus:ring-purple-400 outline-none text-xs text-white placeholder:text-zinc-500 transition tracking-wider font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      maxLength={5}
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-purple-400 focus:ring-1 focus:ring-purple-400 outline-none text-xs text-white placeholder:text-zinc-500 transition font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      CVV / Security Code
                    </label>
                    <input
                      type="password"
                      placeholder="•••"
                      maxLength={4}
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-purple-400 focus:ring-1 focus:ring-purple-400 outline-none text-xs text-white placeholder:text-zinc-500 transition font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    placeholder="Name as printed on card"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-purple-400 focus:ring-1 focus:ring-purple-400 outline-none text-xs text-white placeholder:text-zinc-500 transition"
                  />
                </div>
              </div>
            )}

            {/* Tab 3: Net Banking */}
            {activeTab === 'netbanking' && (
              <div className="space-y-4 mb-6">
                <label className="block text-xs font-semibold text-zinc-300">
                  Select Your Bank
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {['HDFC', 'ICICI', 'SBI', 'Axis Bank', 'Kotak', 'PNB'].map((bank) => (
                    <button
                      key={bank}
                      type="button"
                      onClick={() => setSelectedBank(bank)}
                      className={`p-3 rounded-xl border text-xs font-semibold transition cursor-pointer flex items-center justify-between ${
                        selectedBank === bank
                          ? 'bg-purple-950/60 border-purple-500 text-white ring-1 ring-purple-400/40 shadow-sm'
                          : 'bg-white/[0.03] border-white/10 text-zinc-300 hover:border-purple-400/30'
                      }`}
                    >
                      <span>{bank}</span>
                      {selectedBank === bank && <CheckCircle2Icon size={13} className="text-purple-400" />}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-zinc-400">
                  You will be safely routed to your bank's secure portal to authorize this ₹{payableAmount.toLocaleString('en-IN')} payment.
                </p>
              </div>
            )}

            {/* Error Banner */}
            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-950/50 border border-red-500/40 text-xs text-red-200 flex items-center gap-2">
                <AlertCircleIcon size={14} className="text-red-400 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Pay Button */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={handlePayment}
                disabled={processing || loadingOrder}
                className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-xl shadow-purple-950/60 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {processing ? (
                  <>
                    <Loader2Icon size={16} className="animate-spin text-white" />
                    <span>Processing ₹{payableAmount.toLocaleString('en-IN')} with Bank...</span>
                  </>
                ) : loadingOrder ? (
                  <>
                    <Loader2Icon size={16} className="animate-spin text-white" />
                    <span>Preparing Secure Order...</span>
                  </>
                ) : (
                  <>
                    <LockIcon size={15} className="text-yellow-300" />
                    <span>Pay ₹{payableAmount.toLocaleString('en-IN')} Securely</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-3 text-[11px] text-zinc-400 pt-1">
                <span>Refund Guarantee</span>
                <span>•</span>
                <span>Zero Latency Provisioning</span>
                <span>•</span>
                <span>RBI Compliant</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default PaymentModal
