import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

export default async function PurchasesPage() {
  const session = await getServerSession(authOptions)
  const email = session?.user?.email
  if (!email) redirect('/signin')
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) redirect('/signin')
  const purchases = await prisma.purchase.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
    take: 50,
  })
  const ids = Array.from(new Set(purchases.map((p) => p.imageId).filter(Boolean))) as string[]
  const images = ids.length ? await prisma.image.findMany({ where: { id: { in: ids } } }) : []
  const imap = new Map(images.map((i) => [i.id, i]))

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Purchase history</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {purchases.map((p) => {
          const img = p.imageId ? imap.get(p.imageId) : null
          return (
            <div key={p.id} className="rounded-md overflow-hidden border border-white/10">
              {img ? (
                <img src={img.previewUrl} alt={img.title} className="w-full h-36 object-cover" />
              ) : (
                <div className="h-36 bg-white/5" />
              )}
              <div className="p-3 space-y-1">
                <div className="font-medium">{img?.title || 'Licensed asset'}</div>
                <div className="text-white/60 text-sm">
                  ${((p.amountCents || 0) / 100).toFixed(2)} · {new Date(p.createdAt).toLocaleDateString()}
                </div>
                {p.imageId && (
                  <a href={`/image/${p.imageId}`} className="inline-block mt-2 px-3 py-1 rounded-md border border-white/20">
                    View asset
                  </a>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
