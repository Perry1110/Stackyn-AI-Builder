import React, { useEffect, useRef, useState } from 'react'
import {ArrowRightIcon, CloudUploadIcon, Loader2Icon, MicIcon} from 'lucide-react'

const PromptInput = ({onSubmit, loading = false, placeholder = "Describe the website you want to build...", large = false, autoFocus = false, variant = "default"}) => {

    const [value, setValue] = useState("");
    const textareaRef = useRef(null)

    useEffect(()=>{
        if(autoFocus && textareaRef.current){
            textareaRef.current.focus();
        }
    },[autoFocus])

    const handleSubmit = (e)=>{
        if(e) e.preventDefault()
        const trimmed = value.trim()
        if(!trimmed || loading) return;
        onSubmit(trimmed)
        setValue("")
    }

    const handleKeyDown = (e)=>{
        if(e.key === "Enter" &&  !e.shiftKey){
            e.preventDefault();
            handleSubmit()
        }
    }

if(variant === "glass"){
    return (
        <form onSubmit={handleSubmit} className='max-w-2xl w-full bg-white/10 backdrop-blur-xl rounded-xl ring-1 ring-white/25 focus-within:ring-2 focus-within:ring-white/30 overflow-hidden mt-6 transition'>

            <textarea ref={textareaRef} value={value} onChange={(e)=>setValue(e.target.value)} onKeyDown={handleKeyDown} placeholder={placeholder} disabled={loading}
                rows={3} className='w-full p-4 pb-2 resize-none placeholder:text-white/60 outline-none bg-transparent text-white text-base'/>

            <div className='flex items-center justify-between pb-3 px-3 gap-2'>
                <label htmlFor="file" className="border border-white/20 text-white/80 hover:text-white hover:border-white/30 p-1.5 rounded-md cursor-pointer flex items-center justify-center">
                    <input type="file" id='file' hidden/>
                    <CloudUploadIcon size={18}/>
                </label>
                <div className='flex items-center justify-end gap-2'>
                    <button type='button' className="flex items-center justify-center p-1 text-white/70 hover:text-white cursor-pointer">
                        <MicIcon size={18}/>
                    </button>

                    <button type='submit' 
                    disabled={!value.trim() || loading}
                    className="flex items-center justify-center p-1.5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-500 hover:to-indigo-500 disabled:opacity-40 cursor-pointer shadow-md shadow-violet-500/25 transition">
                        {loading ? <Loader2Icon size={18} className="animate-spin"/> : <ArrowRightIcon size={18}/>}
                    </button>
                </div>
            </div>

        </form>
    )
}

  return (
    <div className={`bg-black/50 border border-white/15 rounded-xl flex items-end gap-2 focus-within:ring-1 focus-within:ring-purple-400/50 focus-within:border-purple-400/60 transition shadow-inner ${large ? "p-4" : "p-2.5"}`}>

        <textarea ref={textareaRef} 
        value={value} 
        onChange={(e)=>setValue(e.target.value)} 
        onKeyDown={handleKeyDown} 
        placeholder={placeholder} 
        disabled={loading}
        rows={large ? 5 : 1} 
        className={`flex-1 bg-transparent border-none outline-none resize-none text-white placeholder:text-zinc-500 ${large ? "text-base" : "text-xs"}`}/>

        <button
        onClick={()=> handleSubmit()}
        disabled={!value.trim() || loading}
        className='inline-flex items-center justify-center bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-500 hover:to-indigo-500 disabled:opacity-30 cursor-pointer rounded-full shrink-0 shadow-sm shadow-purple-500/25 transition'
        style={{
            width: large ? 36 : 26,
             height: large ? 36 : 26,
        }}>
            {loading ? <Loader2Icon size={large ? 20 : 14} className="animate-spin"/> : <ArrowRightIcon size={large ? 20 : 14}/>}
        </button>
    </div>
  )
}

export default PromptInput