import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

type SearchParams = { searchParams?: { imageId?: string } }

export default async function PayPalPage({ searchParams }: SearchParams) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) redirect('/signin')
  const imageId = searchParams?.imageId || ''
  const image = imageId ? await prisma.image.findFirst({ where: { id: imageId } }) : null

  async function confirm(formData: FormData) {
    'use server'
    const email = formData.get('email')
    const user = await prisma.user.findUnique({ where: { email: session!.user!.email! } })
    if (!user) redirect('/signin')
    if (image) {
      await prisma.purchase.create({
        data: {
          userId: user.id,
          imageId: image.id,
          licenseTier: 'standard',
          amountCents: image.priceCents,
          provider: 'paypal',
          meta: email ? String(email) : undefined,
        },
      })
    }
    redirect('/dashboard')
  }

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="text-3xl font-semibold">PayPal</div>
      <form action={confirm} className="space-y-4 rounded-md border border-white/10 p-4">
        <div>
          <label className="block text-sm mb-1">Enter your email address</label>
          <input name="email" type="email" required className="w-full px-3 py-2 rounded bg-white/10 border border-white/20" placeholder="Email or mobile number" />
        </div>
        <button className="w-full py-2 rounded-md bg-blue-600">Next</button>
      </form>
      <a href="/signin" className="inline-block text-sm text-white/70">Cancel and return</a>
      {image && (
        <div className="rounded-md border border-white/10 p-3 text-sm text-white/70">
          <div>Checking out: {image.title}</div>
          <div className="font-medium text-white">${(image.priceCents / 100).toFixed(2)}</div>
        </div>
      )}
    </div>
  )
}
