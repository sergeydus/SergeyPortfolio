import { spawn } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptsDirectory = path.dirname(fileURLToPath(import.meta.url))
const workspace = path.resolve(scriptsDirectory, '..')
const smokeURL = 'http://127.0.0.1:4173/SergeyPortfolio/'
const playwrightCLI = path.resolve(
  workspace,
  'node_modules',
  '@playwright',
  'test',
  'cli.js',
)

const server = spawn(process.execPath, ['scripts/serve-smoke.mjs'], {
  cwd: workspace,
  stdio: 'inherit',
})

async function waitForServer() {
  const deadline = Date.now() + 15_000

  while (Date.now() < deadline) {
    if (server.exitCode !== null) {
      throw new Error(`Smoke server exited early with code ${server.exitCode}`)
    }

    let response
    try {
      response = await fetch(smokeURL)
    } catch {
      // The server may not be listening yet.
    }

    if (response?.ok) {
      await new Promise((resolve) => setTimeout(resolve, 100))
      if (server.exitCode !== null) {
        throw new Error(`Smoke server exited early with code ${server.exitCode}`)
      }
      return
    }

    await new Promise((resolve) => setTimeout(resolve, 100))
  }

  throw new Error(`Smoke server did not become ready at ${smokeURL}`)
}

function runPlaywright() {
  return new Promise((resolve, reject) => {
    const runner = spawn(process.execPath, [playwrightCLI, 'test'], {
      cwd: workspace,
      env: {
        ...process.env,
        PLAYWRIGHT_BASE_URL: smokeURL,
      },
      stdio: 'inherit',
    })

    runner.once('error', reject)
    runner.once('exit', (code, signal) => {
      if (signal) {
        reject(new Error(`Playwright exited after signal ${signal}`))
        return
      }
      resolve(code ?? 1)
    })
  })
}

let exitCode = 1

try {
  await waitForServer()
  exitCode = await runPlaywright()
} finally {
  server.kill()
}

process.exitCode = exitCode
