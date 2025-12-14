export default function DevelopersPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6 text-center">
      <div className="text-3xl font-bold">Build something exciting with Fluximart</div>
      <div className="text-white/80">Enhance your applications using our API and SDKs.</div>
      <div>
        <a href="/signin" className="inline-block px-5 py-2 rounded-md bg-brand text-black">Create new app</a>
      </div>
      <div className="text-sm text-white/60">
        For more information, see our developer portal and documentation.
      </div>
    </div>
  )
}
