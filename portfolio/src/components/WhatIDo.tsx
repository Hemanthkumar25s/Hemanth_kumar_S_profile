'use client'

import { motion } from 'framer-motion'

const services = [
  {
    title: 'Web Development',
    description: 'Building responsive and fast React/Next.js websites with modern UI and strong performance.',
    icon: '🌐',
  },
  {
    title: 'Mobile Apps',
    description: 'Creating polished Android experiences using Kotlin, Jetpack Compose and API integrations.',
    icon: '📱',
  },
]

export default function WhatIDo() {
  return (
    <section className="relative py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <p className="text-sm uppercase tracking-[0.3em] text-accent">Who I am</p>
          <h2 className="text-4xl md:text-5xl font-bold section-heading">
            <span className="bg-gradient-to-r from-accent to-blue-400 bg-clip-text text-transparent">
              Areas of Expertise
            </span>
          </h2>
          <p className="max-w-2xl mx-auto section-lead text-lg">
            I build modern web and Android applications with clean design, scalable architecture, and seamless user experiences using full-stack technologies
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="glassmorphism border border-accent/20 rounded-3xl p-8 space-y-5 hover:border-accent/50 hover:shadow-[0_0_40px_rgba(0,247,255,0.12)]"
            >
              <div className="text-4xl">{service.icon}</div>
              <h3 className="text-2xl font-semibold text-white">{service.title}</h3>
              <p className="text-gray-300 leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}