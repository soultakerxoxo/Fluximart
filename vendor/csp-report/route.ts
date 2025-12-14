import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    await req.text()
  } catch {}
  return new NextResponse(null, { status: 204 })
}
