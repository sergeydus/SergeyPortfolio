import { cp, mkdir, rm } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptsDirectory = path.dirname(fileURLToPath(import.meta.url))
const workspace = path.resolve(scriptsDirectory, '..')
const exportDirectory = path.resolve(workspace, 'out')
const stageRoot = path.resolve(workspace, '.smoke')
const stageDirectory = path.resolve(stageRoot, 'SergeyPortfolio')

if (
  path.dirname(stageRoot) !== workspace
  || path.basename(stageRoot) !== '.smoke'
) {
  throw new Error(`Refusing to replace unexpected smoke directory: ${stageRoot}`)
}

await rm(stageRoot, { recursive: true, force: true })
await mkdir(stageRoot, { recursive: true })
await cp(exportDirectory, stageDirectory, { recursive: true })

console.log(`Staged static export at ${stageDirectory}`)
