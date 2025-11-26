import { useEffect, useRef } from 'react'

export default function GridBackground() {
  const canvasRef = useRef(null)
  const mousePos = useRef({ x: 0, y: 0 })
  const animationFrameRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const gridSize = 50
    let isRunning = true

    // Canvas boyutunu ayarla
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr)
    }
    resizeCanvas()

    // Mouse pozisyonunu takip et
    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
    }

    // Grid çizim fonksiyonu
    const drawGrid = () => {
      if (!isRunning || !ctx) return

      try {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

        const cols = Math.ceil(window.innerWidth / gridSize)
        const rows = Math.ceil(window.innerHeight / gridSize)

        for (let i = 0; i <= cols; i++) {
          for (let j = 0; j <= rows; j++) {
            const x = i * gridSize
            const y = j * gridSize

            const dx = mousePos.current.x - x
            const dy = mousePos.current.y - y
            const distance = Math.sqrt(dx * dx + dy * dy)

            const maxDistance = 300
            let opacity = Math.max(0, 1 - distance / maxDistance)
            opacity = Math.pow(opacity, 2)

            if (opacity > 0.01) {
              ctx.strokeStyle = `rgba(98, 146, 158, ${opacity * 0.4})`
              ctx.lineWidth = 1

              ctx.beginPath()
              ctx.moveTo(x, y)
              ctx.lineTo(x, y + gridSize)
              ctx.stroke()

              ctx.beginPath()
              ctx.moveTo(x, y)
              ctx.lineTo(x + gridSize, y)
              ctx.stroke()
            }
          }
        }
      } catch (error) {
        console.error('Grid drawing error:', error)
      }

      if (isRunning) {
        animationFrameRef.current = requestAnimationFrame(drawGrid)
      }
    }

    // Event listeners
    const handleResize = () => {
      resizeCanvas()
      if (!animationFrameRef.current && isRunning) {
        drawGrid()
      }
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)

    // Start animation
    drawGrid()

    return () => {
      isRunning = false
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }
    }
  }, [])

  return (
    <>
      {/* Subtle gradient background */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(180deg, rgba(232, 238, 241, 0.3) 0%, rgba(253, 253, 255, 0.1) 50%, rgba(212, 223, 229, 0.2) 100%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />
      
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 500
        }}
      />
    </>
  )
}
