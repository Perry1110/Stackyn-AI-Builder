import React from 'react'
import { SparklesIcon, Code2Icon, GlobeIcon, DownloadIcon } from 'lucide-react'

const LoginLeft = () => {
  return (
    <div className="w-full lg:w-1/2 flex flex-col justify-between p-6 lg:p-12 select-none">
      <div>
        <div className='flex items-center gap-3.5'>
          <img src="/logo.svg" alt="Logo" className="size-11 drop-shadow-[0_0_16px_rgba(168,85,247,0.5)]"/>
          <span className="text-4xl font-semibold tracking-tight bg-gradient-to-r from-white via-white to-purple-200 bg-clip-text text-transparent">Stackyn-AI</span>
        </div>

        <div className="mt-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium text-purple-200 mb-4 shadow-sm">
            <span className="size-2 rounded-full bg-purple-400 animate-pulse"></span>
            Next-Gen AI Website Builder
          </div>
          <h1 className='hero-title text-3xl sm:text-4xl lg:text-5xl text-white mt-4 max-w-lg'>
            Build your presence on the web in seconds.
          </h1>
          <p className="text-zinc-300/90 leading-relaxed text-sm sm:text-base mt-4 max-w-lg">
            Describe what you need, preview instantly, and customize your site in real-time. Full-stack React with clean JSX, verified layouts, and instant code exports.
          </p>
        </div>
      </div>

      {/* Feature highlights pill box */}
      <div className="backdrop-blur-xl bg-white/[0.06] p-6 rounded-2xl border border-white/15 shadow-xl mt-8">
        <h3 className="text-xs uppercase font-semibold text-zinc-400 tracking-wider mb-4">Core Platform Capabilities</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-zinc-200">
          <div className="flex items-center gap-2.5 bg-white/5 p-2 rounded-lg border border-white/10">
            <SparklesIcon size={14} className="text-purple-400 shrink-0" />
            <span>Autonomous AI Generation</span>
          </div>
          <div className="flex items-center gap-2.5 bg-white/5 p-2 rounded-lg border border-white/10">
            <Code2Icon size={14} className="text-cyan-400 shrink-0" />
            <span>Sandpack Live Sandbox</span>
          </div>
          <div className="flex items-center gap-2.5 bg-white/5 p-2 rounded-lg border border-white/10">
            <GlobeIcon size={14} className="text-violet-400 shrink-0" />
            <span>1-Click Public Hosting</span>
          </div>
          <div className="flex items-center gap-2.5 bg-white/5 p-2 rounded-lg border border-white/10">
            <DownloadIcon size={14} className="text-pink-400 shrink-0" />
            <span>Clean ZIP Source Export</span>
          </div>
        </div>
        <p className='text-zinc-400 text-xs mt-6 pt-4 border-t border-white/10'>
          © {new Date().getFullYear()} Stackyn-AI. Crafted for creators and developers.
        </p>
      </div>
    </div>
  )
}

export default LoginLeft