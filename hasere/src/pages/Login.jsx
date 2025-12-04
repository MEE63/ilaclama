import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import GridBackground from '../components/GridBackground'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    console.log('Giriş denemesi:', email)

    const { data, error } = await signIn(email, password)

    console.log('Giriş sonucu:', { data, error })

    if (error) {
      console.error('Giriş hatası:', error)
      setError(`Giriş başarısız: ${error.message}`)
      setLoading(false)
    } else {
      console.log('Giriş başarılı, yönlendiriliyor...')
      navigate('/admin')
    }
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <GridBackground />
      
      <div style={{
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '20px'
      }}>
        <div style={{
          background: '#fdfdff',
          padding: '40px',
          borderRadius: '16px',
          border: '1px solid #c6c5b9',
          maxWidth: '400px',
          width: '100%',
          boxShadow: '0 4px 12px rgba(57, 61, 63, 0.1)'
        }}>
          <h2 style={{
            margin: '0 0 10px 0',
            color: '#393d3f',
            fontSize: '28px',
            textAlign: 'center'
          }}>
            🔐 Admin Girişi
          </h2>
          <p style={{
            margin: '0 0 30px 0',
            color: '#546a7b',
            fontSize: '14px',
            textAlign: 'center'
          }}>
            Yönetim paneline erişmek için giriş yapın
          </p>

          {error && (
            <div style={{
              padding: '12px',
              background: '#ffe8e8',
              color: '#c62828',
              borderRadius: '8px',
              marginBottom: '20px',
              fontSize: '14px',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: '#546a7b',
                fontSize: '14px',
                fontWeight: '600'
              }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@hasere.com"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #c6c5b9',
                  fontSize: '15px',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: '#546a7b',
                fontSize: '14px',
                fontWeight: '600'
              }}>
                Şifre
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #c6c5b9',
                  fontSize: '15px',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '14px',
                background: loading ? '#c6c5b9' : '#393d3f',
                color: '#fdfdff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                fontFamily: 'inherit'
              }}
              onMouseEnter={(e) => {
                if (!loading) e.target.style.background = '#546a7b'
              }}
              onMouseLeave={(e) => {
                if (!loading) e.target.style.background = '#393d3f'
              }}
            >
              {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
            </button>
          </form>

          <p style={{
            marginTop: '20px',
            textAlign: 'center',
            fontSize: '13px',
            color: '#546a7b'
          }}>
            <a href="/" style={{ color: '#62929e', textDecoration: 'none' }}>
              ← Ana Sayfaya Dön
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
