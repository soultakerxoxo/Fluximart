'use client'
import { useRef } from 'react'

const cols = [
  { title: "November's New Releases", count: '25 Tracks', seed: 'col-nov' },
  { title: '2025 Chart Toppers', count: '20 Tracks', seed: 'col-2025' },
  { title: 'Christmas 2025 Updates', count: '20 Tracks', seed: 'col-xmas' },
  { title: 'Now Trending', count: '25 Tracks', seed: 'col-trending' },
]

export default function CollectionsCarousel() {
  const ref = useRef<HTMLDivElement | null>(null)
  function scrollBy(dx: number) {
    const el = ref.current
    if (!el) return
    el.scrollBy({ left: dx, behavior: 'smooth' })
  }
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Explore handpicked collections</h2>
        <a href="#" className="px-3 py-1 rounded-full border border-white/20">See all collections</a>
      </div>
      <div className="relative">
        <button onClick={() => scrollBy(-400)} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 px-3 py-2 rounded-full bg-white/10">‹</button>
        <div ref={ref} className="flex gap-4 overflow-x-auto scroll-smooth px-8">
          {cols.map((c) => (
            <div key={c.title} className="min-w-[240px] rounded-xl overflow-hidden border border-white/10">
              <img src={`https://picsum.photos/seed/${c.seed}/800/600`} alt={c.title} className="w-full h-36 object-cover" />
              <div className="p-3">
                <div className="font-semibold">{c.title}</div>
                <div className="text-white/70 text-sm">{c.count}</div>
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => scrollBy(400)} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 px-3 py-2 rounded-full bg-white/10">›</button>
      </div>
    </section>
  )
}
