const items = [
  'paints',
  'birth flower puzzle',
  'personalized gifts for him',
  'knitted giraffe neck scarf',
  'pottery kit',
  'plane toy',
]

export default function RelatedSearches() {
  return (
    <section className="space-y-3">
      <div className="text-xl font-semibold text-center">Related searches</div>
      <div className="flex flex-wrap justify-center gap-6">
        {items.map((it, i) => (
          <a key={it} href="#" className="flex flex-col items-center gap-2">
            <div className="h-16 w-16 rounded-full overflow-hidden border border-white/10">
              <img src={`https://picsum.photos/seed/rel-${i}/300/300`} alt={it} className="w-full h-full object-cover" />
            </div>
            <div className="text-sm">{it}</div>
          </a>
        ))}
      </div>
    </section>
  )
}
