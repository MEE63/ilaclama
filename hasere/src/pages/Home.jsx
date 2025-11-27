import { useEffect, useState } from "react"
import { supabase } from "../supabase" // Bağlantı dosyamızı çağırdık
import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import RippleBackground from "../components/RippleBackground"
import PestCarousel from "../components/PestCarousel"
import CTASection from "../components/CTASection"
import Footer from "../components/Footer"

export default function Home() {
  // Verileri tutacağımız kutu (State)
  const [bilgi, setBilgi] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    getSiteBilgileri()
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  async function getSiteBilgileri() {
    // Supabase'e git, 'general_config' tablosundan ID'si 1 olanı getir
    const { data, error } = await supabase
      .from('general_config') 
      .select('*')
      .eq('id', 1)
      .single()

    if (error) {
      console.error("Veri çekme hatası:", error)
    } else {
      setBilgi(data) // Gelen veriyi kutuya koy
    }
    setLoading(false)
  }

  if (loading) return <div style={{padding: "20px"}}>Yükleniyor...</div>

  return (
    <div style={{ position: 'relative' }}>
      <RippleBackground />
      <Navbar />
      <Hero siteInfo={bilgi} />
      
      {/* Carousel ve CTA Section */}
      <section style={{ padding: "80px 24px", maxWidth: "1400px", margin: "0 auto" }}>
        <h2 style={{
          fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
          fontWeight: "700",
          color: "#393d3f",
          marginBottom: "60px",
          textAlign: "left"
        }}>
          Bazı Haşere Türleri
        </h2>
        
        <div style={{ 
          display: 'flex', 
          gap: isMobile ? '40px' : '60px', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          flexDirection: isMobile ? 'column' : 'row'
        }}>
          <div style={{ 
            width: isMobile ? '100%' : '800px', 
            flexShrink: 0,
            maxWidth: '100%'
          }}>
            <PestCarousel />
          </div>
          <div style={{ 
            width: isMobile ? '100%' : '380px', 
            flexShrink: 0,
            maxWidth: isMobile ? '500px' : '380px',
            margin: isMobile ? '0 auto' : '0'
          }}>
            <CTASection />
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  )
}