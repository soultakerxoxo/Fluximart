import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function SignInPage() {
  const session = await getServerSession(authOptions)
  if (session?.user?.email) {
    if (process.env.ADMIN_EMAIL && session.user.email === process.env.ADMIN_EMAIL) {
      redirect('/admin')
    } else {
      redirect('/dashboard')
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-[70vh]">
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: 'url(https://picsum.photos/seed/login-astro/1200/900)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
        <div className="relative p-8 flex h-full items-end">
          <div>
            <div className="text-3xl font-bold">Bring your ideas to life</div>
            <div className="text-white/80 mt-2 max-w-md">
              Tell your story with compelling images, videos, and music. Access our library of high‑quality assets.
            </div>
          </div>
        </div>
      </div>
      <div className="p-8">
        <h1 className="text-2xl font-semibold mb-4">Login or Signup</h1>
        <form action="/api/auth/callback/credentials" method="post" className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Email or username</label>
            <input name="email" type="email" required className="w-full px-3 py-2 rounded bg-white/10 border border-white/20" />
          </div>
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input name="password" type="password" required className="w-full px-3 py-2 rounded bg-white/10 border border-white/20" />
          </div>
          <div className="text-sm">
            <a href="#" className="text-white/70">Forgot your password?</a>
          </div>
          <button type="submit" className="w-full px-5 py-2 bg-white/90 text-black rounded-md">Log in</button>
        </form>
        <div className="space-y-2 mt-4">
          <button className="w-full px-5 py-2 rounded-md border border-white/20">Log in with SSO</button>
          <button className="w-full px-5 py-2 rounded-md border border-white/20">Continue with Google</button>
          <button className="w-full px-5 py-2 rounded-md border border-white/20">Continue with Facebook</button>
          <button className="w-full px-5 py-2 rounded-md border border-white/20">Continue with Apple</button>
        </div>
        <div className="text-center text-sm text-white/70 mt-4">or</div>
        <div className="mt-2">
          <a href="/signup" className="w-full inline-block px-5 py-2 rounded-md bg-brand text-black text-center">Create your account</a>
        </div>
      </div>
    </div>
  )
}
