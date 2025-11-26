import { useState, useEffect } from 'react'
import { supabase } from '../supabase'
import { Link } from 'react-router-dom'
import CTAAdmin from '../components/CTAAdmin'

export default function Admin() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [activeTab, setActiveTab] = useState('site') // 'site', 'pests', 'cta', 'services', 'contact'
  
  // Site ayarları form
  const [formData, setFormData] = useState({
    site_title: '',
    phone: '',
    address: '',
    whatsapp_number: '',
    logo_url: ''
  })

  // Haşere form
  const [pestForm, setPestForm] = useState({
    title: '',
    description: '',
    image_url: ''
  })

  // Haşere listesi
  const [pests, setPests] = useState([])
  const [editingPest, setEditingPest] = useState(null)

  // Hizmet form
  const [serviceForm, setServiceForm] = useState({
    title: '',
    description: '',
    image_url: ''
  })

  // Hizmet listesi
  const [services, setServices] = useState([])
  const [editingService, setEditingService] = useState(null)

  // İletişim bilgileri form
  const [contactInfo, setContactInfo] = useState({
    email: '',
    phone: '',
    address: ''
  })

  // Form gönderileri
  const [submissions, setSubmissions] = useState([])

  // 1. Sayfa açılınca mevcut ayarları getir
  useEffect(() => {
    fetchSettings()
    fetchPests()
    fetchServices()
    fetchContactInfo()
    fetchSubmissions()
  }, [])

  // İletişim bilgilerini getir
  async function fetchContactInfo() {
    const { data, error } = await supabase
      .from('contact_info')
      .select('*')
      .eq('id', 1)
      .single()
    
    if (error) {
      console.error('İletişim bilgileri çekme hatası:', error)
    }
    
    if (data) {
      setContactInfo(data)
    }
  }

  // Form gönderilerini getir
  async function fetchSubmissions() {
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Form gönderileri çekme hatası:', error)
    }
    
    if (data) {
      setSubmissions(data)
    }
  }

  // İletişim bilgilerini kaydet
  const handleContactInfoSave = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage("Kaydediliyor...")

    const { error } = await supabase
      .from('contact_info')
      .upsert({
        id: 1,
        email: contactInfo.email,
        phone: contactInfo.phone,
        address: contactInfo.address,
        updated_at: new Date()
      })

    if (!error) {
      setMessage("✅ İletişim bilgileri güncellendi!")
      // Aynı zamanda general_config'deki adresi de güncelle
      await supabase
        .from('general_config')
        .update({ address: contactInfo.address })
        .eq('id', 1)
    } else {
      setMessage("❌ Hata: " + error.message)
    }
    setLoading(false)
  }

  const handleContactInfoChange = (e) => {
    setContactInfo({ ...contactInfo, [e.target.name]: e.target.value })
  }

  // Form gönderisini sil
  const handleSubmissionDelete = async (id) => {
    if (!confirm('Bu mesajı silmek istediğinize emin misiniz?')) return

    setLoading(true)
    setMessage("Siliniyor...")
    
    const { error } = await supabase
      .from('contact_submissions')
      .delete()
      .eq('id', id)

    if (!error) {
      setMessage("✅ Mesaj silindi!")
      await fetchSubmissions()
    } else {
      setMessage("❌ Hata: " + error.message)
    }
    setLoading(false)
  }

  // Form gönderisini okundu olarak işaretle
  const handleSubmissionToggleRead = async (id, currentStatus) => {
    const { error } = await supabase
      .from('contact_submissions')
      .update({ is_read: !currentStatus })
      .eq('id', id)

    if (!error) {
      await fetchSubmissions()
    } else {
      setMessage("❌ Hata: " + error.message)
    }
  }

  async function fetchSettings() {
    const { data } = await supabase
      .from('general_config')
      .select('*')
      .eq('id', 1)
      .single()
    
    if (data) {
      setFormData(data)
    }
  }

  async function fetchPests() {
    const { data, error } = await supabase
      .from('pests')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Haşere listesi çekme hatası:', error)
      setMessage('❌ Haşereler yüklenemedi: ' + error.message)
    }
    
    console.log('Admin - Çekilen haşereler:', data)
    
    if (data) {
      setPests(data)
    }
  }

  // 2. Yazılar değiştikçe state'i güncelle
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // 3. LOGO YÜKLEME İŞLEMİ 📸
  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setLoading(true)
    setMessage("Resim yükleniyor...")

    const fileName = `${Date.now()}_${file.name}`

    const { error } = await supabase.storage
      .from('assets') 
      .upload(fileName, file)

    if (error) {
      console.log(error)
      setMessage("Resim yüklenirken hata oldu!")
      setLoading(false)
      return
    }

    const { data: urlData } = supabase.storage
      .from('assets')
      .getPublicUrl(fileName)

    setFormData({ ...formData, logo_url: urlData.publicUrl })
    setMessage("Resim yüklendi! Kaydet butonuna basmayı unutma.")
    setLoading(false)
  }

  // HAŞERE RESMİ YÜKLEME
  const handlePestImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setLoading(true)
    setMessage("Haşere resmi yükleniyor...")

    const fileName = `pests/${Date.now()}_${file.name}`

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

    setPestForm({ ...pestForm, image_url: urlData.publicUrl })
    setMessage("Resim yüklendi!")
    setLoading(false)
  }

  // 4. KAYDET (UPDATE)
  const handleSave = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage("Kaydediliyor...")

    const { error } = await supabase
      .from('general_config')
      .update({
        site_title: formData.site_title,
        phone: formData.phone,
        address: formData.address,
        whatsapp_number: formData.whatsapp_number,
        logo_url: formData.logo_url,
        updated_at: new Date()
      })
      .eq('id', 1) // Sadece 1 numaralı satırı güncelle

    if (!error) {
      setMessage("✅ Başarıyla güncellendi!")
    } else {
      setMessage("❌ Hata: " + error.message)
    }
    setLoading(false)
  }

  // Haşere kaydet/güncelle
  const handlePestSave = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage("Kaydediliyor...")

    if (editingPest) {
      // Güncelleme
      const { error } = await supabase
        .from('pests')
        .update({
          title: pestForm.title,
          description: pestForm.description,
          image_url: pestForm.image_url
        })
        .eq('id', editingPest.id)

      if (!error) {
        setMessage("✅ Haşere güncellendi!")
        fetchPests()
        setPestForm({ title: '', description: '', image_url: '' })
        setEditingPest(null)
      } else {
        setMessage("❌ Hata: " + error.message)
      }
    } else {
      // Yeni ekleme
      const { error } = await supabase
        .from('pests')
        .insert([{
          title: pestForm.title,
          description: pestForm.description,
          image_url: pestForm.image_url
        }])

      if (!error) {
        setMessage("✅ Haşere eklendi!")
        fetchPests()
        setPestForm({ title: '', description: '', image_url: '' })
      } else {
        setMessage("❌ Hata: " + error.message)
      }
    }
    setLoading(false)
  }

  // Haşere sil
  const handlePestDelete = async (id) => {
    if (!confirm('Bu haşereyi silmek istediğinize emin misiniz?')) return

    setLoading(true)
    setMessage("Siliniyor...")
    
    console.log('Silinen haşere ID:', id)
    
    const { data, error } = await supabase
      .from('pests')
      .delete()
      .eq('id', id)

    console.log('Silme sonucu:', { data, error })

    if (!error) {
      setMessage("✅ Haşere silindi!")
      await fetchPests()
    } else {
      console.error('Silme hatası:', error)
      setMessage("❌ Hata: " + error.message)
    }
    setLoading(false)
  }

  // Haşere düzenle
  const handlePestEdit = (pest) => {
    setEditingPest(pest)
    setPestForm({
      title: pest.title,
      description: pest.description,
      image_url: pest.image_url
    })
    setActiveTab('pests')
  }

  const handlePestChange = (e) => {
    setPestForm({ ...pestForm, [e.target.name]: e.target.value })
  }

  // HİZMETLER FONKSİYONLARI
  async function fetchServices() {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('created_at', { ascending: true })
    
    if (error) {
      console.error('Hizmet listesi çekme hatası:', error)
    }
    
    if (data) {
      setServices(data)
    }
  }

  const handleServiceImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setLoading(true)
    setMessage("Hizmet resmi yükleniyor...")

    const fileName = `services/${Date.now()}_${file.name}`

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

    setServiceForm({ ...serviceForm, image_url: urlData.publicUrl })
    setMessage("Resim yüklendi!")
    setLoading(false)
  }

  const handleServiceSave = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage("Kaydediliyor...")

    if (editingService) {
      const { error } = await supabase
        .from('services')
        .update({
          title: serviceForm.title,
          description: serviceForm.description,
          image_url: serviceForm.image_url
        })
        .eq('id', editingService.id)

      if (!error) {
        setMessage("✅ Hizmet güncellendi!")
        fetchServices()
        setServiceForm({ title: '', description: '', image_url: '' })
        setEditingService(null)
      } else {
        setMessage("❌ Hata: " + error.message)
      }
    } else {
      const { error } = await supabase
        .from('services')
        .insert([{
          title: serviceForm.title,
          description: serviceForm.description,
          image_url: serviceForm.image_url
        }])

      if (!error) {
        setMessage("✅ Hizmet eklendi!")
        fetchServices()
        setServiceForm({ title: '', description: '', image_url: '' })
      } else {
        setMessage("❌ Hata: " + error.message)
      }
    }
    setLoading(false)
  }

  const handleServiceDelete = async (id) => {
    if (!confirm('Bu hizmeti silmek istediğinize emin misiniz?')) return

    setLoading(true)
    setMessage("Siliniyor...")
    
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id)

    if (!error) {
      setMessage("✅ Hizmet silindi!")
      await fetchServices()
    } else {
      setMessage("❌ Hata: " + error.message)
    }
    setLoading(false)
  }

  const handleServiceEdit = (service) => {
    setEditingService(service)
    setServiceForm({
      title: service.title,
      description: service.description,
      image_url: service.image_url
    })
    setActiveTab('services')
  }

  const handleServiceChange = (e) => {
    setServiceForm({ ...serviceForm, [e.target.name]: e.target.value })
  }

  // İLETİŞİM BİLGİLERİ FONKSİYONLARI
  async function fetchContactInfo() {
    const { data, error } = await supabase
      .from('contact_info')
      .select('*')
      .eq('id', 1)
      .single()
    
    if (error) {
      console.error('İletişim bilgileri çekme hatası:', error)
    }
    
    if (data) {
      setContactInfo(data)
    }
  }

  async function fetchSubmissions() {
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Form gönderileri çekme hatası:', error)
    }
    
    if (data) {
      setSubmissions(data)
    }
  }

  return (
    <div style={{ maxWidth: "900px", margin: "40px auto", padding: "20px" }}>
      
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'30px'}}>
        <h2>⚙️ Admin Paneli</h2>
        <Link to="/" style={{textDecoration:'none', color:'#546a7b', fontWeight:'600'}}>← Siteyi Gör</Link>
      </div>

      {/* Tabs */}
      <div style={{display:'flex', gap:'10px', marginBottom:'30px', borderBottom:'2px solid #c6c5b9'}}>
        <button
          onClick={() => setActiveTab('site')}
          style={{
            padding:'12px 24px',
            background: activeTab === 'site' ? '#546a7b' : 'transparent',
            color: activeTab === 'site' ? '#fdfdff' : '#546a7b',
            border:'none',
            borderRadius:'8px 8px 0 0',
            cursor:'pointer',
            fontWeight:'600',
            fontSize:'15px'
          }}
        >
          Site Ayarları
        </button>
        <button
          onClick={() => setActiveTab('pests')}
          style={{
            padding:'12px 24px',
            background: activeTab === 'pests' ? '#546a7b' : 'transparent',
            color: activeTab === 'pests' ? '#fdfdff' : '#546a7b',
            border:'none',
            borderRadius:'8px 8px 0 0',
            cursor:'pointer',
            fontWeight:'600',
            fontSize:'15px'
          }}
        >
          Haşere Kütüphanesi
        </button>
        <button
          onClick={() => setActiveTab('cta')}
          style={{
            padding:'12px 24px',
            background: activeTab === 'cta' ? '#546a7b' : 'transparent',
            color: activeTab === 'cta' ? '#fdfdff' : '#546a7b',
            border:'none',
            borderRadius:'8px 8px 0 0',
            cursor:'pointer',
            fontWeight:'600',
            fontSize:'15px'
          }}
        >
          CTA Kartı
        </button>
        <button
          onClick={() => setActiveTab('services')}
          style={{
            padding:'12px 24px',
            background: activeTab === 'services' ? '#546a7b' : 'transparent',
            color: activeTab === 'services' ? '#fdfdff' : '#546a7b',
            border:'none',
            borderRadius:'8px 8px 0 0',
            cursor:'pointer',
            fontWeight:'600',
            fontSize:'15px'
          }}
        >
          Hizmetler
        </button>
        <button
          onClick={() => setActiveTab('contact')}
          style={{
            padding:'12px 24px',
            background: activeTab === 'contact' ? '#546a7b' : 'transparent',
            color: activeTab === 'contact' ? '#fdfdff' : '#546a7b',
            border:'none',
            borderRadius:'8px 8px 0 0',
            cursor:'pointer',
            fontWeight:'600',
            fontSize:'15px'
          }}
        >
          İletişim
        </button>
      </div>

      {message && <div style={{padding:'12px', background:'#e8eef1', marginBottom:'20px', borderRadius:'8px', color:'#393d3f'}}>{message}</div>}

      {/* Site Ayarları Tab */}
      {activeTab === 'site' && (
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '15px', background:'#fdfdff', padding:'24px', borderRadius:'12px', border:'1px solid #c6c5b9' }}>
        
        {/* Logo Bölümü */}
        <div style={{ border: '1px dashed #ccc', padding: '15px', borderRadius: '5px', textAlign:'center' }}>
          <label style={{display:'block', marginBottom:'10px', fontWeight:'bold'}}>Site Logosu</label>
          
          {formData.logo_url && (
            <img src={formData.logo_url} alt="Mevcut Logo" style={{ height: '80px', marginBottom: '10px' }} />
          )}
          
          <input type="file" onChange={handleImageUpload} accept="image/*" />
        </div>

        {/* Inputlar */}
        <div>
          <label>Site Başlığı:</label>
          <input 
            type="text" name="site_title" 
            value={formData.site_title || ''} onChange={handleChange} 
            style={{width:'100%', padding:'8px'}}
          />
        </div>

        <div>
          <label>Telefon:</label>
          <input 
            type="text" name="phone" 
            value={formData.phone || ''} onChange={handleChange} 
            style={{width:'100%', padding:'8px'}}
          />
        </div>

        <div>
          <label>WhatsApp Numarası (Örn: 90555...):</label>
          <input 
            type="text" name="whatsapp_number" 
            value={formData.whatsapp_number || ''} onChange={handleChange} 
            style={{width:'100%', padding:'8px'}}
          />
        </div>

        <div>
          <label>Adres:</label>
          <textarea 
            name="address" 
            rows="3"
            value={formData.address || ''} onChange={handleChange} 
            style={{width:'100%', padding:'8px'}}
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{ padding: '14px', background: '#393d3f', color: '#fdfdff', border: 'none', cursor: 'pointer', fontSize:'16px', borderRadius:'8px', fontWeight:'600' }}
        >
          {loading ? 'İşleniyor...' : 'Ayarları Kaydet'}
        </button>
      </form>
      )}

      {/* Haşere Kütüphanesi Tab */}
      {activeTab === 'pests' && (
        <div>
          {/* Haşere Ekleme Formu */}
          <form onSubmit={handlePestSave} style={{ display: 'flex', flexDirection: 'column', gap: '15px', background:'#fdfdff', padding:'24px', borderRadius:'12px', border:'1px solid #c6c5b9', marginBottom:'30px' }}>
            <h3 style={{margin:0, color:'#393d3f'}}>{editingPest ? 'Haşere Düzenle' : 'Yeni Haşere Ekle'}</h3>
            
            <div style={{ border: '1px dashed #c6c5b9', padding: '15px', borderRadius: '8px', textAlign:'center' }}>
              <label style={{display:'block', marginBottom:'10px', fontWeight:'bold', color:'#546a7b'}}>Haşere Görseli</label>
              
              {pestForm.image_url && (
                <div style={{position:'relative', display:'inline-block', marginBottom:'10px'}}>
                  <img src={pestForm.image_url} alt="Haşere" style={{ height: '120px', borderRadius:'8px', display:'block' }} />
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm('Görseli silmek istediğinize emin misiniz?')) {
                        setPestForm({ ...pestForm, image_url: '' })
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
              
              <input type="file" onChange={handlePestImageUpload} accept="image/*" />
            </div>

            <div>
              <label style={{color:'#546a7b', fontWeight:'600'}}>Haşere Adı:</label>
              <input 
                type="text" 
                name="title" 
                value={pestForm.title || ''} 
                onChange={handlePestChange} 
                required
                style={{width:'100%', padding:'10px', borderRadius:'6px', border:'1px solid #c6c5b9', marginTop:'5px'}}
              />
            </div>



            <div>
              <label style={{color:'#546a7b', fontWeight:'600'}}>Açıklama:</label>
              <textarea 
                name="description" 
                rows="4"
                value={pestForm.description || ''} 
                onChange={handlePestChange}
                placeholder="Haşere hakkında detaylı bilgi..."
                style={{width:'100%', padding:'10px', borderRadius:'6px', border:'1px solid #c6c5b9', marginTop:'5px'}}
              />
            </div>

            <div style={{display:'flex', gap:'10px'}}>
              <button 
                type="submit" 
                disabled={loading}
                style={{ flex:1, padding: '14px', background: '#62929e', color: '#fdfdff', border: 'none', cursor: 'pointer', fontSize:'16px', borderRadius:'8px', fontWeight:'600' }}
              >
                {loading ? 'İşleniyor...' : editingPest ? 'Güncelle' : 'Ekle'}
              </button>
              
              {editingPest && (
                <button 
                  type="button"
                  onClick={() => {
                    setEditingPest(null)
                    setPestForm({ title: '', description: '', image_url: '' })
                  }}
                  style={{ padding: '14px 24px', background: '#c6c5b9', color: '#393d3f', border: 'none', cursor: 'pointer', fontSize:'16px', borderRadius:'8px', fontWeight:'600' }}
                >
                  İptal
                </button>
              )}
            </div>
          </form>

          {/* Haşere Listesi */}
          <div>
            <h3 style={{color:'#393d3f', marginBottom:'20px'}}>Mevcut Haşereler ({pests.length})</h3>
            <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(250px, 1fr))', gap:'20px'}}>
              {pests.map(pest => (
                <div key={pest.id} style={{background:'#fdfdff', borderRadius:'12px', overflow:'hidden', border:'1px solid #c6c5b9'}}>
                  {pest.image_url && (
                    <img src={pest.image_url} alt={pest.title} style={{width:'100%', height:'180px', objectFit:'cover'}} />
                  )}
                  <div style={{padding:'15px'}}>
                    <h4 style={{margin:'0 0 8px 0', color:'#393d3f'}}>{pest.title}</h4>
                    {pest.description && (
                      <p style={{fontSize:'13px', color:'#546a7b', margin:'0 0 15px 0', lineHeight:'1.4'}}>{pest.description.substring(0, 100)}...</p>
                    )}
                    <div style={{display:'flex', gap:'8px', marginTop: pest.description ? '0' : '15px'}}>
                      <button 
                        onClick={() => {
                          console.log('Düzenle tıklandı:', pest)
                          handlePestEdit(pest)
                        }}
                        style={{flex:1, padding:'8px', background:'#546a7b', color:'#fdfdff', border:'none', cursor:'pointer', borderRadius:'6px', fontSize:'13px', fontWeight:'600'}}
                      >
                        Düzenle
                      </button>
                      <button 
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          console.log('Sil tıklandı, pest:', pest)
                          console.log('Pest ID:', pest.id)
                          handlePestDelete(pest.id)
                        }}
                        style={{flex:1, padding:'8px', background:'#c6c5b9', color:'#393d3f', border:'none', cursor:'pointer', borderRadius:'6px', fontSize:'13px', fontWeight:'600'}}
                      >
                        Sil
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CTA Kartı Tab */}
      {activeTab === 'cta' && (
        <CTAAdmin />
      )}

      {/* Hizmetler Tab */}
      {activeTab === 'services' && (
        <div>
          {/* Hizmet Ekleme Formu */}
          <form onSubmit={handleServiceSave} style={{ display: 'flex', flexDirection: 'column', gap: '15px', background:'#fdfdff', padding:'24px', borderRadius:'12px', border:'1px solid #c6c5b9', marginBottom:'30px' }}>
            <h3 style={{margin:0, color:'#393d3f'}}>{editingService ? 'Hizmet Düzenle' : 'Yeni Hizmet Ekle'}</h3>
            
            <div style={{ border: '1px dashed #c6c5b9', padding: '15px', borderRadius: '8px', textAlign:'center' }}>
              <label style={{display:'block', marginBottom:'10px', fontWeight:'bold', color:'#546a7b'}}>Hizmet Görseli (350x570 önerilir)</label>
              
              {serviceForm.image_url && (
                <div style={{position:'relative', display:'inline-block', marginBottom:'10px'}}>
                  <img src={serviceForm.image_url} alt="Hizmet" style={{ height: '200px', borderRadius:'8px', display:'block' }} />
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm('Görseli silmek istediğinize emin misiniz?')) {
                        setServiceForm({ ...serviceForm, image_url: '' })
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
                      fontSize:'16px'
                    }}
                  >
                    ×
                  </button>
                </div>
              )}
              
              <input type="file" onChange={handleServiceImageUpload} accept="image/*" />
            </div>

            <div>
              <label style={{color:'#546a7b', fontWeight:'600'}}>Hizmet Başlığı:</label>
              <input 
                type="text" 
                name="title" 
                value={serviceForm.title || ''} 
                onChange={handleServiceChange} 
                required
                style={{width:'100%', padding:'10px', borderRadius:'6px', border:'1px solid #c6c5b9', marginTop:'5px'}}
              />
            </div>

            <div>
              <label style={{color:'#546a7b', fontWeight:'600'}}>Açıklama:</label>
              <textarea 
                name="description" 
                rows="6"
                value={serviceForm.description || ''} 
                onChange={handleServiceChange}
                required
                placeholder="Hizmet hakkında detaylı bilgi..."
                style={{width:'100%', padding:'10px', borderRadius:'6px', border:'1px solid #c6c5b9', marginTop:'5px'}}
              />
            </div>

            <div style={{display:'flex', gap:'10px'}}>
              <button 
                type="submit" 
                disabled={loading}
                style={{ flex:1, padding: '14px', background: '#62929e', color: '#fdfdff', border: 'none', cursor: 'pointer', fontSize:'16px', borderRadius:'8px', fontWeight:'600' }}
              >
                {loading ? 'İşleniyor...' : editingService ? 'Güncelle' : 'Ekle'}
              </button>
              
              {editingService && (
                <button 
                  type="button"
                  onClick={() => {
                    setEditingService(null)
                    setServiceForm({ title: '', description: '', image_url: '' })
                  }}
                  style={{ padding: '14px 24px', background: '#c6c5b9', color: '#393d3f', border: 'none', cursor: 'pointer', fontSize:'16px', borderRadius:'8px', fontWeight:'600' }}
                >
                  İptal
                </button>
              )}
            </div>
          </form>

          {/* Hizmet Listesi */}
          <div>
            <h3 style={{color:'#393d3f', marginBottom:'20px'}}>Mevcut Hizmetler ({services.length})</h3>
            <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:'20px'}}>
              {services.map(service => (
                <div key={service.id} style={{background:'#fdfdff', borderRadius:'12px', overflow:'hidden', border:'1px solid #c6c5b9'}}>
                  {service.image_url && (
                    <img src={service.image_url} alt={service.title} style={{width:'100%', height:'220px', objectFit:'cover'}} />
                  )}
                  <div style={{padding:'15px'}}>
                    <h4 style={{margin:'0 0 8px 0', color:'#393d3f'}}>{service.title}</h4>
                    <p style={{fontSize:'13px', color:'#546a7b', margin:'0 0 15px 0', lineHeight:'1.4'}}>{service.description?.substring(0, 100)}...</p>
                    <div style={{display:'flex', gap:'8px'}}>
                      <button 
                        onClick={() => handleServiceEdit(service)}
                        style={{flex:1, padding:'8px', background:'#546a7b', color:'#fdfdff', border:'none', cursor:'pointer', borderRadius:'6px', fontSize:'13px', fontWeight:'600'}}
                      >
                        Düzenle
                      </button>
                      <button 
                        onClick={() => handleServiceDelete(service.id)}
                        style={{flex:1, padding:'8px', background:'#c6c5b9', color:'#393d3f', border:'none', cursor:'pointer', borderRadius:'6px', fontSize:'13px', fontWeight:'600'}}
                      >
                        Sil
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* İletişim Tab */}
      {activeTab === 'contact' && (
        <div>
          {/* İletişim Bilgileri Formu */}
          <form onSubmit={handleContactInfoSave} style={{ display: 'flex', flexDirection: 'column', gap: '15px', background:'#fdfdff', padding:'24px', borderRadius:'12px', border:'1px solid #c6c5b9', marginBottom:'30px' }}>
            <h3 style={{margin:0, color:'#393d3f'}}>İletişim Bilgileri</h3>
            <p style={{margin:0, color:'#546a7b', fontSize:'14px'}}>Bu bilgiler iletişim sayfasında ve footer'da görünecektir. Adres bilgisi anasayfadaki adres ile senkronize olacaktır.</p>
            
            <div>
              <label style={{color:'#546a7b', fontWeight:'600'}}>E-posta:</label>
              <input 
                type="email" 
                name="email" 
                value={contactInfo.email || ''} 
                onChange={handleContactInfoChange} 
                required
                style={{width:'100%', padding:'10px', borderRadius:'6px', border:'1px solid #c6c5b9', marginTop:'5px'}}
              />
            </div>

            <div>
              <label style={{color:'#546a7b', fontWeight:'600'}}>Telefon:</label>
              <input 
                type="text" 
                name="phone" 
                value={contactInfo.phone || ''} 
                onChange={handleContactInfoChange} 
                required
                style={{width:'100%', padding:'10px', borderRadius:'6px', border:'1px solid #c6c5b9', marginTop:'5px'}}
              />
            </div>

            <div>
              <label style={{color:'#546a7b', fontWeight:'600'}}>Adres:</label>
              <textarea 
                name="address" 
                rows="3"
                value={contactInfo.address || ''} 
                onChange={handleContactInfoChange}
                required
                placeholder="Tam adres bilgisi..."
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

          {/* Form Gönderileri */}
          <div>
            <h3 style={{color:'#393d3f', marginBottom:'20px'}}>Form Gönderileri ({submissions.length})</h3>
            {submissions.length === 0 ? (
              <div style={{background:'#fdfdff', padding:'40px', borderRadius:'12px', border:'1px solid #c6c5b9', textAlign:'center'}}>
                <p style={{color:'#546a7b', margin:0}}>Henüz form gönderisi yok.</p>
              </div>
            ) : (
              <div style={{display:'flex', flexDirection:'column', gap:'15px'}}>
                {submissions.map(submission => (
                  <div key={submission.id} style={{background:'#fdfdff', padding:'20px', borderRadius:'12px', border:'1px solid #c6c5b9'}}>
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'start', marginBottom:'15px'}}>
                      <div>
                        <h4 style={{margin:'0 0 5px 0', color:'#393d3f', fontSize:'18px'}}>{submission.name}</h4>
                        <p style={{margin:'0', color:'#546a7b', fontSize:'13px'}}>
                          {new Date(submission.created_at).toLocaleDateString('tr-TR', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                      <button 
                        onClick={() => handleSubmissionDelete(submission.id)}
                        style={{padding:'8px 16px', background:'#c6c5b9', color:'#393d3f', border:'none', cursor:'pointer', borderRadius:'6px', fontSize:'13px', fontWeight:'600'}}
                      >
                        Sil
                      </button>
                    </div>
                    <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'15px', marginBottom:'15px'}}>
                      <div>
                        <p style={{margin:'0 0 5px 0', color:'#546a7b', fontSize:'12px', fontWeight:'600'}}>E-POSTA</p>
                        <p style={{margin:0, color:'#393d3f', fontSize:'14px'}}>{submission.email}</p>
                      </div>
                      <div>
                        <p style={{margin:'0 0 5px 0', color:'#546a7b', fontSize:'12px', fontWeight:'600'}}>TELEFON</p>
                        <p style={{margin:0, color:'#393d3f', fontSize:'14px'}}>{submission.phone || 'Belirtilmemiş'}</p>
                      </div>
                    </div>
                    <div>
                      <p style={{margin:'0 0 5px 0', color:'#546a7b', fontSize:'12px', fontWeight:'600'}}>MESAJ</p>
                      <p style={{margin:0, color:'#393d3f', fontSize:'14px', lineHeight:'1.6'}}>{submission.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}