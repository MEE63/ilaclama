import { useEffect, useRef } from 'react'

export default function RippleBackground() {
  const canvasRef = useRef(null)
  const mousePos = useRef({ x: 0, y: 0 })
  const animationFrameRef = useRef(null)
  const pestsRef = useRef([])
  const pestImagesRef = useRef([])
  const spawnIntervalRef = useRef(null)
  const startTimeRef = useRef(Date.now())

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const gridSize = 50

    // Canvas boyutunu ayarla
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Mouse pozisyonunu takip et
    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Haşere resimlerini yükle - Gerçek haşere görselleri
    const pestUrls = [
      'https://raw.githubusercontent.com/twitter/twemoji/master/assets/72x72/1fab3.png', // hamamböceği
      'https://raw.githubusercontent.com/twitter/twemoji/master/assets/72x72/1f577.png', // örümcek (DÜZELTME: .ilpng -> .png)
      'https://raw.githubusercontent.com/twitter/twemoji/master/assets/72x72/1f41c.png', // karınca
      'https://raw.githubusercontent.com/twitter/twemoji/master/assets/72x72/1f41b.png', // böcek/uğurböceği
      'https://raw.githubusercontent.com/twitter/twemoji/master/assets/72x72/1fab2.png', // beetle
    ]

    pestUrls.forEach((url) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      
      // Hata kontrolü ekle
      img.onerror = () => {
        console.warn(`Failed to load image: ${url}`)
      }
      
      img.src = url
      pestImagesRef.current.push(img)
    })

    // Yeni haşere spawn et
    const spawnPest = () => {
      const elapsedTime = (Date.now() - startTimeRef.current) / 1000 // saniye cinsinden
      
      // 121 saniye geçtiyse ve 20 haşere varsa spawn'u durdur
      if (elapsedTime > 121 && pestsRef.current.length >= 5) {
        if (spawnIntervalRef.current) {
          clearInterval(spawnIntervalRef.current)
          spawnIntervalRef.current = null
        }
        return
      }

      // Maksimum 20 haşere
      if (pestsRef.current.length >= 5) {
        return
      }

      pestsRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        imageIndex: Math.floor(Math.random() * pestUrls.length),
        rotation: Math.random() * 360
      })
    }

    // Dakikada 10 haşere = 6 saniyede 1 haşere
    spawnIntervalRef.current = setInterval(spawnPest, 10000)

    // Grid ve haşere çizim fonksiyonu
    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Önce haşereleri çiz
      if (pestImagesRef.current.length > 0) {
        pestsRef.current.forEach(pest => {
          const img = pestImagesRef.current[pest.imageIndex]
          // Resim yüklenmemiş veya hatalıysa atla
          if (!img || !img.complete || img.naturalWidth === 0) return

          const dx = mousePos.current.x - pest.x
          const dy = mousePos.current.y - pest.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          const maxDistance = 300
          let opacity = Math.max(0, 1 - distance / maxDistance)
          opacity = Math.pow(opacity, 2)

          if (opacity > 0.05) {
            try {
              ctx.save()
              ctx.globalAlpha = opacity * 0.8
              ctx.translate(pest.x, pest.y)
              ctx.rotate((pest.rotation * Math.PI) / 180)
              ctx.drawImage(img, -32.5, -55, 65, 110)
              ctx.restore()
            } catch (error) {
              // Çizim hatası olursa sessizce atla
              console.warn('Failed to draw image:', error)
            }
          }
        })
      }

      // Sonra grid'i çiz
      const cols = Math.ceil(canvas.width / gridSize)
      const rows = Math.ceil(canvas.height / gridSize)

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

      animationFrameRef.current = requestAnimationFrame(drawGrid)
    }

    drawGrid()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (spawnIntervalRef.current) {
        clearInterval(spawnIntervalRef.current)
      }
    }
  }, [])

  return (
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
  )
}
