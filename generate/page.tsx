import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import ModelSelector from '@/components/ModelSelector'
import ImageEnhancer from '@/components/ImageEnhancer'
import GeneratorPresets from '@/components/GeneratorPresets'
import GuidelineGuard from '@/components/GuidelineGuard'
import KeywordHelper from '@/components/KeywordHelper'

export default async function GeneratePage() {
  async function generate(formData: FormData) {
    'use server'
    const prompt = String(formData.get('prompt') || '')
    const model = String(formData.get('model') || 'Automatic')
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) redirect('/signin')
    if (!prompt.trim()) redirect('/drops')
    redirect('/drops')
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <section className="md:col-span-2 space-y-4">
        <div className="text-sm text-white/70">Prompt</div>
        <form action={generate} className="space-y-4">
          <div className="rounded-xl bg-white/5 border border-white/10 p-4">
            <textarea name="prompt" rows={6} className="w-full rounded-md bg-black/40 border border-white/20 p-4" placeholder="Describe your image..." />
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <label className="px-3 py-1 rounded-md border border-white/20 cursor-pointer">
                  Reference
                  <input type="file" name="reference" className="hidden" />
                </label>
              </div>
              <a href="#" className="text-sm text-white/70">Showcase</a>
            </div>
          </div>
          <div>
            <div className="text-sm text-white/70 mb-2">Model</div>
            <input type="hidden" name="model" value="Seedream 4.0" />
            <ModelSelector />
          </div>
          <button className="px-5 py-2 rounded-md bg-brand text-black">Generate</button>
        </form>
        <div className="rounded-xl bg-white/5 border border-white/10 p-4">
          <GuidelineGuard />
        </div>
        <div className="rounded-xl bg-white/5 border border-white/10 p-4">
          <KeywordHelper />
        </div>
        <div className="rounded-xl bg-white/5 border border-white/10 p-4">
          <GeneratorPresets />
        </div>
        <div className="rounded-xl bg-white/5 border border-white/10 p-4">
          <ImageEnhancer />
        </div>
      </section>
      <aside className="space-y-4">
        <div className="rounded-xl border border-white/10 p-4">
          <div className="text-lg font-semibold">Bring your ideas to life</div>
          <div className="text-sm text-white/70 mt-2">Access our library of over 500 million high‑quality assets.</div>
        </div>
      </aside>
    </div>
  )
}
