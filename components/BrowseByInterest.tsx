const interests = [
  'Humor',
  'Maximalist Decor',
  'Travel',
  'Fashion',
  'Useful Gifts',
  'Astrology',
  'Reading',
  'Beer, Wine & Cocktails',
  'Puzzles & Games',
  'Collectibles',
  'Cooking & Baking',
  'Art',
  'Minimalist Decor',
  'Romance',
  'Video Games',
  'Family',
  'Movies',
]

export default function BrowseByInterest() {
  return (
    <section className="space-y-3">
      <div className="text-2xl font-semibold text-center">Browse by interest for the best gifts!</div>
      <div className="flex flex-wrap justify-center gap-3">
        {interests.map((i, idx) => (
          <a key={i} href="#" className={`px-3 py-1 rounded-full border border-white/20 ${idx === 0 ? 'bg-white text-black' : 'bg-white/10'}`}>{i}</a>
        ))}
        <a href="#" className="px-3 py-1 rounded-full border border-white/20 bg-white/10">＋ More</a>
      </div>
    </section>
  )
}
