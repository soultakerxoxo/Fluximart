'use client'
import { useRef } from 'react'

const sizes = [
  { title: 'Custom size', seed: 'size-custom' },
  { title: 'Facebook Page Cover', seed: 'size-fb-cover' },
  { title: 'Facebook Post', seed: 'size-fb-post' },
  { title: 'Instagram Post', seed: 'size-ig-post' },
  { title: 'Facebook Ad', seed: 'size-fb-ad' },
  { title: 'Twitter Post', seed: 'size-tw-post' },
  { title: 'Instagram Story', seed: 'size-ig-story' },
  { title: 'YouTube Thumbnail', seed: 'size-yt-thumb' },
  { title: 'YouTube Channel Art', seed: 'size-yt-channel' },
  { title: 'Presentation', seed: 'size-presentation' },
  { title: 'Business Card', seed: 'size-business-card' },
  { title: 'Poster', seed: 'size-poster' },
  { title: 'Logo', seed: 'size-logo' },
  { title: 'Flyer', seed: 'size-flyer' },
  { title: 'Brochure', seed: 'size-brochure' },
  { title: 'Invitation', seed: 'size-invitation' },
  { title: 'Greeting Card', seed: 'size-greeting' },
]

export default function CanvasSizesCarousel() {
  const ref = useRef<HTMLDivElement | null>(null)
  function scrollBy(dx: number) {
    const el = ref.current
    if (!el) return
    el.scrollBy({ left: dx, behavior: 'smooth' })
  }
  return (
    <section className="space-y-3">
      <div className="text-lg font-semibold">Start with a blank canvas</div>
      <div className="text-white/70 text-sm">Choose from popular sizes</div>
      <div className="relative">
        <button onClick={() => scrollBy(-400)} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 px-3 py-2 rounded-full bg-white/10">‹</button>
        <div ref={ref} className="flex gap-4 overflow-x-auto scroll-smooth px-8">
          {sizes.map((s) => (
            <div key={s.title} className="min-w-[180px] rounded-xl overflow-hidden border border-white/10 bg-white/5">
              <img src={`https://picsum.photos/seed/${s.seed}/800/600`} alt={s.title} className="w-full h-24 object-cover" />
              <div className="p-3 text-sm font-medium">{s.title}</div>
            </div>
          ))}
        </div>
        <button onClick={() => scrollBy(400)} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 px-3 py-2 rounded-full bg-white/10">›</button>
      </div>
    </section>
  )
}
