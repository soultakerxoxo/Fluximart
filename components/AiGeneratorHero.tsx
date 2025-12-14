'use client'
import { useState } from 'react'

export default function AiGeneratorHero() {
  const [prompt, setPrompt] = useState('')
  const [style, setStyle] = useState('Automatic')
  return (
    <section className="relative rounded-2xl overflow-hidden border border-white/10">
      <div
        className="h-64 md:h-72 bg-center bg-cover"
        style={{ backgroundImage: 'url(https://picsum.photos/seed/ai-forest/1600/600)' }}
      />
      <div className="absolute inset-0 p-6 md:p-10 flex flex-col items-center justify-center">
        <div className="text-3xl md:text-4xl font-bold text-center">AI Image Generator: Create Stunning Images from Text</div>
        <div className="mt-4 w-full max-w-4xl">
          <div className="rounded-xl bg-black/40 backdrop-blur border border-white/10 p-3">
            <input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full px-4 py-3 rounded bg-white/10 border border-white/20"
              placeholder="Describe exactly what you want to create"
            />
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <button className="px-3 py-1 rounded-md border border-white/20">Image reference</button>
              <select value={style} onChange={(e) => setStyle(e.target.value)} className="px-3 py-1 rounded-md border border-white/20 bg-transparent">
                <option>Automatic</option>
                <option>Photorealistic</option>
                <option>Illustration</option>
                <option>3D</option>
              </select>
              <button className="ml-auto px-4 py-2 rounded-md bg-brand text-black">Generate</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
