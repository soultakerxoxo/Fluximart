import fs from 'node:fs'
import path from 'node:path'
import { NextResponse } from 'next/server'
import ts from 'typescript'

export async function GET() {
  const dirJs = path.join(process.cwd(), 'public', 'vendor', 'inline')
  const dirTs = path.join(process.cwd(), 'public', 'vendor', 'inline-ts')
  const parts: string[] = []
  if (fs.existsSync(dirJs)) {
    const files = fs.readdirSync(dirJs).filter((f) => f.endsWith('.js'))
    files.sort()
    for (const f of files) {
      const full = path.join(dirJs, f)
      try {
        const content = fs.readFileSync(full, 'utf8')
        parts.push(content)
      } catch {}
    }
  }
  if (fs.existsSync(dirTs)) {
    const files = fs.readdirSync(dirTs).filter((f) => f.endsWith('.ts'))
    files.sort()
    for (const f of files) {
      const full = path.join(dirTs, f)
      try {
        const content = fs.readFileSync(full, 'utf8')
        const out = ts.transpileModule(content, {
          compilerOptions: { target: ts.ScriptTarget.ES2019, module: ts.ModuleKind.ESNext },
        })
        parts.push(out.outputText)
      } catch {}
    }
  }
  const body = parts.join('\n;\n')
  return new NextResponse(body, {
    headers: { 'content-type': 'application/javascript; charset=utf-8' },
  })
}
