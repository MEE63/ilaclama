import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { supabase } from "../supabase"
import { useAuth } from "../contexts/AuthContext"

export default function Navbar() {
  const [siteInfo, setSiteInfo] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const [loading, setLoading] = useState(true)
  const { isAdmin } = useAuth()

  useEffect(() => {
    getSiteInfo()
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  async function getSiteInfo() {
    const { data } = await supabase
      .from('general_config')
      .select('site_title, logo_url')
      .eq('id', 1)
      .single()
    
    if (data) setSiteInfo(data)
    setLoading(false)
  }

  return (
    <nav style={{
      width: "100%",
      backgroundColor: "#fdfdff",
      borderBottom: "1px solid #c6c5b9",
      position: "sticky",
      top: 0,
      zIndex: 1000,
      boxShadow: "0 1px 3px rgba(57, 61, 63, 0.1)"
    }}>
      <div style={{
        maxWidth: "1280px",
        margin: "0 auto",
        padding: isMobile ? "0 12px" : "0 24px",
        display: "flex",
        justifyContent: isMobile ? "space-between" : "center",
        alignItems: "center",
        minHeight: "70px",
        flexWrap: isMobile ? "wrap" : "nowrap",
        gap: isMobile ? "10px" : "0",
        position: "relative"
      }}>
        
        {/* Logo / Brand */}
        <Link to="/" style={{
          display: "flex",
          alignItems: "center",
          textDecoration: "none",
          color: "#393d3f",
          fontSize: isMobile ? "14px" : "18px",
          fontWeight: "600",
          flexShrink: 0,
          position: isMobile ? "static" : "absolute",
          left: isMobile ? "auto" : "24px"
        }}>
          {loading ? (
            // Loading placeholder
            <div style={{
              width: isMobile ? "50px" : "67px",
              height: isMobile ? "50px" : "67px",
              borderRadius: "6px",
              background: "linear-gradient(90deg, #e8eef1 0%, #d4dce0 50%, #e8eef1 100%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 1.5s infinite",
              marginRight: isMobile ? "8px" : "10px"
            }}>
              <style>{`
                @keyframes shimmer {
                  0% { background-position: -200% 0; }
                  100% { background-position: 200% 0; }
                }
              `}</style>
            </div>
          ) : siteInfo?.logo_url ? (
            <img 
              src={siteInfo.logo_url} 
              alt="Logo" 
              style={{
                width: isMobile ? "50px" : "67px",
                height: isMobile ? "50px" : "67px",
                objectFit: "contain",
                marginRight: isMobile ? "8px" : "10px",
                opacity: 1,
                transition: 'opacity 0.3s ease'
              }}
            />
          ) : (
            <div style={{
              width: isMobile ? "50px" : "67px",
              height: isMobile ? "50px" : "67px",
              borderRadius: "6px",
              background: "linear-gradient(135deg, #62929e 0%, #546a7b 100%)",
              marginRight: isMobile ? "8px" : "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fdfdff",
              fontSize: isMobile ? "24px" : "32px",
              opacity: 1,
              transition: 'opacity 0.3s ease'
            }}>
              ⚡
            </div>
          )}
          <span style={{ 
            fontSize: isMobile ? "14px" : "18px",
            opacity: loading ? 0 : 1,
            transition: 'opacity 0.3s ease'
          }}>
            {siteInfo?.site_title || ""}
          </span>
        </Link>

        {/* Navigation Links */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: isMobile ? "15px" : "40px",
          flexWrap: isMobile ? "wrap" : "nowrap",
          justifyContent: "center"
        }}>
          <Link to="/" style={{
            textDecoration: "none",
            color: "#546a7b",
            fontSize: isMobile ? "13px" : "16px",
            fontWeight: "500",
            transition: "color 0.2s",
            whiteSpace: "nowrap"
          }}
          onMouseEnter={(e) => e.target.style.color = "#393d3f"}
          onMouseLeave={(e) => e.target.style.color = "#546a7b"}>
            Ana Sayfa
          </Link>
          
          <Link to="/hizmetlerimiz" style={{
            textDecoration: "none",
            color: "#546a7b",
            fontSize: isMobile ? "13px" : "16px",
            fontWeight: "500",
            transition: "color 0.2s",
            whiteSpace: "nowrap"
          }}
          onMouseEnter={(e) => e.target.style.color = "#393d3f"}
          onMouseLeave={(e) => e.target.style.color = "#546a7b"}>
            Hizmetlerimiz
          </Link>

          <Link to="/iletisim" style={{
            textDecoration: "none",
            color: "#546a7b",
            fontSize: isMobile ? "13px" : "16px",
            fontWeight: "500",
            transition: "color 0.2s",
            whiteSpace: "nowrap"
          }}
          onMouseEnter={(e) => e.target.style.color = "#393d3f"}
          onMouseLeave={(e) => e.target.style.color = "#546a7b"}>
            İletişim
          </Link>

          <Link to="/Hasere-Rehberi" style={{
            textDecoration: "none",
            color: "#546a7b",
            fontSize: isMobile ? "13px" : "16px",
            fontWeight: "500",
            transition: "color 0.2s",
            whiteSpace: "nowrap"
          }}
          onMouseEnter={(e) => e.target.style.color = "#393d3f"}
          onMouseLeave={(e) => e.target.style.color = "#546a7b"}>
            Haşere Rehberi
          </Link>
        </div>

        {/* CTA Button - Sadece admin görebilir */}
        {isAdmin && (
          <Link to="/admin" style={{
            textDecoration: "none",
            backgroundColor: "#393d3f",
            color: "#fdfdff",
            padding: isMobile ? "8px 16px" : "12px 28px",
            borderRadius: "8px",
            fontSize: isMobile ? "12px" : "15px",
            fontWeight: "600",
            transition: "all 0.2s",
            whiteSpace: "nowrap",
            flexShrink: 0,
            position: isMobile ? "static" : "absolute",
            right: isMobile ? "auto" : "24px"
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#546a7b"
            e.target.style.transform = "translateY(-1px)"
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#393d3f"
            e.target.style.transform = "translateY(0)"
          }}>
            {isMobile ? "Yönetim" : "Yönetim Paneli"}
          </Link>
        )}
      </div>
    </nav>
  )
}
