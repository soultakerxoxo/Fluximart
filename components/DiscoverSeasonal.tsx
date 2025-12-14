const items = [
  { title: 'Best of Family Traditions', seed: 'family' },
  { title: 'Best of Cozy Finds', seed: 'cozy' },
  { title: 'Best of Holiday Decor', seed: 'decor' },
  { title: 'Top 100 Digital Downloads', seed: 'digital' },
  { title: 'Top 100 Gifts', seed: 'gifts' },
]

export default function DiscoverSeasonal() {
  return (
    <section className="space-y-3">
      <div className="text-xl font-semibold">Discover our best of fall/winter 2025</div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {items.map((it) => (
          <a key={it.title} href="#" className="rounded-xl overflow-hidden border border-white/10 bg-white/5">
            <img src={`https://picsum.photos/seed/season-${it.seed}/900/600`} alt={it.title} className="w-full h-32 object-cover" />
            <div className="p-2 text-sm text-center">{it.title}</div>
          </a>
        ))}
      </div>
    </section>
  )
}
