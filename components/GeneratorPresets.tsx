'use client'
type Props = { textareaName?: string }

const groups = [
  {
    title: 'Business & Marketing Images',
    items: [
      'Teamwork, meetings, office life',
      'Remote work, laptops, startups',
      'Success, growth, leadership, money',
      'Clean, professional, realistic',
    ],
    prompt: 'Clean professional corporate photo, teamwork meeting in modern office, realistic lighting, minimal background, copy space, brand‑safe composition',
  },
  {
    title: 'People & Lifestyle',
    items: [
      'Real people (diverse ages, cultures)',
      'Daily life, emotions, relationships',
      'Fitness, family, students, creators',
    ],
    prompt: 'Natural lifestyle photo, diverse people, candid emotions, soft daylight, authentic setting, documentary realism, inclusive representation',
  },
  {
    title: 'Technology & AI',
    items: [
      'Artificial intelligence concepts',
      'Coding, data, cybersecurity',
      'Smartphones, apps, futuristic tech',
    ],
    prompt: 'Futuristic tech scene, AI concept visuals, glowing UI, code and data motifs, sleek minimal environment, premium photographic realism',
  },
  {
    title: 'Social Media & Content Creation',
    items: [
      'Instagram / TikTok style',
      'Influencer setups, ring lights',
      'Vertical images & videos',
    ],
    prompt: 'Vertical format influencer setup, ring light, clean backdrop, vibrant color grading, high engagement social aesthetic, crisp detail',
  },
  {
    title: 'Seasonal & Events',
    items: [
      'Christmas, New Year, Easter',
      'Back‑to‑school, Black Friday',
      'Weddings, birthdays, celebrations',
    ],
    prompt: 'Festive celebration scene, tasteful decor, premium lighting, editorial‑ready composition, copy space for text overlays',
  },
  {
    title: 'Concepts & Abstract',
    items: [
      'Success, failure, motivation',
      'Mental health, stress, focus',
      'Minimal backgrounds with copy space',
    ],
    prompt: 'Abstract conceptual image, minimal backdrop, clear symbolism, balanced negative space, modern editorial style, high contrast',
  },
  {
    title: 'Illustrations, Vectors & AI',
    items: [
      'Icons, UI elements',
      'Flat illustrations',
      'AI‑generated backgrounds',
    ],
    prompt: 'Flat vector illustration set, modern UI icons, clean grid, smooth gradients, crisp edges, export‑friendly background',
  },
]

export default function GeneratorPresets({ textareaName = 'prompt' }: Props) {
  function setPrompt(text: string) {
    const ta = document.querySelector<HTMLTextAreaElement>(`textarea[name="${textareaName}"]`)
    if (!ta) return
    ta.value = text
    ta.dispatchEvent(new Event('input', { bubbles: true }))
  }
  return (
    <section className="space-y-6">
      <div className="text-lg font-semibold">Seedream 4.0 presets</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {groups.map((g) => (
          <div key={g.title} className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-3">
            <div className="font-medium">{g.title}</div>
            <ul className="space-y-1 text-sm text-white/70">
              {g.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
            <button
              onClick={() => setPrompt(g.prompt)}
              className="px-3 py-2 rounded-md bg-brand text-black"
            >
              Use this preset
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}

