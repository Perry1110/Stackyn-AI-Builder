import { BotIcon, BotMessageSquareIcon, UserIcon } from 'lucide-react'
import React, { useEffect, useRef } from 'react'
import PromptInput from './PromptInput'

const ChatPanel = ({messages, onSend, loading}) => {

    const bottomRef = useRef(null)

    useEffect(()=>{
        bottomRef.current?.scrollIntoView({behavior: "auto"})
    },[messages, loading])

  return (
    <div className="flex flex-col h-full bg-transparent text-white">
         {/* Messages */}
         <div className="flex-1 overflow-y-auto p-3 space-y-3.5 hide-scrollbar">
            {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full px-4 text-center">
                   <div className="size-10 rounded-xl bg-purple-500/10 border border-purple-400/20 flex items-center justify-center mb-2.5 text-purple-400">
                     <BotMessageSquareIcon size={18} />
                   </div>
                   <p className="text-zinc-400 text-xs font-medium">Ask AI to modify your website</p> 
                   <p className="text-zinc-500 text-[11px] mt-1">E.g. "Add a testimonials section with 3 customer reviews"</p>
                </div>
            )}

            {messages.map((msg, i)=>(
                <div key={i} className={`rounded-xl p-3 border transition-all ${
                    msg.role === "user" 
                      ? "bg-purple-950/40 border-purple-500/30 text-white" 
                      : "bg-white/[0.04] border-white/10 text-zinc-200"
                }`}>
                    <div className="flex gap-2.5 items-start">
                        <div className={`shrink-0 size-6 rounded-md flex items-center justify-center mt-0.5 ${
                            msg.role === "user" 
                              ? "bg-gradient-to-br from-violet-600 to-indigo-600 text-white" 
                              : "bg-white/10 border border-white/15 text-purple-300"
                        }`}>
                            {msg.role === "user" ? (
                                <UserIcon size={13}/>
                            ) : (
                                <BotMessageSquareIcon size={13}/>
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-[11px] font-semibold text-zinc-400 mb-1 uppercase tracking-wider">
                                {msg.role === "user" ? "You" : "Stackyn AI"}
                            </p>
                            <div className="text-[13px] text-zinc-200 leading-relaxed break-words">
                                {msg.content.split("- `/").map((text, idx)=>(
                                    <span key={idx} className={idx === 0 ? "block" : "block mt-1.5 font-mono text-[11px] text-purple-300 bg-purple-950/40 px-2 py-0.5 rounded border border-purple-500/20 inline-block"}>
                                        <span className={idx === 0 ? "hidden" : "text-purple-400 font-bold"}>- `/</span>
                                        {text}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {loading && (
                <div className="bg-white/[0.03] border border-white/10 rounded-xl p-3">
                    <div className="flex gap-2.5 items-start">
                        <div className="shrink-0 size-6 rounded-md flex items-center justify-center mt-0.5 bg-purple-500/20 border border-purple-400/30 text-purple-300">
                            <BotIcon size={13} className="animate-pulse" />
                        </div>
                        <div className='flex-1'>
                            <p className="text-[11px] font-semibold text-purple-300 mb-2 uppercase tracking-wider">AI is generating updates...</p>
                            <div className='dot-loader'>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div ref={bottomRef}/>
         </div>

         {/* Input */}
         <div className="p-3 border-t border-white/10 bg-[#0a0316]/60 backdrop-blur-md">
            <PromptInput onSubmit={onSend} loading={loading} placeholder='Ask AI to modify...' autoFocus/>
         </div>
    </div>
  )
}

export default ChatPanel