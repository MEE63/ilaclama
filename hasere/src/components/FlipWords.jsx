import { useState, useEffect, useCallback } from 'react'

export default function FlipWords({ words, duration = 3000, className = '' }) {
  const [currentWord, setCurrentWord] = useState(words[0])
  const [isAnimating, setIsAnimating] = useState(false)

  const startAnimation = useCallback(() => {
    const word = words[words.indexOf(currentWord) + 1] || words[0]
    setCurrentWord(word)
    setIsAnimating(true)
  }, [currentWord, words])

  useEffect(() => {
    if (!isAnimating) {
      const timeout = setTimeout(() => {
        startAnimation()
      }, duration)
      return () => clearTimeout(timeout)
    }
  }, [isAnimating, duration, startAnimation])

  return (
    <span
      className={`inline-block relative ${className}`}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
    >
      <span
        className={isAnimating ? 'flip-word-animate' : ''}
        onAnimationEnd={() => setIsAnimating(false)}
        style={{
          display: 'inline-block',
          background: 'linear-gradient(to right, #87CEEB, #62929e)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          transformStyle: 'preserve-3d'
        }}
      >
        {currentWord}
      </span>

      <style>{`
        .flip-word-animate {
          animation: flipWord 0.6s cubic-bezier(0.23, 1, 0.32, 1);
        }

        @keyframes flipWord {
          0% {
            transform: rotateX(0deg);
            opacity: 1;
          }
          45% {
            transform: rotateX(90deg);
            opacity: 0;
          }
          55% {
            transform: rotateX(-90deg);
            opacity: 0;
          }
          100% {
            transform: rotateX(0deg);
            opacity: 1;
          }
        }
      `}</style>
    </span>
  )
}
