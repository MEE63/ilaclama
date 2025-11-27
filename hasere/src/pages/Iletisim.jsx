import { useState, useEffect } from 'react'
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import GridBackground from "../components/GridBackground"
import { supabase } from '../supabase'

export default function Iletisim() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [contactInfo, setContactInfo] = useState({
    email: '',
    phone: '',
    address: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    fetchContactInfo()
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 900)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  async function fetchContactInfo() {
    const { data, error } = await supabase
      .from('contact_info')
      .select('*')
      .eq('id', 1)
      .single()
    
    if (data) {
      setContactInfo(data)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const { error } = await supabase
      .from('contact_submissions')
      .insert([{
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        is_read: false
      }])

    if (!error) {
      setMessage('✅ Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.')
      setFormData({ name: '', email: '', phone: '', message: '' })
    } else {
      setMessage('❌ Bir hata oluştu. Lütfen tekrar deneyin.')
    }
    setLoading(false)
  }

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
        padding: '80px 24px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h1 style={{
          fontSize: isMobile ? '2rem' : '3rem',
          fontWeight: '800',
          color: '#393d3f',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          İletişim
        </h1>
        
        <p style={{
          fontSize: isMobile ? '1rem' : '1.2rem',
          color: '#546a7b',
          textAlign: 'center',
          marginBottom: '60px',
          maxWidth: '600px',
          margin: '0 auto 60px',
          padding: isMobile ? '0 10px' : '0'
        }}>
          Bizimle iletişime geçmek için aşağıdaki bilgileri kullanabilirsiniz.
        </p>

        {/* Form and Contact Info Container */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? '30px' : '40px',
          marginTop: '40px'
        }}>
          {/* Contact Form */}
          <div style={{
            background: 'linear-gradient(135deg, #393d3f 0%, #546a7b 100%)',
            padding: isMobile ? '30px' : '50px',
            borderRadius: '24px',
            boxShadow: '0 20px 60px rgba(57, 61, 63, 0.3)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            if (!isMobile) {
              e.currentTarget.style.transform = 'translateY(-5px)'
              e.currentTarget.style.boxShadow = '0 25px 70px rgba(57, 61, 63, 0.4)'
            }
          }}
          onMouseLeave={(e) => {
            if (!isMobile) {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 20px 60px rgba(57, 61, 63, 0.3)'
            }
          }}
          >
            <p style={{
              fontSize: '0.9rem',
              fontWeight: '600',
              letterSpacing: '2px',
              color: '#c6c5b9',
              marginBottom: '10px',
              textTransform: 'uppercase'
            }}>
              Merhaba Deyin
            </p>
            
            <h2 style={{
              fontSize: isMobile ? '1.75rem' : '2.5rem',
              fontWeight: '800',
              color: '#fdfdff',
              marginBottom: '15px',
              lineHeight: '1.2'
            }}>
              Hazırız, Siz Hazır Olduğunuzda
            </h2>
            
            <p style={{
              fontSize: isMobile ? '0.9rem' : '1rem',
              color: 'rgba(253, 253, 255, 0.8)',
              marginBottom: isMobile ? '30px' : '40px',
              lineHeight: '1.6'
            }}>
              Bilgilerinizi bırakın, ekibimiz bir iş günü içinde size geri dönüş yapacaktır.
            </p>

            {message && (
              <div style={{
                padding: '15px',
                borderRadius: '12px',
                background: message.includes('✅') ? 'rgba(98, 146, 158, 0.2)' : 'rgba(255, 100, 100, 0.2)',
                color: '#fdfdff',
                marginBottom: '20px',
                fontSize: '0.95rem',
                fontWeight: '600'
              }}>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '25px'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  color: '#fdfdff',
                  marginBottom: '8px'
                }}>
                  İsim
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Adınız Soyadınız"
                  style={{
                    width: '100%',
                    padding: '14px 18px',
                    borderRadius: '12px',
                    border: '2px solid rgba(253, 253, 255, 0.1)',
                    background: 'rgba(253, 253, 255, 0.05)',
                    color: '#fdfdff',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    e.target.style.border = '2px solid #62929e'
                    e.target.style.background = 'rgba(253, 253, 255, 0.1)'
                  }}
                  onBlur={(e) => {
                    e.target.style.border = '2px solid rgba(253, 253, 255, 0.1)'
                    e.target.style.background = 'rgba(253, 253, 255, 0.05)'
                  }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '20px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{
                    display: 'block',
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    color: '#fdfdff',
                    marginBottom: '8px'
                  }}>
                    E-posta
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="ornek@email.com"
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      borderRadius: '12px',
                      border: '2px solid rgba(253, 253, 255, 0.1)',
                      background: 'rgba(253, 253, 255, 0.05)',
                      color: '#fdfdff',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'all 0.3s ease',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => {
                      e.target.style.border = '2px solid #62929e'
                      e.target.style.background = 'rgba(253, 253, 255, 0.1)'
                    }}
                    onBlur={(e) => {
                      e.target.style.border = '2px solid rgba(253, 253, 255, 0.1)'
                      e.target.style.background = 'rgba(253, 253, 255, 0.05)'
                    }}
                  />
                </div>

                <div style={{ flex: 1 }}>
                  <label style={{
                    display: 'block',
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    color: '#fdfdff',
                    marginBottom: '8px'
                  }}>
                    Telefon
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+90 XXX XXX XX XX"
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      borderRadius: '12px',
                      border: '2px solid rgba(253, 253, 255, 0.1)',
                      background: 'rgba(253, 253, 255, 0.05)',
                      color: '#fdfdff',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'all 0.3s ease',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => {
                      e.target.style.border = '2px solid #62929e'
                      e.target.style.background = 'rgba(253, 253, 255, 0.1)'
                    }}
                    onBlur={(e) => {
                      e.target.style.border = '2px solid rgba(253, 253, 255, 0.1)'
                      e.target.style.background = 'rgba(253, 253, 255, 0.05)'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  color: '#fdfdff',
                  marginBottom: '8px'
                }}>
                  Mesaj
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Projeniz, zaman çizelgeniz ve hedefleriniz hakkında bize bilgi verin..."
                  rows="6"
                  style={{
                    width: '100%',
                    padding: '14px 18px',
                    borderRadius: '12px',
                    border: '2px solid rgba(253, 253, 255, 0.1)',
                    background: 'rgba(253, 253, 255, 0.05)',
                    color: '#fdfdff',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    resize: 'vertical',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    e.target.style.border = '2px solid #62929e'
                    e.target.style.background = 'rgba(253, 253, 255, 0.1)'
                  }}
                  onBlur={(e) => {
                    e.target.style.border = '2px solid rgba(253, 253, 255, 0.1)'
                    e.target.style.background = 'rgba(253, 253, 255, 0.05)'
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '16px',
                  borderRadius: '12px',
                  border: 'none',
                  background: loading ? '#546a7b' : 'linear-gradient(135deg, #62929e 0%, #546a7b 100%)',
                  color: '#fdfdff',
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  boxShadow: '0 10px 30px rgba(98, 146, 158, 0.3)'
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.target.style.transform = 'translateY(-2px)'
                    e.target.style.boxShadow = '0 15px 40px rgba(98, 146, 158, 0.4)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.target.style.transform = 'translateY(0)'
                    e.target.style.boxShadow = '0 10px 30px rgba(98, 146, 158, 0.3)'
                  }
                }}
              >
                {loading ? 'Gönderiliyor...' : 'Mesaj Gönder'}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '30px'
          }}>
            {/* Contact Details Card */}
            <div style={{
              background: 'linear-gradient(135deg, #2d3436 0%, #393d3f 100%)',
              padding: isMobile ? '30px' : '40px',
              borderRadius: '20px',
              boxShadow: '0 10px 40px rgba(57, 61, 63, 0.2)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              if (!isMobile) {
                e.currentTarget.style.transform = 'translateY(-5px)'
                e.currentTarget.style.boxShadow = '0 15px 50px rgba(57, 61, 63, 0.3)'
              }
            }}
            onMouseLeave={(e) => {
              if (!isMobile) {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 10px 40px rgba(57, 61, 63, 0.2)'
              }
            }}
            >
              <div style={{
                marginBottom: '30px'
              }}>
                <h3 style={{
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  letterSpacing: '2px',
                  color: '#c6c5b9',
                  marginBottom: '5px',
                  textTransform: 'uppercase'
                }}>
                  E-posta
                </h3>
                <p style={{
                  fontSize: '1.3rem',
                  fontWeight: '600',
                  color: '#fdfdff',
                  marginTop: '8px'
                }}>
                  {contactInfo.email || 'info@example.com'}
                </p>
              </div>

              <div style={{
                marginBottom: '30px'
              }}>
                <h3 style={{
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  letterSpacing: '2px',
                  color: '#c6c5b9',
                  marginBottom: '5px',
                  textTransform: 'uppercase'
                }}>
                  Telefon
                </h3>
                <p style={{
                  fontSize: '1.3rem',
                  fontWeight: '600',
                  color: '#fdfdff',
                  marginTop: '8px'
                }}>
                  {contactInfo.phone || '+90 XXX XXX XX XX'}
                </p>
              </div>

              <div style={{
                paddingTop: '20px',
                borderTop: '1px solid rgba(198, 197, 185, 0.2)'
              }}>
                <h3 style={{
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  letterSpacing: '2px',
                  color: '#c6c5b9',
                  marginBottom: '10px',
                  textTransform: 'uppercase'
                }}>
                  Merkez Ofis
                </h3>
                <p style={{
                  fontSize: '1rem',
                  color: 'rgba(253, 253, 255, 0.9)',
                  lineHeight: '1.6',
                  marginTop: '8px'
                }}>
                  {contactInfo.address || 'Örnek Mahalle, Örnek Sokak No:1, İstanbul, Türkiye'}
                </p>
              </div>
            </div>

            {/* Google Maps Widget */}
            <div style={{
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 10px 40px rgba(57, 61, 63, 0.2)',
              height: isMobile ? '300px' : '350px',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              if (!isMobile) {
                e.currentTarget.style.transform = 'translateY(-5px)'
                e.currentTarget.style.boxShadow = '0 15px 50px rgba(57, 61, 63, 0.3)'
              }
            }}
            onMouseLeave={(e) => {
              if (!isMobile) {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 10px 40px rgba(57, 61, 63, 0.2)'
              }
            }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3009.7547842857!2d28.97953931571795!3d41.01553997929845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab9bd6570f4e1%3A0xe8c5c93bb8c49c8e!2zVGFrc2ltIE1leWRhbsSxLCBJc3RhbmJ1bA!5e0!3m2!1sen!2str!4v1234567890123!5m2!1sen!2str"
                width="100%"
                height="100%"
                style={{
                  border: 0
                }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ofis Konumu"
              />
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
