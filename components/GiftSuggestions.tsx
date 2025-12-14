function Section({ title, items }: { title: string; items: { title: string; seed: string }[] }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center">👤</div>
          <div className="font-medium">{title}</div>
        </div>
        <a href="#" className="text-sm text-white/70">Shop all →</a>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {items.map((it) => (
          <a key={it.title} href="#" className="rounded-md overflow-hidden border border-white/10 bg-white/5">
            <img src={`https://picsum.photos/seed/gs-${it.seed}/900/600`} alt={it.title} className="w-full h-32 object-cover" />
            <div className="p-2 text-sm">{it.title}</div>
          </a>
        ))}
      </div>
    </div>
  )
}

export default function GiftSuggestions() {
  return (
    <section className="space-y-6">
      <Section
        title="For your Parent"
        items={[
          { title: 'Birthstone Rings', seed: 'rings' },
          { title: 'Handmade Bath Products', seed: 'bath' },
          { title: 'Spa Gift Sets', seed: 'spa' },
          { title: 'Engraved Barware', seed: 'bar' },
          { title: 'Dad and Kid Matching Clothing', seed: 'dadkid' },
        ]}
      />
      <Section
        title="For your Teacher"
        items={[
          { title: 'Custom Clipboards', seed: 'clip' },
          { title: 'Custom Sports Team Gear', seed: 'sports' },
          { title: 'Motivational Quote Prints', seed: 'prints' },
          { title: 'Personalized Teacher Mugs', seed: 'mugs' },
          { title: 'Personalized Stamps', seed: 'stamps' },
        ]}
      />
      <div className="space-y-2">
        <div className="text-white/70 text-sm">Other special people to shop for</div>
        <div className="flex flex-wrap gap-2">
          {['Sibling', 'Coworker', 'Friend', 'Partner', 'Grandparent', 'Kids'].map((t) => (
            <a key={t} href="#" className="px-3 py-1 rounded-lg border border-white/20 bg-white/5">{t}</a>
          ))}
        </div>
      </div>
    </section>
  )
}
