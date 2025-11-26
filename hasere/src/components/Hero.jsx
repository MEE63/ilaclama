import { useState, useEffect } from 'react'

export default function Hero({ siteInfo }) {
  const [animatedTitle, setAnimatedTitle] = useState(null)

  useEffect(() => {
    if (siteInfo?.site_title) {
      const words = siteInfo.site_title.split(' ')
      if (words.length > 1) {
        const firstWord = words[0]
        const restWords = words.slice(1).join(' ')
        setAnimatedTitle({ firstWord, restWords })
      } else {
        setAnimatedTitle({ firstWord: siteInfo.site_title, restWords: '' })
      }
    }
  }, [siteInfo?.site_title])
  return (
    <section style={{
      width: "100%",
      background: "linear-gradient(135deg, #d4dce0 0%, #e8eef1 50%, #d4dce0 100%)",
      padding: "120px 24px",
      textAlign: "center",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Gradient overlay effect */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "radial-gradient(circle at 50% 50%, rgba(98, 146, 158, 0.08) 0%, transparent 50%)",
        pointerEvents: "none",
        zIndex: 0
      }} />

      <div style={{
        maxWidth: "900px",
        margin: "0 auto",
        position: "relative",
        zIndex: 1000
      }}>
        
        {/* Ana Başlık */}
        <h1 style={{
          fontSize: "3.5rem",
          fontWeight: "800",
          color: "#393d3f",
          lineHeight: "1.2",
          marginBottom: "24px",
          letterSpacing: "-1px",
          display: "inline-block"
        }}>
          {animatedTitle ? (
            <>
              <span>{animatedTitle.firstWord} </span>
              <span className="glow-box" style={{
                display: "inline-block",
                background: "rgba(253, 253, 255, 0.1)",
                padding: "8px 20px",
                borderRadius: "12px",
                animation: "flipIn 0.8s ease-out",
                transformStyle: "preserve-3d",
                position: "relative",
                border: "1px solid transparent"
              }}>
                {animatedTitle.restWords}
              </span>
            </>
          ) : (
            siteInfo?.site_title || "Başlık Girilmemiş"
          )}
        </h1>

        <style>{`
          @keyframes flipIn {
            0% {
              transform: perspective(400px) rotateX(90deg);
              opacity: 0;
            }
            40% {
              transform: perspective(400px) rotateX(-10deg);
            }
            70% {
              transform: perspective(400px) rotateX(10deg);
            }
            100% {
              transform: perspective(400px) rotateX(0deg);
              opacity: 1;
            }
          }

          @keyframes borderGlow {
            0%, 100% {
              border-color: rgba(98, 146, 158, 0.15);
              box-shadow: 0 0 3px rgba(98, 146, 158, 0.1);
            }
            50% {
              border-color: rgba(98, 146, 158, 0.4);
              box-shadow: 0 0 8px rgba(98, 146, 158, 0.2), 0 0 15px rgba(98, 146, 158, 0.1);
            }
          }

          .glow-box {
            animation: flipIn 0.8s ease-out, borderGlow 4s ease-in-out infinite 0.8s !important;
            transition: background 0.3s ease, transform 0.3s ease;
          }

          .glow-box:hover {
            background: rgba(253, 253, 255, 0.95) !important;
            transform: translateY(-2px);
            box-shadow: 0 0 15px rgba(98, 146, 158, 0.3), 0 0 30px rgba(98, 146, 158, 0.15) !important;
          }

          .glow-box::before {
            content: '';
            position: absolute;
            inset: -1px;
            border-radius: 12px;
            padding: 1px;
            background: linear-gradient(90deg, 
              rgba(98, 146, 158, 0.25), 
              rgba(84, 106, 123, 0.25), 
              rgba(98, 146, 158, 0.25)
            );
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            opacity: 0.3;
            animation: glowRotate 5s linear infinite;
          }

          @keyframes glowRotate {
            0% {
              background-position: 0% 50%;
            }
            100% {
              background-position: 200% 50%;
            }
          }
        `}</style>

        {/* Alt Açıklama */}
        <p style={{
          fontSize: "1.25rem",
          color: "#546a7b",
          lineHeight: "1.8",
          marginBottom: "40px",
          maxWidth: "700px",
          margin: "0 auto 40px"
        }}>
          {siteInfo?.phone && ` ${siteInfo.phone}`}
          {siteInfo?.phone && siteInfo?.address && " • "}
          {siteInfo?.address && ` ${siteInfo.address}`}
        </p>

        {/* WhatsApp Butonu */}
        {siteInfo?.whatsapp_number && (
          <a 
            href={`https://wa.me/${siteInfo.whatsapp_number}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "16px 32px",
              backgroundColor: "#62929e",
              color: "#fdfdff",
              fontSize: "1.1rem",
              fontWeight: "600",
              textDecoration: "none",
              borderRadius: "10px",
              transition: "all 0.3s",
              boxShadow: "0 4px 14px rgba(98, 146, 158, 0.4)"
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#546a7b"
              e.target.style.transform = "translateY(-2px)"
              e.target.style.boxShadow = "0 6px 20px rgba(84, 106, 123, 0.5)"
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#62929e"
              e.target.style.transform = "translateY(0)"
              e.target.style.boxShadow = "0 4px 14px rgba(98, 146, 158, 0.4)"
            }}
          >
            İletişime Geç
            <span style={{ fontSize: "1.2rem" }}>→</span>
          </a>
        )}

        {/* Rating/Social Proof */}
        <div style={{
          marginTop: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          color: "#546a7b",
          fontSize: "0.95rem"
        }}>
          <div style={{ display: "flex", gap: "4px" }}>
            {[...Array(5)].map((_, i) => (
              <span key={i} style={{ color: "#62929e", fontSize: "1.2rem" }}>★</span>
            ))}
          </div>
          <span style={{ fontWeight: "600", color: "#393d3f" }}>5.0</span>
          <span>müşteri memnuniyeti</span>
        </div>
      </div>
    </section>
  )
}
