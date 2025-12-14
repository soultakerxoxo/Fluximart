import './globals.css'
import { ReactNode } from 'react'
import type { Metadata } from 'next'
import Script from 'next/script'
import ActionRail from '@/components/ActionRail'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export const metadata: Metadata = {
  title: 'Fluximart — SnapStockX',
  description: 'AI-powered stock image marketplace',
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: 'Fluximart — SnapStockX',
    description: 'AI-powered stock image marketplace',
    siteName: 'Fluximart — SnapStockX',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fluximart — SnapStockX',
    description: 'AI-powered stock image marketplace',
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="stylesheet" href="/vendor/combined-css" />
        <Script
          id="ld-org"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Fluximart',
              url: SITE_URL,
              logo: `${SITE_URL}/favicon.ico`,
              sameAs: [],
            }),
          }}
        />
        <Script
          id="ld-website"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              url: SITE_URL,
              potentialAction: {
                '@type': 'SearchAction',
                target: `${SITE_URL}/search?q={search_term_string}`,
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </head>
      <body>
        <header className="border-b border-white/10">
          <nav className="container flex items-center justify-between py-4">
            <div className="font-semibold text-xl">Fluximart</div>
            <div className="flex items-center gap-6">
              <div className="flex gap-4">
                <a href="/" className="hover:text-brand">Home</a>
                <a href="/marketplace" className="hover:text-brand">Marketplace</a>
                <a href="/generate" className="hover:text-brand">Generate</a>
                <a href="/drops" className="hover:text-brand">Daily AI Drops</a>
                <a href="/admin" className="hover:text-brand">Admin</a>
              </div>
              <div className="hidden md:flex items-center gap-4 text-sm">
                <a href="#" className="hover:text-brand">0 Credits Available ▾</a>
                <a href="/pricing" className="hover:text-brand">Pricing ▾</a>
                <a href="#" aria-label="Language" className="hover:text-brand">🌐</a>
                <a href="/favorites" aria-label="Favorites" className="hover:text-brand">♡</a>
                <a href="/purchases" aria-label="Cart" className="hover:text-brand">🛒</a>
                <a href="/dashboard" aria-label="Account" className="hover:text-brand">👤</a>
              </div>
            </div>
          </nav>
        </header>
        <main className="container py-8">{children}</main>
        <ActionRail />
        <footer className="border-t border-white/10">
          <div className="container py-8 text-sm text-white/60">
            © {new Date().getFullYear()} Fluximart · SnapStockX
          </div>
        </footer>
        <a
          href="/signin"
          aria-label="Admin"
          className="fixed bottom-4 left-4 h-10 w-10 rounded-full bg-brand text-black flex items-center justify-center shadow-lg"
        >
          ⚙
        </a>
        <Script src="/vendor/module/3460-f02c4fc16dec5c3d.mjs" strategy="afterInteractive" type="module" />
        <Script src="/vendor/ts/4223" strategy="afterInteractive" />
        <Script src="/vendor/js/4652-e0edf198733f58b1.js" strategy="afterInteractive" />
        <Script src="/vendor/module/4810-52e36fbcf6c6a858.mjs" strategy="afterInteractive" type="module" />
        <Script src="/vendor/ts/22" strategy="afterInteractive" />
        <Script src="/vendor/ts/234" strategy="afterInteractive" />
        <Script src="/vendor/module/1891-8b3bafbc9bebc368.mjs" strategy="afterInteractive" type="module" />
        <Script src="/vendor/module/2917-d80e8fdd95c148fe.mjs" strategy="afterInteractive" type="module" />
        <Script src="/vendor/module/3065-e54ac9852b6a19a6.mjs" strategy="afterInteractive" type="module" />
        <Script src="/vendor/combined-module" strategy="afterInteractive" type="module" />
        <Script src="/vendor/combined" strategy="afterInteractive" />
        <Script src="/vendor/_app-6c74d5efc75602e4" strategy="afterInteractive" />
        <Script src="/vendor/[[...slug]]-7f25df83424512ce.js" strategy="afterInteractive" />
      </body>
    </html>
  )
}
