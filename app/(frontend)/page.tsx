import './globals.css'
import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'
import AboutusMiniSection from '@/components/AboutusMiniSection'
import Footer from '@/components/Footer'
export default  function HomePage() {
  return (
    <>
      <Navbar/>
      <Hero/>
      <AboutusMiniSection/>
      <Footer/>
    </>

  )
}
