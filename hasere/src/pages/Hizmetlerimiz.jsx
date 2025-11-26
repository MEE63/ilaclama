import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import HeroParallax from "../components/HeroParallax"
import GridBackground from "../components/GridBackground"
import FocusCards from "../components/FocusCards"

export default function Hizmetlerimiz() {
  return (
    <div style={{ position: 'relative' }}>
      <GridBackground />
      
      <div style={{ position: 'relative', zIndex: 1000 }}>
        <Navbar />
      </div>
      
      <HeroParallax />

      <FocusCards />

      <Footer />
    </div>
  )
}
