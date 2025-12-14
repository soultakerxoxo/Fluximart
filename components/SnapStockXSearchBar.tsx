'use client'
import { useState } from 'react'

export default function SnapStockXSearchBar() {
  const tabs = ['Trending', 'Editor’s Picks', 'Holiday Decor', 'Digital Downloads', 'Top Gifts']
  const categories = [
    'Accessories',
    'Art & Collectibles',
    'Baby',
    'Bags & Purses',
    'Bath & Beauty',
    'Books, Movies & Music',
    'Clothing',
    'Craft Supplies & Tools',
    'Electronics & Accessories',
    'Gifts',
    'Home & Living',
    'Jewelry',
    'Paper & Party Supplies',
    'Pet Supplies',
    'Shoes',
    'Toys & Games',
    'Weddings',
  ]
  const [open, setOpen] = useState(false)
  return (
    <div className="w-full relative">
      <div className="flex items-center gap-3">
        <div className="font-semibold text-xl">SnapStockX</div>
        <button onClick={() => setOpen((v) => !v)} className="px-3 py-2 rounded-md border border-white/20">☰ Categories</button>
        <form action="/search" method="get" className="flex-1 flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-2">
          <input name="q" className="flex-1 px-2 py-1 bg-transparent outline-none" placeholder="Search SnapStockX" />
          <button type="submit" className="h-8 w-8 rounded-full bg-brand text-black">🔍</button>
        </form>
        <div className="hidden md:flex items-center gap-4">
          <a href="/signin" className="text-sm hover:text-brand">Sign in</a>
          <a href="/favorites" aria-label="Favorites">♡</a>
          <a href="/purchases" aria-label="Gifts">🎁</a>
          <a href="/purchases" aria-label="Cart">🛒</a>
        </div>
      </div>
      {open && (
        <div className="absolute left-0 mt-2 z-40 w-[320px] rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-3 max-h-[360px] overflow-auto">
          <div className="text-sm font-medium mb-2">Categories</div>
          <div className="space-y-2">
            {categories.map((c) => (
              <a key={c} href={`/search?q=${encodeURIComponent(c)}`} className="block px-3 py-2 rounded-md hover:bg-white/10">{c}</a>
            ))}
          </div>
        </div>
      )}
      <div className="mt-3 flex flex-wrap gap-4 text-sm">
        {tabs.map((t) => (
          <a key={t} href={`/search?q=${encodeURIComponent(t)}`} className="hover:text-brand">{t}</a>
        ))}
      </div>
    </div>
  )
}
