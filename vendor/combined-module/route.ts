import fs from 'node:fs'
import path from 'node:path'
import { NextResponse } from 'next/server'

export async function GET() {
  const dirMod = path.join(process.cwd(), 'public', 'vendor', 'inline-module')
  const parts: string[] = []
  if (fs.existsSync(dirMod)) {
    const files = fs
      .readdirSync(dirMod)
      .filter((f) => f.endsWith('.mjs') || f.endsWith('.js'))
      .sort()
    for (const f of files) {
      const full = path.join(dirMod, f)
      try {
        const content = fs.readFileSync(full, 'utf8')
        parts.push(content)
      } catch {}
    }
  }
  const body = parts.join('\n;\n')
  return new NextResponse(body, {
    headers: { 'content-type': 'application/javascript; charset=utf-8' },
  })
}
