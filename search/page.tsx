type SearchParams = { searchParams?: { q?: string } }

export default function SearchPage({ searchParams }: SearchParams) {
  const q = (searchParams?.q || '').trim()
  return (
    <div className="space-y-10">
      <section className="rounded-2xl border border-white/10 bg-white/5 p-8">
        <div className="text-3xl font-semibold text-center">Search for images and customize the results</div>
        <form action="/search" method="get" className="mt-6 max-w-3xl mx-auto flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2">
          <input name="q" defaultValue={q} className="flex-1 px-3 py-2 bg-transparent outline-none" placeholder="Search images" />
          <button type="button" className="px-3 py-2 rounded-md border border-white/20">⚙</button>
          <button type="submit" className="px-5 py-2 rounded-md bg-brand text-black">Search</button>
        </form>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="space-y-4">
          <div>
            <div className="text-sm text-white/70">Image types</div>
            <div className="mt-2 space-y-2">
              {['Images home','Photos','Vectors','Illustrations','3D','PNGs'].map((t) => (
                <a key={t} href={`/search?q=${encodeURIComponent(t)}`} className="block hover:text-brand">{t}</a>
              ))}
            </div>
          </div>
          <div>
            <div className="text-sm text-white/70">More collections</div>
            <div className="mt-2 space-y-2">
              {['Free','Premium'].map((t) => (
                <a key={t} href={`/search?q=${encodeURIComponent(t)}`} className="block hover:text-brand">{t}</a>
              ))}
            </div>
          </div>
          <a href="/pricing" className="inline-block px-5 py-2 rounded-md bg-brand text-black">View plans and pricing</a>
        </div>
        <div>
          <div className="text-sm text-white/70">Popular categories</div>
          <div className="mt-2 grid grid-cols-2 gap-y-2">
            {['Christmas','Winter','Backgrounds','Clipart','Nature','Business','Mockups','People','Drawings','Family','Healthcare','Icons','Wallpapers'].map((t) => (
              <a key={t} href={`/search?q=${encodeURIComponent(t)}`} className="hover:text-brand">{t}</a>
            ))}
          </div>
        </div>
        <div>
          <div className="text-sm text-white/70">Trending searches</div>
          <div className="mt-2 space-y-2">
            {['Abstract backgrounds','Clouds','Happy New Year 2026','Christmas background','Christmas wallpaper','Mountains','Technology backgrounds'].map((t) => (
              <a key={t} href={`/search?q=${encodeURIComponent(t)}`} className="block hover:text-brand">{t}</a>
            ))}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="space-y-4">
          <div>
            <div className="text-sm text-white/70">Design templates</div>
            <div className="mt-2 space-y-2">
              {['Templates home','Photoshop','Illustrator','InDesign'].map((t) => (
                <a key={t} href={`/search?q=${encodeURIComponent(t)}`} className="block hover:text-brand">{t}</a>
              ))}
            </div>
          </div>
          <div>
            <div className="text-sm text-white/70">Video templates</div>
            <div className="mt-2 space-y-2">
              {['After Effects','Premiere Pro','Motion Graphics'].map((t) => (
                <a key={t} href={`/search?q=${encodeURIComponent(t)}`} className="block hover:text-brand">{t}</a>
              ))}
            </div>
          </div>
          <a href="/pricing" className="inline-block px-5 py-2 rounded-md bg-brand text-black">View plans and pricing</a>
        </div>
        <div>
          <div className="text-sm text-white/70">Popular categories</div>
          <div className="mt-2 grid grid-cols-2 gap-y-2">
            {['Logos','Business cards','Resumes','Mockups','Flyers','Brochures','Books','Posters','Menus','Newsletters'].map((t) => (
              <a key={t} href={`/search?q=${encodeURIComponent(t)}`} className="hover:text-brand">{t}</a>
            ))}
          </div>
        </div>
        <div>
          <div className="text-sm text-white/70">Project types</div>
          <div className="mt-2 grid grid-cols-2 gap-y-2">
            {['Print','Web','Mobile','Photo','Art & illustrations','Motion titles','Overlays'].map((t) => (
              <a key={t} href={`/search?q=${encodeURIComponent(t)}`} className="hover:text-brand">{t}</a>
            ))}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="space-y-4">
          <div>
            <div className="text-sm text-white/70">Popular music categories</div>
            <div className="mt-2 space-y-2">
              {['Audio home','Corporate','Ambient','Nature','Epic','Cinematic'].map((t) => (
                <a key={t} href={`/search?q=${encodeURIComponent(t)}`} className="block hover:text-brand">{t}</a>
              ))}
            </div>
          </div>
          <a href="/pricing" className="inline-block px-5 py-2 rounded-md bg-brand text-black">View plans and pricing</a>
        </div>
        <div>
          <div className="text-sm text-white/70">Genres</div>
          <div className="mt-2 grid grid-cols-2 gap-y-2">
            {['Pop','Rock','Electronic','Classical','Jazz','Hip-Hop','R&B'].map((t) => (
              <a key={t} href={`/search?q=${encodeURIComponent(t)}`} className="hover:text-brand">{t}</a>
            ))}
          </div>
        </div>
        <div>
          <div className="text-sm text-white/70">Moods</div>
          <div className="mt-2 grid grid-cols-2 gap-y-2">
            {['Upbeat','Happy','Sad','Inspiring','Relaxing','Dramatic','Emotional','Dark','Fun','Motivational'].map((t) => (
              <a key={t} href={`/search?q=${encodeURIComponent(t)}`} className="hover:text-brand">{t}</a>
            ))}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="space-y-4">
          <div>
            <div className="text-sm text-white/70">Popular video resources</div>
            <div className="mt-2 space-y-2">
              {['Video home','4K videos','Video loops','Vertical videos'].map((t) => (
                <a key={t} href={`/search?q=${encodeURIComponent(t)}`} className="block hover:text-brand">{t}</a>
              ))}
            </div>
          </div>
          <div>
            <div className="text-sm text-white/70">Video templates</div>
            <div className="mt-2 space-y-2">
              {['Video Templates home','After Effects','Premiere Pro','Motion Graphics'].map((t) => (
                <a key={t} href={`/search?q=${encodeURIComponent(t)}`} className="block hover:text-brand">{t}</a>
              ))}
            </div>
          </div>
          <a href="/pricing" className="inline-block px-5 py-2 rounded-md bg-brand text-black">View plans and pricing</a>
        </div>
        <div>
          <div className="text-sm text-white/70">Video categories</div>
          <div className="mt-2 grid grid-cols-2 gap-y-2">
            {['Abstract backgrounds','Green screen videos','Countdown videos','Video backgrounds','Aerial footage','Animation stock videos','Space videos'].map((t) => (
              <a key={t} href={`/search?q=${encodeURIComponent(t)}`} className="hover:text-brand">{t}</a>
            ))}
          </div>
        </div>
        <div>
          <div className="text-sm text-white/70">Video overlays</div>
          <div className="mt-2 grid grid-cols-2 gap-y-2">
            {['Lens flares','Glitch effects','Film grain effects','Smoke effects','Fire effects','Explosion videos','Lightning videos','Snow videos','Confetti effects','Grunge effects'].map((t) => (
              <a key={t} href={`/search?q=${encodeURIComponent(t)}`} className="hover:text-brand">{t}</a>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
