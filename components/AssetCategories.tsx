const cats = [
  { title: 'Images', count: '70M+', bg: 'from-green-500 to-blue-500' },
  { title: 'Photos', count: '50M+', bg: 'from-purple-500 to-pink-500' },
  { title: 'Vectors', count: '16M+', bg: 'from-yellow-400 to-orange-500' },
  { title: 'Illustrations', count: '20M+', bg: 'from-blue-300 to-indigo-500' },
]

export default function AssetCategories() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {cats.map((c) => (
        <div key={c.title} className="rounded-xl overflow-hidden border border-white/10">
          <div className={`h-48 bg-gradient-to-br ${c.bg}`} />
          <div className="p-4">
            <div className="text-lg font-semibold">{c.title}</div>
            <div className="text-white/70">{c.count}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
