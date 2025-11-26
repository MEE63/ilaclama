import { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { supabase } from '../supabase'

export default function Footer() {
  const [address, setAddress] = useState('')

  useEffect(() => {
    fetchAddress()
  }, [])

  async function fetchAddress() {
    const { data } = await supabase
      .from('general_config')
      .select('address')
      .eq('id', 1)
      .single()
    
    if (data) {
      setAddress(data.address)
    }
  }

  return (
    <footer style={{
      background: "linear-gradient(135deg, #2d3436 0%, #393d3f 100%)",
      color: "#c6c5b9",
      padding: "60px 24px 30px",
      position: "relative",
      zIndex: 1000
    }}>
      <div style={{
        maxWidth: "1280px",
        margin: "0 auto"
      }}>
        
        {/* Links Section */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "120px",
          marginBottom: "50px",
          flexWrap: "wrap"
        }}>
          
          {/* Kaynaklar */}
          <div style={{ textAlign: "center" }}>
            <h4 style={{
              color: "#fdfdff",
              fontSize: "1.1rem",
              fontWeight: "600",
              marginBottom: "20px"
            }}>
              Kaynaklar
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li style={{ marginBottom: "12px" }}>
                <a href="/iletisim" style={{
                  color: "#c6c5b9",
                  textDecoration: "none",
                  fontSize: "0.95rem",
                  transition: "color 0.3s"
                }}
                onMouseEnter={(e) => e.target.style.color = "#fdfdff"}
                onMouseLeave={(e) => e.target.style.color = "#c6c5b9"}>
                  İletişim
                </a>
              </li>
              <li style={{ marginBottom: "12px" }}>
                <Link to="/fiyatlandirma" style={{
                  color: "#c6c5b9",
                  textDecoration: "none",
                  fontSize: "0.95rem",
                  transition: "color 0.3s"
                }}
                onMouseEnter={(e) => e.target.style.color = "#fdfdff"}
                onMouseLeave={(e) => e.target.style.color = "#c6c5b9"}>
                  Fiyatlandırma
                </Link>
              </li>
              <li style={{ marginBottom: "12px" }}>
                <Link to="/hasere-rehberi" style={{
                  color: "#c6c5b9",
                  textDecoration: "none",
                  fontSize: "0.95rem",
                  transition: "color 0.3s"
                }}
                onMouseEnter={(e) => e.target.style.color = "#fdfdff"}
                onMouseLeave={(e) => e.target.style.color = "#c6c5b9"}>
                  Ne Yapmalıyım?
                </Link>
              </li>
            </ul>
          </div>

          {/* Hakkımızda */}
          <div style={{ textAlign: "center" }}>
            <h4 style={{
              color: "#fdfdff",
              fontSize: "1.1rem",
              fontWeight: "600",
              marginBottom: "20px"
            }}>
              Hakkımızda
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li style={{ marginBottom: "12px" }}>
                <Link to="/lisans" style={{
                  color: "#c6c5b9",
                  textDecoration: "none",
                  fontSize: "0.95rem",
                  transition: "color 0.3s"
                }}
                onMouseEnter={(e) => e.target.style.color = "#fdfdff"}
                onMouseLeave={(e) => e.target.style.color = "#c6c5b9"}>
                  Lisans
                </Link>
              </li>
              <li style={{ marginBottom: "12px" }}>
                <Link to="/gizlilik" style={{
                  color: "#c6c5b9",
                  textDecoration: "none",
                  fontSize: "0.95rem",
                  transition: "color 0.3s"
                }}
                onMouseEnter={(e) => e.target.style.color = "#fdfdff"}
                onMouseLeave={(e) => e.target.style.color = "#c6c5b9"}>
                  Gizlilik
                </Link>
              </li>
              <li style={{ marginBottom: "12px" }}>
                <Link to="/biz-kimiz" style={{
                  color: "#c6c5b9",
                  textDecoration: "none",
                  fontSize: "0.95rem",
                  transition: "color 0.3s"
                }}
                onMouseEnter={(e) => e.target.style.color = "#fdfdff"}
                onMouseLeave={(e) => e.target.style.color = "#c6c5b9"}>
                  Biz Kimiz
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: "30px",
          borderTop: "1px solid rgba(198, 197, 185, 0.2)",
          flexWrap: "wrap",
          gap: "20px"
        }}>
          <div>
            <p style={{
              color: "#c6c5b9",
              fontSize: "0.9rem",
              margin: '0 0 8px 0'
            }}>
              © 2024 Haşere İlaçlama. Tüm hakları saklıdır.
            </p>
            {address && (
              <p style={{
                color: "#c6c5b9",
                fontSize: "0.85rem",
                margin: 0,
                opacity: 0.8
              }}>
                📍 {address}
              </p>
            )}
          </div>

          {/* Social Icons */}
          <div style={{
            display: "flex",
            gap: "20px"
          }}>
            <a href="#" style={{
              color: "#c6c5b9",
              fontSize: "1.5rem",
              transition: "color 0.3s"
            }}
            onMouseEnter={(e) => e.target.style.color = "#62929e"}
            onMouseLeave={(e) => e.target.style.color = "#c6c5b9"}>
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="#" style={{
              color: "#c6c5b9",
              fontSize: "1.5rem",
              transition: "color 0.3s"
            }}
            onMouseEnter={(e) => e.target.style.color = "#62929e"}
            onMouseLeave={(e) => e.target.style.color = "#c6c5b9"}>
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a href="#" style={{
              color: "#c6c5b9",
              fontSize: "1.5rem",
              transition: "color 0.3s"
            }}
            onMouseEnter={(e) => e.target.style.color = "#62929e"}
            onMouseLeave={(e) => e.target.style.color = "#c6c5b9"}>
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="#" style={{
              color: "#c6c5b9",
              fontSize: "1.5rem",
              transition: "color 0.3s"
            }}
            onMouseEnter={(e) => e.target.style.color = "#62929e"}
            onMouseLeave={(e) => e.target.style.color = "#c6c5b9"}>
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
