export default function SupportPage() {
  const cats = [
    { title: 'Account', desc: 'Management and instructions for users', count: 58 },
    { title: 'Licensing', desc: 'License options and terms', count: 124 },
    { title: 'Creative Tools', desc: 'Guides for Create and generators', count: 55 },
    { title: 'Legal Center', desc: 'Forms and policies', count: 2 },
  ]
  return (
    <div className="space-y-6">
      <div className="text-3xl font-semibold text-center">How can we help?</div>
      <div className="max-w-2xl mx-auto">
        <input className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20" placeholder="Search for articles..." />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cats.map((c) => (
          <div key={c.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="text-xl font-semibold">{c.title}</div>
            <div className="text-sm text-white/70">{c.desc}</div>
            <div className="text-xs text-white/50 mt-2">{c.count} articles</div>
          </div>
        ))}
      </div>
    </div>
  )
}
