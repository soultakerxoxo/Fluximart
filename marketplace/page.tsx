import Link from 'next/link'

const mockImages = Array.from({ length: 12 }).map((_, i) => ({
  id: `${i + 1}`,
  title: `Trending Image ${i + 1}`,
  price: 990,
  preview_url: `https://picsum.photos/seed/market-${i}/600/400`,
  tags: ['trending', 'ai', 'snapstockx'],
}))

export default function MarketplacePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Marketplace</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mockImages.map((img) => (
          <Link key={img.id} href={`/image/${img.id}`}>
            <div className="rounded-md overflow-hidden border border-white/10 hover:border-brand transition">
              <img src={img.preview_url} alt={img.title} className="w-full h-40 object-cover" />
              <div className="p-3 text-sm">
                <div className="font-medium">{img.title}</div>
                <div className="text-white/60">${(img.price / 100).toFixed(2)}</div>
                <div className="mt-2">
                  <Link href={`/checkout/${img.id}`} className="inline-block px-3 py-1 bg-brand rounded-md text-black">Buy</Link>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
