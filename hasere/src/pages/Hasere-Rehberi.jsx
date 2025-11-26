import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import GridBackground from "../components/GridBackground"

export default function HasereRehberi() {
  const pestCategories = [
    {
      title: "Yürüyen Haşereler",
      description: "Hamamböceği türleri, karınca, gümüşçün, örümcek, kırkayak vb. kapsar. En sık tıklanacak alan burasıdır.",
      image: "https://cdn.pixabay.com/photo/2013/02/01/10/59/giant-hissing-cockroach-77069_960_720.jpg",
      slug: "yuruyen-hasereler"
    },
    {
      title: "Uçan Haşereler", 
      description: "Karasinek, sivrisinek, arı, yaban arısı, tatarcık vb. kapsar.",
      image: "https://cdn.pixabay.com/photo/2019/08/14/22/02/mosquito-4406812_1280.jpg",
      slug: "ucan-hasereler"
    },
    {
      title: "Kemirgenler",
      description: "Fare, sıçan, gelincik vb. memeli zararlıları kapsar. Genelde korku faktörü yüksek olduğu için ayrı bir başlık olması iyidir.",
      image: "https://cdn.pixabay.com/photo/2020/05/06/02/40/house-mouse-5135882_1280.jpg",
      slug: "kemirgenler"
    },
    {
      title: "Kan Emenler & Parazitler",
      description: "Tahtakurusu, pire, kene, bit gibi insan kanıyla beslenenleri kapsar. İnsanlar bu konuda çok panik olduğu için \"Yürüyenler\"den ayırmak mantıklıdır.",
      image: "https://cdn.pixabay.com/photo/2023/08/28/07/43/castor-bean-tick-8218542_1280.jpg",
      slug: "kan-emenler"
    },
    {
      title: "Depo ve Gıda Zararlıları",
      description: "Güve, un bitleri, bakliyat böcekleri gibi mutfak ve kilerde çıkanları kapsar.",
      image: "https://cdn.pixabay.com/photo/2022/08/17/12/43/moth-7392448_1280.jpg",
      slug: "depo-zararlilari"
    },
    {
      title: "Ahşap ve Yapı Zararlıları",
      description: "Termitler, tahtakurdu, ağaç kemiren böcekler vb. kapsar.",
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
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '24px'
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
                height: '280px',
                display: 'block',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
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
                padding: '24px',
                zIndex: 2,
                color: '#fdfdff'
              }}>
                <h2 style={{
                  fontSize: '1.8rem',
                  fontWeight: '700',
                  marginBottom: '12px',
                  textShadow: '0 2px 8px rgba(0,0,0,0.3)'
                }}>
                  {category.title}
                </h2>
                
                <p style={{
                  fontSize: '0.95rem',
                  lineHeight: '1.6',
                  opacity: 0.95,
                  textShadow: '0 1px 4px rgba(0,0,0,0.3)'
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
