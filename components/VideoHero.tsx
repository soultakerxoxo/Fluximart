'use client'
import CategoryDropdown from './CategoryDropdown'

const chips = ['Merry Christmas', 'Cake', 'Money', 'Nature', 'Sunset']

export default function VideoHero() {
  return (
    <section className="relative rounded-2xl overflow-hidden border border-white/10">
      <div
        className="h-56 md:h-64 bg-center bg-cover"
        style={{ backgroundImage: 'url(https://picsum.photos/seed/video-hero/1600/600)' }}
      />
      <div className="absolute inset-0 p-4 md:p-8 flex flex-col items-center justify-center">
        <div className="text-3xl md:text-4xl font-bold text-center">Explore Royalty‑Free Stock Videos and Footage</div>
        <div className="text-white/80 text-center mt-2">License stunning stock videos in 4K & HD</div>
        <div className="mt-6 w-full max-w-4xl">
          <div className="flex items-center gap-2 rounded-xl bg-black/30 backdrop-blur px-3 py-2 border border-white/10">
            <div className="hidden sm:block">
              <CategoryDropdown />
            </div>
            <input className="flex-1 px-3 py-2 rounded bg-white/10 border border-white/20" placeholder="Search for videos" />
            <button className="px-4 py-2 rounded-md bg-brand text-black">Search</button>
            <button className="px-3 py-2 rounded-md border border-white/20">Search by image</button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2 justify-center">
            {chips.map((c) => (
              <a key={c} className="px-3 py-1 rounded-full bg-white/10 text-sm" href="#">{c}</a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
