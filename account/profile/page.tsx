import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)
  const email = session?.user?.email
  if (!email) redirect('/signin')
  const user = await prisma.user.findUnique({ where: { email } })
  const name = session?.user?.name || email.split('@')[0]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Profile</h1>
        <a href="/account/profile/edit" className="px-3 py-2 rounded-md border border-white/20">Edit profile</a>
      </div>
      <section className="rounded-md border border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="p-4 border-b md:border-b-0 md:border-r border-white/10">
            <div className="text-sm text-white/60">User details</div>
          </div>
          <div className="md:col-span-2 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-sm text-white/70">Name</div>
              <div className="text-sm">{name}</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm text-white/70">User ID</div>
              <div className="text-sm">{user?.id || '—'}</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm text-white/70">Username</div>
              <div className="text-sm">{email}</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm text-white/70">Password</div>
              <div className="text-sm">••••••••</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm text-white/70">Email</div>
              <div className="text-sm">{email}</div>
            </div>
          </div>
        </div>
      </section>
      <section className="rounded-md border border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="p-4 border-b md:border-b-0 md:border-r border-white/10">
            <div className="text-sm text-white/60">Email Preferences</div>
          </div>
          <div className="md:col-span-2 p-4">
            <div className="flex items-center gap-3">
              <label className="text-sm">Subscribed to product updates</label>
              <input type="checkbox" defaultChecked />
            </div>
          </div>
        </div>
      </section>
      <section className="rounded-md border border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="p-4 border-b md:border-b-0 md:border-r border-white/10">
            <div className="text-sm text-white/60">Language Preference</div>
          </div>
          <div className="md:col-span-2 p-4">
            <select className="px-3 py-2 rounded bg-white/10 border border-white/20">
              <option>English</option>
              <option>Français</option>
              <option>Español</option>
            </select>
          </div>
        </div>
      </section>
      <section className="rounded-md border border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="p-4 border-b md:border-b-0 md:border-r border-white/10">
            <div className="text-sm text-white/60">Display Preferences</div>
          </div>
          <div className="md:col-span-2 p-4 space-y-2">
            <label className="flex items-center gap-2 text-sm">
              <input type="radio" name="units" defaultChecked /> Centimeters
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="radio" name="units" /> Inches
            </label>
          </div>
        </div>
      </section>
      <section className="rounded-md border border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="p-4 border-b md:border-b-0 md:border-r border-white/10">
            <div className="text-sm text-white/60">Cookie Preferences</div>
          </div>
          <div className="md:col-span-2 p-4">
            <a href="#" className="px-4 py-2 rounded-md border border-white/20">Open the preference manager</a>
          </div>
        </div>
      </section>
      <section className="rounded-md border border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="p-4 border-b md:border-b-0 md:border-r border-white/10">
            <div className="text-sm text-white/60">Delete account</div>
          </div>
          <div className="md:col-span-2 p-4">
            <a href="#" className="text-red-400 text-sm">Delete my account</a>
          </div>
        </div>
      </section>
    </div>
  )
}
