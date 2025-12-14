const cats = [
  { title: 'Abstract', seed: 'abstract' },
  { title: 'Animals | Wildlife', seed: 'animals' },
  { title: 'The arts', seed: 'arts' },
  { title: 'Backgrounds | Textures', seed: 'backgrounds' },
  { title: 'Beauty | Fashion', seed: 'beauty' },
  { title: 'Buildings | Landmarks', seed: 'buildings' },
  { title: 'Business | Finance', seed: 'business' },
  { title: 'Celebrities', seed: 'celebrities' },
  { title: 'Editorial', seed: 'editorial' },
  { title: 'Education', seed: 'education' },
  { title: 'Food and drink', seed: 'food' },
  { title: 'Healthcare / Medical', seed: 'health' },
]

export default function BrowseByCategory() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Browse by category to find your perfect visual</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {cats.map((c) => (
          <div key={c.title} className="rounded-xl overflow-hidden border border-white/10 bg-white/5">
            <img src={`https://picsum.photos/seed/cat-${c.seed}/900/600`} alt={c.title} className="w-full h-36 object-cover" />
            <div className="p-3 text-sm font-medium">{c.title}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
