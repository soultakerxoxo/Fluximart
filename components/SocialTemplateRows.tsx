'use client'
import { useRef } from 'react'

function Row({ title, seedPrefix, count }: { title: string; seedPrefix: string; count: number }) {
  const ref = useRef<HTMLDivElement | null>(null)
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="font-semibold">{title}</div>
        <a href="#" className="text-sm text-white/70">View all</a>
      </div>
      <div ref={ref} className="flex gap-3 overflow-x-auto scroll-smooth">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="min-w-[180px] rounded-xl overflow-hidden border border-white/10 bg-white/5">
            <img src={`https://picsum.photos/seed/${seedPrefix}-${i}/800/600`} alt={`${title} ${i}`} className="w-full h-24 object-cover" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function SocialTemplateRows() {
  return (
    <section className="space-y-6">
      <Row title="YouTube thumbnails" seedPrefix="yt" count={10} />
      <Row title="Instagram stories" seedPrefix="igs" count={12} />
      <Row title="Instagram posts" seedPrefix="igp" count={12} />
      <Row title="Facebook covers" seedPrefix="fbc" count={10} />
    </section>
  )
}
