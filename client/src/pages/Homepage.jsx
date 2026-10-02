import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import PromptInput from '../components/PromptInput'
import { homeTags } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import SubscriptionSection from '../components/SubscriptionSection'
import SubscriptionModal from '../components/SubscriptionModal'
import UserProfileMenu from '../components/UserProfileMenu'
import { 
  ArrowRightIcon, 
  ClockIcon, 
  Trash2Icon, 
  SparklesIcon, 
  Code2Icon, 
  GlobeIcon, 
  DownloadIcon, 
  LayersIcon, 
  ZapIcon, 
  CheckCircle2Icon,
  HeartIcon
} from 'lucide-react'
import moment from "moment";

const HomePage = () => {

  const navigate = useNavigate()

  const {user, projects, loadingProjects, generatingProject, loadProjects, handleGenerate, handleDelete, logout} = useAppContext()
  const [scrolled, setScrolled] = useState(false);
  const [subModalOpen, setSubModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('pro');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
      setScrolled(scrollPos > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(()=>{
    loadProjects()
  },[loadProjects])

  const starterTemplates = [
    {
      title: "SaaS Product Landing",
      category: "Software",
      desc: "Hero section, product metrics, feature grid, interactive pricing tiers, and FAQ.",
      prompt: "Create a modern, high-converting dark-themed SaaS landing page for an AI developer platform with pricing tiers, metrics, and testimonials."
    },
    {
      title: "Minimalist Developer Portfolio",
      category: "Portfolio",
      desc: "Cosmic dark aesthetic, project gallery, interactive skills filter, and contact drawer.",
      prompt: "Build an ultra-modern developer portfolio with a dark cosmic theme, interactive project showcase cards, tech stack pills, and contact form."
    },
    {
      title: "Modern E-Commerce Store",
      category: "Storefront",
      desc: "Hero showcase, responsive product cards, category tabs, and cart sidebar.",
      prompt: "Build a sleek modern streetwear e-commerce storefront with product cards, category filters, shopping cart modal, and checkout preview."
    },
    {
      title: "Agency & Design Studio",
      category: "Creative",
      desc: "Bold typography, case study showcase, client logos, and consultation scheduler.",
      prompt: "Create a bold, creative digital agency landing page with striking typography, case studies grid, client testimonials, and booking form."
    }
  ];

  const features = [
    {
      icon: <SparklesIcon className="size-6 text-purple-400" />,
      title: "Autonomous React Generation",
      description: "Generates multi-file React architectures with clean Tailwind CSS styling directly from natural language."
    },
    {
      icon: <Code2Icon className="size-6 text-cyan-400" />,
      title: "In-Browser Sandpack Sandbox",
      description: "Real-time preview and hot-reloading code editor. Modify your code and preview updates instantly."
    },
    {
      icon: <GlobeIcon className="size-6 text-violet-400" />,
      title: "1-Click Public Deployment",
      description: "Host your creations online with a dedicated public link ready to share with team members and clients."
    },
    {
      icon: <DownloadIcon className="size-6 text-pink-400" />,
      title: "Zero Lock-In ZIP Export",
      description: "Download pure standard React + Vite source code packages ready for deployment on Vercel, Netlify, or AWS."
    }
  ];

  return (
    <div className="min-h-screen text-white font-sans bg-[url('/bg-img.png')] bg-cover bg-center bg-fixed bg-no-repeat overflow-x-hidden selection:bg-purple-500 selection:text-white flex flex-col justify-between">
        {/* Floating Pill Nav (Full length at top, shrinks to floating pill on scroll with purple accent) */}
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
            <a href="#" className="flex items-center gap-2.5 sm:gap-3 group">
              <img src="/logo.svg" alt="Stackyn-AI" className='size-7 sm:size-8 drop-shadow-[0_0_14px_rgba(168,85,247,0.6)] group-hover:scale-105 transition-transform'/>
              <span className='text-lg sm:text-xl font-bold tracking-tight bg-gradient-to-r from-white via-purple-100 to-purple-300 bg-clip-text text-transparent'>Stackyn-AI</span>
            </a>

            {/* Navigation Links (Desktop) */}
            <div className="flex items-center gap-4 sm:gap-6 text-sm font-medium">
              <a href="#projects" className="text-zinc-300 hover:text-purple-300 hover:bg-purple-500/10 px-3 py-1 rounded-full transition-all duration-200 hidden md:inline-block hover:scale-105 active:scale-95">
                Projects
              </a>
              <a href="#templates" className="text-zinc-300 hover:text-purple-300 hover:bg-purple-500/10 px-3 py-1 rounded-full transition-all duration-200 hidden md:inline-block hover:scale-105 active:scale-95">
                Templates
              </a>
              <a href="#features" className="text-zinc-300 hover:text-purple-300 hover:bg-purple-500/10 px-3 py-1 rounded-full transition-all duration-200 hidden md:inline-block hover:scale-105 active:scale-95">
                Features
              </a>
              <a href="#pricing" className="text-zinc-300 hover:text-purple-300 hover:bg-purple-500/10 px-3 py-1 rounded-full transition-all duration-200 hidden md:inline-block hover:scale-105 active:scale-95">
                Pricing
              </a>
            </div>

            {/* User Profile & Sign Out Action */}
            <div className='flex items-center gap-2.5 sm:gap-3 text-sm font-medium'>
              <UserProfileMenu 
                user={user}
                projects={projects}
                onLogout={logout}
                onOpenSubscription={() => setSubModalOpen(true)}
                selectedPlan={selectedPlan}
              />
              <button 
                onClick={logout} 
                className='px-3.5 sm:px-4 py-1.5 rounded-full border border-purple-400/40 bg-purple-600/20 hover:bg-purple-600/35 hover:border-purple-400/60 text-purple-100 hover:text-white transition text-xs font-semibold shadow-sm shadow-purple-950/40 backdrop-blur-sm active:scale-95 cursor-pointer'>
                Sign out
              </button>
            </div>
          </nav>
        </header>

        {/* Hero */}
        <div className="relative flex-1 flex flex-col items-center justify-center px-6 pb-16 pt-24 sm:pt-28 lg:pt-32">
          {/* Ambient Purple Theme Glow */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] max-w-[90vw] h-[340px] bg-gradient-to-tr from-purple-600/20 via-fuchsia-600/15 to-indigo-600/20 blur-[110px] pointer-events-none -z-10 rounded-full"></div>

          <div className="w-full max-w-2xl flex flex-col items-center">
              {/* Minimalist Live Engine Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/40 border border-purple-500/30 backdrop-blur-xl shadow-lg shadow-purple-950/40 text-xs text-purple-200 mb-5">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-400"></span>
                </span>
                <span className="font-medium tracking-wide">Next-Gen AI Web Engine</span>
              </div>

              {/* Title (1-2 lines in bigger font with purple accent gradient) */}
              <h1 className='hero-title text-center text-4xl sm:text-5xl md:text-6xl max-w-2xl text-white tracking-tight'>
                Build web apps at the{" "}
                <span className="bg-gradient-to-r from-purple-400 via-fuchsia-300 to-indigo-300 bg-clip-text text-transparent">
                  speed of thought
                </span>
              </h1>

              {/* Subtitle (3-4 lines of shorter font, clean and informative) */}
              <p className='text-center text-sm md:text-base max-w-xl mt-4 text-zinc-300/85 leading-relaxed'> 
                Turn natural language prompts into production-ready web applications.
                Stackyn-AI synthesizes full React components, Tailwind styling, and live sandbox previews.
                Type your vision below to architect and launch your website instantly.
              </p>

              {/* Minimalist Glowing Hairline Divider with Centered Sparkle */}
              <div className="flex items-center justify-center gap-3 w-full max-w-xs my-6">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-500/30 to-purple-400/60"></div>
                <SparklesIcon size={13} className="text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.7)] shrink-0 animate-pulse" />
                <div className="h-px flex-1 bg-gradient-to-l from-transparent via-purple-500/30 to-purple-400/60"></div>
              </div>

              {/* Prompt input with glassmorphic variant */}
              <div className='w-full'>
                <PromptInput 
                onSubmit={handleGenerate}
                loading={generatingProject}
                placeholder='Create a portfolio website...'
                variant='glass'
                autoFocus/>
              </div>

              {/* Scrolling Marquee tags */}
              <div className="masked-marquee w-full mt-4 max-w-2xl overflow-hidden py-1">
                  <div className="animate-marquee gap-3">
                      {homeTags.map((tag, i)=>(
                        <button key={i}
                        onClick={()=> handleGenerate(tag)}
                        disabled={generatingProject}
                        className='px-4 py-1.5 border rounded-full text-sm text-white bg-white/10 border-white/25 hover:bg-white/20 transition cursor-pointer shrink-0 font-medium'>
                          {tag}
                        </button>
                      ))}
                  </div>
              </div>

              {/* All Projects */}
              {!loadingProjects && projects.length > 0 && (
                <div id="projects" className="mt-12 w-full scroll-mt-28">

                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                      <p className='text-xs font-medium uppercase text-zinc-100 tracking-widest'>Your Projects</p>
                      <span className='text-xs text-zinc-300 font-normal'>
                        {projects.length} {projects.length === 1 ? "project" : "projects"}
                      </span>
                    </div>

                    <div className="space-y-2 max-h-[80vh] overflow-y-auto pr-1">
                      {projects.map((p)=>(
                        <div key={p._id} className='bg-white/5 border border-white/10 rounded-lg px-4 py-3 flex items-center justify-between group hover:border-violet-500/40 hover:bg-white/10 cursor-pointer backdrop-blur-md transition-all' 
                        onClick={()=> navigate(`/builder/${p._id}`)}>
                            <div className="flex-1 min-w-0">
                               <p className="text-sm font-medium text-white truncate">{p.name}</p>
                                <div className="flex items-center gap-3 mt-0.5">
                                   <span className="text-xs text-zinc-300 flex items-center gap-1">
                                     <ClockIcon size={10}/>
                                     {moment(p.updatedAt || p.createdAt).fromNow() }
                                   </span>
                                   <span className="text-xs text-white/60 font-medium">v{p.version}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <button 
                                onClick={(e)=>{
                                  e.stopPropagation();
                                  handleDelete(p._id)
                                }}
                                className='p-1.5 rounded-md text-zinc-200 hover:text-red-400 hover:bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity'>
                                  <Trash2Icon size={14}/>
                                </button>
                                <ArrowRightIcon size={14} className="text-zinc-200 group-hover:text-white"/>
                            </div>
                        </div>
                      ))}
                    </div>
                </div>
              )}
          </div>
        </div>

        {/* Extended Section: Starter Templates */}
        <section id="templates" className="max-w-7xl mx-auto px-6 py-16 w-full border-t border-white/10 scroll-mt-28">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium text-purple-200 mb-2">
                <LayersIcon size={12} className="text-purple-400" /> Instant Inspiration
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
                Start from a Curated Concept
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-sm">
              Click any template to auto-generate the complete application structure instantly.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {starterTemplates.map((tpl, i) => (
              <div 
                key={i}
                onClick={() => !generatingProject && handleGenerate(tpl.prompt)}
                className="bg-white/[0.05] hover:bg-white/[0.10] border border-white/10 hover:border-purple-400/40 rounded-2xl p-6 backdrop-blur-xl transition-all cursor-pointer group flex flex-col justify-between hover:shadow-xl hover:shadow-purple-950/30">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-white/10 border border-white/15 text-purple-200">
                    {tpl.category}
                  </span>
                  <h3 className="text-lg font-semibold text-white mt-3 mb-1.5 group-hover:text-purple-200 transition">
                    {tpl.title}
                  </h3>
                  <p className="text-xs text-zinc-300/80 leading-relaxed mb-4">
                    {tpl.desc}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-purple-300 group-hover:text-white transition pt-4 border-t border-white/10">
                  <span>Generate this</span>
                  <ArrowRightIcon size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Extended Section: Platform Capabilities */}
        <section id="features" className="max-w-7xl mx-auto px-6 py-16 w-full border-t border-white/10 scroll-mt-28">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium text-cyan-200 mb-2">
              <ZapIcon size={12} className="text-cyan-400" /> Platform Superpowers
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
              End-to-End Autonomous Web Development
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div 
                key={i}
                className="bg-white/[0.04] border border-white/10 p-6 rounded-2xl backdrop-blur-xl hover:border-white/25 transition">
                <div className="size-11 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center mb-4">
                  {f.icon}
                </div>
                <h3 className="text-base font-semibold text-white mb-1.5">{f.title}</h3>
                <p className="text-xs text-zinc-300/80 leading-relaxed">{f.description}</p>
              </div>
            ))}
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
        <footer className="w-full border-t border-purple-500/20 backdrop-blur-md bg-black/40 py-8 px-6 mt-12">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img src="/logo.svg" alt="Stackyn-AI" className="size-6 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
              <span className="text-sm font-semibold text-white">Stackyn-AI</span>
              <span className="text-xs text-zinc-400">| Next-Gen AI Builder</span>
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

export default HomePage