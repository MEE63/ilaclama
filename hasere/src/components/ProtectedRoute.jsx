import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function ProtectedRoute({ children }) {
  const { isAdmin, loading } = useAuth()

  // Auth durumu yüklenirken loading göster
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: '#fdfdff'
      }}>
        <div style={{
          width: '60px',
          height: '60px',
          border: '4px solid #e8eef1',
          borderTop: '4px solid #62929e',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    )
  }

  // Admin değilse ana sayfaya yönlendir
  if (!isAdmin) {
    return <Navigate to="/" replace />
  }

  // Admin ise içeriği göster
  return children
}
