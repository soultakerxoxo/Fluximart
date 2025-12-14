'use client'
import { useEffect, useMemo, useState } from 'react'

type Props = { textareaName?: string }

const banned = [
  'logo',
  'watermark',
  'brand',
  'nike',
  'apple',
  'adidas',
  'coca-cola',
  'instagram',
  'facebook',
  'tiktok',
  'youtube',
  'twitter',
  'snapchat',
  'mcdonalds',
]

const stop = new Set([
  'a','an','the','and','or','of','in','with','for','to','on','by','from','at','as','is','are','be','this','that','these','those','it','its','into','over','under','about',
])

export default function GuidelineGuard({ textareaName = 'prompt' }: Props) {
  const [text, setText] = useState('')
  const [hasCopySpace, setHasCopySpace] = useState(false)
  const [flags, setFlags] = useState<string[]>([])

  useEffect(() => {
    const ta = document.querySelector<HTMLTextAreaElement>(`textarea[name="${textareaName}"]`)
    function update() {
      const t = ta?.value || ''
      setText(t)
      const low = t.toLowerCase()
      const f: string[] = []
      banned.forEach((b) => {
        if (low.includes(b)) f.push(b)
      })
      if (t.trim().length < 20) f.push('too-short')
      if (!/concept|theme|copy space|minimal|brand-safe|professional/.test(low)) {
        setHasCopySpace(false)
      } else {
        setHasCopySpace(true)
      }
      setFlags(f)
    }
    update()
    ta?.addEventListener('input', update)
    return () => ta?.removeEventListener('input', update)
  }, [textareaName])

  const keywords = useMemo(() => {
    return Array.from(
      new Set(
        text
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, ' ')
          .split(/\s+/)
          .filter((w) => w && !stop.has(w) && w.length >= 4)
      )
    ).slice(0, 12)
  }, [text])

  function appendFix(s: string) {
    const ta = document.querySelector<HTMLTextAreaElement>(`textarea[name="${textareaName}"]`)
    if (!ta) return
    const next = `${ta.value.trim()}${ta.value.trim() ? ' ' : ''}${s}`.trim()
    ta.value = next
    ta.dispatchEvent(new Event('input', { bubbles: true }))
  }

  function applyKeywords() {
    const input = document.querySelector<HTMLInputElement>('input[name="keywords"]')
    if (!input) return
    input.value = keywords.join(', ')
    input.dispatchEvent(new Event('input', { bubbles: true }))
  }

  const pass = flags.length === 0

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold">Guidelines</div>
        <div className={`px-2 py-1 rounded-md text-sm ${pass ? 'bg-green-600/30' : 'bg-red-600/30'}`}>
          {pass ? 'Ready' : 'Needs attention'}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-2">
          <div className="text-sm font-medium">What not to include</div>
          <ul className="text-sm text-white/70 space-y-1">
            <li>Blurry or low‑quality</li>
            <li>Over‑edited effects</li>
            <li>Logos, watermarks, copyrighted brands</li>
            <li>Random scenes with no clear concept</li>
          </ul>
          {flags.length > 0 && (
            <div className="mt-2 text-sm text-red-400">Flagged: {flags.join(', ')}</div>
          )}
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-2">
          <div className="text-sm font-medium">How to sell more</div>
          <ul className="text-sm text-white/70 space-y-1">
            <li>Use concept‑based prompts</li>
            <li>Add strong keywords</li>
            <li>Leave empty space for text</li>
            <li>Follow trends: AI, remote work, diversity</li>
          </ul>
          <div className="mt-2 flex flex-wrap gap-2">
            <button onClick={() => appendFix('minimal brand‑safe composition with copy space')} className="px-3 py-1 rounded-md border border-white/20 text-sm">Add copy space</button>
            <button onClick={() => appendFix('professional editing, realistic lighting, natural textures')} className="px-3 py-1 rounded-md border border-white/20 text-sm">Professional edit</button>
            <button onClick={() => appendFix('concept: clear theme aligned to business use')} className="px-3 py-1 rounded-md border border-white/20 text-sm">Add concept</button>
          </div>
        </div>
      </div>
      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        <div className="text-sm font-medium mb-2">Suggested keywords</div>
        <div className="flex flex-wrap gap-2">
          {keywords.map((k) => (
            <span key={k} className="px-2 py-1 rounded-md bg-white/10 text-xs">{k}</span>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2">
          <input name="keywords" placeholder="keywords" className="flex-1 px-3 py-2 rounded-md bg-white/10 border border-white/20" />
          <button onClick={applyKeywords} className="px-3 py-2 rounded-md bg-brand text-black">Use suggestions</button>
        </div>
      </div>
    </section>
  )
}

