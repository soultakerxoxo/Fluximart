import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) redirect('/signin')
  if (process.env.ADMIN_EMAIL && session.user.email === process.env.ADMIN_EMAIL) {
    redirect('/admin')
  }
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Your Account</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/favorites" className="p-4 rounded-lg bg-white/5 border border-white/10">
          <div className="text-sm text-white/60">Favorites</div>
          <div className="text-2xl font-bold mt-2">View</div>
        </Link>
        <Link href="/purchases" className="p-4 rounded-lg bg-white/5 border border-white/10">
          <div className="text-sm text-white/60">Purchases</div>
          <div className="text-2xl font-bold mt-2">View</div>
        </Link>
        <Link href="/support" className="p-4 rounded-lg bg-white/5 border border-white/10">
          <div className="text-sm text-white/60">Chat Support</div>
          <div className="text-2xl font-bold mt-2">Open</div>
        </Link>
      </div>
    </div>
  )
}
