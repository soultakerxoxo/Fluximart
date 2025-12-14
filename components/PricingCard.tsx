export default function PricingCard() {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6 max-w-sm">
      <div className="text-xl font-semibold mb-2">Unlimited downloads subscription</div>
      <div className="text-white/70 text-sm mb-4">
        For creatives who need unlimited downloads of a variety of assets.
      </div>
      <ul className="space-y-2 text-sm">
        <li>80+ million of our best images, video and music</li>
        <li>Unlimited royalty-free downloads</li>
        <li>100 AI generations per month</li>
        <li>Access to leading AI models</li>
        <li>Single seat</li>
      </ul>
      <div className="mt-6 text-3xl font-bold">US$99 <span className="text-base font-medium">/month</span></div>
      <div className="text-white/60 text-xs mt-1">paid monthly</div>
      <a href="/marketplace" className="mt-4 block w-full text-center px-4 py-2 rounded-md bg-brand text-black">
        Access Unlimited Now
      </a>
      <div className="text-xs text-white/60 mt-3">
        Fair use policy and cancellation fee apply.
      </div>
    </div>
  )
}
