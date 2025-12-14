'use client'
import { useState } from 'react'
import SettingsSupportDrawer from './SettingsSupportDrawer'

export default function ActionRail() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div className="fixed right-4 top-24 z-40 flex flex-col items-center gap-6">
        <a href="/" className="h-10 w-10 rounded-full bg-red-600 text-white flex items-center justify-center">P</a>
        <a href="/" className="h-10 w-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">🏠</a>
        <a href="/marketplace" className="h-10 w-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">◻</a>
        <a href="/drops" className="h-10 w-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">＋</a>
        <button className="relative h-10 w-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
          🔔
          <span className="absolute -top-2 -right-2 text-xs px-2 py-0.5 rounded-full bg-red-600 text-white">99+</span>
        </button>
        <button onClick={() => setOpen(true)} className="h-10 w-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">💬</button>
      </div>
      <SettingsSupportDrawer open={open} onClose={() => setOpen(false)} />
    </>
  )
}
