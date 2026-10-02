import React, { useState, useEffect, useRef } from 'react'
import { 
  UserIcon, 
  MailIcon, 
  CalendarIcon, 
  SparklesIcon, 
  CameraIcon, 
  Trash2Icon, 
  UploadIcon, 
  LogOutIcon, 
  ChevronDownIcon, 
  XIcon, 
  CheckCircle2Icon,
  LayersIcon,
  ShieldCheckIcon
} from 'lucide-react'
import moment from 'moment'
import toast from 'react-hot-toast'

const UserProfileMenu = ({ user, projects = [], onLogout, onOpenSubscription, selectedPlan = 'pro' }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [profilePhoto, setProfilePhoto] = useState('')
  const menuRef = useRef(null)
  const fileInputRef = useRef(null)

  // Get unique localStorage key per user
  const getAvatarKey = (u) => {
    if (u?._id) return `stackyn_avatar_${u._id}`
    if (u?.email) return `stackyn_avatar_${u.email.replace(/[^a-zA-Z0-9]/g, '_')}`
    return 'stackyn_avatar_default'
  }

  // Load avatar from localStorage
  const loadAvatar = () => {
    const key = getAvatarKey(user)
    const saved = localStorage.getItem(key) || localStorage.getItem('stackyn_profile_avatar') || ''
    setProfilePhoto(saved)
  }

  useEffect(() => {
    loadAvatar()

    const handlePhotoUpdated = () => loadAvatar()
    window.addEventListener('profile-photo-updated', handlePhotoUpdated)
    window.addEventListener('storage', handlePhotoUpdated)

    return () => {
      window.removeEventListener('profile-photo-updated', handlePhotoUpdated)
      window.removeEventListener('storage', handlePhotoUpdated)
    }
  }, [user?._id, user?.email])

  // Handle click outside to close popup
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  // Handle profile image file selection
  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file (PNG, JPG, WebP)')
      return
    }

    // Safety check for localStorage (max ~3MB)
    if (file.size > 3 * 1024 * 1024) {
      toast.error('Image size must be under 3MB')
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      const base64 = event.target.result
      try {
        const key = getAvatarKey(user)
        localStorage.setItem(key, base64)
        // Also save to generic key as backup
        localStorage.setItem('stackyn_profile_avatar', base64)
        setProfilePhoto(base64)
        window.dispatchEvent(new Event('profile-photo-updated'))
        toast.success('Profile photo updated!', {
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
      } catch (err) {
        toast.error('Unable to save photo to local storage')
      }
    }
    reader.readAsDataURL(file)
    // Clear input so selecting the same file again triggers change
    e.target.value = ''
  }

  // Handle removing custom profile photo
  const handleRemovePhoto = () => {
    const key = getAvatarKey(user)
    localStorage.removeItem(key)
    localStorage.removeItem('stackyn_profile_avatar')
    setProfilePhoto('')
    window.dispatchEvent(new Event('profile-photo-updated'))
    toast.success('Profile photo removed. Using initial.', {
      style: {
        background: '#130726',
        color: '#fff',
        border: '1px solid rgba(168, 85, 247, 0.4)'
      }
    })
  }

  const firstLetter = user?.name?.[0]?.toUpperCase() || 'U'
  const memberSince = user?.createdAt 
    ? moment(user.createdAt).format('MMMM YYYY') 
    : 'October 2026'

  return (
    <div className="relative inline-block" ref={menuRef}>
      {/* Hidden File Input for Avatar Upload */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        className="hidden" 
      />

      {/* Trigger Pill */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        title="View account details"
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border backdrop-blur-sm shadow-sm transition-all duration-200 select-none cursor-pointer ${
          isOpen
            ? 'bg-purple-900/60 border-purple-400/70 ring-2 ring-purple-400/40 shadow-lg shadow-purple-950/80 scale-[1.02]'
            : 'bg-purple-950/40 border-purple-500/30 hover:bg-purple-900/40 hover:border-purple-400/50 ring-1 ring-purple-500/20'
        }`}
      >
        {/* Profile Avatar / Initial */}
        {profilePhoto ? (
          <img 
            src={profilePhoto} 
            alt={user?.name || 'User avatar'} 
            className="size-5 sm:size-5.5 rounded-full object-cover ring-1 ring-purple-400/60 shadow-sm"
          />
        ) : (
          <span className="size-5 sm:size-5.5 rounded-full bg-gradient-to-tr from-purple-500 via-fuchsia-500 to-indigo-500 text-white text-[11px] font-bold flex items-center justify-center shadow-sm">
            {firstLetter}
          </span>
        )}

        {/* User Name */}
        <span className="text-xs font-medium text-purple-100 max-w-[130px] sm:max-w-[180px] truncate">
          {user?.name || 'My Account'}
        </span>

        {/* Dropdown Chevron */}
        <ChevronDownIcon 
          size={13} 
          className={`text-purple-300/80 transition-transform duration-200 ${isOpen ? 'rotate-180 text-purple-200' : ''}`} 
        />
      </button>

      {/* Account Details Popup Modal */}
      {isOpen && (
        <div 
          role="dialog"
          aria-label="User Account Details"
          className="absolute right-0 top-full mt-3 w-80 sm:w-88 max-w-[92vw] bg-[#0d051c]/95 backdrop-blur-2xl border border-purple-500/40 rounded-3xl p-5 text-white shadow-2xl shadow-purple-950/95 ring-1 ring-purple-400/30 z-50 animate-in fade-in zoom-in-95 duration-200"
        >
          {/* Top ambient glow */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-20 bg-purple-600/30 blur-3xl pointer-events-none rounded-full"></div>

          {/* Header Bar */}
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-purple-500/20">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-purple-200">
              <UserIcon size={14} className="text-purple-400" />
              <span>Account Details</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
              title="Close"
            >
              <XIcon size={14} />
            </button>
          </div>

          {/* Avatar Section with Hover & Action Buttons */}
          <div className="flex flex-col items-center text-center mb-4">
            <div className="relative group mb-2.5">
              {/* Outer Glow Ring */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 opacity-60 group-hover:opacity-100 blur-sm transition-opacity"></div>
              
              {/* Circular Avatar */}
              <div className="relative size-20 rounded-full overflow-hidden border-2 border-purple-300/50 bg-[#160a2c] flex items-center justify-center shadow-xl shadow-purple-950/80">
                {profilePhoto ? (
                  <img 
                    src={profilePhoto} 
                    alt={user?.name || 'User Profile'} 
                    className="size-full object-cover" 
                  />
                ) : (
                  <span className="size-full bg-gradient-to-tr from-purple-600 via-fuchsia-600 to-indigo-600 text-white text-3xl font-extrabold flex items-center justify-center">
                    {firstLetter}
                  </span>
                )}

                {/* Hover overlay to change photo */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 bg-black/65 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[10px] font-semibold cursor-pointer gap-0.5"
                  title="Upload profile photo"
                >
                  <CameraIcon size={18} className="text-purple-300 animate-pulse" />
                  <span>Change</span>
                </button>
              </div>
            </div>

            {/* Photo Action Buttons */}
            <div className="flex items-center gap-2 mb-3">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-600/25 hover:bg-purple-600/40 border border-purple-400/40 text-purple-200 hover:text-white text-[11px] font-medium transition cursor-pointer shadow-sm active:scale-95"
              >
                <UploadIcon size={11} />
                <span>{profilePhoto ? 'Change Photo' : 'Add Photo'}</span>
              </button>

              {profilePhoto && (
                <button
                  onClick={handleRemovePhoto}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-950/40 hover:bg-red-900/50 border border-red-500/30 text-red-300 hover:text-red-200 text-[11px] font-medium transition cursor-pointer active:scale-95"
                  title="Remove custom photo and use first letter"
                >
                  <Trash2Icon size={11} />
                  <span>Remove</span>
                </button>
              )}
            </div>

            {/* User Name & Email */}
            <h3 className="text-base font-bold text-white tracking-tight leading-snug">
              {user?.name || 'Stackyn Creator'}
            </h3>
            <p className="text-xs text-zinc-300/80 flex items-center gap-1.5 mt-0.5">
              <MailIcon size={12} className="text-purple-400 shrink-0" />
              <span className="truncate max-w-[220px]">{user?.email || 'user@stackyn.ai'}</span>
            </p>

            {/* Subscription Tier Pill */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/40 text-[11px] font-semibold text-purple-200 mt-2.5 shadow-sm">
              <SparklesIcon size={11} className="text-yellow-400" />
              <span>
                {user?.subscription?.plan === 'studio'
                  ? 'Studio Agency Plan'
                  : user?.subscription?.plan === 'pro'
                    ? 'Pro Creator Plan'
                    : selectedPlan === 'studio'
                      ? 'Studio Agency Plan'
                      : selectedPlan === 'pro'
                        ? 'Pro Creator Plan'
                        : 'Starter Free Plan'}
              </span>
            </div>
          </div>

          {/* Account Overview Grid */}
          <div className="grid grid-cols-2 gap-2 mb-4 p-3 rounded-2xl bg-white/[0.03] border border-purple-500/20 text-xs">
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 flex items-center gap-1">
                <LayersIcon size={11} className="text-purple-400" />
                Projects
              </span>
              <span className="text-sm font-bold text-white">
                {projects?.length || 0} Built
              </span>
            </div>

            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 flex items-center gap-1">
                <CalendarIcon size={11} className="text-purple-400" />
                Joined
              </span>
              <span className="text-xs font-semibold text-zinc-200 truncate" title={memberSince}>
                {memberSince}
              </span>
            </div>
          </div>

          {/* Account Status Strip */}
          <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-purple-950/30 border border-purple-500/20 text-[11px] mb-4">
            <div className="flex items-center gap-2 text-zinc-300">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Account Status</span>
            </div>
            <span className="text-emerald-300 font-semibold flex items-center gap-1">
              <CheckCircle2Icon size={11} /> Verified
            </span>
          </div>

          {/* Footer Action Buttons */}
          <div className="space-y-2 pt-2 border-t border-purple-500/20">
            {onOpenSubscription && (
              <button
                onClick={() => {
                  setIsOpen(false)
                  onOpenSubscription()
                }}
                className="w-full py-2 px-4 rounded-xl bg-gradient-to-r from-purple-600/30 to-indigo-600/30 hover:from-purple-600/50 hover:to-indigo-600/50 border border-purple-400/40 text-purple-100 hover:text-white text-xs font-semibold transition cursor-pointer flex items-center justify-center gap-2 shadow-sm"
              >
                <SparklesIcon size={13} className="text-yellow-300" />
                <span>Manage Subscription & Plans</span>
              </button>
            )}

            {onLogout && (
              <button
                onClick={() => {
                  setIsOpen(false)
                  onLogout()
                }}
                className="w-full py-2 px-4 rounded-xl bg-white/[0.04] hover:bg-red-500/20 border border-white/10 hover:border-red-500/40 text-zinc-300 hover:text-red-200 text-xs font-semibold transition cursor-pointer flex items-center justify-center gap-2 active:scale-95"
              >
                <LogOutIcon size={13} />
                <span>Sign out</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default UserProfileMenu
