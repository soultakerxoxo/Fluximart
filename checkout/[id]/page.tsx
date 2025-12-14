import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { sendSMS } from '@/lib/sms'
import CheckoutForm from '@/components/CheckoutForm'

type Props = { params: { id: string } }

export default async function CheckoutPage({ params }: Props) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) redirect('/signin')
  const image = await prisma.image.findFirst({ where: { id: params.id } })
  if (!image) {
    const num = Number(params.id)
    if (!Number.isNaN(num)) {
      const seedId = `seed-${num - 1}`
      const seedImage = await prisma.image.findFirst({ where: { id: seedId } })
      if (seedImage) {
        return redirect(`/checkout/${seedImage.id}`)
      }
    }
    redirect('/marketplace')
  }

  async function pay(formData: FormData) {
    'use server'
    const method = String(formData.get('method') || 'card')
    const licenseTier = 'standard'
    const user = await prisma.user.findUnique({ where: { email: session!.user!.email! } })
    if (!user) redirect('/signin')
    if (method === 'paypal') {
      return redirect(`/paypal?imageId=${encodeURIComponent(image.id)}`)
    }
    await prisma.purchase.create({
      data: {
        userId: user.id,
        imageId: image.id,
        licenseTier,
        amountCents: image.priceCents,
        provider: method,
      },
    })
    const settings = await prisma.paymentSettings.findUnique({ where: { userId: user.id } })
    const phone = process.env.ADMIN_PHONE || settings?.payoutPhone
    if (phone) {
      await sendSMS(phone, `New sale: ${image.title} for $${(image.priceCents / 100).toFixed(2)}`)
    }
    redirect('/dashboard')
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-2 text-sm text-white/70">
        <div className="px-2 py-1 rounded-md bg-white/10">Account information</div>
        <div className="px-2 py-1 rounded-md bg-white/20">Payment method</div>
        <div className="px-2 py-1 rounded-md bg-white/10">Download assets</div>
      </div>
      <div className="rounded-md border border-white/10 overflow-hidden">
        <img src={image.previewUrl} alt={image.title} className="w-full h-60 object-cover" />
        <div className="p-4">
          <div className="font-medium text-lg">{image.title}</div>
          <div className="text-white/60">${(image.priceCents / 100).toFixed(2)}</div>
        </div>
      </div>
      <CheckoutForm image={{ title: image.title, priceCents: image.priceCents, previewUrl: image.previewUrl }} pay={pay} />
    </div>
  )
}
