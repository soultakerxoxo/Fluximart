'use client'
import { useEffect, useRef, useState } from 'react'

type Preset = 'Automatic' | 'Portrait' | 'Product' | 'Landscape'

export default function ImageEnhancer() {
  const [src, setSrc] = useState<string>('')
  const [enhanced, setEnhanced] = useState<string>('')
  const [preset, setPreset] = useState<Preset>('Automatic')
  const [upscale, setUpscale] = useState<boolean>(true)
  const [sharpen, setSharpen] = useState<boolean>(true)
  const fileRef = useRef<HTMLInputElement | null>(null)

  function filtersForPreset(p: Preset) {
    if (p === 'Portrait') return 'brightness(1.06) contrast(1.08) saturate(1.05)'
    if (p === 'Product') return 'brightness(1.08) contrast(1.12) saturate(1.02)'
    if (p === 'Landscape') return 'brightness(1.05) contrast(1.1) saturate(1.12)'
    return 'brightness(1.05) contrast(1.06) saturate(1.06)'
  }

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setSrc(url)
  }

  function applyEnhancement() {
    if (!src) return
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const scale = upscale ? 2 : 1
      const w = img.width * scale
      const h = img.height * scale
      const c = document.createElement('canvas')
      c.width = w
      c.height = h
      const ctx = c.getContext('2d')!
      ctx.filter = filtersForPreset(preset)
      ctx.drawImage(img, 0, 0, w, h)
      if (sharpen) {
        const imageData = ctx.getImageData(0, 0, w, h)
        const sharpened = convolve(imageData, [0, -1, 0, -1, 5, -1, 0, -1, 0])
        ctx.putImageData(sharpened, 0, 0)
      }
      const data = c.toDataURL('image/jpeg', 0.92)
      setEnhanced(data)
    }
    img.src = src
  }

  function convolve(imageData: ImageData, kernel: number[]) {
    const side = Math.sqrt(kernel.length)
    const halfSide = Math.floor(side / 2)
    const src = imageData.data
    const sw = imageData.width
    const sh = imageData.height
    const output = new ImageData(sw, sh)
    const dst = output.data
    for (let y = 0; y < sh; y++) {
      for (let x = 0; x < sw; x++) {
        let r = 0, g = 0, b = 0
        for (let ky = 0; ky < side; ky++) {
          for (let kx = 0; kx < side; kx++) {
            const scy = Math.min(sh - 1, Math.max(0, y + ky - halfSide))
            const scx = Math.min(sw - 1, Math.max(0, x + kx - halfSide))
            const srcOff = (scy * sw + scx) * 4
            const wt = kernel[ky * side + kx]
            r += src[srcOff] * wt
            g += src[srcOff + 1] * wt
            b += src[srcOff + 2] * wt
          }
        }
        const dstOff = (y * sw + x) * 4
        dst[dstOff] = Math.min(255, Math.max(0, r))
        dst[dstOff + 1] = Math.min(255, Math.max(0, g))
        dst[dstOff + 2] = Math.min(255, Math.max(0, b))
        dst[dstOff + 3] = 255
      }
    }
    return output
  }

  useEffect(() => {
    if (src) applyEnhancement()
  }, [src, preset, upscale, sharpen])

  function download() {
    if (!enhanced) return
    const a = document.createElement('a')
    a.href = enhanced
    a.download = 'enhanced.jpg'
    a.click()
  }

  return (
    <section className="space-y-4">
      <div className="text-lg font-semibold">Enhance an image with AI</div>
      <div className="text-sm text-white/70">Upload a photo and get a professionally enhanced version.</div>
      <div className="flex flex-wrap items-center gap-3">
        <label className="px-3 py-2 rounded-md border border-white/20 cursor-pointer">
          Upload image
          <input ref={fileRef} type="file" accept="image/*" onChange={onFile} className="hidden" />
        </label>
        <select value={preset} onChange={(e) => setPreset(e.target.value as Preset)} className="px-3 py-2 rounded-md border border-white/20 bg-transparent">
          <option>Automatic</option>
          <option>Portrait</option>
          <option>Product</option>
          <option>Landscape</option>
        </select>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={upscale} onChange={(e) => setUpscale(e.target.checked)} /> Upscale 2×
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={sharpen} onChange={(e) => setSharpen(e.target.checked)} /> Sharpen
        </label>
        <button onClick={applyEnhancement} className="px-4 py-2 rounded-md bg-brand text-black">Enhance</button>
        <button onClick={download} className="px-4 py-2 rounded-md border border-white/20">Download</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-md overflow-hidden border border-white/10 min-h-40">
          {src ? <img src={src} alt="Original" className="w-full object-contain" /> : <div className="p-6 text-sm text-white/60">Original</div>}
        </div>
        <div className="rounded-md overflow-hidden border border-white/10 min-h-40">
          {enhanced ? <img src={enhanced} alt="Enhanced" className="w-full object-contain" /> : <div className="p-6 text-sm text-white/60">Enhanced</div>}
        </div>
      </div>
    </section>
  )
}

