import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-dark via-darker to-dark overflow-hidden">
      <Navbar />
      <section className="relative py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-6 text-center mb-12">
            <p className="text-sm uppercase tracking-[0.3em] text-accent">Resume</p>
            <h1 className="text-4xl md:text-5xl font-bold section-heading">
              View My Resume
            </h1>
            <p className="mx-auto max-w-2xl text-gray-300 text-lg">
              Here is a quick preview of my resume. You can also download the full version below.
            </p>
          </div>

          <div className="space-y-6">
            <div className="glassmorphism border border-accent/20 rounded-3xl overflow-hidden shadow-2xl">
              <iframe
                src="/resume.pdf"
                title="Resume"
                className="w-full min-h-[80vh]"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/resume.pdf"
                download
                className="btn-primary inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold"
              >
                Download Resume
              </a>
              <a
                href="mailto:hemanthkumar.s3125@gmail.com"
                className="btn-secondary inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold border"
              >
                Contact Me
              </a>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
