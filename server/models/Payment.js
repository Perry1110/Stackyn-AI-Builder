import mongoose, { Schema } from 'mongoose';

const PaymentSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    orderId: { type: String, required: true, unique: true },
    paymentId: { type: String },
    signature: { type: String },
    planId: { type: String, required: true, enum: ['free', 'pro', 'studio'] },
    billingCycle: { type: String, required: true, enum: ['monthly', 'yearly'] },
    amount: { type: Number, required: true }, // In Rupees
    currency: { type: String, default: 'INR' },
    status: { type: String, enum: ['created', 'completed', 'failed'], default: 'created' },
    paymentMethod: { type: String, default: 'Razorpay' },
    gatewayResponse: { type: Object }
}, { timestamps: true });

export const Payment = mongoose.model('Payment', PaymentSchema);
