'use client'
import { useEffect } from 'react'

type Props = {
  open: boolean
  onClose: () => void
}

export default function SettingsSupportDrawer({ open, onClose }: Props) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])
  return (
    <div className={`${open ? 'fixed' : 'hidden'} inset-0 z-50`}>
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute right-4 top-4 bottom-4 w-[360px] rounded-2xl bg-white/5 border border-white/10 backdrop-blur p-4 overflow-auto">
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold">Settings & Support</div>
          <button onClick={onClose} className="px-2 py-1 rounded-md border border-white/20">✕</button>
        </div>
        <div className="mt-4 space-y-2">
          <a href="/account/profile/edit" className="block px-3 py-2 rounded-md hover:bg-white/10">Settings</a>
          <a href="#" className="block px-3 py-2 rounded-md hover:bg-white/10">Refine your recommendations</a>
          <a href="#" className="block px-3 py-2 rounded-md hover:bg-white/10">Link to Pinterest</a>
          <a href="#" className="block px-3 py-2 rounded-md hover:bg-white/10">Reports and violations center</a>
          <a href="#" className="block px-3 py-2 rounded-md hover:bg-white/10">Install the Windows app</a>
          <a href="#" className="block px-3 py-2 rounded-md hover:bg-white/10">Be a beta tester ↗</a>
        </div>
        <div className="mt-6 text-sm text-white/60">Support</div>
        <div className="mt-2 space-y-2">
          <a href="/support" className="block px-3 py-2 rounded-md hover:bg-white/10">Help center ↗</a>
          <a href="#" className="block px-3 py-2 rounded-md hover:bg-white/10">Create widget ↗</a>
          <a href="#" className="block px-3 py-2 rounded-md hover:bg-white/10">Removals ↗</a>
          <a href="#" className="block px-3 py-2 rounded-md hover:bg-white/10">Personalized Ads</a>
          <a href="#" className="block px-3 py-2 rounded-md hover:bg-white/10">Your privacy rights</a>
          <a href="#" className="block px-3 py-2 rounded-md hover:bg-white/10">Privacy policy ↗</a>
          <a href="#" className="block px-3 py-2 rounded-md hover:bg-white/10">Terms of service ↗</a>
        </div>
        <div className="mt-6 text-sm text-white/60">Resources</div>
        <div className="mt-2 space-y-1 text-sm">
          <a href="#" className="px-3 py-1 rounded-md hover:bg-white/10">About</a>
          <a href="#" className="px-3 py-1 rounded-md hover:bg-white/10">Blog</a>
          <a href="#" className="px-3 py-1 rounded-md hover:bg-white/10">Businesses</a>
          <a href="#" className="px-3 py-1 rounded-md hover:bg-white/10">Careers</a>
          <a href="/developers" className="px-3 py-1 rounded-md hover:bg-white/10">Developers</a>
        </div>
      </div>
    </div>
  )
}
