import Navbar from '@/components/Navbar'
import Projects from '@/components/Projects'
import Footer from '@/components/Footer'

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-dark via-darker to-dark overflow-hidden">
      <Navbar />
      <Projects />
      <Footer />
    </main>
  )
}
