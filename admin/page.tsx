import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'

export default async function AdminPage() {
  const session = await getServerSession(authOptions)
  const email = session?.user?.email
  if (!email) redirect('/signin')
  if (!process.env.ADMIN_EMAIL || email !== process.env.ADMIN_EMAIL) redirect('/signin')

  const imagesCount = await prisma.image.count()
  const logsCount = await prisma.aIGenerationLog.count()
  const trendsCount = await prisma.trend.count()
  const user = await prisma.user.findUnique({ where: { email } })
  const settings = user ? await prisma.paymentSettings.findUnique({ where: { userId: user.id } }) : null
  const recentPurchases = await prisma.purchase.findMany({
    orderBy: { createdAt: 'desc' },
    take: 20,
  })
  const dailyCounts = Object.values(
    recentPurchases.reduce((acc: Record<string, number>, p) => {
      const d = new Date(p.createdAt)
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
      acc[key] = (acc[key] || 0) + 1
      return acc
    }, {})
  )

  async function saveSettings(formData: FormData) {
    'use server'
    const paypalEmail = String(formData.get('paypalEmail') || '')
    const cardNumber = String(formData.get('cardNumber') || '')
    const payoutPhone = String(formData.get('payoutPhone') || '')
    const last4 = cardNumber.replace(/\s+/g, '').slice(-4) || undefined
    const token = cardNumber ? 'demo-token' : undefined
    if (!user) return
    await prisma.paymentSettings.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        paypalEmail: paypalEmail || undefined,
        payoutCardLast4: last4,
        payoutCardToken: token,
        payoutPhone: payoutPhone || undefined,
      },
      update: {
        paypalEmail: paypalEmail || undefined,
        payoutCardLast4: last4,
        payoutCardToken: token,
        payoutPhone: payoutPhone || undefined,
      },
    })
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold">Admin AI Control Panel</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <div className="text-sm text-white/60">AI-generated Images</div>
          <div className="text-3xl font-bold mt-2">{imagesCount}</div>
        </div>
        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <div className="text-sm text-white/60">Generation Logs</div>
          <div className="text-3xl font-bold mt-2">{logsCount}</div>
        </div>
        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <div className="text-sm text-white/60">Trends Tracked</div>
          <div className="text-3xl font-bold mt-2">{trendsCount}</div>
        </div>
      </div>
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Social Auto-Posting</h2>
        <div className="flex items-center gap-3">
          <label className="text-sm">Enable auto-posting</label>
          <input type="checkbox" disabled />
        </div>
        <p className="text-white/60 text-sm">Connect accounts and configure posting schedule (coming soon).</p>
      </section>
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Payout & Notifications</h2>
        <form action={saveSettings} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm mb-1">PayPal Account</label>
            <input name="paypalEmail" defaultValue={settings?.paypalEmail || ''} className="w-full px-3 py-2 rounded bg-white/10 border border-white/20" placeholder="you@paypal.com" />
          </div>
          <div>
            <label className="block text-sm mb-1">Credit Card Number</label>
            <input name="cardNumber" className="w-full px-3 py-2 rounded bg-white/10 border border-white/20" placeholder="4111 1111 1111 1111" />
            <div className="text-xs text-white/50 mt-1">Stored as last 4 only</div>
          </div>
          <div>
            <label className="block text-sm mb-1">SMS Phone</label>
            <input name="payoutPhone" defaultValue={settings?.payoutPhone || ''} className="w-full px-3 py-2 rounded bg-white/10 border border-white/20" placeholder="+1234567890" />
          </div>
          <div className="md:col-span-3">
            <button className="px-5 py-2 bg-brand rounded-md">Save Settings</button>
          </div>
        </form>
      </section>
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">AI Suggestions</h2>
        <p className="text-white/60 text-sm">The AI will propose improvements here for approval.</p>
      </section>
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Sales Chart</h2>
        <div className="flex items-end gap-2 h-32">
          {dailyCounts.map((c, i) => (
            <div key={i} className="bg-brand/70 w-6" style={{ height: `${Math.min(100, c * 20)}%` }} />
          ))}
        </div>
        <p className="text-white/60 text-sm">Bars represent sales per day from recent activity.</p>
      </section>
    </div>
  )
}
