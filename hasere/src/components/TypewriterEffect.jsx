import { useState, useEffect } from 'react'

export default function TypewriterEffect({ text, className, style }) {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, 50) // Typing speed

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text])

  return (
    <span className={className} style={style}>
      {displayText}
      {currentIndex < text.length && (
        <span style={{
          display: 'inline-block',
          width: '2px',
          height: '1em',
          background: 'currentColor',
          marginLeft: '2px',
          animation: 'blink 1s infinite'
        }} />
      )}
      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </span>
  )
}
