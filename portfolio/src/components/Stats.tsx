'use client'

import { motion } from 'framer-motion'

const stats = [
  { value: '17+', label: 'GitHub Repositories' },
  { value: '6', label: 'Featured Projects' },
  { value: '3', label: 'Mobile Apps' },
  { value: 'Reliance Scholar', label: '2022–26' },
]

export default function Stats() {
  return (
    <section id="stats" className="relative py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <p className="uppercase tracking-[0.35em] text-accent text-sm font-semibold">
            Fast Facts
          </p>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold">
            <span className="bg-gradient-to-r from-accent to-blue-400 bg-clip-text text-transparent">
              Portfolio growth at a glance
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="glassmorphism rounded-3xl border border-accent/20 p-8 text-center hover:border-accent/50 hover:-translate-y-1 transition-all"
            >
              <div className="text-4xl font-bold text-white">{stat.value}</div>
              <p className="mt-3 text-sm text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
