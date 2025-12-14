import fs from 'node:fs'
import { NextResponse } from 'next/server'
import ts from 'typescript'

export async function GET() {
  const src = 'c:\\Users\\HP\\OneDrive\\Videos\\Final products\\234.ts'
  if (fs.existsSync(src)) {
    const content = fs.readFileSync(src, 'utf8')
    const out = ts.transpileModule(content, {
      compilerOptions: { target: ts.ScriptTarget.ES2019, module: ts.ModuleKind.ESNext },
    })
    return new NextResponse(out.outputText, {
      headers: { 'content-type': 'application/javascript; charset=utf-8' },
    })
  }
  return new NextResponse('', { status: 404 })
}
