import React, { useState, useEffect } from 'react'
import LoginLeft from '../components/LoginLeft';
import SubscriptionSection from '../components/SubscriptionSection';
import SubscriptionModal from '../components/SubscriptionModal';
import { Link, useNavigate } from 'react-router-dom';
import { 
  EyeIcon, 
  EyeOffIcon, 
  Loader2Icon, 
  SparklesIcon, 
  Code2Icon, 
  GlobeIcon, 
  DownloadIcon, 
  ArrowRightIcon, 
  LayersIcon, 
  ZapIcon, 
  CheckCircle2Icon,
  ChevronDownIcon,
  HeartIcon
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const AuthPage = ({mode}) => {
  const {login, register} = useAppContext()
  const navigate = useNavigate()

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [subModalOpen, setSubModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('pro');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isLogin = mode === "login";

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      if(mode === "login"){
        await login(email, password)
      }else{
        await register(name, email, password)
      }
      navigate("/")
    } catch (err) {
      setError(err.message || (mode === "login" ? "Invalid email or password" : "Registration failed"));
    }finally{
      setLoading(false)
    }
  }

  const features = [
    {
      icon: <SparklesIcon className="size-6 text-purple-400" />,
      title: "Prompt to Full Application",
      description: "Type what you envision in plain English. The autonomous agent architectures, generates React JSX, sets up Tailwind, and wires interactivity."
    },
    {
      icon: <Code2Icon className="size-6 text-cyan-400" />,
      title: "Live Sandpack Sandbox",
      description: "Interactive in-browser code editor with instant live reload. Inspect generated files, modify components, and preview in real-time."
    },
    {
      icon: <GlobeIcon className="size-6 text-violet-400" />,
      title: "1-Click Cloud Hosting",
      description: "Deploy your web application to a public shareable URL with a single click. Share your portfolio or MVP with clients instantly."
    },
    {
      icon: <DownloadIcon className="size-6 text-pink-400" />,
      title: "Clean Source Code Export",
      description: "Export complete, production-ready Vite + React ZIP repositories. Full ownership of your code with zero vendor lock-in."
    }
  ];

  const templates = [
    {
      title: "Modern SaaS Landing",
      tag: "SaaS & Tech",
      desc: "Hero with dynamic pricing tiers, metric counters, feature comparison tables, and FAQ accordion.",
      gradient: "from-purple-600/30 via-indigo-600/20 to-transparent"
    },
    {
      title: "Creative Developer Portfolio",
      tag: "Portfolio",
      desc: "Dark-themed interactive portfolio featuring project showcases, skills radar, and contact modal.",
      gradient: "from-cyan-600/30 via-blue-600/20 to-transparent"
    },
    {
      title: "E-Commerce Boutique",
      tag: "Storefront",
      desc: "Modern digital catalog with animated product cards, shopping bag drawer, and seamless checkout flow.",
      gradient: "from-pink-600/30 via-purple-600/20 to-transparent"
    },
    {
      title: "AI Startup Showcase",
      tag: "Landing Page",
      desc: "Futuristic showcase with glassmorphism panels, interactive demo playground, and client testimonials.",
      gradient: "from-violet-600/30 via-fuchsia-600/20 to-transparent"
    }
  ];

  const steps = [
    {
      step: "01",
      title: "Describe Your Vision",
      desc: "Enter a prompt explaining what you want to build—from layout and style to interactive components."
    },
    {
      step: "02",
      title: "Autonomous Generation",
      desc: "Stackyn-AI synthesizes full React components, Tailwind styling, and responsive structure in seconds."
    },
    {
      step: "03",
      title: "Preview & Launch",
      desc: "Tweak files live in the built-in Sandpack editor, export clean ZIP code, or publish directly to the web."
    }
  ];

  return (
    <div className="min-h-screen text-white font-sans bg-[url('/bg-img.png')] bg-cover bg-center bg-fixed bg-no-repeat overflow-x-hidden selection:bg-purple-500 selection:text-white flex flex-col justify-between">
      
      {/* Floating Pill Navigation Bar (Full length at top, shrinks to floating pill on scroll with purple accent) */}
      <header className={`fixed inset-x-0 z-50 flex justify-center pointer-events-none transition-all duration-500 ease-out ${
        scrolled ? "top-3 sm:top-4 px-4 sm:px-6" : "top-0 px-0"
      }`}>
        <nav 
          aria-label="Main Navigation"
          className={`pointer-events-auto w-full flex items-center justify-between transition-all duration-500 ease-out ${
            scrolled 
              ? "max-w-6xl rounded-full px-5 sm:px-8 py-2.5 sm:py-3 glass-nav-scrolled border border-purple-500/35 shadow-2xl shadow-purple-950/70 shadow-[0_8px_32px_rgba(168,85,247,0.22)] ring-1 ring-purple-400/25" 
              : "max-w-full rounded-none px-6 sm:px-10 lg:px-12 py-3.5 sm:py-4 glass-nav-top border border-transparent border-b-purple-500/20 shadow-none ring-0 ring-transparent"
          }`}
        >
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group">
            <img src="/logo.svg" alt="Stackyn-AI" className="size-7 sm:size-8 drop-shadow-[0_0_14px_rgba(168,85,247,0.6)] group-hover:scale-105 transition-transform" />
            <span className="text-lg sm:text-xl font-bold tracking-tight bg-gradient-to-r from-white via-purple-100 to-purple-300 bg-clip-text text-transparent">
              Stackyn-AI
            </span>
          </Link>

          {/* Navigation Links & Action */}
          <div className="flex items-center gap-4 sm:gap-6 text-sm font-medium">
            <a href="#features" className="text-zinc-300 hover:text-purple-300 hover:bg-purple-500/10 px-3 py-1 rounded-full transition-all duration-200 hidden md:inline-block hover:scale-105 active:scale-95">Features</a>
            <a href="#templates" className="text-zinc-300 hover:text-purple-300 hover:bg-purple-500/10 px-3 py-1 rounded-full transition-all duration-200 hidden md:inline-block hover:scale-105 active:scale-95">Templates</a>
            <a href="#how-it-works" className="text-zinc-300 hover:text-purple-300 hover:bg-purple-500/10 px-3 py-1 rounded-full transition-all duration-200 hidden md:inline-block hover:scale-105 active:scale-95">How It Works</a>
            <a href="#pricing" className="text-zinc-300 hover:text-purple-300 hover:bg-purple-500/10 px-3 py-1 rounded-full transition-all duration-200 hidden md:inline-block hover:scale-105 active:scale-95">Pricing</a>
            <Link 
              to={isLogin ? "/register" : "/login"} 
              className="px-4 sm:px-5 py-1.5 sm:py-2 rounded-full border border-purple-400/40 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white transition text-xs sm:text-sm font-semibold shadow-lg shadow-purple-950/50 hover:shadow-purple-600/30 backdrop-blur-sm active:scale-95 flex items-center gap-1.5">
              {isLogin ? "Create Account" : "Sign In"}
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section: Left Branding & Right Glassmorphic Form Card */}
      <div className="max-w-7xl mx-auto px-6 pt-24 sm:pt-28 lg:pt-32 pb-8 lg:pb-16 w-full flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
        {/* Left Branding */}
        <LoginLeft />

        {/* Right Panel - Glassmorphic Form Card (Completely fills the white space) */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-2 sm:p-4">
          <div className="w-full max-w-md bg-white/[0.07] backdrop-blur-2xl border border-white/20 rounded-2xl p-8 sm:p-10 shadow-2xl shadow-purple-950/60 ring-1 ring-white/10">
            
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white font-sans">
                  {isLogin ? "Sign in" : "Create account"}
                </h2>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-200 font-medium">
                  v1.0 Live
                </span>
              </div>
              <p className='text-sm text-zinc-300'>
                {isLogin ? "Enter your credentials to access your website builder." : "Get started with your free Stackyn-AI builder account."}
              </p>
            </div>

            {error && (
              <div className='mb-6 p-3 border border-red-500/30 bg-red-500/10 text-red-200 text-xs rounded-lg backdrop-blur-sm flex items-center gap-2'>
                <span className="size-1.5 rounded-full bg-red-400"></span>
                <span>{error}</span>
              </div>
            )}

            <form className='space-y-5' onSubmit={handleSubmit}>
              {!isLogin && (
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-300 uppercase tracking-widest mb-1.5">
                    Full Name
                  </label>
                  <input 
                    type="text" 
                    value={name} 
                    onChange={(e)=>setName(e.target.value)} 
                    required 
                    className='w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-white/15 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30 text-sm text-white placeholder-zinc-500 transition-all' 
                    placeholder='John Doe'/>
                </div>
              )}

              <div>
                <label className="block text-[11px] font-semibold text-zinc-300 uppercase tracking-widest mb-1.5">
                  Email Address
                </label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e)=>setEmail(e.target.value)} 
                  required 
                  className='w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-white/15 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30 text-sm text-white placeholder-zinc-500 transition-all' 
                  placeholder="you@example.com"/>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-zinc-300 uppercase tracking-widest mb-1.5">
                  Password
                </label>
                <div className='relative'>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={password} 
                    onChange={(e)=>setPassword(e.target.value)} 
                    required 
                    className='w-full px-3.5 py-2.5 pr-10 rounded-lg bg-black/40 border border-white/15 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30 text-sm text-white placeholder-zinc-500 transition-all' 
                    placeholder="••••••••"/>
                  <button 
                    type="button" 
                    onClick={()=> setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors">
                    {showPassword ? <EyeOffIcon size={16}/> : <EyeIcon size={16}/>}
                  </button>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading} 
                className='w-full py-3 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white font-semibold hover:opacity-95 hover:shadow-lg hover:shadow-purple-500/30 disabled:opacity-40 flex items-center justify-center cursor-pointer mt-4 rounded-lg transition-all shadow-md'>
                {loading && <Loader2Icon className="animate-spin h-4 w-4 mr-2"/>}
                {isLogin ? "Sign in" : "Sign up"}
              </button>
            </form>

            <p className='text-sm text-zinc-400 mt-8 pt-6 border-t border-white/10 font-sans text-center'>
              {isLogin ? (
                <>
                  New to Stackyn-AI?{" "}
                  <Link to="/register" className="text-purple-300 font-medium hover:text-white hover:underline transition-colors" >
                    Create an account
                  </Link>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <Link to="/login" className="text-purple-300 font-medium hover:text-white hover:underline transition-colors" >
                    Sign in here
                  </Link>
                </>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Scroll indicator prompt */}
      <div className="flex flex-col items-center justify-center py-6 text-zinc-400">
        <a href="#features" className="flex flex-col items-center gap-1.5 text-xs hover:text-white transition group">
          <span>Explore Platform Features</span>
          <ChevronDownIcon size={18} className="animate-bounce text-purple-400 group-hover:text-purple-300" />
        </a>
      </div>

      {/* Extended Section 1: Features Showcase */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20 w-full scroll-mt-28">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium text-purple-200 mb-3">
            <ZapIcon size={12} className="text-purple-400" /> Everything You Need
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
            Designed for Speed, Beauty, and Autonomy
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base mt-3">
            From the initial spark to production code, Stackyn gives you end-to-end freedom to create stunning websites.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div 
              key={i}
              className="bg-white/[0.05] hover:bg-white/[0.09] backdrop-blur-xl border border-white/10 hover:border-purple-400/40 p-6 rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-purple-950/40 group">
              <div className="size-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-zinc-300/80 text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Extended Section 2: Popular Templates & Inspiration */}
      <section id="templates" className="max-w-7xl mx-auto px-6 py-20 w-full scroll-mt-28">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium text-cyan-200 mb-3">
            <LayersIcon size={12} className="text-cyan-400" /> Infinite Possibilities
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
            What will you build with Stackyn-AI?
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base mt-3">
            Explore templates built entirely through natural language prompts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {templates.map((tpl, i) => (
            <div 
              key={i}
              className="relative overflow-hidden bg-white/[0.05] border border-white/10 hover:border-white/25 rounded-2xl p-6 sm:p-8 backdrop-blur-xl transition-all hover:shadow-xl group">
              <div className={`absolute inset-0 bg-gradient-to-br ${tpl.gradient} opacity-50 group-hover:opacity-75 transition-opacity`}></div>
              <div className="relative z-10">
                <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/10 border border-white/15 text-white/90">
                  {tpl.tag}
                </span>
                <h3 className="text-xl font-semibold text-white mt-4 mb-2">{tpl.title}</h3>
                <p className="text-zinc-300 text-sm leading-relaxed mb-6">{tpl.desc}</p>
                <div className="flex items-center gap-2 text-xs font-semibold text-purple-300 group-hover:text-white transition">
                  <span>Sign in to generate this template</span>
                  <ArrowRightIcon size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Extended Section 3: How It Works */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-6 py-20 w-full scroll-mt-28">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium text-pink-200 mb-3">
            <CheckCircle2Icon size={12} className="text-pink-400" /> Simple 3-Step Flow
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
            From idea to deployed app in minutes
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <div 
              key={i}
              className="bg-white/[0.05] border border-white/10 rounded-2xl p-8 backdrop-blur-xl relative">
              <div className="text-4xl font-bold text-white/20 mb-4">{s.step}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{s.title}</h3>
              <p className="text-zinc-300 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Extended Section 4: Live Stats Banner */}
      <section className="max-w-7xl mx-auto px-6 py-12 w-full">
        <div className="bg-white/[0.05] border border-white/10 rounded-2xl p-8 backdrop-blur-xl grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl sm:text-4xl font-bold text-white mb-1">15k+</div>
            <div className="text-xs uppercase tracking-wider text-zinc-400">Websites Created</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-bold text-purple-300 mb-1">&lt;10s</div>
            <div className="text-xs uppercase tracking-wider text-zinc-400">Generation Speed</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-bold text-cyan-300 mb-1">99.9%</div>
            <div className="text-xs uppercase tracking-wider text-zinc-400">Platform Uptime</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-bold text-pink-300 mb-1">100%</div>
            <div className="text-xs uppercase tracking-wider text-zinc-400">Free to Start</div>
          </div>
        </div>
      </section>

      {/* Subscription Model Section */}
      <SubscriptionSection 
        selectedPlan={selectedPlan}
        onChangePlan={setSelectedPlan}
        onSelectPlan={(plan) => {
          setSelectedPlan(plan);
          setSubModalOpen(true);
        }} 
      />

      {/* Footer */}
      <footer className="w-full border-t border-purple-500/20 backdrop-blur-md bg-black/40 py-8 px-6 mt-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="Stackyn-AI" className="size-6 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
            <span className="text-sm font-semibold text-white">Stackyn-AI</span>
            <span className="text-xs text-zinc-400">| Autonomous Website Engine</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-zinc-300 font-medium">
            <span>Made with</span>
            <HeartIcon size={13} className="text-purple-400 fill-purple-400 animate-pulse" />
            <span>by</span>
            <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-purple-200 bg-clip-text text-transparent font-semibold drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]">
              Prasoon
            </span>
          </div>

          {/* Connect Section */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-white tracking-wide">Connect</span>
            <div className="flex items-center gap-2">
              <a 
                href="https://github.com/Perry1110" 
                target="_blank" 
                rel="noopener noreferrer"
                title="GitHub - Perry1110"
                className="size-7 rounded-full bg-white/[0.08] hover:bg-purple-600/30 border border-white/15 hover:border-purple-400/50 flex items-center justify-center text-zinc-300 hover:text-white transition-all shadow-sm hover:shadow-[0_0_12px_rgba(168,85,247,0.4)] hover:scale-110 active:scale-95">
                <svg className="size-4 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
              </a>
              <a 
                href="https://www.linkedin.com/in/pr44soon/?isSelfProfile=true" 
                target="_blank" 
                rel="noopener noreferrer"
                title="LinkedIn - PRASOON DWIVEDI"
                className="size-7 rounded-md bg-white/[0.08] hover:bg-purple-600/30 border border-white/15 hover:border-purple-400/50 flex items-center justify-center text-zinc-300 hover:text-white transition-all shadow-sm hover:shadow-[0_0_12px_rgba(168,85,247,0.4)] hover:scale-110 active:scale-95">
                <svg className="size-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </a>
            </div>
          </div>

          <p className="text-xs text-zinc-400">
            © {new Date().getFullYear()} Stackyn-AI. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Subscription Modal Dialog */}
      <SubscriptionModal 
        isOpen={subModalOpen} 
        onClose={() => setSubModalOpen(false)} 
        initialPlan={selectedPlan} 
      />

    </div>
  )
}

export default AuthPage