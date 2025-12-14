import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

export default async function EditProfilePage() {
  const session = await getServerSession(authOptions)
  const email = session?.user?.email
  if (!email) redirect('/signin')
  const user = await prisma.user.findUnique({ where: { email } })

  async function save(formData: FormData) {
    'use server'
    const name = String(formData.get('firstName') || '').trim()
    const website = String(formData.get('website') || '').trim()
    const username = String(formData.get('username') || '').trim()
    if (email) {
      try {
        if (name) {
          await prisma.user.update({ where: { email }, data: { name } })
        }
      } catch {}
    }
    redirect('/account/profile')
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-semibold">Edit profile</div>
        <a href="/account/profile" className="px-3 py-2 rounded-md border border-white/20">Back</a>
      </div>
      <form action={save} className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-full bg-white/10 flex items-center justify-center text-xl">E</div>
          <button type="button" className="px-3 py-2 rounded-md border border-white/20">Change</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">First name</label>
            <input name="firstName" defaultValue={user?.name || ''} className="w-full px-3 py-2 rounded bg-white/10 border border-white/20" />
          </div>
          <div>
            <label className="block text-sm mb-1">Last name</label>
            <input name="lastName" className="w-full px-3 py-2 rounded bg-white/10 border border-white/20" />
          </div>
        </div>
        <div>
          <label className="block text-sm mb-1">About</label>
          <textarea name="about" rows={3} className="w-full px-3 py-2 rounded bg-white/10 border border-white/20" placeholder="Tell your story" />
        </div>
        <div>
          <label className="block text-sm mb-1">Pronouns</label>
          <select name="pronouns" className="w-full px-3 py-2 rounded bg-white/10 border border-white/20">
            <option value="">Add your pronouns</option>
            <option>she/her</option>
            <option>he/him</option>
            <option>they/them</option>
          </select>
        </div>
        <div>
          <label className="block text-sm mb-1">Website</label>
          <input name="website" placeholder="https://" className="w-full px-3 py-2 rounded bg-white/10 border border-white/20" />
        </div>
        <div>
          <label className="block text-sm mb-1">Username</label>
          <input name="username" defaultValue={email.split('@')[0]} className="w-full px-3 py-2 rounded bg-white/10 border border-white/20" />
        </div>
        <div className="flex items-center justify-end gap-3">
          <a href="/account/profile" className="px-3 py-2 rounded-md border border-white/20">Cancel</a>
          <button className="px-4 py-2 rounded-md bg-brand text-black">Save</button>
        </div>
      </form>
    </div>
  )
}
