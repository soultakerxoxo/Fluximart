const guides = [
  'Last Minute Gifts',
  'Top 100 Gifts',
  'Gifts for Him',
  'Gifts for Her',
  'Gifts for Kids',
  'Gifts for Pets',
  'Personalized Gifts',
  'Gifts for Couples',
  'Gifts for Grandparents',
  'Gifts for Friends',
  'Stocking Stuffers',
  'Gift Accessories',
  'Birthday Gifts',
  'Housewarming Gifts',
  'Anniversary Gifts',
]

export default function GiftGuides() {
  return (
    <section className="space-y-2">
      <div className="text-3xl font-bold text-center">Best Gift Guides</div>
      <div className="text-white/80 text-center">Curated picks for every person and moment</div>
      <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6">
        {guides.map((g, i) => (
          <a key={g} href="#" className="flex flex-col items-center gap-2">
            <div className="h-20 w-20 rounded-full overflow-hidden border border-white/10">
              <img src={`https://picsum.photos/seed/gifts-${i}/400/400`} alt={g} className="w-full h-full object-cover" />
            </div>
            <div className="text-sm">{g}</div>
          </a>
        ))}
      </div>
    </section>
  )
}
