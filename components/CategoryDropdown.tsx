'use client'
import { useState } from 'react'

const options = [
  'All images',
  'Photos',
  '3D Objects',
  'Vector',
  'Illustrations',
  'AI Generated',
  'Editorial',
  'Editorial image',
  'Editorial video',
  'Video',
  'Music',
  'Sound effects',
  'Templates',
  'AI generator',
  'Search by image',
]

export default function CategoryDropdown() {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <button className="px-3 py-1 rounded-md border border-white/20" onClick={() => setOpen((v) => !v)}>
        All images
      </button>
      {open && (
        <div className="absolute z-20 mt-2 w-56 rounded-md border border-white/10 bg-white/5 backdrop-blur p-2">
          <ul className="space-y-1 text-sm">
            {options.map((o) => (
              <li key={o}>
                <a className="block px-2 py-1 rounded hover:bg-white/10" href="#">{o}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
