import { useEffect, useRef, useState } from 'react'

export default function HeroParallax() {
  const containerRef = useRef(null)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [typewriterText, setTypewriterText] = useState('')
  const [typewriterIndex, setTypewriterIndex] = useState(0)
  const [imageLoaded, setImageLoaded] = useState(false)

  const words = ['Profesyonel', 'Güvenilir', 'Etkili', 'Hızlı']
  const fullTypewriterText = 'En son teknolojiler ve yöntemlerle güvenli, etkili haşere kontrolü hizmetleri sunuyoruz.'

  // Preload image
  useEffect(() => {
    const img = new Image()
    img.src = '/dosy/himet.jpg'
    img.onload = () => setImageLoaded(true)
  }, [])

  // Flip words effect - rotate through words
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [words.length])

  // Typewriter effect
  useEffect(() => {
    if (typewriterIndex < fullTypewriterText.length) {
      const timeout = setTimeout(() => {
        setTypewriterText(fullTypewriterText.slice(0, typewriterIndex + 1))
        setTypewriterIndex(typewriterIndex + 1)
      }, 30)
      return () => clearTimeout(timeout)
    }
  }, [typewriterIndex, fullTypewriterText])

  return (
    <div 
      ref={containerRef}
      style={{
        minHeight: '80vh',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Loading Placeholder */}
      {!imageLoaded && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, #546a7b 0%, #62929e 50%, #546a7b 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 0
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            border: '4px solid rgba(255, 255, 255, 0.3)',
            borderTop: '4px solid #ffffff',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
        </div>
      )}

      {/* Background Image */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'url(/dosy/himet.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        opacity: imageLoaded ? 0.95 : 0,
        transition: 'opacity 0.5s ease-in',
        zIndex: 0
      }} />

      {/* Black Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.25)',
        zIndex: 1
      }} />

      {/* Left Gradient */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        width: '40%',
        background: 'linear-gradient(to right, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.3) 50%, transparent 100%)',
        zIndex: 2
      }} />

      {/* İçerik */}
      <div style={{
        position: 'relative',
        height: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        zIndex: 3
      }}>
        
        {/* Başlık ve Açıklama */}
        <div style={{
          position: 'relative',
          left: '10%',
          textAlign: 'left',
          maxWidth: '700px',
          padding: '0 24px'
        }}>
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: '900',
            color: '#ffffff',
            marginBottom: '20px',
            lineHeight: '1.1',
            letterSpacing: '-1.5px',
            minHeight: '120px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            <div style={{
              height: '60px',
              overflow: 'hidden',
              position: 'relative'
            }}>
              {words.map((word, index) => (
                <div
                  key={word}
                  style={{
                    position: 'absolute',
                    width: '100%',
                    background: 'linear-gradient(to right, #87CEEB, #62929e)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    transform: index === currentWordIndex 
                      ? 'translateY(0) rotateX(0deg)' 
                      : index < currentWordIndex 
                        ? 'translateY(-100%) rotateX(-90deg)' 
                        : 'translateY(100%) rotateX(90deg)',
                    opacity: index === currentWordIndex ? 1 : 0,
                    filter: index === currentWordIndex ? 'blur(0px)' : 'blur(4px)',
                    transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.3s ease-out',
                    transformOrigin: 'center center',
                    transformStyle: 'preserve-3d',
                    willChange: 'transform, opacity, filter'
                  }}
                >
                  {word}
                </div>
              ))}
            </div>
            <span>Haşere Kontrolü</span>
          </h1>
          <p style={{
            fontSize: '1.15rem',
            color: '#f0f0f0',
            lineHeight: '1.7',
            maxWidth: '600px',
            minHeight: '80px'
          }}>
            {typewriterText}
            {typewriterIndex < fullTypewriterText.length && (
              <span style={{
                display: 'inline-block',
                width: '2px',
                height: '1.2em',
                background: '#f0f0f0',
                marginLeft: '2px',
                animation: 'blink 1s infinite',
                verticalAlign: 'text-bottom'
              }} />
            )}
          </p>
        </div>
        
        <style>{`
          @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          @supports (backdrop-filter: blur(0px)) {
            h1 div div {
              backdrop-filter: blur(0px);
            }
          }
        `}</style>
      </div>
    </div>
  )
}
