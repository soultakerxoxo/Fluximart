import fs from 'node:fs'
import { NextResponse } from 'next/server'

export async function GET() {
  const src = 'c:\\Users\\HP\\OneDrive\\Videos\\Final products\\2917-d80e8fdd95c148fe.mjs'
  if (fs.existsSync(src)) {
    const content = fs.readFileSync(src, 'utf8')
    return new NextResponse(content, {
      headers: { 'content-type': 'application/javascript; charset=utf-8' },
    })
  }
  return new NextResponse('', { status: 404 })
}
