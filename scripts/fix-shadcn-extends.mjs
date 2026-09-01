// Workaround for a known upstream limitation: @vue/compiler-sfc can't
// resolve `extends XxxProps` when XxxProps comes from reka-ui's barrel
// re-exports (see https://github.com/unovue/shadcn-vue/issues/1504).
// Run after every `shadcn-vue add <component>`.
import { readFileSync, writeFileSync } from 'node:fs'
import { glob } from 'node:fs/promises'

const pattern = /extends (?!\/\* @vue-ignore \*\/)(\w+Props)/g
let patchedCount = 0

for await (const file of glob('app/components/ui/**/*.vue')) {
  const content = readFileSync(file, 'utf8')
  if (!pattern.test(content)) continue
  pattern.lastIndex = 0

  const patched = content.replace(pattern, 'extends /* @vue-ignore */ $1')
  writeFileSync(file, patched)
  patchedCount++
  console.log(`patched: ${file}`)
}

console.log(patchedCount ? `Done — ${patchedCount} file(s) patched.` : 'No files needed patching.')
