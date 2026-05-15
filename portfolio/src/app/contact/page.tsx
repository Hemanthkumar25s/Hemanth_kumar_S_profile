import Navbar from '@/components/Navbar'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-dark via-darker to-dark overflow-hidden">
      <Navbar />
      <Contact />
      <Footer />
    </main>
  )
}
