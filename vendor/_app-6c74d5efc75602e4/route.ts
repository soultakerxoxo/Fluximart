import fs from 'node:fs'
import { NextResponse } from 'next/server'

export async function GET() {
  const src = process.env.DROVA_VENDOR_APP_PATH
  if (src && fs.existsSync(src)) {
    const content = fs.readFileSync(src, 'utf8')
    return new NextResponse(content, {
      headers: { 'content-type': 'application/javascript; charset=utf-8' },
    })
  }
  return new NextResponse('', {
    status: 404,
    headers: { 'content-type': 'application/javascript; charset=utf-8' },
  })
}
