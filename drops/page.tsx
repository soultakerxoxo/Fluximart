export default function DropsPage() {
  const items = Array.from({ length: 15 }).map((_, i) => ({
    id: i + 1,
    preview_url: `https://picsum.photos/seed/drop-${i}/600/400`,
  }))
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Daily AI Drops</h1>
      <p className="text-white/70">Fresh 15 images generated daily by AI.</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((img) => (
          <div key={img.id} className="rounded-md overflow-hidden border border-white/10">
            <img src={img.preview_url} alt={`Drop ${img.id}`} className="w-full h-40 object-cover" />
          </div>
        ))}
      </div>
    </div>
  )
}
