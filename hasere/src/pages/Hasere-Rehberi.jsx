import { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import GridBackground from "../components/GridBackground"

export default function HasereRehberi() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const pestCategories = [
    {
      title: "Yürüyen Haşereler",
      description: "Genellikle hamam böceği, karınca, gümüş böceği (gümüşçün), örümcek ve kırkayak gibi zemin üzerinde hareket eden zararlı türleridir.",
      image: "https://cdn.pixabay.com/photo/2013/02/01/10/59/giant-hissing-cockroach-77069_960_720.jpg",
      slug: "yuruyen-hasereler"
    },
    {
      title: "Uçan Haşereler", 
      description: "Başta sivrisinek, karasinek, yaban arısı ve güve olmak üzere, uçarak hareket eden ve yaşam alanlarını hızla istila edebilen zararlılardır.",
      image: "https://cdn.pixabay.com/photo/2019/08/14/22/02/mosquito-4406812_1280.jpg",
      slug: "ucan-hasereler"
    },
    {
      title: "Kemirgenler",
      description: "Ev faresi, lağım faresi (sıçan) ve çatı faresi gibi güçlü ön dişlere sahip, çok hızlı üreyen ve zeki memeli zararlılardır.",
      image: "https://cdn.pixabay.com/photo/2020/05/06/02/40/house-mouse-5135882_1280.jpg",
      slug: "kemirgenler"
    },
    {
      title: "Kan Emenler & Parazitler",
      description: "Başta tahtakurusu, pire, kene ve toz akarı olmak üzere; insan veya evcil hayvanların kanıyla beslenen, genellikle yatak, koltuk ve halı gibi alanlara saklanan mikroskobik veya küçük canlılardır.",
      image: "https://cdn.pixabay.com/photo/2023/08/28/07/43/castor-bean-tick-8218542_1280.jpg",
      slug: "kan-emenler"
    },
    {
      title: "Depo ve Gıda Zararlıları",
      description: "Un güvesi, kırma biti, pirinç biti ve ekin kamburu gibi; genellikle mutfak kilerlerinde, depolarda, tahıl silolarında ve kuru bakliyatların içinde yaşayan zararlılardır.",
      image: "https://cdn.pixabay.com/photo/2022/08/17/12/43/moth-7392448_1280.jpg",
      slug: "depo-zararlilari"
    },
    {
      title: "Ahşap ve Yapı Zararlıları",
      description: "Halk arasında 'mobilya böceği' olarak da bilinen tahta kurdu ve termitler; evlerdeki mobilya, parke, kapı kasaları ve ahşap çatılarda yaşayan türlerdir.",
      image: "https://cdn.pixabay.com/photo/2019/08/13/23/33/woodworm-4404382_1280.jpg",
      slug: "ahsap-zararlilari"
    }
  ]

  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <GridBackground />
      
      <div style={{ position: 'relative', zIndex: 1000 }}>
        <Navbar />
      </div>
      
      <main style={{ 
        position: 'relative',
        zIndex: 1,
        flex: 1,
        padding: '100px 24px 60px',
        maxWidth: '1400px',
        margin: '0 auto',
        width: '100%'
      }}>
        {/* Hero Section */}
        <div style={{
          textAlign: 'center',
          marginBottom: '60px'
        }}>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: '900',
            color: '#393d3f',
            marginBottom: '16px'
          }}>
            Haşere Rehberi
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: '#546a7b',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Evinizdeki istenmeyen misafirleri tanıyın ve doğru çözümü bulun.
          </p>
        </div>

        {/* Pest Categories Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: 'clamp(16px, 3vw, 24px)',
          padding: isMobile ? '0 10px' : '0'
        }}>
          {pestCategories.map((category, index) => (
            <Link
              key={index}
              to={`/hasere-rehberi/${category.slug}`}
              style={{
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.3s ease',
                height: isMobile ? '240px' : '280px',
                display: 'block',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.transform = 'scale(1.02)'
                }
              }}
              onMouseLeave={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.transform = 'scale(1)'
                }
              }}
            >
              {/* Background Image */}
              <img 
                src={category.image}
                alt={category.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  position: 'absolute',
                  top: 0,
                  left: 0
                }}
              />
              
              {/* Gradient Overlay */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)',
                zIndex: 1
              }} />
              
              {/* Content */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: 'clamp(16px, 3vw, 24px)',
                zIndex: 2,
                color: '#fdfdff',
                maxHeight: '50%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end'
              }}>
                <h2 style={{
                  fontSize: 'clamp(1.25rem, 3.5vw, 1.8rem)',
                  fontWeight: '700',
                  marginBottom: 'clamp(8px, 2vw, 12px)',
                  textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                  lineHeight: '1.2'
                }}>
                  {category.title}
                </h2>
                
                <p style={{
                  fontSize: 'clamp(0.8rem, 2vw, 0.95rem)',
                  lineHeight: '1.5',
                  opacity: 0.95,
                  textShadow: '0 1px 4px rgba(0,0,0,0.3)',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: isMobile ? '2' : '3',
                  WebkitBoxOrient: 'vertical'
                }}>
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <div style={{ position: 'relative', zIndex: 1000 }}>
        <Footer />
      </div>
    </div>
  )
}
