import fs from 'node:fs'
import { NextResponse } from 'next/server'

export async function GET() {
  const src = 'c:\\Users\\HP\\OneDrive\\Videos\\Final products\\3460-f02c4fc16dec5c3d.mjs'
  if (fs.existsSync(src)) {
    const content = fs.readFileSync(src, 'utf8')
    return new NextResponse(content, {
      headers: { 'content-type': 'application/javascript; charset=utf-8' },
    })
  }
  return new NextResponse('', { status: 404 })
}
