import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import GridBackground from "../components/GridBackground"

export default function Fiyatlandirma() {
  const packages = [
    {
      name: "Temel",
      price: "₺499",
      period: "/ hizmet",
      features: [
        "Tek seferlik ilaçlama",
        "Standart haşere türleri",
        "100m² kadar alan",
        "3 ay garanti",
        "Ücretsiz ön inceleme"
      ],
      popular: false
    },
    {
      name: "Profesyonel",
      price: "₺899",
      period: "/ hizmet",
      features: [
        "2 seans ilaçlama",
        "Tüm haşere türleri",
        "200m² kadar alan",
        "6 ay garanti",
        "Ücretsiz ön inceleme",
        "Takip ziyareti"
      ],
      popular: true
    },
    {
      name: "Premium",
      price: "₺1.499",
      period: "/ hizmet",
      features: [
        "3 seans ilaçlama",
        "Tüm haşere türleri + kemirgenler",
        "Sınırsız alan",
        "12 ay garanti",
        "Ücretsiz ön inceleme",
        "Aylık takip ziyaretleri",
        "7/24 acil destek"
      ],
      popular: false
    }
  ]

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
        padding: '100px 24px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <p style={{
            fontSize: '0.875rem',
            fontWeight: '600',
            letterSpacing: '2.5px',
            color: '#546a7b',
            marginBottom: '16px',
            textTransform: 'uppercase',
            fontFamily: 'inherit'
          }}>
            Fiyatlandırma
          </p>
          
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            fontWeight: '700',
            color: '#393d3f',
            marginBottom: '24px',
            letterSpacing: '-0.02em',
            fontFamily: 'inherit'
          }}>
            Size Uygun Planı Seçin
          </h1>
          
          <p style={{
            fontSize: '1.0625rem',
            color: '#546a7b',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.7',
            fontFamily: 'inherit',
            fontWeight: '400'
          }}>
            Profesyonel haşere kontrol hizmetlerimiz için şeffaf ve rekabetçi fiyatlandırma
          </p>
        </div>

        {/* Pricing Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px',
          marginBottom: '80px'
        }}>
          {packages.map((pkg, index) => (
            <div
              key={index}
              style={{
                background: pkg.popular ? 'linear-gradient(135deg, #62929e 0%, #546a7b 100%)' : '#fdfdff',
                padding: '48px 32px',
                borderRadius: '16px',
                border: pkg.popular ? 'none' : '1px solid rgba(57, 61, 63, 0.08)',
                position: 'relative',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                boxShadow: pkg.popular 
                  ? '0 16px 48px rgba(98, 146, 158, 0.2)'
                  : '0 8px 24px rgba(57, 61, 63, 0.04)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)'
                e.currentTarget.style.boxShadow = pkg.popular
                  ? '0 24px 64px rgba(98, 146, 158, 0.3)'
                  : '0 16px 48px rgba(57, 61, 63, 0.08)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = pkg.popular
                  ? '0 16px 48px rgba(98, 146, 158, 0.2)'
                  : '0 8px 24px rgba(57, 61, 63, 0.04)'
              }}
            >
              {pkg.popular && (
                <div style={{
                  position: 'absolute',
                  top: '24px',
                  right: '24px',
                  background: 'rgba(253, 253, 255, 0.15)',
                  color: '#fdfdff',
                  padding: '6px 16px',
                  borderRadius: '20px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  border: '1px solid rgba(253, 253, 255, 0.2)'
                }}>
                  Popüler
                </div>
              )}

              <div style={{ marginBottom: '32px' }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: pkg.popular ? '#fdfdff' : '#393d3f',
                  marginBottom: '8px',
                  fontFamily: 'inherit',
                  letterSpacing: '-0.01em'
                }}>
                  {pkg.name}
                </h3>
                
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span style={{
                    fontSize: '3rem',
                    fontWeight: '700',
                    color: pkg.popular ? '#fdfdff' : '#393d3f',
                    fontFamily: 'inherit',
                    letterSpacing: '-0.02em'
                  }}>
                    {pkg.price}
                  </span>
                  <span style={{
                    fontSize: '0.9375rem',
                    color: pkg.popular ? 'rgba(253, 253, 255, 0.7)' : '#546a7b',
                    fontFamily: 'inherit',
                    fontWeight: '500'
                  }}>
                    {pkg.period}
                  </span>
                </div>
              </div>

              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: '0 0 32px 0'
              }}>
                {pkg.features.map((feature, idx) => (
                  <li key={idx} style={{
                    padding: '12px 0',
                    color: pkg.popular ? 'rgba(253, 253, 255, 0.9)' : '#546a7b',
                    fontSize: '0.9375rem',
                    display: 'flex',
                    alignItems: 'start',
                    gap: '12px',
                    fontFamily: 'inherit',
                    fontWeight: '400',
                    lineHeight: '1.6'
                  }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0, marginTop: '2px' }}>
                      <circle cx="10" cy="10" r="10" fill={pkg.popular ? 'rgba(253, 253, 255, 0.15)' : 'rgba(98, 146, 158, 0.1)'} />
                      <path d="M6 10l3 3 5-6" stroke={pkg.popular ? '#fdfdff' : '#62929e'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <button style={{
                width: '100%',
                padding: '14px 24px',
                borderRadius: '10px',
                border: pkg.popular ? '1px solid rgba(253, 253, 255, 0.2)' : '1px solid rgba(57, 61, 63, 0.12)',
                background: pkg.popular ? 'rgba(253, 253, 255, 0.1)' : '#62929e',
                color: '#fdfdff',
                fontSize: '0.9375rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                fontFamily: 'inherit',
                letterSpacing: '0.3px'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = pkg.popular ? 'rgba(253, 253, 255, 0.15)' : '#546a7b'
                e.target.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.target.style.background = pkg.popular ? 'rgba(253, 253, 255, 0.1)' : '#62929e'
                e.target.style.transform = 'translateY(0)'
              }}
              >
                Hemen Başla
              </button>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div style={{
          textAlign: 'center',
          padding: '64px 48px',
          background: 'rgba(253, 253, 255, 0.6)',
          borderRadius: '16px',
          border: '1px solid rgba(57, 61, 63, 0.06)'
        }}>
          <h3 style={{
            fontSize: '1.75rem',
            fontWeight: '600',
            color: '#393d3f',
            marginBottom: '16px',
            fontFamily: 'inherit',
            letterSpacing: '-0.01em'
          }}>
            Özel İhtiyaçlarınız mı Var?
          </h3>
          <p style={{
            fontSize: '1.0625rem',
            color: '#546a7b',
            marginBottom: '32px',
            maxWidth: '600px',
            margin: '0 auto 32px',
            lineHeight: '1.7',
            fontFamily: 'inherit',
            fontWeight: '400'
          }}>
            Büyük tesisler, endüstriyel alanlar veya özel projeler için size özel çözümler sunuyoruz
          </p>
          <a href="/iletisim" style={{
            display: 'inline-block',
            padding: '14px 32px',
            background: '#62929e',
            color: '#fdfdff',
            textDecoration: 'none',
            borderRadius: '10px',
            fontWeight: '600',
            fontSize: '0.9375rem',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            fontFamily: 'inherit',
            letterSpacing: '0.3px',
            border: '1px solid rgba(98, 146, 158, 0.12)'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = '#546a7b'
            e.target.style.transform = 'translateY(-2px)'
            e.target.style.boxShadow = '0 12px 32px rgba(98, 146, 158, 0.2)'
          }}
          onMouseLeave={(e) => {
            e.target.style.background = '#62929e'
            e.target.style.transform = 'translateY(0)'
            e.target.style.boxShadow = 'none'
          }}
          >
            Bizimle İletişime Geçin
          </a>
        </div>
      </main>

      <div style={{ position: 'relative', zIndex: 1000 }}>
        <Footer />
      </div>
    </div>
  )
}
