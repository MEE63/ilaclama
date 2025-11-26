import { useState, useEffect } from 'react'
import { supabase } from '../supabase'

export default function CTASection() {
  const [ctaData, setCtaData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [mapCoords, setMapCoords] = useState(null)

  useEffect(() => {
    fetchCTA()
  }, [])

  useEffect(() => {
    if (ctaData?.location_url) {
      extractCoordinates(ctaData.location_url)
    }
  }, [ctaData?.location_url])

  function extractCoordinates(url) {
    try {
      // Google Maps URL'den koordinatları çıkar
      // Örnek: https://maps.google.com/maps?q=38.3624192,38.3138449
      // veya: https://www.google.com/maps/place/.../@38.3624192,38.3138449,15z
      
      const patterns = [
        /@(-?\d+\.\d+),(-?\d+\.\d+)/, // @lat,lng formatı
        /q=(-?\d+\.\d+),(-?\d+\.\d+)/, // q=lat,lng formatı
        /!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/, // !3dlat!4dlng formatı
      ]

      for (const pattern of patterns) {
        const match = url.match(pattern)
        if (match) {
          setMapCoords({ lat: match[1], lng: match[2] })
          return
        }
      }
      
      // Koordinat bulunamazsa null
      setMapCoords(null)
    } catch (err) {
      console.error('Koordinat çıkarma hatası:', err)
      setMapCoords(null)
    }
  }

  async function fetchCTA() {
    try {
      const { data, error } = await supabase
        .from('cta_section')
        .select('*')
        .eq('id', 1)
        .single()
      
      if (error) {
        console.error('CTA çekme hatası:', error)
      }
      
      if (data) {
        setCtaData(data)
      }
    } catch (err) {
      console.error('CTA beklenmeyen hata:', err)
    }
    setLoading(false)
  }

  if (loading) return <div style={{padding: '20px', textAlign: 'center', color: '#546a7b'}}>Yükleniyor...</div>
  if (!ctaData) return null

  return (
    <div style={{
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 10px 40px rgba(57, 61, 63, 0.15)",
          background: "#fdfdff"
        }}>
          {/* Görsel veya Harita */}
          {(ctaData.image_url || (ctaData.location_url && mapCoords)) && (
            <div style={{position:'relative', width:'100%', height:'250px', background:'#e8eef1'}}>
              {ctaData.location_url && mapCoords ? (
                // Google Maps iframe widget
                <div style={{
                  width:'100%',
                  height:'100%',
                  position:'relative'
                }}>
                  <iframe
                    src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d500!2d${mapCoords.lng}!3d${mapCoords.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1str!2str`}
                    width="100%"
                    height="100%"
                    style={{
                      border: 0
                    }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Konum"
                  />
                  
                  {/* Haritada Gör Butonu */}
                  <a 
                    href={ctaData.location_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      position:'absolute',
                      bottom:'10px',
                      right:'10px',
                      background:'rgba(98, 146, 158, 0.95)',
                      color:'#fdfdff',
                      padding:'8px 16px',
                      borderRadius:'6px',
                      fontSize:'13px',
                      fontWeight:'600',
                      boxShadow:'0 2px 8px rgba(0,0,0,0.2)',
                      textDecoration:'none',
                      transition:'all 0.3s ease',
                      zIndex: 10
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'rgba(84, 106, 123, 0.95)'
                      e.target.style.transform = 'translateY(-2px)'
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'rgba(98, 146, 158, 0.95)'
                      e.target.style.transform = 'translateY(0)'
                    }}
                  >
                    📍 Haritada Gör
                  </a>
                </div>
              ) : ctaData.image_url ? (
                <img 
                  src={ctaData.image_url}
                  alt={ctaData.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }}
                />
              ) : (
                <div style={{
                  width:'100%',
                  height:'100%',
                  display:'flex',
                  alignItems:'center',
                  justifyContent:'center',
                  flexDirection:'column',
                  gap:'10px',
                  color:'#546a7b',
                  background:'#e8eef1'
                }}>
                  <span style={{fontSize:'3rem'}}>📍</span>
                  <span style={{fontSize:'1rem', fontWeight:'600'}}>Konumu Görüntüle</span>
                </div>
              )}
            </div>
          )}

          {/* İçerik */}
          <div style={{
            padding: "30px"
          }}>
            <h3 style={{
              fontSize: "1.8rem",
              fontWeight: "700",
              color: "#393d3f",
              marginBottom: "15px",
              lineHeight: "1.3"
            }}>
              {ctaData.title}
            </h3>

            <p style={{
              fontSize: "1rem",
              color: "#546a7b",
              lineHeight: "1.6",
              marginBottom: "20px"
            }}>
              {ctaData.description}
            </p>

            <a 
              href="#"
              style={{
                display: "inline-block",
                padding: "12px 24px",
                background: "#62929e",
                color: "#fdfdff",
                textDecoration: "none",
                borderRadius: "8px",
                fontWeight: "600",
                fontSize: "0.95rem",
                transition: "all 0.3s"
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#546a7b"
                e.target.style.transform = "translateY(-2px)"
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "#62929e"
                e.target.style.transform = "translateY(0)"
              }}
            >
              Daha Fazla Bilgi →
            </a>
          </div>
        </div>
  )
}
