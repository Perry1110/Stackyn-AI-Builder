import React, { useState } from 'react'
import { SparklesIcon, CheckCircle2Icon, ZapIcon, ShieldCheckIcon, CreditCardIcon, ArrowRightIcon } from 'lucide-react'

const SubscriptionSection = ({ onSelectPlan, selectedPlan: externalSelectedPlan, onChangePlan }) => {
  const [billingCycle, setBillingCycle] = useState('yearly')
  const [internalSelectedPlan, setInternalSelectedPlan] = useState('pro')

  const selectedPlan = externalSelectedPlan !== undefined ? externalSelectedPlan : internalSelectedPlan

  const handleSelectPlan = (planId) => {
    setInternalSelectedPlan(planId)
    if (onChangePlan) {
      onChangePlan(planId)
    }
  }

  const tiers = [
    {
      id: 'free',
      name: 'Starter',
      badge: 'Free Forever',
      desc: 'Everything you need to experience autonomous web creation.',
      monthlyPrice: 0,
      yearlyPrice: 0,
      popular: false,
      cta: 'Start Free',
      features: [
        '5 AI generations per month',
        'Live Sandpack code preview',
        'Standard Tailwind styling',
        'Community Discord support',
        'Stackyn preview subdomain'
      ]
    },
    {
      id: 'pro',
      name: 'Pro Creator',
      badge: 'Most Popular',
      desc: 'Unlimited power for developers, designers, and fast builders.',
      monthlyPrice: 1499,
      yearlyPrice: 1199,
      popular: true,
      cta: 'Upgrade to Pro',
      features: [
        'Unlimited AI generations',
        'Full React + Tailwind ZIP exports',
        '1-Click custom cloud hosting',
        'Custom domain attachment',
        'Priority high-speed reasoning',
        'Zero watermark & full code ownership',
        'Early access to new agent models'
      ]
    },
    {
      id: 'studio',
      name: 'Studio',
      badge: 'For Agencies',
      desc: 'High-concurrency infrastructure for teams and design studios.',
      monthlyPrice: 3999,
      yearlyPrice: 3199,
      popular: false,
      cta: 'Scale with Studio',
      features: [
        'Everything in Pro Creator',
        'Up to 10 collaborative seats',
        'Dedicated high-throughput GPU queue',
        'Custom enterprise design systems',
        'Priority 24/7 developer assistance',
        '99.9% uptime SLA guarantee'
      ]
    }
  ]

  return (
    <section id="pricing" className="max-w-7xl mx-auto px-6 py-20 w-full border-t border-purple-500/20 scroll-mt-28 relative">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] max-w-[90vw] h-[380px] bg-gradient-to-tr from-purple-600/15 via-fuchsia-600/10 to-indigo-600/15 blur-[130px] pointer-events-none -z-10 rounded-full"></div>

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/40 border border-purple-500/30 backdrop-blur-xl shadow-lg shadow-purple-950/40 text-xs font-medium text-purple-200 mb-3">
          <SparklesIcon size={12} className="text-purple-400 animate-pulse" />
          <span>Transparent Subscription Model</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white hero-title">
          Pick the Plan Built for Your Ambition
        </h2>
        <p className="text-zinc-300 text-sm sm:text-base mt-3 leading-relaxed">
          Zero hidden lock-in. Cancel, pause, or switch your subscription tier at any time.
        </p>

        {/* Billing Switcher */}
        <div className="flex items-center justify-center mt-8">
          <div className="inline-flex items-center p-1.5 rounded-full bg-white/[0.06] border border-white/15 backdrop-blur-md shadow-lg shadow-purple-950/20">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                billingCycle === 'monthly'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-950/60'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                billingCycle === 'yearly'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-950/60'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-400/20 text-purple-200 border border-purple-300/30 font-bold">
                Save 20%
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {tiers.map((tier) => {
          const isSelected = selectedPlan === tier.id
          const price = billingCycle === 'yearly' ? tier.yearlyPrice : tier.monthlyPrice

          return (
            <div
              key={tier.id}
              onClick={() => handleSelectPlan(tier.id)}
              className={`relative rounded-3xl p-8 backdrop-blur-2xl transition-all duration-300 flex flex-col justify-between group cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-b from-purple-950/70 via-black/80 to-purple-950/60 border-2 border-purple-500/60 shadow-2xl shadow-purple-950/80 shadow-[0_0_40px_rgba(168,85,247,0.22)] ring-1 ring-purple-400/30 lg:-translate-y-2'
                  : 'bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 hover:border-purple-500/30 hover:shadow-xl hover:shadow-purple-950/40'
              }`}
            >
              {isSelected && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-gradient-to-r from-purple-500 via-fuchsia-500 to-indigo-500 text-white shadow-lg shadow-purple-900/50 border border-purple-300/40 whitespace-nowrap">
                    <SparklesIcon size={11} /> {tier.badge}
                  </span>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-white tracking-tight">{tier.name}</h3>
                  {!isSelected && (
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/10 border border-white/15 text-zinc-300">
                      {tier.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-zinc-300/80 leading-relaxed mb-6 min-h-[34px]">{tier.desc}</p>

                {/* Price Display */}
                <div className="flex items-baseline gap-1.5 pb-6 mb-6 border-b border-white/10">
                  <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">₹{price.toLocaleString('en-IN')}</span>
                  <span className="text-xs text-zinc-400 font-medium">/ month</span>
                  {billingCycle === 'yearly' && price > 0 && (
                    <span className="ml-auto text-[11px] font-semibold text-purple-300 bg-purple-950/60 px-2 py-1 rounded-md border border-purple-500/30">
                      Billed ₹{(price * 12).toLocaleString('en-IN')}/yr
                    </span>
                  )}
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-8">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-purple-200">What is included:</p>
                  {tier.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs text-zinc-200">
                      <CheckCircle2Icon size={15} className="text-purple-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectPlan(tier.id);
                    if (onSelectPlan) onSelectPlan(tier.id);
                  }}
                  className={`w-full py-3.5 px-6 rounded-full font-semibold text-xs tracking-wide transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95 shadow-lg ${
                    isSelected
                      ? 'bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-purple-900/50 hover:shadow-purple-600/30'
                      : 'border border-purple-400/30 bg-purple-500/10 hover:bg-purple-500/20 text-white'
                  }`}
                >
                  <span>{tier.cta}</span>
                  <ArrowRightIcon size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Trust & Guarantee Banner */}
      <div className="mt-12 p-6 rounded-2xl bg-white/[0.03] border border-purple-500/20 backdrop-blur-xl flex flex-wrap items-center justify-around gap-4 text-xs text-zinc-300 text-center">
        <div className="flex items-center gap-2">
          <ShieldCheckIcon size={16} className="text-purple-400" />
          <span>14-Day Full Satisfaction Guarantee</span>
        </div>
        <div className="flex items-center gap-2">
          <ZapIcon size={16} className="text-purple-400" />
          <span>Instant Provisioning & Zero Lock-in</span>
        </div>
        <div className="flex items-center gap-2">
          <CreditCardIcon size={16} className="text-purple-400" />
          <span>Encrypted Stripe & Card Billing</span>
        </div>
      </div>
    </section>
  )
}

export default SubscriptionSection
