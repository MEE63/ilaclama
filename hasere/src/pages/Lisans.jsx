import { useState } from 'react'
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import GridBackground from "../components/GridBackground"

export default function Lisans() {
  const [hoveredSection, setHoveredSection] = useState(null)
  const [hoveredCard, setHoveredCard] = useState(null)

  return (
    <div style={{ position: 'relative' }}>
      <GridBackground />
      
      <div style={{ position: 'relative', zIndex: 1000 }}>
        <Navbar />
      </div>
      
      <main style={{ 
        position: 'relative', 
        zIndex: 1,
        minHeight: 'calc(100vh - 140px)',
        padding: '0'
      }}>
        {/* Hero Section */}
        <div style={{
          textAlign: 'center',
          padding: '120px 24px 80px',
          maxWidth: '980px',
          margin: '0 auto',
          opacity: 0,
          animation: 'fadeInUp 0.8s ease-out forwards'
        }}>
          <p style={{
            fontSize: '0.875rem',
            fontWeight: '600',
            letterSpacing: '2.5px',
            color: '#546a7b',
            marginBottom: '16px',
            textTransform: 'uppercase',
            fontFamily: 'inherit'
          }}>
            Lisans ve Sertifikalar
          </p>
          
          <h1 style={{
            fontSize: 'clamp(3rem, 7vw, 5rem)',
            fontWeight: '600',
            color: '#393d3f',
            marginBottom: '24px',
            letterSpacing: '-0.03em',
            fontFamily: 'inherit',
            lineHeight: '1.05',
            background: 'linear-gradient(135deg, #393d3f 0%, #546a7b 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Profesyonel Hizmet
          </h1>
          
          <p style={{
            fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
            color: '#546a7b',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.4',
            fontFamily: 'inherit',
            fontWeight: '400',
            letterSpacing: '-0.01em'
          }}>
            Tescilli belgeler ve sertifikalarla desteklenen güvenilir hizmet anlayışı
          </p>
        </div>

        <style>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
          }
        `}</style>

        {/* Content Sections */}
        <div style={{
          maxWidth: '980px',
          margin: '0 auto',
          padding: '0 24px 80px'
        }}>
          
          {/* Section 1 */}
          <section 
            style={{
              marginBottom: '80px',
              paddingBottom: '80px',
              borderBottom: '1px solid rgba(57, 61, 63, 0.1)',
              opacity: 0,
              animation: 'slideInLeft 0.8s ease-out 0.2s forwards'
            }}
            onMouseEnter={() => setHoveredSection(1)}
            onMouseLeave={() => setHoveredSection(null)}
          >
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '600',
              color: hoveredSection === 1 ? '#62929e' : '#393d3f',
              marginBottom: '32px',
              fontFamily: 'inherit',
              letterSpacing: '-0.02em',
              lineHeight: '1.1',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'default',
              position: 'relative',
              display: 'inline-block',
              transform: hoveredSection === 1 ? 'translateX(8px)' : 'translateX(0)'
            }}>
              Tarım ve Orman Bakanlığı
              <span style={{
                position: 'absolute',
                bottom: '-8px',
                left: 0,
                width: hoveredSection === 1 ? '100%' : '0%',
                height: '3px',
                background: 'linear-gradient(90deg, #62929e, #546a7b)',
                transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                borderRadius: '2px'
              }}></span>
            </h2>
            
            <p style={{
              fontSize: 'clamp(1.0625rem, 2vw, 1.3125rem)',
              color: '#546a7b',
              lineHeight: '1.6',
              fontFamily: 'inherit',
              fontWeight: '400'
            }}>
              Firmamız, Tarım ve Orman Bakanlığı tarafından verilen resmi ürün kullanım yetkisine sahiptir. 
              Tüm kontrol işlemlerimiz bakanlık standartlarına uygun olarak gerçekleştirilmektedir.
            </p>
          </section>

          {/* Section 2 */}
          <section 
            style={{
              marginBottom: '80px',
              paddingBottom: '80px',
              borderBottom: '1px solid rgba(57, 61, 63, 0.1)',
              opacity: 0,
              animation: 'slideInLeft 0.8s ease-out 0.3s forwards'
            }}
            onMouseEnter={() => setHoveredSection(2)}
            onMouseLeave={() => setHoveredSection(null)}
          >
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '600',
              color: hoveredSection === 2 ? '#62929e' : '#393d3f',
              marginBottom: '32px',
              fontFamily: 'inherit',
              letterSpacing: '-0.02em',
              lineHeight: '1.1',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'default',
              position: 'relative',
              display: 'inline-block',
              transform: hoveredSection === 2 ? 'translateX(8px)' : 'translateX(0)'
            }}>
              Çevre ve Şehircilik Bakanlığı
              <span style={{
                position: 'absolute',
                bottom: '-8px',
                left: 0,
                width: hoveredSection === 2 ? '100%' : '0%',
                height: '3px',
                background: 'linear-gradient(90deg, #62929e, #546a7b)',
                transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                borderRadius: '2px'
              }}></span>
            </h2>
            
            <p style={{
              fontSize: 'clamp(1.0625rem, 2vw, 1.3125rem)',
              color: '#546a7b',
              lineHeight: '1.6',
              fontFamily: 'inherit',
              fontWeight: '400'
            }}>
              Çevreye duyarlı kontrol yöntemlerimiz, Çevre ve Şehircilik Bakanlığı tarafından onaylanmış 
              ve belgelendirilmiştir. Doğaya zarar vermeyen, insan sağlığını ön planda tutan uygulamalar yapıyoruz.
            </p>
          </section>

          {/* Section 3 */}
          <section 
            style={{
              marginBottom: '80px',
              paddingBottom: '80px',
              borderBottom: '1px solid rgba(57, 61, 63, 0.1)',
              opacity: 0,
              animation: 'slideInLeft 0.8s ease-out 0.4s forwards'
            }}
            onMouseEnter={() => setHoveredSection(3)}
            onMouseLeave={() => setHoveredSection(null)}
          >
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '600',
              color: hoveredSection === 3 ? '#62929e' : '#393d3f',
              marginBottom: '32px',
              fontFamily: 'inherit',
              letterSpacing: '-0.02em',
              lineHeight: '1.1',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'default',
              position: 'relative',
              display: 'inline-block',
              transform: hoveredSection === 3 ? 'translateX(8px)' : 'translateX(0)'
            }}>
              Sertifikalı Teknik Ekip
              <span style={{
                position: 'absolute',
                bottom: '-8px',
                left: 0,
                width: hoveredSection === 3 ? '100%' : '0%',
                height: '3px',
                background: 'linear-gradient(90deg, #62929e, #546a7b)',
                transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                borderRadius: '2px'
              }}></span>
            </h2>
            
            <p style={{
              fontSize: 'clamp(1.0625rem, 2vw, 1.3125rem)',
              color: '#546a7b',
              lineHeight: '1.6',
              fontFamily: 'inherit',
              fontWeight: '400'
            }}>
              Tüm teknik personelimiz, haşere kontrol konusunda geçerli ve güncel olan 
              sertifikalara sahiptir. Düzenli olarak eğitim ve gelişim programlarına katılmaktadırlar.
            </p>
          </section>

          {/* Section 4 */}
          <section 
            style={{
              marginBottom: '80px',
              opacity: 0,
              animation: 'slideInLeft 0.8s ease-out 0.5s forwards'
            }}
            onMouseEnter={() => setHoveredSection(4)}
            onMouseLeave={() => setHoveredSection(null)}
          >
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '600',
              color: hoveredSection === 4 ? '#62929e' : '#393d3f',
              marginBottom: '32px',
              fontFamily: 'inherit',
              letterSpacing: '-0.02em',
              lineHeight: '1.1',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'default',
              position: 'relative',
              display: 'inline-block',
              transform: hoveredSection === 4 ? 'translateX(8px)' : 'translateX(0)'
            }}>
              ISO 9001 Kalite Yönetim Sistemi
              <span style={{
                position: 'absolute',
                bottom: '-8px',
                left: 0,
                width: hoveredSection === 4 ? '100%' : '0%',
                height: '3px',
                background: 'linear-gradient(90deg, #62929e, #546a7b)',
                transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                borderRadius: '2px'
              }}></span>
            </h2>
            
            <p style={{
              fontSize: 'clamp(1.0625rem, 2vw, 1.3125rem)',
              color: '#546a7b',
              lineHeight: '1.6',
              fontFamily: 'inherit',
              fontWeight: '400'
            }}>
              Hizmet kalitemiz ISO 9001 standardına uygun olarak yönetilmekte ve sürekli iyileştirme 
              prensipleriyle geliştirilmektedir.
            </p>
          </section>

          {/* Certificate Cards */}
         

          {/* CTA Section */}
          <div style={{
            background: '#62929e',
            padding: 'clamp(48px, 6vw, 64px)',
            borderRadius: '24px',
            color: '#fdfdff',
            textAlign: 'center',
            marginBottom: '48px',
            opacity: 0,
            animation: 'fadeInUp 0.8s ease-out 0.7s forwards',
            boxShadow: '0 20px 60px rgba(98, 146, 158, 0.3)',
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)'
            e.currentTarget.style.boxShadow = '0 30px 80px rgba(98, 146, 158, 0.4)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 20px 60px rgba(98, 146, 158, 0.3)'
          }}
          >
            <div style={{
              position: 'absolute',
              top: '-50%',
              right: '-50%',
              width: '200%',
              height: '200%',
              background: 'radial-gradient(circle, rgba(253, 253, 255, 0.1) 0%, transparent 70%)',
              pointerEvents: 'none'
            }}></div>
            
            <div style={{
              position: 'relative',
              zIndex: 1
            }}>
              <h3 style={{
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                fontWeight: '600',
                marginBottom: '16px',
                fontFamily: 'inherit',
                letterSpacing: '-0.01em'
              }}>
                Güvenilir ve Profesyonel Hizmet
              </h3>
              <p style={{
                fontSize: 'clamp(1.0625rem, 2vw, 1.3125rem)',
                lineHeight: '1.6',
                opacity: 0.95,
                marginBottom: '32px',
                fontFamily: 'inherit',
                fontWeight: '400'
              }}>
                Tüm belgelerimiz ve sertifikalarımız ofisimizde mevcuttur. 
                Detaylı bilgi almak ve belgeleri incelemek için bizimle iletişime geçebilirsiniz.
              </p>
              <a href="/iletisim" style={{
                display: 'inline-block',
                padding: '14px 32px',
                background: 'rgba(253, 253, 255, 0.15)',
                color: '#fdfdff',
                textDecoration: 'none',
                borderRadius: '12px',
                fontWeight: '500',
                fontSize: 'clamp(1rem, 2vw, 1.125rem)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                border: '1px solid rgba(253, 253, 255, 0.2)',
                fontFamily: 'inherit',
                letterSpacing: '0.3px'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(253, 253, 255, 0.25)'
                e.target.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(253, 253, 255, 0.15)'
                e.target.style.transform = 'translateY(0)'
              }}
              >
                İletişime Geçin
              </a>
            </div>
          </div>
        </div>
      </main>

      <div style={{ position: 'relative', zIndex: 1000 }}>
        <Footer />
      </div>
    </div>
  )
}
