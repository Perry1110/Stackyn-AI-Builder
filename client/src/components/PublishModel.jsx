import { XIcon, GlobeIcon } from 'lucide-react';
import React from 'react'
import toast from 'react-hot-toast';

const PublishModel = ({ publishUrl, onClose }) => {
    const handleCopyLink = () =>{
        if(!publishUrl) return;
        navigator.clipboard.writeText(publishUrl);
        toast.success("Public link copied to clipboard!")
    }
  return (
    <div className="absolute inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
        <div className="bg-[#130726] border border-white/20 shadow-2xl shadow-purple-950/80 rounded-2xl max-w-md w-full p-6 relative text-white">
            <button onClick={onClose} className='absolute top-4 right-4 text-zinc-400 hover:text-white cursor-pointer p-1 rounded-md hover:bg-white/10 transition'>
                <XIcon size={16}/>
            </button>

            <div className="flex items-center gap-3 mb-5">
                <div className="size-10 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300">
                    <GlobeIcon size={20} />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-white">Your website is live!</h3>
                    <p className="text-xs text-zinc-300">Anyone with this link can view your published site.</p>
                </div>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-[10px] font-semibold text-zinc-300 uppercase tracking-widest mb-1.5">
                         Shareable Public URL
                    </label>
                    <input 
                        type="text" 
                        readOnly 
                        value={publishUrl} 
                        className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-white/15 text-xs sm:text-sm text-purple-200 font-mono outline-none select-all focus:border-purple-400 transition"/>
                </div>
                <div className="flex gap-2.5 pt-2">
                    <button 
                        onClick={handleCopyLink} 
                        className='flex-1 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-semibold cursor-pointer rounded-lg text-center transition shadow-md shadow-purple-500/25'>
                        Copy Link
                    </button>
                    <button 
                        onClick={()=> window.open(publishUrl, '_blank')}
                        className='flex-1 py-2.5 border border-white/20 text-zinc-200 hover:bg-white/10 hover:text-white text-xs font-semibold cursor-pointer rounded-lg text-center transition backdrop-blur-sm'>
                        Open Live Site
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PublishModel