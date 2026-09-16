'use client'

import { useEffect, useRef } from 'react'

const COLUMNS = 54
const ROWS = 42
const INSTANCE_COUNT = COLUMNS * ROWS
const GRID_SPACING_X = 1
const GRID_SPACING_Z = 0.82
const EDGE_FADE_CELLS = 6

export default function HeroField({ paused = false }: { paused?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pausedRef = useRef(paused)

  useEffect(() => {
    pausedRef.current = paused
    window.dispatchEvent(new CustomEvent('portfolio:motion-change'))
  }, [paused])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let cancelled = false
    let cancelInitialization: (() => void) | undefined
    let disposeScene: (() => void) | undefined

    const initialize = async () => {
      performance.mark('portfolio:webgl:init:start')

      try {
        const THREE = await import('three')
        if (cancelled) return

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
        const scene = new THREE.Scene()
        scene.fog = new THREE.FogExp2(0x030712, 0.052)

        const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 80)
        camera.position.set(0, 10.5, 17)
        camera.lookAt(0, -1.6, -2.5)

        const renderer = new THREE.WebGLRenderer({
          canvas,
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
        })

        const gl = renderer.getContext()
        const rendererInfo = gl.getExtension('WEBGL_debug_renderer_info')
        const rendererName = String(
          gl.getParameter(rendererInfo?.UNMASKED_RENDERER_WEBGL ?? gl.RENDERER),
        )

        // Continuous instanced animation overwhelms software rasterizers such as
        // SwiftShader and llvmpipe. Keep the designed CSS field visible instead
        // of degrading the rest of the page on machines without GPU WebGL.
        if (/swiftshader|llvmpipe|software rasterizer/i.test(rendererName)) {
          canvas.dataset.webglState = 'fallback'
          renderer.dispose()
          renderer.forceContextLoss()
          return
        }

        renderer.setClearColor(0x030712, 0)
        renderer.outputColorSpace = THREE.SRGBColorSpace
        renderer.toneMapping = THREE.ACESFilmicToneMapping
        renderer.toneMappingExposure = 1.38

        const fieldOffsetX = 3.2
        const geometry = new THREE.BoxGeometry(1, 1, 1)
        const material = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          emissive: 0x0b2848,
          emissiveIntensity: 1.15,
          metalness: 0.26,
          roughness: 0.38,
          vertexColors: true,
        })
        const field = new THREE.InstancedMesh(geometry, material, INSTANCE_COUNT)
        field.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
        field.frustumCulled = false
        field.position.x = fieldOffsetX
        const edgeMaterial = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          wireframe: true,
          transparent: true,
          opacity: 0.58,
          blending: THREE.AdditiveBlending,
          vertexColors: true,
          depthWrite: false,
        })
        const edges = new THREE.InstancedMesh(geometry, edgeMaterial, INSTANCE_COUNT)
        edges.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
        edges.frustumCulled = false
        edges.position.x = fieldOffsetX
        scene.add(field, edges)

        const floorGeometry = new THREE.PlaneGeometry(76, 64)
        const floorMaterial = new THREE.MeshStandardMaterial({
          color: 0x03060d,
          metalness: 0.08,
          roughness: 0.96,
          transparent: true,
          opacity: 0.92,
        })
        const floor = new THREE.Mesh(floorGeometry, floorMaterial)
        floor.rotation.x = -Math.PI / 2
        floor.position.set(fieldOffsetX, -1.82, 0)
        scene.add(floor)

        const ambient = new THREE.HemisphereLight(0xb8f7ff, 0x130725, 2.25)
        const keyLight = new THREE.DirectionalLight(0x9be8ff, 1.65)
        const pointerLight = new THREE.PointLight(0x5eeeff, 92, 17, 1.55)
        const violetLight = new THREE.PointLight(0xb875ff, 68, 20, 1.45)
        keyLight.position.set(-9, 14, 11)
        pointerLight.position.set(0, 4.5, 4)
        violetLight.position.set(-9, 2.5, -7)
        scene.add(ambient, keyLight, pointerLight, violetLight)

        const dummy = new THREE.Object3D()
        const color = new THREE.Color()
        const edgeColor = new THREE.Color()
        const baseColor = new THREE.Color(0x176882)
        const edgeBaseColor = new THREE.Color(0x67e8f9)
        const cyanColor = new THREE.Color(0x8ff8ff)
        const violetColor = new THREE.Color(0xd8b4fe)
        const backgroundColor = new THREE.Color(0x030712)
        const blackColor = new THREE.Color(0x000000)
        const pointer = new THREE.Vector2(0.16, -0.08)
        const targetPointer = new THREE.Vector2(0.16, -0.08)
        const hillPosition = new THREE.Vector2()
        const targetHillPosition = new THREE.Vector2()
        const raycaster = new THREE.Raycaster()
        // Track near the visible crest instead of the hidden floor footprint. This
        // compensates for the low camera angle while keeping the interaction in 3D.
        const interactionPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -3.5)
        const planeIntersection = new THREE.Vector3()

        let animationFrame = 0
        let isVisible = true
        let contextLost = false
        let renderedFrames = 0

        const resize = () => {
          const bounds = canvas.getBoundingClientRect()
          if (!bounds.width || !bounds.height) return
          renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6))
          renderer.setSize(bounds.width, bounds.height, false)
          camera.aspect = bounds.width / bounds.height
          camera.updateProjectionMatrix()
        }

        const render = (time: number) => {
          const seconds = reducedMotion.matches ? 1.4 : time * 0.001
          pointer.lerp(targetPointer, reducedMotion.matches ? 1 : 0.065)

          camera.position.x = pointer.x * 1.15
          camera.position.y = 10.5 + pointer.y * 0.7
          camera.lookAt(pointer.x * 0.5, -1.6, -2.5)

          raycaster.setFromCamera(pointer, camera)
          if (raycaster.ray.intersectPlane(interactionPlane, planeIntersection)) {
            targetHillPosition.set(
              THREE.MathUtils.clamp(planeIntersection.x - fieldOffsetX, -14.2, 14.2),
              THREE.MathUtils.clamp(planeIntersection.z, -9.5, 8.7),
            )
          }
          hillPosition.lerp(targetHillPosition, reducedMotion.matches ? 1 : 0.12)

          const lightX = hillPosition.x
          const lightZ = hillPosition.y
          pointerLight.position.x = lightX + fieldOffsetX
          pointerLight.position.z = lightZ
          violetLight.position.x = fieldOffsetX - 8 + Math.sin(seconds * 0.32) * 3
          violetLight.position.z = -6 + Math.cos(seconds * 0.28) * 2

          let index = 0
          for (let row = 0; row < ROWS; row += 1) {
            const z = (row - (ROWS - 1) / 2) * GRID_SPACING_Z
            for (let column = 0; column < COLUMNS; column += 1) {
              const x = (column - (COLUMNS - 1) / 2) * GRID_SPACING_X
              const edgeDistance = Math.min(
                row,
                ROWS - 1 - row,
                column,
                COLUMNS - 1 - column,
              )
              const edgeFade = THREE.MathUtils.smoothstep(edgeDistance, 0, EDGE_FADE_CELLS)
              const travelingWave = Math.sin(x * 0.68 + z * 0.32 - seconds * 1.65)
              const crossingWave = Math.cos(z * 0.72 - x * 0.16 + seconds * 1.1)
              const distance = Math.hypot(x - lightX, z - lightZ)
              const pointerLift = Math.max(0, 1 - distance / 7)
              const wave = (travelingWave * 0.58 + crossingWave * 0.42 + 1) * 0.5
              const height = 0.55 + wave * 2 + pointerLift * 5.25

              const visibleHeight = Math.max(0.001, height * edgeFade)
              const footprintX = Math.max(0.001, GRID_SPACING_X * edgeFade)
              const footprintZ = Math.max(0.001, GRID_SPACING_Z * edgeFade)

              dummy.position.set(x, -1.78 + visibleHeight / 2, z)
              dummy.scale.set(footprintX, visibleHeight, footprintZ)
              dummy.rotation.set(0, 0, 0)
              dummy.updateMatrix()
              field.setMatrixAt(index, dummy.matrix)
              edges.setMatrixAt(index, dummy.matrix)

              const glow = Math.min(1, pointerLift * 1.35 + wave * 0.36)
              color.copy(baseColor).lerp(index % 5 === 0 ? violetColor : cyanColor, glow)
              color.lerp(backgroundColor, 1 - edgeFade)
              field.setColorAt(index, color)
              edgeColor
                .copy(edgeBaseColor)
                .lerp(index % 5 === 0 ? violetColor : cyanColor, 0.24 + glow * 0.58)
                .lerp(blackColor, 1 - edgeFade)
              edges.setColorAt(index, edgeColor)
              index += 1
            }
          }

          field.instanceMatrix.needsUpdate = true
          edges.instanceMatrix.needsUpdate = true
          if (field.instanceColor) field.instanceColor.needsUpdate = true
          if (edges.instanceColor) edges.instanceColor.needsUpdate = true
          renderer.render(scene, camera)

          renderedFrames += 1
          if (renderedFrames === 2) {
            performance.mark('portfolio:webgl:init:end')
            canvas.dataset.webglState = reducedMotion.matches ? 'reduced' : 'running'
            canvas.classList.add('is-ready')
          }
        }

        const animate = (time: number) => {
          render(time)
          if (
            !reducedMotion.matches
            && !pausedRef.current
            && isVisible
            && !document.hidden
            && !contextLost
          ) {
            animationFrame = requestAnimationFrame(animate)
          }
        }

        const start = () => {
          cancelAnimationFrame(animationFrame)
          if (contextLost) return

          if (reducedMotion.matches || pausedRef.current || !isVisible || document.hidden) {
            render(performance.now())
            canvas.dataset.webglState = reducedMotion.matches ? 'reduced' : 'paused'
            return
          }

          canvas.dataset.webglState = 'running'
          animationFrame = requestAnimationFrame(animate)
        }

        const handlePointerMove = (event: PointerEvent) => {
          const bounds = canvas.getBoundingClientRect()
          if (event.clientY < bounds.top || event.clientY > bounds.bottom) return
          const normalizedX = ((event.clientX - bounds.left) / Math.max(bounds.width, 1) - 0.5) * 2
          const normalizedY = ((event.clientY - bounds.top) / Math.max(bounds.height, 1) - 0.5) * 2
          targetPointer.set(normalizedX, -normalizedY)
        }

        const handleContextLost = (event: Event) => {
          event.preventDefault()
          contextLost = true
          cancelAnimationFrame(animationFrame)
          canvas.dataset.webglState = 'fallback'
          canvas.classList.remove('is-ready')
        }

        const handleContextRestored = () => {
          contextLost = false
          resize()
          start()
        }

        const handleMotionChange = () => start()

        const visibilityObserver = new IntersectionObserver(
          ([entry]) => {
            isVisible = entry.isIntersecting
            start()
          },
          { threshold: 0.01 },
        )
        const resizeObserver = new ResizeObserver(() => {
          resize()
          if (reducedMotion.matches || !isVisible) render(performance.now())
        })

        visibilityObserver.observe(canvas)
        resizeObserver.observe(canvas)
        window.addEventListener('pointermove', handlePointerMove, { passive: true })
        window.addEventListener('portfolio:motion-change', handleMotionChange)
        document.addEventListener('visibilitychange', start)
        reducedMotion.addEventListener('change', start)
        canvas.addEventListener('webglcontextlost', handleContextLost)
        canvas.addEventListener('webglcontextrestored', handleContextRestored)

        resize()
        render(performance.now())
        render(performance.now() + 16)
        start()

        disposeScene = () => {
          cancelAnimationFrame(animationFrame)
          visibilityObserver.disconnect()
          resizeObserver.disconnect()
          window.removeEventListener('pointermove', handlePointerMove)
          window.removeEventListener('portfolio:motion-change', handleMotionChange)
          document.removeEventListener('visibilitychange', start)
          reducedMotion.removeEventListener('change', start)
          canvas.removeEventListener('webglcontextlost', handleContextLost)
          canvas.removeEventListener('webglcontextrestored', handleContextRestored)
          geometry.dispose()
          material.dispose()
          edgeMaterial.dispose()
          floorGeometry.dispose()
          floorMaterial.dispose()
          renderer.dispose()
          renderer.forceContextLoss()
        }
      } catch {
        canvas.dataset.webglState = 'fallback'
      }
    }

    if ('requestIdleCallback' in window) {
      const idleId = window.requestIdleCallback(initialize, { timeout: 450 })
      cancelInitialization = () => window.cancelIdleCallback(idleId)
    } else {
      const timeoutId = setTimeout(initialize, 120)
      cancelInitialization = () => clearTimeout(timeoutId)
    }

    return () => {
      cancelled = true
      cancelInitialization?.()
      disposeScene?.()
    }
  }, [])

  return (
    <div aria-hidden="true" className="hero-field absolute inset-0">
      <div className="hero-field-fallback absolute inset-0" />
      <canvas
        ref={canvasRef}
        data-webgl-state="loading"
        className="hero-webgl absolute inset-0 h-full w-full"
      />
    </div>
  )
}
