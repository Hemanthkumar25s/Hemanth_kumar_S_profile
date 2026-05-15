import Navbar from '@/components/Navbar'
import About from '@/components/About'
import Footer from '@/components/Footer'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-dark via-darker to-dark overflow-hidden">
      <Navbar />
      <About />
      <Footer />
    </main>
  )
}
