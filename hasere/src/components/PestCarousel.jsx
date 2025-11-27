import { useState, useEffect } from 'react'
import { supabase } from '../supabase'

export default function PestCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [pests, setPests] = useState([])
  const [loading, setLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [expandedIndex, setExpandedIndex] = useState(null)

  useEffect(() => {
    fetchPests()
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  async function fetchPests() {
    try {
      const { data, error } = await supabase
        .from('pests')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) {
        console.error('Haşere çekme hatası:', error)
      }
      
      console.log('Çekilen haşereler:', data)
      
      if (data && data.length > 0) {
        setPests(data)
      }
    } catch (err) {
      console.error('Beklenmeyen hata:', err)
    }
    setLoading(false)
  }

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "40px 0" }}>
        <p style={{ color: "#546a7b" }}>Yükleniyor...</p>
      </div>
    )
  }

  if (pests.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "40px 0" }}>
        <p style={{ color: "#546a7b" }}>Henüz haşere eklenmemiş.</p>
      </div>
    )
  }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? pests.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev === pests.length - 1 ? 0 : prev + 1))
  }

  return (
    <div>

      <div style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        minHeight: "420px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        
        {/* Kartlar Container */}
        <div style={{
          display: "flex",
          gap: "15px",
          transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          transform: isMobile 
            ? `translateX(calc(50vw - ${activeIndex * 85}vw - 40vw))`
            : `translateX(calc(50% - ${activeIndex * 295}px - 140px))`,
          padding: "20px 0"
        }}>
          {pests.map((pest, index) => {
            const isActive = index === activeIndex
            const distance = Math.abs(index - activeIndex)
            const cardWidth = isMobile ? "80vw" : "280px"
            const cardHeight = isMobile ? "calc(80vw * 1.36)" : "380px"
            
            return (
              <div
                key={pest.id || index}
                style={{
                  minWidth: cardWidth,
                  width: cardWidth,
                  height: cardHeight,
                  borderRadius: "24px",
                  overflow: "hidden",
                  position: "relative",
                  cursor: "pointer",
                  transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                  transform: isActive 
                    ? "scale(1)" 
                    : isMobile 
                      ? `scale(${Math.max(0.9, 1 - distance * 0.05)})`
                      : `scale(${Math.max(0.85, 1 - distance * 0.1)})`,
                  opacity: isMobile 
                    ? (distance > 1 ? 0 : 1)
                    : (distance > 2 ? 0 : distance > 1 ? 0.4 : 1),
                  boxShadow: isActive 
                    ? "0 20px 60px rgba(57, 61, 63, 0.3)" 
                    : "0 10px 30px rgba(57, 61, 63, 0.15)",
                  flexShrink: 0
                }}
                onClick={() => {
                  setActiveIndex(index)
                  setExpandedIndex(expandedIndex === index ? null : index)
                }}
              >
                {pest.image_url ? (
                  <img 
                    src={pest.image_url}
                    alt={pest.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover"
                    }}
                  />
                ) : (
                  <div style={{
                    width: "100%",
                    height: "100%",
                    background: "linear-gradient(135deg, #62929e 0%, #546a7b 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fdfdff",
                    fontSize: "3rem"
                  }}>
                    🐛
                  </div>
                )}
                
                {/* Title Overlay (always visible) */}
                <div style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "30px",
                  background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)",
                  pointerEvents: 'none',
                  zIndex: 2
                }}>
                  <h3 style={{
                    fontSize: "1.8rem",
                    fontWeight: "700",
                    color: "#fdfdff",
                    margin: "0 0 10px 0"
                  }}>
                    {pest.title}
                  </h3>
                </div>

                {/* Expanded content overlay */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.95) 100%)',
                  opacity: expandedIndex === index ? 1 : 0,
                  pointerEvents: expandedIndex === index ? 'auto' : 'none',
                  transition: 'opacity 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '40px',
                  zIndex: 3
                }}>
                  <h3 style={{
                    color: '#ffffff',
                    fontSize: '2rem',
                    fontWeight: '800',
                    marginBottom: '20px',
                    textAlign: 'center'
                  }}>
                    {pest.title}
                  </h3>
                  <p style={{
                    color: '#f0f0f0',
                    fontSize: '1rem',
                    lineHeight: '1.7',
                    textAlign: 'center',
                    maxWidth: '90%'
                  }}>
                    {pest.description || 'Detaylı bilgi için tıklayın.'}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "16px",
        marginTop: "40px",
        width: "100%",
        position: "relative",
        left: "50%",
        transform: "translateX(-50%)"
      }}>
        <button
          onClick={handlePrev}
          style={{
            width: isMobile ? "50px" : "48px",
            height: isMobile ? "50px" : "48px",
            borderRadius: "50%",
            border: isMobile ? "3px solid #393d3f" : "2px solid #546a7b",
            background: isMobile ? "#fdfdff" : "transparent",
            color: isMobile ? "#393d3f" : "#546a7b",
            fontSize: isMobile ? "24px" : "20px",
            fontWeight: isMobile ? "bold" : "normal",
            cursor: "pointer",
            transition: "all 0.3s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: isMobile ? "0 4px 12px rgba(0, 0, 0, 0.3)" : "none",
            WebkitTapHighlightColor: "transparent"
          }}
          onMouseEnter={(e) => {
            if (!isMobile) {
              e.target.style.background = "#546a7b"
              e.target.style.color = "#fdfdff"
            }
          }}
          onMouseLeave={(e) => {
            if (!isMobile) {
              e.target.style.background = "transparent"
              e.target.style.color = "#546a7b"
            }
          }}
        >
          ←
        </button>
        
        <button
          onClick={handleNext}
          style={{
            width: isMobile ? "50px" : "48px",
            height: isMobile ? "50px" : "48px",
            borderRadius: "50%",
            border: isMobile ? "3px solid #393d3f" : "2px solid #546a7b",
            background: isMobile ? "#fdfdff" : "transparent",
            color: isMobile ? "#393d3f" : "#546a7b",
            fontSize: isMobile ? "24px" : "20px",
            fontWeight: isMobile ? "bold" : "normal",
            cursor: "pointer",
            transition: "all 0.3s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: isMobile ? "0 4px 12px rgba(0, 0, 0, 0.3)" : "none",
            WebkitTapHighlightColor: "transparent"
          }}
          onMouseEnter={(e) => {
            if (!isMobile) {
              e.target.style.background = "#546a7b"
              e.target.style.color = "#fdfdff"
            }
          }}
          onMouseLeave={(e) => {
            if (!isMobile) {
              e.target.style.background = "transparent"
              e.target.style.color = "#546a7b"
            }
          }}
        >
          →
        </button>
      </div>

      {/* Dots */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "8px",
        marginTop: "24px"
      }}>
        {pests.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            style={{
              width: index === activeIndex ? "32px" : "8px",
              height: "8px",
              borderRadius: "4px",
              border: "none",
              background: index === activeIndex ? "#546a7b" : "#c6c5b9",
              cursor: "pointer",
              transition: "all 0.3s"
            }}
          />
        ))}
      </div>
    </div>
  )
}
