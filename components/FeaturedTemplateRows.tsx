'use client'

function Row({ title, seedPrefix, count }: { title: string; seedPrefix: string; count: number }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="font-semibold">{title}</div>
        <a href="#" className="text-sm text-white/70">View all</a>
      </div>
      <div className="flex gap-3 overflow-x-auto scroll-smooth">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="min-w-[180px] rounded-xl overflow-hidden border border-white/10 bg-white/5">
            <img src={`https://picsum.photos/seed/${seedPrefix}-${i}/800/600`} alt={`${title} ${i}`} className="w-full h-24 object-cover" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function FeaturedTemplateRows() {
  return (
    <section className="space-y-6">
      <Row title="Featured templates" seedPrefix="ft" count={12} />
    </section>
  )
}
