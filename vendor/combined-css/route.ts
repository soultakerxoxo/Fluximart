import fs from 'node:fs'
import path from 'node:path'
import { NextResponse } from 'next/server'

export async function GET() {
  const dirCss = path.join(process.cwd(), 'public', 'vendor', 'inline-css')
  const parts: string[] = []
  if (fs.existsSync(dirCss)) {
    const files = fs.readdirSync(dirCss).filter((f) => f.endsWith('.css')).sort()
    for (const f of files) {
      const full = path.join(dirCss, f)
      try {
        const content = fs.readFileSync(full, 'utf8')
        parts.push(content)
      } catch {}
    }
  }
  const body = parts.join('\n')
  return new NextResponse(body, {
    headers: { 'content-type': 'text/css; charset=utf-8' },
  })
}
