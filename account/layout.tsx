import { ReactNode } from 'react'
import Link from 'next/link'

export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <aside className="space-y-3 md:col-span-1">
        <div className="text-sm text-white/60">My Account</div>
        <nav className="flex flex-col gap-2">
          <Link href="/account/profile" className="px-3 py-2 rounded-md border border-white/10">Profile</Link>
          <Link href="/account/plans" className="px-3 py-2 rounded-md border border-white/10">Plans</Link>
          <Link href="/purchases" className="px-3 py-2 rounded-md border border-white/10">Purchase History</Link>
          <Link href="/account/connected" className="px-3 py-2 rounded-md border border-white/10">Connected Accounts</Link>
          <Link href="/developers" className="px-3 py-2 rounded-md border border-white/10">Developers</Link>
        </nav>
      </aside>
      <section className="md:col-span-3">{children}</section>
    </div>
  )
}
