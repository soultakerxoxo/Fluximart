const cols = [
  { title: 'Furniture', src: 'https://picsum.photos/seed/col-furniture/800/600' },
  { title: 'Electronics', src: 'https://picsum.photos/seed/col-electronics/800/600' },
  { title: 'Decor', src: 'https://picsum.photos/seed/col-decor/800/600' },
  { title: 'Vehicles', src: 'https://picsum.photos/seed/col-vehicles/800/600' },
  { title: 'Food', src: 'https://picsum.photos/seed/col-food/800/600' },
  { title: 'Apparel', src: 'https://picsum.photos/seed/col-apparel/800/600' },
]

export default function Collections3D() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Explore collections of high‑quality 3D objects</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {cols.map((c) => (
          <div key={c.title} className="rounded-xl overflow-hidden border border-white/10 bg-white/5">
            <img src={c.src} alt={c.title} className="w-full h-36 object-cover" />
            <div className="p-3 font-medium">{c.title}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
