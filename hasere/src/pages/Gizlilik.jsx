import { useState } from 'react'
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import GridBackground from "../components/GridBackground"

export default function Gizlilik() {
  const [hoveredSection, setHoveredSection] = useState(null)

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
        {/* Hero Section - Apple Style */}
        <div style={{
          textAlign: 'center',
          padding: '120px 24px 80px',
          maxWidth: '980px',
          margin: '0 auto',
          opacity: 0,
          animation: 'fadeInUp 0.8s ease-out forwards'
        }}>
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
            Gizlilik
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
            Kişisel verilerinizin güvenliği ve gizliliği bizim için önceliklidir
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
              Toplanan Bilgiler
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
              marginBottom: '24px',
              fontFamily: 'inherit',
              fontWeight: '400'
            }}>
              Web sitemizi ziyaret ettiğinizde veya hizmetlerimizden yararlandığınızda aşağıdaki bilgiler toplanabilir:
            </p>

            <ul style={{
              fontSize: 'clamp(1.0625rem, 2vw, 1.3125rem)',
              color: '#546a7b',
              lineHeight: '1.8',
              paddingLeft: '24px',
              fontFamily: 'inherit',
              fontWeight: '400'
            }}>
              <li style={{ marginBottom: '12px' }}>İsim, soyisim ve iletişim bilgileri (telefon, e-posta, adres)</li>
              <li style={{ marginBottom: '12px' }}>Hizmet talep bilgileri ve tercihleriniz</li>
              <li style={{ marginBottom: '12px' }}>IP adresi, tarayıcı türü ve ziyaret edilen sayfalar</li>
              <li style={{ marginBottom: '12px' }}>Çerezler aracılığıyla toplanan kullanım verileri</li>
            </ul>
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
              Bilgilerin Kullanımı
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
              marginBottom: '24px',
              fontFamily: 'inherit',
              fontWeight: '400'
            }}>
              Topladığımız kişisel bilgiler yalnızca aşağıdaki amaçlarla kullanılır:
            </p>

            <ul style={{
              fontSize: 'clamp(1.0625rem, 2vw, 1.3125rem)',
              color: '#546a7b',
              lineHeight: '1.8',
              paddingLeft: '24px',
              fontFamily: 'inherit',
              fontWeight: '400'
            }}>
              <li style={{ marginBottom: '12px' }}>Hizmet taleplerini karşılamak ve randevu oluşturmak</li>
              <li style={{ marginBottom: '12px' }}>Müşteri destek hizmetleri sunmak</li>
              <li style={{ marginBottom: '12px' }}>Hizmet kalitesini iyileştirmek ve analiz yapmak</li>
              <li style={{ marginBottom: '12px' }}>Yasal yükümlülükleri yerine getirmek</li>
              <li style={{ marginBottom: '12px' }}>Kampanya ve duyurular göndermek (onay vermeniz halinde)</li>
            </ul>
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
              Bilgi Güvenliği
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
              marginBottom: '24px',
              fontFamily: 'inherit',
              fontWeight: '400'
            }}>
              Kişisel verilerinizin güvenliğini sağlamak için endüstri standardı güvenlik önlemleri alıyoruz:
            </p>

            <ul style={{
              fontSize: 'clamp(1.0625rem, 2vw, 1.3125rem)',
              color: '#546a7b',
              lineHeight: '1.8',
              paddingLeft: '24px',
              fontFamily: 'inherit',
              fontWeight: '400'
            }}>
              <li style={{ marginBottom: '12px' }}>SSL şifreleme ile veri aktarımı</li>
              <li style={{ marginBottom: '12px' }}>Güvenli sunucularda veri saklama</li>
              <li style={{ marginBottom: '12px' }}>Yetkisiz erişime karşı koruma sistemleri</li>
              <li style={{ marginBottom: '12px' }}>Düzenli güvenlik denetimleri</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section 
            style={{
              marginBottom: '80px',
              paddingBottom: '80px',
              borderBottom: '1px solid rgba(57, 61, 63, 0.1)',
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
              Üçüncü Taraflarla Paylaşım
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
              marginBottom: '24px',
              fontFamily: 'inherit',
              fontWeight: '400'
            }}>
              Kişisel bilgileriniz, aşağıdaki durumlar dışında üçüncü taraflarla paylaşılmaz:
            </p>

            <ul style={{
              fontSize: 'clamp(1.0625rem, 2vw, 1.3125rem)',
              color: '#546a7b',
              lineHeight: '1.8',
              paddingLeft: '24px',
              fontFamily: 'inherit',
              fontWeight: '400'
            }}>
              <li style={{ marginBottom: '12px' }}>Yasal zorunluluklar gereği</li>
              <li style={{ marginBottom: '12px' }}>Hizmet sağlayıcılarımızla (ödeme işlemcileri, hosting sağlayıcıları)</li>
              <li style={{ marginBottom: '12px' }}>Açık onayınız ile</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section 
            style={{
              marginBottom: '80px',
              paddingBottom: '80px',
              borderBottom: '1px solid rgba(57, 61, 63, 0.1)',
              opacity: 0,
              animation: 'slideInLeft 0.8s ease-out 0.6s forwards'
            }}
            onMouseEnter={() => setHoveredSection(5)}
            onMouseLeave={() => setHoveredSection(null)}
          >
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '600',
              color: hoveredSection === 5 ? '#62929e' : '#393d3f',
              marginBottom: '32px',
              fontFamily: 'inherit',
              letterSpacing: '-0.02em',
              lineHeight: '1.1',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'default',
              position: 'relative',
              display: 'inline-block',
              transform: hoveredSection === 5 ? 'translateX(8px)' : 'translateX(0)'
            }}>
              Çerezler
              <span style={{
                position: 'absolute',
                bottom: '-8px',
                left: 0,
                width: hoveredSection === 5 ? '100%' : '0%',
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
              marginBottom: '24px',
              fontFamily: 'inherit',
              fontWeight: '400'
            }}>
              Web sitemiz, kullanıcı deneyimini iyileştirmek için çerezler kullanır. Çerezler şunlar için kullanılır:
            </p>

            <ul style={{
              fontSize: 'clamp(1.0625rem, 2vw, 1.3125rem)',
              color: '#546a7b',
              lineHeight: '1.8',
              paddingLeft: '24px',
              fontFamily: 'inherit',
              fontWeight: '400',
              marginBottom: '24px'
            }}>
              <li style={{ marginBottom: '12px' }}>Oturum bilgilerini saklamak</li>
              <li style={{ marginBottom: '12px' }}>Tercihlerinizi hatırlamak</li>
              <li style={{ marginBottom: '12px' }}>Site trafiğini analiz etmek</li>
              <li style={{ marginBottom: '12px' }}>Kişiselleştirilmiş içerik sunmak</li>
            </ul>

            <p style={{
              fontSize: 'clamp(1.0625rem, 2vw, 1.3125rem)',
              color: '#546a7b',
              lineHeight: '1.6',
              fontFamily: 'inherit',
              fontWeight: '400'
            }}>
              Tarayıcı ayarlarınızdan çerezleri devre dışı bırakabilirsiniz, ancak bu durumda bazı site özellikleri düzgün çalışmayabilir.
            </p>
          </section>

          {/* Section 6 */}
          <section 
            style={{
              marginBottom: '80px',
              opacity: 0,
              animation: 'slideInLeft 0.8s ease-out 0.7s forwards'
            }}
            onMouseEnter={() => setHoveredSection(6)}
            onMouseLeave={() => setHoveredSection(null)}
          >
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '600',
              color: hoveredSection === 6 ? '#62929e' : '#393d3f',
              marginBottom: '32px',
              fontFamily: 'inherit',
              letterSpacing: '-0.02em',
              lineHeight: '1.1',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'default',
              position: 'relative',
              display: 'inline-block',
              transform: hoveredSection === 6 ? 'translateX(8px)' : 'translateX(0)'
            }}>
              Haklarınız
              <span style={{
                position: 'absolute',
                bottom: '-8px',
                left: 0,
                width: hoveredSection === 6 ? '100%' : '0%',
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
              marginBottom: '24px',
              fontFamily: 'inherit',
              fontWeight: '400'
            }}>
              KVKK (Kişisel Verilerin Korunması Kanunu) kapsamında aşağıdaki haklara sahipsiniz:
            </p>

            <ul style={{
              fontSize: 'clamp(1.0625rem, 2vw, 1.3125rem)',
              color: '#546a7b',
              lineHeight: '1.8',
              paddingLeft: '24px',
              fontFamily: 'inherit',
              fontWeight: '400',
              marginBottom: '24px'
            }}>
              <li style={{ marginBottom: '12px' }}>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
              <li style={{ marginBottom: '12px' }}>İşlenmişse buna ilişkin bilgi talep etme</li>
              <li style={{ marginBottom: '12px' }}>Verilerin düzeltilmesini veya silinmesini isteme</li>
              <li style={{ marginBottom: '12px' }}>İşleme faaliyetlerine itiraz etme</li>
              <li style={{ marginBottom: '12px' }}>Zararın giderilmesini talep etme</li>
            </ul>

            <p style={{
              fontSize: 'clamp(1.0625rem, 2vw, 1.3125rem)',
              color: '#546a7b',
              lineHeight: '1.6',
              fontFamily: 'inherit',
              fontWeight: '400'
            }}>
              Bu haklarınızı kullanmak için bizimle iletişime geçebilirsiniz.
            </p>
          </section>

          {/* CTA Section */}
          <div style={{
            background: '#62929e',
            padding: 'clamp(48px, 6vw, 64px)',
            borderRadius: '24px',
            color: '#fdfdff',
            textAlign: 'center',
            marginBottom: '48px',
            opacity: 0,
            animation: 'fadeInUp 0.8s ease-out 0.8s forwards',
            boxShadow: '0 20px 60px rgba(98, 146, 158, 0.3)',
            position: 'relative',
            overflow: 'hidden'
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
            <h3 style={{
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: '600',
              marginBottom: '16px',
              fontFamily: 'inherit',
              letterSpacing: '-0.01em'
            }}>
              Sorularınız mı var?
            </h3>
            <p style={{
              fontSize: 'clamp(1.0625rem, 2vw, 1.3125rem)',
              lineHeight: '1.6',
              opacity: 0.95,
              marginBottom: '32px',
              fontFamily: 'inherit',
              fontWeight: '400'
            }}>
              Gizlilik politikamız hakkında daha fazla bilgi almak için bizimle iletişime geçin
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

          <p style={{
            fontSize: '0.875rem',
            color: '#546a7b',
            textAlign: 'center',
            fontFamily: 'inherit',
            fontWeight: '400',
            opacity: 0.7
          }}>
            Son güncelleme: {new Date().toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </main>

      <div style={{ position: 'relative', zIndex: 1000 }}>
        <Footer />
      </div>
    </div>
  )
}
