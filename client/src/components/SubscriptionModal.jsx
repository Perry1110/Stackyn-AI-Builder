import React, { useState, useEffect } from 'react'
import { XIcon, SparklesIcon, CheckCircle2Icon, ShieldCheckIcon, ZapIcon, CreditCardIcon, CheckIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import api from '../api/api'
import { useAppContext } from '../context/AppContext'
import PaymentModal from './PaymentModal'

const SubscriptionModal = ({ isOpen, onClose, initialPlan = 'pro' }) => {
  const navigate = useNavigate()
  const { user, setUser } = useAppContext()
  const [billingCycle, setBillingCycle] = useState('yearly') // 'monthly' | 'yearly'
  const [selectedPlan, setSelectedPlan] = useState(initialPlan)
  const [subscribing, setSubscribing] = useState(false)
  const [paymentModalOpen, setPaymentModalOpen] = useState(false)

  useEffect(() => {
    if (initialPlan) {
      setSelectedPlan(initialPlan)
    }
  }, [initialPlan, isOpen])

  if (!isOpen) return null

  const plans = [
    {
      id: 'free',
      name: 'Starter',
      desc: 'For hobbyists & test runs',
      monthlyPrice: 0,
      yearlyPrice: 0,
      popular: false,
      features: [
        '5 AI project generations / mo',
        'Live Sandpack code preview',
        'Standard Tailwind styling',
        'Community Discord access'
      ]
    },
    {
      id: 'pro',
      name: 'Pro Creator',
      desc: 'For builders, devs & creators',
      monthlyPrice: 1499,
      yearlyPrice: 1199,
      popular: true,
      features: [
        'Unlimited AI generations',
        'Production ZIP source exports',
        '1-Click cloud public hosting',
        'Custom domain support',
        'Priority high-speed reasoning',
        'Zero watermark & full ownership'
      ]
    },
    {
      id: 'studio',
      name: 'Studio',
      desc: 'For agencies & power teams',
      monthlyPrice: 3999,
      yearlyPrice: 3199,
      popular: false,
      features: [
        'Everything in Pro Creator',
        'Up to 10 team member seats',
        'Dedicated high-speed GPU lane',
        'Custom design system rules',
        'Priority 24/7 developer support',
        '99.9% uptime SLA'
      ]
    }
  ]

  const currentPlanObj = plans.find(p => p.id === selectedPlan) || plans[1]
  const displayPrice = billingCycle === 'yearly' ? currentPlanObj.yearlyPrice : currentPlanObj.monthlyPrice

  const handleSubscribe = async () => {
    if (!user) {
      toast.error('Please sign in or create an account to activate your subscription.', {
        style: { background: '#130726', color: '#fff', border: '1px solid rgba(168, 85, 247, 0.4)' }
      })
      onClose()
      navigate('/auth')
      return
    }

    if (selectedPlan === 'free') {
      setSubscribing(true)
      try {
        const { data } = await api.post('/api/payment/create-order', {
          planId: 'free',
          billingCycle
        })
        if (data.user && setUser) {
          setUser(data.user)
        }
        toast.success('Switched to Starter Plan!', {
          style: {
            background: '#130726',
            color: '#fff',
            border: '1px solid rgba(168, 85, 247, 0.4)'
          },
          iconTheme: {
            primary: '#c084fc',
            secondary: '#130726'
          }
        })
        onClose()
      } catch (err) {
        toast.error(err?.response?.data?.error || 'Failed to switch to Starter Plan.')
      } finally {
        setSubscribing(false)
      }
      return
    }

    // Launch payment gateway checkout modal
    setPaymentModalOpen(true)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="relative w-full max-w-2xl bg-[#0f061f] border border-purple-500/35 rounded-3xl p-6 sm:p-8 text-white shadow-2xl shadow-purple-950/80 ring-1 ring-purple-400/20 max-h-[92vh] overflow-y-auto hide-scrollbar"
      >
        {/* Glow backdrop inside modal */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-purple-600/20 blur-[90px] pointer-events-none rounded-full"></div>

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
        >
          <XIcon size={18} />
        </button>

        {/* Header */}
        <div className="text-center max-w-md mx-auto mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-[11px] font-semibold text-purple-200 mb-3 shadow-sm">
            <SparklesIcon size={12} className="text-purple-400 animate-pulse" />
            <span>Stackyn-AI Subscription Model</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-white via-purple-100 to-purple-300 bg-clip-text text-transparent">
            Supercharge Your AI Builder
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 mt-1.5 leading-relaxed">
            Choose the subscription tier that fuels your ambition. Cancel or upgrade anytime.
          </p>
        </div>

        {/* Billing Cycle Toggle */}
        <div className="flex items-center justify-center mb-6">
          <div className="inline-flex items-center p-1 rounded-full bg-white/[0.06] border border-white/15 backdrop-blur-sm">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                billingCycle === 'monthly'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-900/50'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                billingCycle === 'yearly'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-900/50'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span>Yearly</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-purple-300/20 text-purple-200 border border-purple-300/30 font-bold">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Plan Cards Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-6">
          {plans.map((p) => {
            const isSelected = selectedPlan === p.id
            const price = billingCycle === 'yearly' ? p.yearlyPrice : p.monthlyPrice

            return (
              <div
                key={p.id}
                onClick={() => setSelectedPlan(p.id)}
                className={`relative rounded-2xl p-4 transition-all cursor-pointer border flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-b from-purple-950/80 via-black/90 to-purple-950/70 border-2 border-purple-500 shadow-xl shadow-purple-950/80 ring-1 ring-purple-400/50 -translate-y-1'
                    : 'bg-white/[0.03] border-white/10 hover:border-purple-400/30 hover:bg-white/[0.06]'
                }`}
              >
                {p.popular && (
                  <span className="absolute -top-2.5 right-3 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-sm border border-purple-300/30">
                    Most Popular
                  </span>
                )}

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-bold text-white">{p.name}</h3>
                    <div className={`size-4 rounded-full border flex items-center justify-center ${
                      isSelected ? 'border-purple-400 bg-purple-500 text-white' : 'border-white/20'
                    }`}>
                      {isSelected && <CheckIcon size={10} strokeWidth={3} />}
                    </div>
                  </div>
                  <p className="text-[11px] text-zinc-400 mb-3">{p.desc}</p>
                </div>

                <div>
                  <div className="flex items-baseline gap-1 pt-2 border-t border-white/10">
                    <span className="text-2xl font-extrabold text-white">₹{price.toLocaleString('en-IN')}</span>
                    <span className="text-[11px] text-zinc-400">/ mo</span>
                  </div>
                  {billingCycle === 'yearly' && price > 0 && (
                    <span className="text-[10px] text-purple-300 block font-medium">
                      Billed ₹{(price * 12).toLocaleString('en-IN')}/yr
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Selected Plan Feature Highlights */}
        <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-4 sm:p-5 mb-6 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
            <span className="text-xs font-semibold text-purple-200 uppercase tracking-wider">
              {currentPlanObj.name} Perks Included:
            </span>
            <span className="text-[11px] text-zinc-400">
              {billingCycle === 'yearly' ? 'Annual commitment (20% off)' : 'Flexible month-to-month'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {currentPlanObj.features.map((feat, idx) => (
              <div key={idx} className="flex items-center gap-2 text-zinc-200">
                <CheckCircle2Icon size={14} className="text-purple-400 shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button & Guarantee Strip */}
        <div className="space-y-3">
          <button
            onClick={handleSubscribe}
            disabled={subscribing}
            className="w-full py-3 rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-xl shadow-purple-950/60 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {subscribing ? (
              <>
                <span className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                <span>Configuring your subscription...</span>
              </>
            ) : (
              <>
                <ZapIcon size={16} className="text-yellow-300" />
                <span>
                  {selectedPlan === 'free' ? 'Continue with Starter (Free)' : `Activate ${currentPlanObj.name} (₹${displayPrice.toLocaleString('en-IN')}/mo)`}
                </span>
              </>
            )}
          </button>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-zinc-400 pt-2">
            <div className="flex items-center gap-1.5">
              <ShieldCheckIcon size={13} className="text-purple-400" />
              <span>14-day money-back guarantee</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <CreditCardIcon size={13} className="text-purple-400" />
              <span>No hidden setup fees</span>
            </div>
          </div>
        </div>

        {/* Embedded Razorpay Payment Gateway Modal */}
        <PaymentModal
          isOpen={paymentModalOpen}
          onClose={() => setPaymentModalOpen(false)}
          plan={{
            id: currentPlanObj.id,
            name: currentPlanObj.name,
            billingCycle,
            monthlyPrice: currentPlanObj.monthlyPrice,
            yearlyPrice: currentPlanObj.yearlyPrice
          }}
          onSuccess={(updatedUser) => {
            if (updatedUser && setUser) {
              setUser(updatedUser)
            }
            setPaymentModalOpen(false)
            onClose()
          }}
        />
      </div>
    </div>
  )
}

export default SubscriptionModal
