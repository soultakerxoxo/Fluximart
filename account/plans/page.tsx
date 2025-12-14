import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function PlansPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) redirect('/signin')

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Plans</h1>
      <div className="rounded-md border border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="p-4 border-b md:border-b-0 md:border-r border-white/10">
            <div className="text-sm text-white/60">Your plan</div>
          </div>
          <div className="md:col-span-2 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-sm text-white/70">Status</div>
              <div className="text-sm">Free</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm text-white/70">Renews</div>
              <div className="text-sm">—</div>
            </div>
            <div>
              <a href="/pricing" className="px-4 py-2 rounded-md bg-brand text-black">Upgrade plan</a>
            </div>
          </div>
        </div>
      </div>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm text-white/70">GenAI subscription</div>
          <div className="text-2xl font-semibold mt-1">US$16 <span className="text-sm font-normal">/month</span></div>
          <ul className="mt-3 space-y-2 text-sm">
            <li>100 generations per month</li>
            <li>Access leading AI models</li>
            <li>Model recommendations</li>
            <li>Single seat</li>
          </ul>
          <a href="/pricing" className="mt-4 inline-block px-4 py-2 rounded-md bg-brand text-black">Choose GenAI</a>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm text-white/70">Unlimited downloads subscription</div>
          <div className="text-2xl font-semibold mt-1">US$69 <span className="text-sm font-normal">/month</span></div>
          <ul className="mt-3 space-y-2 text-sm">
            <li>Unlimited library downloads</li>
            <li>80+ million assets</li>
            <li>Single seat</li>
          </ul>
          <a href="/pricing" className="mt-4 inline-block px-4 py-2 rounded-md bg-brand text-black">Choose Unlimited</a>
        </div>
      </section>
    </div>
  )
}
