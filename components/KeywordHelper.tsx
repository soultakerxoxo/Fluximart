'use client'
import { useEffect, useMemo, useState } from 'react'

type Props = { textareaName?: string }

const stop = new Set([
  'a','an','the','and','or','of','in','with','for','to','on','by','from','at','as','is','are','be','this','that','these','those','it','its','into','over','under','about',
])

export default function KeywordHelper({ textareaName = 'prompt' }: Props) {
  const [text, setText] = useState('')
  useEffect(() => {
    const ta = document.querySelector<HTMLTextAreaElement>(`textarea[name="${textareaName}"]`)
    function update() {
      setText(ta?.value || '')
    }
    update()
    ta?.addEventListener('input', update)
    return () => ta?.removeEventListener('input', update)
  }, [textareaName])

  const keywords = useMemo(() => {
    const words = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, ' ')
      .split(/\s+/)
      .filter((w) => w && !stop.has(w) && w.length >= 4)
    const freq = new Map<string, number>()
    words.forEach((w) => freq.set(w, (freq.get(w) || 0) + 1))
    return Array.from(freq.entries())
      .sort((a, b) => b[1] - a[1] || b[0].localeCompare(a[0]))
      .slice(0, 15)
      .map(([w]) => w)
  }, [text])

  function applyKeywords() {
    const input = document.querySelector<HTMLInputElement>('input[name="keywords"]')
    if (!input) return
    input.value = keywords.join(', ')
    input.dispatchEvent(new Event('input', { bubbles: true }))
  }

  return (
    <section className="space-y-3">
      <div className="text-sm text-white/70">Keyword helper</div>
      <div className="flex flex-wrap gap-2">
        {keywords.map((k) => (
          <span key={k} className="px-2 py-1 rounded-md bg-white/10 text-xs">{k}</span>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <input name="keywords" placeholder="keywords" className="flex-1 px-3 py-2 rounded-md bg-white/10 border border-white/20" />
        <button onClick={applyKeywords} className="px-3 py-2 rounded-md bg-brand text-black">Use suggestions</button>
      </div>
    </section>
  )
}

