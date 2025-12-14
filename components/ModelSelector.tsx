const models = [
  { name: 'Automatic', desc: 'Recommended. We choose the best model for your prompt.' },
  { name: 'Seedream 4.0', desc: 'Next‑gen photorealistic model optimized for stock.' },
  { name: 'DALL·E 3', desc: 'OpenAI previous generation image model.' },
  { name: 'GPT Image 1', desc: 'OpenAI most advanced image model.' },
  { name: 'GPT Image Mini', desc: 'More efficient version of GPT Image 1.' },
  { name: 'Imagen 3', desc: 'Google previous generation image model.' },
  { name: 'Imagen 3 Fast', desc: 'Faster version of Imagen 3.' },
  { name: 'Imagen 4', desc: 'Google current generation image model.' },
  { name: 'Imagen 4 Fast', desc: 'Faster version of Imagen 4.' },
  { name: 'Imagen 4 Ultra', desc: 'Ultra-detailed version.' },
  { name: 'Gemini 2.5 Flash', desc: 'Google fast multimodal model.' },
  { name: 'Nova Canvas', desc: 'Amazon current generation image model.' },
  { name: 'Shutterstock ImageAI', desc: 'Powered by Databricks.' },
  { name: 'Gen-4', desc: 'Cinematic image model from RunwayML.' },
  { name: 'Flux Kontext Pro', desc: 'Context aware image model.' },
  { name: 'Flux Kontext Max', desc: 'Premium quality context aware image model.' },
  { name: 'Flux 1.1 Ultra', desc: 'Ultra-detailed and photorealistic.' },
  { name: 'Flux 1.1 Pro', desc: 'Flagship image generation model.' },
  { name: 'Bria 3.2', desc: 'Bria most advanced image generation model.' },
]

export default function ModelSelector() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Select an image model</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {models.map((m, i) => (
          <div key={m.name} className="flex items-start gap-3 p-3 rounded-xl border border-white/10 bg-white/5">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-white/10">{String.fromCharCode(65 + (i % 26))}</div>
            <div className="flex-1">
              <div className="font-medium">{m.name}</div>
              <div className="text-sm text-white/70">{m.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
