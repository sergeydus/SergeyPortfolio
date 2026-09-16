import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'

const publicSiteURL = 'https://sergeydus.github.io/SergeyPortfolio/'
const expectedOrigin = new URL(
  process.env.PLAYWRIGHT_BASE_URL ?? 'http://127.0.0.1:4173/SergeyPortfolio/',
).origin

function collectPageFailures(page: Page) {
  const failures: string[] = []

  page.on('console', (message) => {
    if (message.type() === 'error') {
      failures.push(`console: ${message.text()}`)
    }
  })
  page.on('requestfailed', (request) => {
    failures.push(`request: ${request.url()} (${request.failure()?.errorText ?? 'failed'})`)
  })
  page.on('response', (response) => {
    if (new URL(response.url()).origin === expectedOrigin && response.status() >= 400) {
      failures.push(`response: ${response.status()} ${response.url()}`)
    }
  })

  return failures
}

async function exposeSoftwareWebGLAsHardware(page: Page) {
  await page.addInitScript(() => {
    const rendererParameters = new Set([0x1f01, 0x9246])
    const prototypes = [
      WebGLRenderingContext.prototype,
      WebGL2RenderingContext.prototype,
    ]

    for (const prototype of prototypes) {
      const getParameter = prototype.getParameter
      prototype.getParameter = function getTestParameter(parameter: number) {
        if (rendererParameters.has(parameter)) return 'ANGLE (Test Hardware GPU)'
        return getParameter.call(this, parameter)
      }
    }
  })
}

test('loads the canonical export and completes the primary journey', async ({ page }) => {
  const failures = collectPageFailures(page)
  const response = await page.goto('.')

  expect(response?.ok()).toBe(true)
  await expect(page).toHaveTitle(/Sergey Dushevski/)
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', publicSiteURL)
  await expect(page.getByRole('heading', { name: 'Sergey Dushevski', level: 1 })).toBeVisible()
  await expect(page.getByText(/Enterprise Banking Program/).first()).toBeVisible()
  await expect(page.getByText('Apr 2026 - Aug 11, 2026', { exact: true })).toBeVisible()
  await expect(page.getByText('Matrix', { exact: true })).toHaveCount(0)
  await expect(page.locator('a[href^="tel:"]')).toHaveCount(0)
  await expect(page.locator('a[href*="linkedin.com"]')).toHaveCount(0)

  await page.getByRole('link', { name: 'Explore experience' }).click()
  await expect(page).toHaveURL(/#experience$/)
  await expect(page.locator('#experience')).toBeVisible()

  const experienceComesFirst = await page.locator('#experience').evaluate((experience) => {
    const projects = document.querySelector('#projects')
    return Boolean(projects && experience.compareDocumentPosition(projects) & Node.DOCUMENT_POSITION_FOLLOWING)
  })
  expect(experienceComesFirst).toBe(true)

  const experienceMedia = [
    ['Mekome mobile finance screen', '/SergeyPortfolio/experience/mekome-interface.webp'],
    ['SupPlant Map View', '/SergeyPortfolio/experience/supplant-map.webp'],
    ['Sparko accessible TV interface', '/SergeyPortfolio/experience/sparko-tv.webp'],
  ] as const

  for (const [altText, expectedPath] of experienceMedia) {
    const image = page.getByAltText(new RegExp(altText))
    await image.scrollIntoViewIfNeeded()
    await expect(image).toHaveAttribute('src', new RegExp(`${expectedPath.replaceAll('/', '\\/')}$`))
    await expect(image).toHaveJSProperty('complete', true)
    expect(await image.evaluate((element: HTMLImageElement) => element.naturalWidth)).toBeGreaterThan(0)
  }

  await page.locator('a[href="#projects"]').first().click()
  await expect(page).toHaveURL(/#projects$/)
  await expect(page.locator('#projects')).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Agent Bridge' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Deadlock Draft Oracle' })).toBeVisible()

  const projectCapture = page.getByAltText(/Deadlock Draft Oracle project interface/)
  await expect(projectCapture).toHaveAttribute(
    'src',
    /\/SergeyPortfolio\/projects\/deadlock-draft-oracle\.webp$/,
  )
  await projectCapture.scrollIntoViewIfNeeded()
  await expect(projectCapture).toHaveJSProperty('complete', true)
  expect(await projectCapture.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0)

  const ditherArtwork = page.getByAltText(/mountain landscape transformed with an ordered color-dithering pattern/)
  await ditherArtwork.scrollIntoViewIfNeeded()
  await expect(ditherArtwork).toHaveAttribute(
    'src',
    /\/SergeyPortfolio\/projects\/dither-it-art\.webp$/,
  )
  await expect(ditherArtwork.locator('xpath=..').getByText('LIVE PROJECT / CAPTURE')).toHaveCount(0)

  await page.locator('a[href="#contact"]').first().click()
  await expect(page).toHaveURL(/#contact$/)
  await expect(page.getByRole('link', { name: 'Email Sergey' })).toHaveAttribute('href', /^mailto:/)

  expect(failures).toEqual([])
})

test('runs the Three.js scene only while it is useful and keeps its fallback', async ({ page }) => {
  await page.goto('.')

  const canvas = page.locator('canvas[data-webgl-state]')
  await expect(canvas).toHaveAttribute('data-webgl-state', /^(running|fallback)$/)
  const initialState = await canvas.getAttribute('data-webgl-state')

  if (initialState === 'running') {
    const motionControl = page.getByRole('button', { name: 'Pause motion' })
    await motionControl.click()
    const playMotionControl = page.getByRole('button', { name: 'Play motion' })
    await expect(playMotionControl).toHaveAttribute('aria-pressed', 'true')
    await expect(playMotionControl).toBeFocused()
    await expect(canvas).toHaveAttribute('data-webgl-state', 'paused')

    await playMotionControl.click()
    await expect(page.getByRole('button', { name: 'Pause motion' })).toHaveAttribute(
      'aria-pressed',
      'false',
    )
    await expect(canvas).toHaveAttribute('data-webgl-state', 'running')

    await page.locator('#projects').scrollIntoViewIfNeeded()
    await expect(canvas).toHaveAttribute('data-webgl-state', 'paused')

    await page.locator('#top').scrollIntoViewIfNeeded()
    await expect(canvas).toHaveAttribute('data-webgl-state', 'running')

    await canvas.evaluate((element) => {
      element.dispatchEvent(new Event('webglcontextlost', { cancelable: true }))
    })
    await expect(canvas).toHaveAttribute('data-webgl-state', 'fallback')

    await canvas.evaluate((element) => {
      element.dispatchEvent(new Event('webglcontextrestored'))
    })
    await expect(canvas).toHaveAttribute('data-webgl-state', 'running')
    await expect(canvas).toHaveClass(/is-ready/)
  }
})

test.describe('reduced motion', () => {
  test.use({ reducedMotion: 'reduce' })

  test('renders a still Three.js frame or the CSS fallback', async ({ page }) => {
    await page.goto('.')
    await expect(page.getByRole('button', { name: /motion/i })).toHaveCount(0)
    await expect(page.locator('canvas[data-webgl-state]')).toHaveAttribute(
      'data-webgl-state',
      /^(reduced|fallback)$/,
    )
  })
})

test.describe('WebGL context recovery', () => {
  test.use({ reducedMotion: 'reduce' })

  test('restores the scene while animation remains reduced', async ({ page }) => {
    await exposeSoftwareWebGLAsHardware(page)
    await page.goto('.')

    const canvas = page.locator('canvas[data-webgl-state]')
    await expect(canvas).toHaveAttribute('data-webgl-state', 'reduced')
    await expect(canvas).toHaveClass(/is-ready/)

    await canvas.evaluate((element) => {
      element.dispatchEvent(new Event('webglcontextlost', { cancelable: true }))
    })
    await expect(canvas).toHaveAttribute('data-webgl-state', 'fallback')
    await expect(canvas).not.toHaveClass(/is-ready/)

    await canvas.evaluate((element) => {
      element.dispatchEvent(new Event('webglcontextrestored'))
    })
    await expect(canvas).toHaveAttribute('data-webgl-state', 'reduced')
    await expect(canvas).toHaveClass(/is-ready/)
  })
})

test('exports discovery metadata under the repository base path', async ({ request }) => {
  const robotsResponse = await request.get('robots.txt')
  const sitemapResponse = await request.get('sitemap.xml')

  expect(robotsResponse.ok()).toBe(true)
  expect(await robotsResponse.text()).toContain(`${publicSiteURL}sitemap.xml`)
  expect(sitemapResponse.ok()).toBe(true)
  expect(await sitemapResponse.text()).toContain(`<loc>${publicSiteURL}</loc>`)
})

test('returns a stable 404 for asset-only directories', async ({ request }) => {
  const directoryResponse = await request.get('projects/')
  expect(directoryResponse.status()).toBe(404)

  const pageResponse = await request.get('.')
  expect(pageResponse.ok()).toBe(true)
})

test('has no automated WCAG A or AA violations', async ({ page }) => {
  await page.goto('.')

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze()

  expect(results.violations).toEqual([])
})

test('gives repeated external actions descriptive accessible names', async ({ page }) => {
  await page.goto('.')

  await expect(
    page.getByRole('link', { name: 'View public product: Mekome (opens in a new tab)' }),
  ).toHaveCount(1)
  await expect(
    page.getByRole('link', { name: 'Launch project: DitherIT (opens in a new tab)' }),
  ).toHaveCount(1)
  await expect(
    page.getByRole('link', { name: 'Source: Agent Bridge (opens in a new tab)' }),
  ).toHaveCount(1)
})

test.describe('WCAG reflow and text spacing', () => {
  test.use({ viewport: { width: 320, height: 900 } })

  test('keeps content inside a 320 CSS pixel viewport with text overrides', async ({ page }) => {
    await page.goto('.')
    await page.addStyleTag({
      content: `
        * {
          line-height: 1.5 !important;
          letter-spacing: 0.12em !important;
          word-spacing: 0.16em !important;
        }
        p { margin-bottom: 2em !important; }
      `,
    })

    const overflow = await page.evaluate(() => {
      const viewportWidth = document.documentElement.clientWidth
      const selectors = 'h1, h2, h3, h4, p, li, a, button'

      return [...document.querySelectorAll<HTMLElement>(selectors)]
        .filter((element) => {
          const style = getComputedStyle(element)
          const bounds = element.getBoundingClientRect()
          return (
            style.display !== 'none'
            && style.visibility !== 'hidden'
            && bounds.width > 0
            && (bounds.left < -1 || bounds.right > viewportWidth + 1)
          )
        })
        .map((element) => element.textContent?.trim().replace(/\s+/g, ' ').slice(0, 80))
    })

    expect(overflow).toEqual([])
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      ),
    ).toBeLessThanOrEqual(0)
  })
})

test.describe('mobile export', () => {
  test.use({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
  })

  test('supports the menu and serves responsive first-party media', async ({ page }) => {
    const failures = collectPageFailures(page)
    await page.goto('.')

    const menuButton = page.locator('button[aria-controls="mobile-navigation"]')
    await menuButton.click()
    await expect(menuButton).toHaveAttribute('aria-expanded', 'true')
    await expect(page.locator('#mobile-navigation')).toBeVisible()

    await page.keyboard.press('Escape')
    await expect(menuButton).toBeFocused()
    await expect(menuButton).toHaveAccessibleName('Open navigation menu')
    await expect(page.locator('#mobile-navigation')).toBeHidden()

    await page.locator('#education').scrollIntoViewIfNeeded()
    const logo = page.locator('img[alt="Tel-Hai College"]')
    await expect(logo).toBeVisible()
    await expect(logo).toHaveAttribute('src', /\/SergeyPortfolio\/telhai-logo\.svg$/)
    await expect(logo).toHaveJSProperty('complete', true)

    expect(failures).toEqual([])
  })
})
