import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import WhatIDo from '@/components/WhatIDo'
import Stats from '@/components/Stats'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-dark via-darker to-dark overflow-hidden">
      <Navbar />
      <Hero />
      <Stats />
      <WhatIDo />
      <Footer />
    </main>
  )
}
