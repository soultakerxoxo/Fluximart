export default function PricingPlans() {
  return (
    <section className="space-y-6">
      <div className="text-3xl font-bold">AI pricing plans: Unlock full access with AI Generations</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm text-white/70">GenAI subscription</div>
          <div className="text-2xl font-semibold mt-1">US$19 <span className="text-sm font-normal">/month</span></div>
          <ul className="mt-3 space-y-2 text-sm">
            <li>100 generations per month</li>
            <li>Access leading AI models</li>
            <li>Choose your model or use model recommendations</li>
            <li>Single seat</li>
          </ul>
          <a href="/signin" className="mt-4 inline-block px-4 py-2 rounded-md bg-brand text-black">Subscribe to GenAI</a>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm text-white/70">Unlimited downloads subscription</div>
          <div className="text-2xl font-semibold mt-1">US$199 <span className="text-sm font-normal">/month</span></div>
          <ul className="mt-3 space-y-2 text-sm">
            <li>Unlimited downloads from human‑created library</li>
            <li>80+ million of our best images, videos, and music</li>
            <li>Single seat</li>
          </ul>
          <a href="/signin" className="mt-4 inline-block px-4 py-2 rounded-md bg-brand text-black">Subscribe to Unlimited</a>
        </div>
      </div>
      <div className="text-sm text-white/70">Prices shown in US Dollars. Taxes may apply.</div>
      <div className="mt-4">
        <div className="text-sm text-white/70 mb-2">Use the world’s best AI models</div>
        <div className="flex flex-wrap gap-2">
          {['OpenAI', 'Google', 'Amazon', 'Runway', 'Databricks', 'Flux', 'Bria'].map((n) => (
            <div key={n} className="px-2 py-1 rounded-md bg-white/10 text-xs">{n}</div>
          ))}
        </div>
      </div>
    </section>
  )
}
