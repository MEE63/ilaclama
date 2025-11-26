import { useState, useEffect } from 'react'
import { supabase } from '../supabase'

export default function CTAAdmin() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [ctaData, setCtaData] = useState({
    title: '',
    description: '',
    image_url: '',
    location_url: ''
  })
  const [showMap, setShowMap] = useState(false)

  useEffect(() => {
    fetchCTA()
  }, [])

  async function fetchCTA() {
    const { data } = await supabase
      .from('cta_section')
      .select('*')
      .eq('id', 1)
      .single()
    
    if (data) {
      setCtaData(data)
    }
  }

  const handleChange = (e) => {
    setCtaData({ ...ctaData, [e.target.name]: e.target.value })
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setLoading(true)
    setMessage("Resim yükleniyor...")

    const fileName = `cta/${Date.now()}_${file.name}`

    const { error } = await supabase.storage
      .from('assets')
      .upload(fileName, file)

    if (error) {
      setMessage("Resim yüklenirken hata oldu!")
      setLoading(false)
      return
    }

    const { data: urlData } = supabase.storage
      .from('assets')
      .getPublicUrl(fileName)

    setCtaData({ ...ctaData, image_url: urlData.publicUrl })
    setMessage("Resim yüklendi!")
    setLoading(false)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage("Kaydediliyor...")

    const { error } = await supabase
      .from('cta_section')
      .update({
        title: ctaData.title,
        description: ctaData.description,
        image_url: ctaData.image_url,
        location_url: ctaData.location_url
      })
      .eq('id', 1)

    if (!error) {
      setMessage("✅ CTA güncellendi!")
    } else {
      setMessage("❌ Hata: " + error.message)
    }
    setLoading(false)
  }

  return (
    <div>
      {message && <div style={{padding:'12px', background:'#e8eef1', marginBottom:'20px', borderRadius:'8px', color:'#393d3f'}}>{message}</div>}
      
      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '15px', background:'#fdfdff', padding:'24px', borderRadius:'12px', border:'1px solid #c6c5b9' }}>
        <h3 style={{margin:0, color:'#393d3f'}}>CTA Kartı Ayarları</h3>
        
        <div style={{ border: '1px dashed #c6c5b9', padding: '15px', borderRadius: '8px', textAlign:'center' }}>
          <label style={{display:'block', marginBottom:'10px', fontWeight:'bold', color:'#546a7b'}}>CTA Görseli</label>
          
          {ctaData.image_url && (
            <div style={{position:'relative', display:'inline-block', marginBottom:'10px'}}>
              <img src={ctaData.image_url} alt="CTA" style={{ height: '150px', borderRadius:'8px', display:'block' }} />
              <button
                type="button"
                onClick={() => {
                  if (confirm('Görseli silmek istediğinize emin misiniz?')) {
                    setCtaData({ ...ctaData, image_url: '' })
                    setMessage('Görsel kaldırıldı. Kaydetmeyi unutmayın!')
                  }
                }}
                style={{
                  position:'absolute',
                  top:'5px',
                  right:'5px',
                  background:'rgba(255,0,0,0.8)',
                  color:'#fff',
                  border:'none',
                  borderRadius:'50%',
                  width:'30px',
                  height:'30px',
                  cursor:'pointer',
                  fontSize:'16px',
                  display:'flex',
                  alignItems:'center',
                  justifyContent:'center'
                }}
              >
                ×
              </button>
            </div>
          )}
          
          <input type="file" onChange={handleImageUpload} accept="image/*" />
        </div>

        <div style={{ border: '1px dashed #c6c5b9', padding: '15px', borderRadius: '8px' }}>
          <label style={{display:'block', marginBottom:'10px', fontWeight:'bold', color:'#546a7b'}}>Konum (Google Maps)</label>
          
          <input 
            type="text" 
            name="location_url" 
            value={ctaData.location_url || ''} 
            onChange={handleChange}
            placeholder="Google Maps paylaşım linkini yapıştırın"
            style={{width:'100%', padding:'10px', borderRadius:'6px', border:'1px solid #c6c5b9', marginBottom:'10px'}}
          />
          
          {ctaData.location_url && (
            <div>
              <button 
                type="button"
                onClick={() => setShowMap(!showMap)}
                style={{padding:'8px 16px', background:'#546a7b', color:'#fdfdff', border:'none', borderRadius:'6px', cursor:'pointer', fontSize:'13px', marginBottom:'10px'}}
              >
                {showMap ? 'Haritayı Gizle' : 'Haritayı Göster'}
              </button>
              
              {showMap && (
                <div style={{marginTop:'10px'}}>
                  <p style={{fontSize:'12px', color:'#546a7b', marginBottom:'5px'}}>
                    Önizleme: Harita ana sayfada gösterilecek
                  </p>
                  <a 
                    href={ctaData.location_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{display:'inline-block', padding:'8px 16px', background:'#62929e', color:'#fdfdff', textDecoration:'none', borderRadius:'6px', fontSize:'13px'}}
                  >
                    Google Maps'te Aç →
                  </a>
                </div>
              )}
            </div>
          )}
        </div>

        <div>
          <label style={{color:'#546a7b', fontWeight:'600'}}>Başlık:</label>
          <input 
            type="text" 
            name="title" 
            value={ctaData.title || ''} 
            onChange={handleChange} 
            required
            style={{width:'100%', padding:'10px', borderRadius:'6px', border:'1px solid #c6c5b9', marginTop:'5px'}}
          />
        </div>

        <div>
          <label style={{color:'#546a7b', fontWeight:'600'}}>Açıklama:</label>
          <textarea 
            name="description" 
            rows="4"
            value={ctaData.description || ''} 
            onChange={handleChange}
            style={{width:'100%', padding:'10px', borderRadius:'6px', border:'1px solid #c6c5b9', marginTop:'5px'}}
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{ padding: '14px', background: '#62929e', color: '#fdfdff', border: 'none', cursor: 'pointer', fontSize:'16px', borderRadius:'8px', fontWeight:'600' }}
        >
          {loading ? 'İşleniyor...' : 'Kaydet'}
        </button>
      </form>
    </div>
  )
}
