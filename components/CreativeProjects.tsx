const items = [
  {
    title: 'Images',
    desc: 'Access 70+ million royalty-free unrivaled photos, vectors, and illustrations.',
    src: 'https://picsum.photos/seed/images-section/800/500',
  },
  {
    title: 'Videos',
    desc: 'Explore cinema‑grade clips in 4K, HD, and SD for movies, television, and more.',
    src: 'https://picsum.photos/seed/videos-section/800/500',
  },
  {
    title: 'Music',
    desc: 'Discover fresh sounds, exclusive tracks, and immersive SFX from artists worldwide.',
    src: 'https://picsum.photos/seed/music-section/800/500',
  },
]

export default function CreativeProjects() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Everything you need for your creative projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((it) => (
          <div key={it.title} className="rounded-xl overflow-hidden border border-white/10 bg-white/5">
            <img src={it.src} alt={it.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <div className="font-semibold">{it.title}</div>
              <div className="text-white/70 text-sm mt-1">{it.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
