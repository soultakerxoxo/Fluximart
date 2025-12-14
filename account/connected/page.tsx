import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function ConnectedAccountsPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) redirect('/signin')

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Connected Accounts</h1>
      <section className="rounded-md border border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="p-4 border-b md:border-b-0 md:border-r border-white/10">
            <div className="text-sm text-white/60">Connect apps to Fluximart</div>
          </div>
          <div className="md:col-span-2 p-4 space-y-3">
            {[
              { name: 'Facebook', icon: '📘' },
              { name: 'Instagram', icon: '📸' },
              { name: 'TikTok', icon: '🎵' },
            ].map((a) => (
              <div key={a.name} className="flex items-center justify-between rounded-md border border-white/10 p-3">
                <div className="flex items-center gap-3">
                  <div className="text-xl">{a.icon}</div>
                  <div className="text-sm">{a.name}</div>
                </div>
                <button className="px-3 py-1 rounded-md border border-white/20">Connect</button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
