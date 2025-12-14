export default function HeroPixelsquid() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-white/10">
      <div
        className="h-64 md:h-72 bg-center bg-cover"
        style={{ backgroundImage: 'url(https://picsum.photos/seed/pixelsquid-hero/1600/600)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end">
        <div className="text-sm text-white/70">PIXELSQUID by Shutterstock</div>
        <div className="text-2xl md:text-3xl font-bold mt-2">Design-ready 3D objects, now on Fluximart</div>
        <div className="text-white/70 mt-2">
          Access high‑quality 3D objects from our expansive library and place them directly into your designs.
        </div>
        <a href="/marketplace" className="mt-4 inline-block px-5 py-2 bg-brand rounded-md text-black">
          Explore 3D library
        </a>
      </div>
    </section>
  )
}
