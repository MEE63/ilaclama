import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Admin from "./pages/Admin"
import Hizmetlerimiz from "./pages/Hizmetlerimiz"
import Iletisim from "./pages/Iletisim"
import HasereRehberi from "./pages/Hasere-Rehberi"
import PestDetail from "./pages/PestDetail"
import Fiyatlandirma from "./pages/Fiyatlandirma"
import Lisans from "./pages/Lisans"
import Gizlilik from "./pages/Gizlilik"
import BizKimiz from "./pages/BizKimiz"
import ScrollToTop from "./components/ScrollToTop"

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Site adresi / olunca Home açılacak */}
        <Route path="/" element={<Home />} />
        
        {/* Site adresi /hizmetlerimiz olunca Hizmetlerimiz açılacak */}
        <Route path="/hizmetlerimiz" element={<Hizmetlerimiz />} />
        
        {/* Site adresi /iletisim olunca Iletisim açılacak */}
        <Route path="/iletisim" element={<Iletisim />} />
        
        {/* Site adresi /hasere-rehberi olunca HasereRehberi açılacak */}
        <Route path="/hasere-rehberi" element={<HasereRehberi />} />
        
        {/* Site adresi /hasere-rehberi/:slug olunca PestDetail açılacak */}
        <Route path="/hasere-rehberi/:slug" element={<PestDetail />} />
        
        {/* Site adresi /fiyatlandirma olunca Fiyatlandirma açılacak */}
        <Route path="/fiyatlandirma" element={<Fiyatlandirma />} />
        
        {/* Site adresi /lisans olunca Lisans açılacak */}
        <Route path="/lisans" element={<Lisans />} />
        
        {/* Site adresi /gizlilik olunca Gizlilik açılacak */}
        <Route path="/gizlilik" element={<Gizlilik />} />
        
        {/* Site adresi /biz-kimiz olunca BizKimiz açılacak */}
        <Route path="/biz-kimiz" element={<BizKimiz />} />
        
        {/* Site adresi /admin olunca Admin açılacak */}
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App