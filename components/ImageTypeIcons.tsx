'use client'
const items = [
  { title: 'Photos', seed: 'photos' },
  { title: 'Vectors', seed: 'vectors' },
  { title: 'Illustrations', seed: 'illustrations' },
  { title: 'AI Image Generator', seed: 'ai' },
]

export default function ImageTypeIcons() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Explore images that ignite your creativity</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {items.map((it) => (
          <div key={it.title} className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 rounded-lg overflow-hidden border border-white/10">
              <img src={`https://picsum.photos/seed/icon-${it.seed}/128/128`} alt={it.title} className="w-full h-full object-cover" />
            </div>
            <div className="text-sm font-medium">{it.title}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
