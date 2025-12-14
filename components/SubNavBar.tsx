export default function SubNavBar() {
  return (
    <div className="w-full border-b border-white/10 bg-white/5">
      <div className="container flex items-center justify-between py-2">
        <a href="/pricing" className="px-3 py-1 rounded-md bg-brand/20">Get Unlimited Downloads</a>
        <div className="flex items-center gap-4 text-sm">
          <a href="#">Images</a>
          <a href="#">Video</a>
          <a href="#">Music</a>
          <a href="#">Editorial</a>
          <a href="#">3D</a>
          <a href="#">Studios</a>
          <a href="#">Data licensing</a>
          <a href="#">AI tools</a>
          <a href="/pricing">Pricing</a>
          <a href="/signin" className="px-3 py-1 rounded-md border border-white/20">Log in</a>
        </div>
      </div>
    </div>
  )
}
