'use client'

import { motion } from 'framer-motion'
import Typewriter from './Typewriter'

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

function Competency({ label, percent, color }: { label: string; percent: number; color: string }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-white font-medium">{label}</span>
        <span className="text-sm text-gray-400">{percent}%</span>
      </div>

      <div className="w-full bg-card/30 rounded-full h-3">
        <div
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          className={`${color} h-3 rounded-full shadow-sm transition-all`} 
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}

export default function WhatIDo() {
  return (
    <section className="relative py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <p className="text-sm uppercase tracking-[0.3em] text-accent">Who I am</p>
          <h2 className="text-4xl md:text-5xl font-bold section-heading">
            <Typewriter
              text="Areas of Expertise"
              className="bg-gradient-to-r from-accent to-blue-400 bg-clip-text text-transparent"
              speed={80}
              delay={200}
              startOnView
            />
          </h2>
          <p className="max-w-2xl mx-auto section-lead text-lg">
            I build modern web and Android applications with clean design, scalable architecture, and seamless user experiences using full-stack technologies
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="glassmorphism border border-accent/20 rounded-3xl p-8 space-y-5 hover:border-accent/50 hover:shadow-[0_0_40px_rgba(0,247,255,0.12)] h-full"
            >
              <div className="text-4xl">{service.icon}</div>
              <h3 className="text-2xl font-semibold text-white">{service.title}</h3>
              <p className="text-gray-300 leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Core Competencies */}
        <div className="mt-10">
          <div className="mb-6">
            <p className="uppercase tracking-[0.3em] text-accent text-sm font-semibold">Core Competencies</p>
            <h3 className="text-2xl md:text-3xl font-bold mt-2">Full Stack & Technical Skills</h3>
            <p className="text-gray-400 mt-2 max-w-2xl">Skill proficiency shown as estimated percentages. These reflect recent work and learning focus areas.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Competency label="Full Stack Development" percent={85} color="bg-gradient-to-r from-accent to-blue-400" />
              <Competency label="Mobile Development" percent={75} color="bg-gradient-to-r from-green-400 to-emerald-500" />
              <Competency label="Frontend Design" percent={80} color="bg-gradient-to-r from-purple-500 to-pink-500" />
            </div>

            <div className="space-y-4">
              <Competency label="Backend Architecture" percent={78} color="bg-gradient-to-r from-indigo-500 to-violet-500" />
              <Competency label="Database Management" percent={72} color="bg-gradient-to-r from-rose-500 to-orange-400" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}