'use client'
import { useState } from 'react'

type Item = { question: string; answer: string }

const items: Item[] = [
  { question: 'What is a 3D object?', answer: 'A packaged 3D asset ready for use in design tools and renderers.' },
  { question: 'What is the difference between a 3D object and a 3D model?', answer: 'Objects are curated, optimized assets; models are raw source meshes.' },
  { question: 'How are 3D objects used?', answer: 'Place in scenes, apply materials, render or export for web and video.' },
  { question: 'What file format do I get with a 3D object?', answer: 'Common formats include GLB, USDZ, FBX, and OBJ.' },
  { question: 'What does one license for a 3D object get me?', answer: 'A royalty-free license for use in commercial or personal projects.' },
  { question: 'How do I purchase a license for a 3D object?', answer: 'Add to cart and complete checkout; your license key is stored in purchases.' },
  { question: 'Is indemnification available for 3D objects?', answer: 'Yes for approved assets; review license terms during checkout.' },
  { question: 'Can I use these images in my projects?', answer: 'Yes under the license terms; attribution is not required.' },
  { question: 'You have lots of branded objects - can I use those in my project?', answer: 'Brand usage may require permission. Check asset notes before publishing.' },
  { question: 'Can I share objects I\'ve downloaded with other people on my team?', answer: 'Team sharing is allowed within the same organization under a team plan.' },
  { question: 'How often do you publish new 3D objects?', answer: 'Daily. New drops and curated sets appear every 24 hours.' },
  { question: 'You don’t have an object I need - can you make it for me?', answer: 'Request custom assets from the Admin panel or contact support.' },
  { question: 'I need to also buy the original 3D model, can I do that?', answer: 'Original source models are available upon request for select assets.' },
]

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div className="space-y-2">
      {items.map((it, idx) => {
        const isOpen = open === idx
        return (
          <div key={it.question} className="border border-white/10 rounded-md overflow-hidden">
            <button
              className="w-full flex items-center justify-between px-4 py-3 text-left"
              onClick={() => setOpen(isOpen ? null : idx)}
            >
              <span>{it.question}</span>
              <span className="text-white/60">{isOpen ? '−' : '+'}</span>
            </button>
            {isOpen && (
              <div className="px-4 pb-4 text-white/70">{it.answer}</div>
            )}
          </div>
        )
      })}
    </div>
  )
}
