import { useState, useEffect } from 'react'
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import GridBackground from "../components/GridBackground"

export default function BizKimiz() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const words = [ 'Güvenilir', 'Etkili', 'Kaliteli']

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length)
    }, 3000)

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 900)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', checkMobile)
    }
  }, [words.length])

  return (
    <div style={{ position: 'relative' }}>
      <GridBackground />
      
      <div style={{ position: 'relative', zIndex: 1000 }}>
        <Navbar />
      </div>

      {/* Hero Section */}
      <section style={{
        position: 'relative',
        zIndex: 1,
        background: 'transparent',
        padding: isMobile ? '100px 20px 60px' : '140px 24px 100px',
        overflow: 'hidden'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? '40px' : '80px',
          alignItems: 'center'
        }}>
          {/* Left Content */}
          <div style={{
            animation: 'fadeInUp 0.8s ease-out'
          }}>
            <p style={{
              fontSize: '0.875rem',
              fontWeight: '600',
              letterSpacing: '2.5px',
              color: '#546a7b',
              marginBottom: '24px',
              textTransform: 'uppercase',
              fontFamily: 'inherit'
            }}>
              Biz Kimiz
            </p>
            
            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: '700',
              color: '#393d3f',
              marginBottom: '32px',
              lineHeight: '1.15',
              letterSpacing: '-0.02em',
              fontFamily: 'inherit'
            }}>
              <span style={{ display: 'block', marginBottom: '0.2em' }}>Haşere Sorunlarınıza</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.3em' }}>
                <span style={{
                  height: '1.2em',
                  overflow: 'hidden',
                  position: 'relative',
                  display: 'inline-block',
                  width: '4.5em',
                  textAlign: 'left'
                }}>
                  {words.map((word, index) => (
                    <span
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
                    </span>
                  ))}
                </span>
                <span>Çözümler</span>
              </span>
            </h1>
            
            <p style={{
              fontSize: '1.125rem',
              color: '#546a7b',
              lineHeight: '1.75',
              marginBottom: '48px',
              fontFamily: 'inherit',
              fontWeight: '400'
            }}>
              2010 yılından bu yana, sağlıklı yaşam alanları oluşturma misyonuyla hareket ediyoruz. 
              Çevre dostu ürünler ve modern tekniklerle, hem etkili hem de güvenli çözümler üretiyoruz.
            </p>

            {/* Stats */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: isMobile ? '16px' : '24px',
              marginTop: isMobile ? '40px' : '56px'
            }}>
              {[
                { value: '13+', label: 'Yıl Deneyim' },
                { value: '5000+', label: 'Mutlu Müşteri' },
                { value: '%100', label: 'Garanti' }
              ].map((stat, index) => (
                <div key={index} style={{
                  textAlign: 'center',
                  padding: isMobile ? '20px 16px' : '28px 20px',
                  background: 'rgba(253, 253, 255, 0.6)',
                  borderRadius: '16px',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(57, 61, 63, 0.08)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.background = 'rgba(253, 253, 255, 0.9)'
                    e.currentTarget.style.transform = 'translateY(-4px)'
                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(57, 61, 63, 0.08)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.background = 'rgba(253, 253, 255, 0.6)'
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }
                }}
                >
                  <h3 style={{
                    fontSize: isMobile ? '1.75rem' : '2.25rem',
                    fontWeight: '700',
                    color: '#393d3f',
                    marginBottom: '8px',
                    fontFamily: 'inherit',
                    letterSpacing: '-0.02em'
                  }}>{stat.value}</h3>
                  <p style={{
                    fontSize: isMobile ? '0.8rem' : '0.875rem',
                    color: '#546a7b',
                    margin: 0,
                    fontFamily: 'inherit',
                    fontWeight: '500'
                  }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div style={{
            position: 'relative',
            animation: 'fadeInUp 0.8s ease-out 0.2s backwards',
            display: isMobile ? 'none' : 'block'
          }}>
            <div style={{
              background: 'rgba(253, 253, 255, 0.6)',
              borderRadius: '24px',
              padding: '32px',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(57, 61, 63, 0.08)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            onMouseEnter={(e) => {
              if (!isMobile) {
                e.currentTarget.style.transform = 'translateY(-8px)'
                e.currentTarget.style.boxShadow = '0 24px 48px rgba(57, 61, 63, 0.1)'
              }
            }}
            onMouseLeave={(e) => {
              if (!isMobile) {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }
            }}
            >
              <img 
                src="https://via.placeholder.com/600x400/d4dfe5/393d3f?text=Profesyonel+Ekibimiz"
                alt="Ekibimiz"
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '16px',
                  display: 'block'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section style={{
        position: 'relative',
        zIndex: 1,
        padding: isMobile ? '60px 20px' : '120px 24px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? '40px' : '100px',
          alignItems: 'center'
        }}>
          {/* Left Image */}
          <div style={{
            position: 'relative',
            order: isMobile ? 2 : 1
          }}>
            <div style={{
              background: 'rgba(253, 253, 255, 0.6)',
              borderRadius: '24px',
              padding: isMobile ? '20px' : '32px',
              border: '1px solid rgba(57, 61, 63, 0.08)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            onMouseEnter={(e) => {
              if (!isMobile) {
                e.currentTarget.style.transform = 'translateY(-8px)'
                e.currentTarget.style.boxShadow = '0 24px 48px rgba(57, 61, 63, 0.08)'
              }
            }}
            onMouseLeave={(e) => {
              if (!isMobile) {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }
            }}
            >
              <img 
                src="https://via.placeholder.com/500x350/d4dfe5/393d3f?text=Ofisimiz"
                alt="Ofis"
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '16px',
                  display: 'block'
                }}
              />
            </div>

            {/* Floating Badge */}
            <div style={{
              position: 'absolute',
              bottom: isMobile ? '-16px' : '-24px',
              right: isMobile ? '-16px' : '-24px',
              background: 'linear-gradient(135deg, #393d3f 0%, #546a7b 100%)',
              padding: isMobile ? '20px' : '32px',
              borderRadius: '20px',
              boxShadow: '0 16px 48px rgba(57, 61, 63, 0.2)',
              textAlign: 'center',
              minWidth: isMobile ? '140px' : '180px',
              border: '1px solid rgba(253, 253, 255, 0.1)'
            }}>
              <p style={{
                fontSize: isMobile ? '0.7rem' : '0.8rem',
                color: 'rgba(253, 253, 255, 0.7)',
                margin: '0 0 8px 0',
                fontWeight: '600',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                fontFamily: 'inherit'
              }}>Sertifikalı</p>
              <p style={{
                fontSize: isMobile ? '1.25rem' : '1.75rem',
                fontWeight: '700',
                color: '#fdfdff',
                margin: 0,
                fontFamily: 'inherit',
                letterSpacing: '-0.01em'
              }}>ISO 9001</p>
            </div>
          </div>

          {/* Right Content */}
          <div style={{ order: isMobile ? 1 : 2 }}>
            <p style={{
              fontSize: '0.875rem',
              fontWeight: '600',
              letterSpacing: '2.5px',
              color: '#546a7b',
              marginBottom: '24px',
              textTransform: 'uppercase',
              fontFamily: 'inherit'
            }}>
              Hikayemiz
            </p>

            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '700',
              color: '#393d3f',
              marginBottom: '28px',
              lineHeight: '1.2',
              letterSpacing: '-0.02em',
              fontFamily: 'inherit'
            }}>
              Güvenilir Çözüm Ortağınız
            </h2>

            <p style={{
              fontSize: '1.0625rem',
              color: '#546a7b',
              lineHeight: '1.75',
              marginBottom: '20px',
              fontFamily: 'inherit',
              fontWeight: '400'
            }}>
              Haşere kontrol sektöründe 13 yılı aşkın deneyimimizle, konut, işyeri, fabrika, 
              otel, restoran ve kamu kurumları olmak üzere geniş bir yelpazede profesyonel 
              hizmetler sunuyoruz.
            </p>

            <p style={{
              fontSize: '1.0625rem',
              color: '#546a7b',
              lineHeight: '1.75',
              marginBottom: '40px',
              fontFamily: 'inherit',
              fontWeight: '400'
            }}>
              Çevre dostu ürünler ve modern tekniklerle, hem etkili hem de güvenli çözümler 
              üretiyoruz. Sertifikalı teknik personelimiz, düzenli eğitimlerle kendini geliştiren, 
              alanında uzman profesyonellerden oluşmaktadır.
            </p>

            {/* Features */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: isMobile ? '16px' : '24px',
              marginTop: isMobile ? '32px' : '48px'
            }}>
              {[
                { icon: '🎯', title: 'Müşteri Odaklı', desc: 'Beklentileri aşan hizmet' },
                { icon: '🌱', title: 'Çevre Dostu', desc: 'Sürdürülebilir çözümler' },
                { icon: '🔬', title: 'Bilimsel Yaklaşım', desc: 'Kanıtlanmış yöntemler' },
                { icon: '⚡', title: 'Hızlı Hizmet', desc: '24 saat içinde müdahale' }
              ].map((feature, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'start',
                  gap: isMobile ? '12px' : '16px',
                  padding: isMobile ? '16px' : '20px',
                  background: 'rgba(253, 253, 255, 0.4)',
                  borderRadius: '16px',
                  border: '1px solid rgba(57, 61, 63, 0.06)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.background = 'rgba(253, 253, 255, 0.8)'
                    e.currentTarget.style.transform = 'translateX(4px)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.background = 'rgba(253, 253, 255, 0.4)'
                    e.currentTarget.style.transform = 'translateX(0)'
                  }
                }}
                >
                  <div style={{
                    width: isMobile ? '40px' : '48px',
                    height: isMobile ? '40px' : '48px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #546a7b 0%, #62929e 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: isMobile ? '1.25rem' : '1.5rem',
                    flexShrink: 0
                  }}>
                    {feature.icon}
                  </div>
                  <div>
                    <h4 style={{
                      fontSize: isMobile ? '0.95rem' : '1.0625rem',
                      fontWeight: '600',
                      color: '#393d3f',
                      marginBottom: '4px',
                      fontFamily: 'inherit'
                    }}>{feature.title}</h4>
                    <p style={{
                      fontSize: isMobile ? '0.85rem' : '0.9375rem',
                      color: '#546a7b',
                      margin: 0,
                      lineHeight: '1.5',
                      fontFamily: 'inherit',
                      fontWeight: '400'
                    }}>{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section style={{
        position: 'relative',
        zIndex: 1,
        background: 'linear-gradient(180deg, rgba(232, 238, 241, 0.3) 0%, rgba(212, 223, 229, 0.3) 100%)',
        padding: isMobile ? '60px 20px' : '120px 24px',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
         

          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: '700',
            color: '#393d3f',
            marginBottom: '28px',
            lineHeight: '1.2',
            letterSpacing: '-0.02em',
            fontFamily: 'inherit'
          }}>
            Uzman Kadromuz
          </h2>

          <p style={{
            fontSize: '1.125rem',
            color: '#546a7b',
            lineHeight: '1.75',
            marginBottom: '72px',
            maxWidth: '700px',
            margin: '0 auto 72px',
            fontFamily: 'inherit',
            fontWeight: '400'
          }}>
            Sertifikalı ve deneyimli ekibimiz, her projede en yüksek kalite standartlarını 
            sağlamak için titizlikle çalışmaktadır.
          </p>

          
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        position: 'relative',
        zIndex: 1,
        background: 'linear-gradient(135deg, #393d3f 0%, #546a7b 100%)',
        padding: isMobile ? '60px 20px' : '100px 24px',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: '700',
            color: '#fdfdff',
            marginBottom: '28px',
            lineHeight: '1.2',
            letterSpacing: '-0.02em',
            fontFamily: 'inherit'
          }}>
            Haşere Sorunlarınız İçin Hemen İletişime Geçin
          </h2>

          <p style={{
            fontSize: isMobile ? '1rem' : '1.125rem',
            color: 'rgba(253, 253, 255, 0.85)',
            lineHeight: '1.75',
            marginBottom: isMobile ? '32px' : '48px',
            fontFamily: 'inherit',
            fontWeight: '400',
            padding: isMobile ? '0 10px' : '0'
          }}>
            Profesyonel ekibimiz, size en uygun çözümü sunmak için hazır.
          </p>

          <a href="/iletisim" style={{
            display: 'inline-block',
            padding: isMobile ? '14px 32px' : '18px 48px',
            background: 'linear-gradient(135deg, #62929e 0%, #546a7b 100%)',
            color: '#fdfdff',
            textDecoration: 'none',
            borderRadius: '12px',
            fontWeight: '600',
            fontSize: isMobile ? '0.95rem' : '1.0625rem',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            letterSpacing: '0.5px',
            boxShadow: '0 12px 32px rgba(98, 146, 158, 0.25)',
            fontFamily: 'inherit',
            border: '1px solid rgba(253, 253, 255, 0.1)'
          }}
          onMouseEnter={(e) => {
            if (!isMobile) {
              e.target.style.transform = 'translateY(-2px)'
              e.target.style.boxShadow = '0 16px 40px rgba(98, 146, 158, 0.35)'
            }
          }}
          onMouseLeave={(e) => {
            if (!isMobile) {
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = '0 12px 32px rgba(98, 146, 158, 0.25)'
            }
          }}
          >
            Ücretsiz Teklif Alın
          </a>
        </div>
      </section>

      <div style={{ position: 'relative', zIndex: 1000 }}>
        <Footer />
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

        @supports (backdrop-filter: blur(0px)) {
          h1 span span {
            backdrop-filter: blur(0px);
          }
        }

        @media (max-width: 768px) {
          section > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
