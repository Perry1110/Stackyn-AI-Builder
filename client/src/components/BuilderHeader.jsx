import { ArrowLeftIcon, Code2Icon, DownloadIcon, ExternalLinkIcon, EyeIcon, GlobeIcon, Loader2Icon } from 'lucide-react'
import React from 'react'

const BuilderHeader = ({
    projectName,
    version,
    showCode,
    publishing,
    onToggleShowCode,
    onOpenPreview,
    onPublish,
    onDownload,
    onBack,
    onLogout,
}) => {
  return (
    <header className="h-12 shrink-0 flex items-center justify-between px-3.5 border-b border-white/10 bg-[#0e051f]/95 backdrop-blur-xl text-white">
        <div className="flex items-center gap-2.5">
            <button onClick={onBack} title="Back to dashboard" className='p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-white/10 cursor-pointer transition'>
                <ArrowLeftIcon size={16} />
            </button>
            <img src="/logo.svg" alt="Stackyn-AI" className="size-6 shrink-0 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
            <span className="text-sm font-semibold truncate text-white max-w-38 md:max-w-56 tracking-tight">{projectName}</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-200 border border-purple-400/30 font-medium">v{version}</span>
        </div>

        <div className="flex items-center gap-2">
            <button onClick={onToggleShowCode}
            className={`inline-flex items-center justify-center gap-1.5 py-1.5 px-3 border border-white/15 text-zinc-200 hover:bg-white/10 hover:text-white text-xs font-medium rounded-lg cursor-pointer bg-white/5 backdrop-blur-sm transition ${showCode ? "bg-purple-600/30 border-purple-400/50 text-purple-200 shadow-sm shadow-purple-500/20" : ""}`}>
                {showCode ? (
                    <>
                    <EyeIcon size={13} className="text-purple-300"/> Preview
                    </>
                ) : (
                    <>
                    <Code2Icon size={13} className="text-purple-300"/> Code
                    </>
                )}
            </button>

            <button onClick={onOpenPreview}
            className='inline-flex items-center justify-center gap-1.5 py-1.5 px-3 border border-white/15 text-zinc-200 hover:bg-white/10 hover:text-white text-xs font-medium rounded-lg cursor-pointer bg-white/5 backdrop-blur-sm transition'>
                <ExternalLinkIcon size={13} /> Open Preview
            </button>

            <button onClick={onPublish} disabled={publishing} 
            className='inline-flex items-center justify-center gap-1.5 py-1.5 px-3 border border-purple-400/30 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-medium rounded-lg cursor-pointer transition shadow-md shadow-purple-500/25'>
                {publishing ? <Loader2Icon size={13} className="animate-spin"/> : <GlobeIcon size={13}/>} Publish
            </button>

            <button onClick={onDownload}
            className='inline-flex items-center justify-center gap-1.5 py-1.5 px-3 border border-white/15 text-zinc-200 hover:bg-white/10 hover:text-white text-xs font-medium rounded-lg cursor-pointer bg-white/5 backdrop-blur-sm transition'>
                <DownloadIcon size={13} /> Export
            </button>

            <button onClick={onLogout}
            className='inline-flex items-center justify-center gap-1.5 py-1.5 px-3 border border-white/15 text-zinc-300 hover:bg-white/10 hover:text-white text-xs font-medium rounded-lg cursor-pointer bg-white/5 backdrop-blur-sm transition'>
                Sign out
            </button>
        </div>
    </header>
  )
}

export default BuilderHeader