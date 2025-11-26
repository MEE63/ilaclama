import { useState, useEffect } from 'react'
import { supabase } from '../supabase'

export default function FocusCards() {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [expandedIndex, setExpandedIndex] = useState(null)
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchServices()
  }, [])

  async function fetchServices() {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: true })
      
      if (error) {
        console.error('Hizmetler çekme hatası:', error)
      }
      
      if (data) {
        setServices(data)
      }
    } catch (err) {
      console.error('Beklenmeyen hata:', err)
    }
    setLoading(false)
  }

  if (loading) {
    return (
      <div style={{
        padding: '80px 24px',
        textAlign: 'center',
        color: '#546a7b'
      }}>
        Yükleniyor...
      </div>
    )
  }

  if (services.length === 0) {
    return (
      <div style={{
        padding: '80px 24px',
        textAlign: 'center',
        color: '#546a7b'
      }}>
        Henüz hizmet eklenmemiş.
      </div>
    )
  }

  return (
    <div style={{
      position: 'relative',
      zIndex: 1000,
      padding: 'clamp(40px, 8vw, 80px) clamp(20px, 6vw, 84px)',
      maxWidth: '1280px',
      margin: '0 auto'
    }}>
      <h2 style={{
        fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
        fontWeight: '800',
        color: '#393d3f',
        marginBottom: 'clamp(30px, 5vw, 60px)',
        textAlign: 'center'
      }}>
        Hizmetlerimiz
      </h2>

      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 350px)',
          gap: '30px',
          justifyContent: 'center',
          maxWidth: '1200px',
          margin: '0 auto'
        }}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {services.slice(0, 9).map((service, index) => (
          <div
            key={service.id || index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
            style={{
              position: 'relative',
              background: '#fdfdff',
              borderRadius: '20px',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              filter: (hoveredIndex !== null && hoveredIndex !== index && expandedIndex === null) || 
                      (expandedIndex !== null && expandedIndex !== index) 
                ? 'blur(3px)' 
                : 'blur(0px)',
              opacity: (hoveredIndex !== null && hoveredIndex !== index && expandedIndex === null) || 
                       (expandedIndex !== null && expandedIndex !== index)
                ? 0.6 
                : 1,
              transform: hoveredIndex === index && expandedIndex === null ? 'scale(1.02)' : 'scale(1)',
              boxShadow: hoveredIndex === index || expandedIndex === index
                ? '0 20px 60px rgba(57, 61, 63, 0.3)' 
                : '0 4px 20px rgba(57, 61, 63, 0.1)',
              border: '1px solid #c6c5b9',
              overflow: 'hidden',
              width: '350px',
              height: '570px'
            }}
          >
            {/* Image */}
            <img 
              src={service.image_url}
              alt={service.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.3s ease',
                transform: hoveredIndex === index && expandedIndex === null ? 'scale(1.05)' : 'scale(1)'
              }}
            />

            {/* Title overlay (always visible) */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '30px',
              background: 'linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, transparent 100%)',
              pointerEvents: 'none',
              zIndex: 2
            }}>
              <h3 style={{
                color: '#ffffff',
                fontSize: '1.5rem',
                fontWeight: '700',
                margin: 0
              }}>
                {service.title}
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
                {service.title}
              </h3>
              <p style={{
                color: '#f0f0f0',
                fontSize: '1rem',
                lineHeight: '1.7',
                textAlign: 'center',
                maxWidth: '90%'
              }}>
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
