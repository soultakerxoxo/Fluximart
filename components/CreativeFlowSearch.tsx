export default function CreativeFlowSearch() {
  return (
    <section className="space-y-3">
      <div className="text-sm text-white/70">shutterstock creative flow</div>
      <div className="text-2xl font-semibold">Effective design made easy</div>
      <div className="text-white/70">Make images like a pro with Create, our powerful design and photo editing tools.</div>
      <div className="flex items-center gap-2 max-w-xl">
        <input className="flex-1 px-4 py-2 rounded-md bg-white/10 border border-white/20" placeholder="What are you creating today?" />
        <button className="px-4 py-2 rounded-md bg-brand text-black">Search</button>
      </div>
    </section>
  )
}
