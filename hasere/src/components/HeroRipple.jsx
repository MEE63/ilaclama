import { useEffect, useRef } from 'react'

export default function HeroRipple() {
  const canvasRef = useRef(null)
  const mousePos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const gridSize = 50

    const resizeCanvas = () => {
      const section = canvas.parentElement
      canvas.width = section.offsetWidth
      canvas.height = section.offsetHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mousePos.current = { 
        x: e.clientX - rect.left, 
        y: e.clientY - rect.top 
      }
    }
    canvas.addEventListener('mousemove', handleMouseMove)

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const cols = Math.ceil(canvas.width / gridSize)
      const rows = Math.ceil(canvas.height / gridSize)

      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const x = i * gridSize
          const y = j * gridSize

          const dx = mousePos.current.x - x
          const dy = mousePos.current.y - y
          const distance = Math.sqrt(dx * dx + dy * dy)

          const maxDistance = 250
          let opacity = Math.max(0, 1 - distance / maxDistance)
          opacity = Math.pow(opacity, 2)

          if (opacity > 0.01) {
            ctx.strokeStyle = `rgba(98, 146, 158, ${opacity * 0.5})`
            ctx.lineWidth = 1.5

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

      requestAnimationFrame(drawGrid)
    }

    drawGrid()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      canvas.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'auto',
        zIndex: 0
      }}
    />
  )
}
