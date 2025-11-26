import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { supabase } from "../supabase"

export default function Header() {
  const [siteInfo, setSiteInfo] = useState(null)

  useEffect(() => {
    getSiteInfo()
  }, [])

  async function getSiteInfo() {
    const { data } = await supabase
      .from('general_config')
      .select('site_title, logo_url')
      .eq('id', 1)
      .single()
    
    if (data) setSiteInfo(data)
  }

  return (
    <nav style={{
      width: "100%",
      backgroundColor: "#ffffff",
      borderBottom: "1px solid #e5e7eb",
      position: "sticky",
      top: 0,
      zIndex: 1000,
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
    }}>
      <div style={{
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "0 24px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "70px",
        position: "relative"
      }}>
        
        {/* Logo / Brand - Sol tarafta */}
        <Link to="/" style={{
          display: "flex",
          alignItems: "center",
          textDecoration: "none",
          color: "#111827",
          fontSize: "18px",
          fontWeight: "600",
          position: "absolute",
          left: "24px"
        }}>
          {siteInfo?.logo_url ? (
            <img 
              src={siteInfo.logo_url} 
              alt="Logo" 
              style={{
                width: "35px",
                height: "35px",
                objectFit: "contain",
                marginRight: "10px"
              }}
            />
          ) : (
            <div style={{
              width: "35px",
              height: "35px",
              borderRadius: "6px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              marginRight: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "16px"
            }}>
              ⚡
            </div>
          )}
          {siteInfo?.site_title || "Site"}
        </Link>

        {/* Navigation Links - Ortada */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "40px"
        }}>
          <Link to="/" style={{
            textDecoration: "none",
            color: "#6b7280",
            fontSize: "16px",
            fontWeight: "500",
            transition: "color 0.2s"
          }}
          onMouseEnter={(e) => e.target.style.color = "#111827"}
          onMouseLeave={(e) => e.target.style.color = "#6b7280"}>
            Ana Sayfa
          </Link>
          
          <Link to="/admin" style={{
            textDecoration: "none",
            color: "#6b7280",
            fontSize: "16px",
            fontWeight: "500",
            transition: "color 0.2s"
          }}
          onMouseEnter={(e) => e.target.style.color = "#111827"}
          onMouseLeave={(e) => e.target.style.color = "#6b7280"}>
            Admin Paneli
          </Link>
        </div>

        {/* CTA Button - Sağ tarafta */}
        <Link to="/admin" style={{
          textDecoration: "none",
          backgroundColor: "#111827",
          color: "#ffffff",
          padding: "12px 28px",
          borderRadius: "8px",
          fontSize: "15px",
          fontWeight: "600",
          transition: "all 0.2s",
          position: "absolute",
          right: "24px"
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "#1f2937"
          e.target.style.transform = "translateY(-1px)"
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "#111827"
          e.target.style.transform = "translateY(0)"
        }}>
          Yönetim Paneli
        </Link>
      </div>
    </nav>
  )
}