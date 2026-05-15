'use client'

import { motion } from 'framer-motion'

const testimonials = [
  {
    quote: 'Hemanth delivered a polished product with fast communication and thoughtful design.',
    name: 'Rohit Patel',
    role: 'Product Owner',
  },
  {
    quote: 'Working with Hemanth was smooth — he launched the app quickly and stayed focused on quality.',
    name: 'Sneha Raj',
    role: 'Startup Founder',
  },
  {
    quote: 'The experience was professional and the final result felt modern and reliable.',
    name: 'Arjun Kumar',
    role: 'Tech Lead',
  },
]

export default function Testimonials() {
  return (
    <section className="relative py-20 px-4 bg-gradient-to-b from-transparent via-card/20 to-transparent">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <p className="text-sm uppercase tracking-[0.3em] text-accent">Testimonials</p>
          <h2 className="text-4xl md:text-5xl font-bold section-heading">
            <span className="bg-gradient-to-r from-accent to-blue-400 bg-clip-text text-transparent">
              Trusted by Clients
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="glassmorphism border border-accent/20 rounded-3xl p-8 space-y-6"
            >
              <p className="text-gray-300 leading-relaxed">“{item.quote}”</p>
              <div className="space-y-1">
                <p className="font-semibold text-white">{item.name}</p>
                <p className="text-sm text-gray-400">{item.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
