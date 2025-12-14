export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div>
            <div className="text-2xl font-bold">shutterstock</div>
            <div className="text-white/60 text-sm mt-2">© 2003–2025 Shutterstock, Inc.</div>
          </div>
          <div>
            <div className="font-semibold mb-3">Our company</div>
            <ul className="space-y-2 text-sm text-white/70">
              <li><a href="#">About us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press/media</a></li>
              <li><a href="#">Investor relations</a></li>
              <li><a href="#">Coupons</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-3">Brands</div>
            <ul className="space-y-2 text-sm text-white/70">
              <li><a href="#">Envato</a></li>
              <li><a href="#">Giphy</a></li>
              <li><a href="#">Pond5</a></li>
              <li><a href="#">PremiumBeat</a></li>
              <li><a href="#">TurboSquid</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-3">Products and services</div>
            <ul className="space-y-2 text-sm text-white/70">
              <li><a href="#">Images</a></li>
              <li><a href="#">Video</a></li>
              <li><a href="#">Music</a></li>
              <li><a href="#">Editorial</a></li>
              <li><a href="#">3D</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-3">Legal</div>
            <ul className="space-y-2 text-sm text-white/70">
              <li><a href="#">Terms of service</a></li>
              <li><a href="#">Privacy policy</a></li>
              <li><a href="#">Cookie preferences</a></li>
              <li><a href="#">Accessibility</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
