'use client'

import { motion } from 'framer-motion'

const testimonials = [
  {
    quote: 'Hemanth brings thoughtful engineering and polished UI design to every project. His code is clean and his delivery is reliable.',
    name: 'Mentor, Reliance Foundation',
  },
  {
    quote: 'A talented student developer with strong attention to detail and a passion for building user-friendly apps.',
    name: 'Project Collaborator',
  },
  {
    quote: 'He consistently pushes the user experience higher with smooth interactions and responsive layouts.',
    name: 'Design Partner',
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-16 px-4 bg-gradient-to-b from-transparent via-card/80 to-transparent">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <p className="uppercase tracking-[0.35em] text-accent text-sm font-semibold">
            What people say
          </p>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold">
            <span className="bg-gradient-to-r from-accent to-blue-400 bg-clip-text text-transparent">
              Testimonials
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              className="glassmorphism rounded-3xl border border-accent/20 p-8 shadow-xl"
            >
              <p className="text-gray-300 leading-relaxed">“{testimonial.quote}”</p>
              <p className="mt-6 font-semibold text-white">{testimonial.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
