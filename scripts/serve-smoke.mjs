import { createReadStream } from 'node:fs'
import { stat } from 'node:fs/promises'
import { createServer } from 'node:http'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptsDirectory = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(scriptsDirectory, '..', '.smoke')
const host = '127.0.0.1'
const port = 4173

const contentTypes = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.svg', 'image/svg+xml'],
  ['.txt', 'text/plain; charset=utf-8'],
  ['.xml', 'application/xml; charset=utf-8'],
])

const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(
      new URL(request.url ?? '/', `http://${host}:${port}`).pathname,
    )
    const relativePath = pathname.replace(/^\/+/, '')
    let filePath = path.resolve(root, relativePath)

    if (filePath !== root && !filePath.startsWith(`${root}${path.sep}`)) {
      response.writeHead(403).end('Forbidden')
      return
    }

    const fileStats = await stat(filePath)
    if (fileStats.isDirectory()) {
      filePath = path.join(filePath, 'index.html')
    }

    response.writeHead(200, {
      'Cache-Control': 'no-store',
      'Content-Type': contentTypes.get(path.extname(filePath)) ?? 'application/octet-stream',
    })
    createReadStream(filePath).pipe(response)
  } catch {
    response.writeHead(404).end('Not found')
  }
})

server.listen(port, host, () => {
  console.log(`Serving staged export at http://${host}:${port}/SergeyPortfolio/`)
})
