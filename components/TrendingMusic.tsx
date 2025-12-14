'use client'

type Track = { title: string; by: string; length: string; bpm: string; seed: string }
const tracks: Track[] = [
  { title: 'Blossom Night', by: 'Sunshine Music', length: '2:24', bpm: '120 BPM', seed: 't1' },
  { title: 'Ageless City', by: 'Kara Saand', length: '2:36', bpm: '94 BPM', seed: 't2' },
  { title: "Grieg 'Notturno' Op.54", by: 'Kara Saand', length: '4:31', bpm: '115 BPM', seed: 't3' },
  { title: 'Chopin - Nocturne Op.72', by: 'Kara Saand', length: '5:30', bpm: '108 BPM', seed: 't4' },
  { title: 'Present Tense', by: 'Kara Saand', length: '2:27', bpm: '110 BPM', seed: 't5' },
]

function Wave() {
  return (
    <div className="flex-1 h-6 bg-gradient-to-r from-white/20 via-white/10 to-white/20 rounded-md" />
  )
}

export default function TrendingMusic() {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">See what's trending now</h2>
        <div className="flex gap-6 text-sm">
          <a className="border-b-2 border-white">The latest</a>
          <a className="text-white/60">Most popular</a>
        </div>
      </div>
      <div className="space-y-3">
        {tracks.map((t) => (
          <div key={t.title} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
            <button className="px-3 py-2 rounded-md bg-white/10">▶</button>
            <div className="min-w-[180px]">
              <div className="font-medium">{t.title}</div>
              <div className="text-sm text-white/70">By {t.by}</div>
            </div>
            <Wave />
            <div className="w-32 text-right text-sm text-white/70">{t.length} / {t.bpm}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
