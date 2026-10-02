import mongoose, {Schema} from 'mongoose'
import bcrypt from 'bcrypt'

const UserSchema = new Schema({
    name: {type: String, required: true},
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    subscription: {
        plan: { type: String, enum: ['free', 'pro', 'studio'], default: 'free' },
        billingCycle: { type: String, enum: ['monthly', 'yearly'], default: 'yearly' },
        status: { type: String, enum: ['active', 'inactive', 'cancelled'], default: 'active' },
        startDate: { type: Date, default: Date.now },
        endDate: { type: Date },
        paymentId: { type: String },
        orderId: { type: String },
        amount: { type: Number, default: 0 },
        currency: { type: String, default: 'INR' }
    }
},{timestamps: true})

// Hash password before saving
UserSchema.pre('save', async function() {
    if(!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

// Compare password method
UserSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password)
}

export const User = mongoose.model('User', UserSchema)