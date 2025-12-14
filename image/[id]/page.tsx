import { notFound } from 'next/navigation'

type Props = { params: { id: string } }

export default function ImageDetailPage({ params }: Props) {
  const { id } = params
  const num = Number(id)
  if (Number.isNaN(num) || num < 1 || num > 12) {
    notFound()
  }
  const preview_url = `https://picsum.photos/seed/market-${num - 1}/1200/800`
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <div className="grid grid-cols-[64px,1fr] gap-4">
            <div className="flex flex-col gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-16 w-16 rounded-md overflow-hidden border border-white/10">
                  <img src={`https://picsum.photos/seed/thumb-${num}-${i}/200/200`} alt={`Thumb ${i}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="rounded-md overflow-hidden border border-white/10">
              <img src={preview_url} alt={`Image ${id}`} className="w-full h-[520px] object-cover" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <a href="/marketplace" className="text-sm text-white/70">Back to search results</a>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 rounded-md border border-white/20">♡</button>
              <button className="px-3 py-1 rounded-md border border-white/20">›</button>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="text-pink-400 text-sm">Only {4 - (num % 3)} left · in {num % 5} carts</div>
          <div className="text-2xl font-semibold">${(9.9 + (num % 3) * 10).toFixed(2)}</div>
          <div className="text-white/80">
            Trending Image {id}
          </div>
          <div className="text-sm text-white/70">Returns & exchanges accepted</div>
          <div>
            <label className="block text-sm mb-1">SIZE</label>
            <select className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20">
              <option>Select an option</option>
              <option>Small</option>
              <option>Medium</option>
              <option>Large</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">Primary color</label>
            <select className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20">
              <option>Select a color</option>
              <option>Beige</option>
              <option>Brown</option>
              <option>Black</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">Add personalization (optional)</label>
            <input className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20" placeholder="Add any notes" />
          </div>
          <a href={`/checkout/${id}`} className="block w-full px-5 py-3 bg-brand rounded-md text-black text-center">Add to cart</a>
          <div className="text-sm text-white/60">Star Seller. Fast shipping and great reviews.</div>
          <div className="space-y-2">
            <div className="text-sm font-medium">Highlights</div>
            <ul className="text-sm text-white/70 space-y-1">
              <li>High‑quality commercial licensing</li>
              <li>Made by SnapStockX AI studio</li>
              <li>Materials: digital, royalty‑free</li>
            </ul>
          </div>
        </div>
      </div>

      <section className="space-y-4">
        <div className="text-xl font-semibold">Reviews for this item</div>
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <div className="flex items-center gap-1"><span>⭐</span><span className="font-medium">5.0</span><span>/5</span></div>
          {['Item quality', 'Shipping', 'Customer service', '100% recommend'].map((t) => (
            <span key={t} className="px-2 py-1 rounded-full bg-white/10">{t}</span>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-md border border-white/10 p-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm">⭐ ⭐ ⭐ ⭐ ⭐</div>
                <div className="text-xs text-white/50">{new Date().toLocaleDateString()}</div>
              </div>
              <div className="text-sm text-white/80">Beautiful asset. Fast delivery. Highly recommend.</div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <div className="text-xl font-semibold">You may also like</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <a key={i} href={`/image/${((num + i) % 12) + 1}`} className="rounded-md overflow-hidden border border-white/10">
              <img src={`https://picsum.photos/seed/also-${num}-${i}/600/400`} alt="Similar" className="w-full h-36 object-cover" />
              <div className="p-3 text-sm">
                <div className="font-medium">Cozy visual #{i + 1}</div>
                <div className="text-white/60">USD {(46 + i).toFixed(2)}</div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="text-xl font-semibold">Explore related searches</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {['SnapStockX Studio', 'Winter visuals', 'Editorial pack', 'Royalty‑free'].map((t, i) => (
            <a key={i} href="#" className="flex items-center gap-2 rounded-md border border-white/10 p-2">
              <div className="h-8 w-8 rounded-md overflow-hidden border border-white/10">
                <img src={`https://picsum.photos/seed/rel-img-${i}/200/200`} alt={t} className="w-full h-full object-cover" />
              </div>
              <div className="text-sm">{t}</div>
            </a>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            'Studio visuals', 'Soft texture', 'Editorial images', 'Modern pack', 'Chunky style',
            'Royalty‑free set', 'Cozy assets', 'Winter pack', 'Holiday set',
          ].map((t) => (
            <span key={t} className="px-3 py-1 rounded-full bg-white/10 text-sm">{t}</span>
          ))}
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ImageObject',
            name: `Trending Image ${id}`,
            url: (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000') + `/image/${id}`,
            contentUrl: preview_url,
            thumbnailUrl: preview_url,
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000') + `/`,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Marketplace',
                item: (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000') + `/marketplace`,
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: `Trending Image ${id}`,
                item: (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000') + `/image/${id}`,
              },
            ],
          }),
        }}
      />
    </div>
  )
}
