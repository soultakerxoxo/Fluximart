const cats = [
  { title: "Women's t‑shirts", seed: 'wshirts' },
  { title: 'Tumblers and water glasses', seed: 'tumblers' },
  { title: 'Digital drawings and illustrations', seed: 'drawings' },
  { title: 'Signs', seed: 'signs' },
  { title: 'Gender‑neutral adult t‑shirts', seed: 'adultshirts' },
  { title: 'Statement rings', seed: 'rings' },
]

export default function LovedCategories() {
  return (
    <section className="space-y-3">
      <div className="text-xl font-semibold">Shop our most‑loved categories</div>
      <div className="flex gap-4 overflow-x-auto">
        {cats.map((c) => (
          <a key={c.title} href="#" className="min-w-[220px] rounded-xl overflow-hidden border border-white/10 bg-white/5">
            <img src={`https://picsum.photos/seed/loved-${c.seed}/900/600`} alt={c.title} className="w-full h-40 object-cover" />
            <div className="p-3 text-sm">{c.title}</div>
          </a>
        ))}
      </div>
    </section>
  )
}
