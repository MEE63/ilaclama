import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../supabase'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mevcut oturumu kontrol et
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchProfile(session.user.id)
      } else {
        setLoading(false)
      }
    })

    // Auth değişikliklerini dinle
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchProfile(session.user.id)
      } else {
        setProfile(null)
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  // Kullanıcı profilini veritabanından çek
  const fetchProfile = async (userId) => {
    console.log('🔍 Profil çekiliyor, userId:', userId)
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      console.log('📊 Profil data:', data)
      console.log('❌ Profil error:', error)

      if (error) {
        console.error('❌ Profil çekme hatası:', error)
        setProfile(null)
      } else {
        console.log('✅ Profil başarıyla çekildi:', data)
        console.log('👤 Admin mi?', data?.is_admin)
        setProfile(data)
      }
    } catch (error) {
      console.error('❌ Profil çekme hatası (catch):', error)
      setProfile(null)
    } finally {
      setLoading(false)
    }
  }

  // Admin kontrolü - artık veritabanından geliyor
  const isAdmin = profile?.is_admin === true

  const value = {
    user,
    profile,
    isAdmin,
    loading,
    signIn: (email, password) => supabase.auth.signInWithPassword({ email, password }),
    signOut: () => supabase.auth.signOut(),
    refreshProfile: () => user && fetchProfile(user.id)
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
