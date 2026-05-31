'use client'

import { motion } from 'framer-motion'
import Typewriter from './Typewriter'

export default function Projects() {
  const projects = [
    {
      title: 'GramaYatri', 
      description: 'Helping rural commuters track their buses in real-time and skip the wait with community-powered live arrival estimates',
      tags: ['Kotlin', 'Jetpack Compose', 'Firebase', 'Room'],
      status: 'Completed',
      link: 'https://github.com/Hemanthkumar25s/GramaYatri',
      color: 'from-green-500 to-emerald-600',
    },
    {
     title: 'Sante Price Index',
     description: 'A comprehensive vendor intelligence platform featuring live Mandi price tracking, automated profit optimization, and a multi-lingual AI assistant for fresh-market retailers.',
     tags: ['Kotlin', 'Jetpack Compose', 'Firebase', 'MVVM', 'AI/NLP'],
     status: 'In Progress',
     link: 'https://github.com/Hemanthkumar25s/Sante_Price_index',
    color: 'from-emerald-600 to-green-500',
},
    {
      title: 'AI Based Mock Interview Platform',
      description: 'An intelligent interview preparation platform powered by Gemini AI that provides real-time feedback, question variations, and performance analytics.',
      tags: ['Next.js', 'Gemini AI', 'TypeScript', 'Tailwind CSS'],
      status: 'Completed',
      link: '#',
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Mini Social Media Platform',
      description: 'A full-stack social networking application with user authentication, post creation, real-time notifications, and social interactions.',
      tags: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
      status: 'Completed',
      link: '#',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'VogueAI - Virtual Stylist',
      description: 'AI-powered fashion recommendation system that provides personalized styling suggestions using computer vision and machine learning.',
      tags: ['TypeScript', 'Gemini API', 'React', 'Firebase'],
      status: 'Completed',
      link: 'https://github.com/Hemanthkumar25s/VogueAI-Virtual-Stylist',
      color: 'from-rose-500 to-orange-500',
    },
    {
      title: 'AI Interior Design Consultant',
      description: 'Interactive room makeover application using Gemini AI for visual space analysis, providing design recommendations and visual comparisons.',
      tags: ['TypeScript', 'Gemini AI', 'React', 'Next.js'],
      status: 'Completed',
      link: 'https://github.com/Hemanthkumar25s/AI-Interior-Design-Consultant',
      color: 'from-indigo-500 to-purple-500',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="projects" className="relative py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          {/* Section title */}
          <div className="text-center space-y-4">
            <motion.h2
              className="text-4xl md:text-5xl font-bold"
            >
              <Typewriter
                text="Featured Projects"
                className="bg-gradient-to-r from-accent to-blue-400 bg-clip-text text-transparent"
                speed={80}
                delay={200}
              />
            </motion.h2>
            <motion.div className="flex justify-center">
              <div className="w-20 h-1 bg-gradient-to-r from-accent to-blue-400 rounded-full" />
            </motion.div>
          </div>

          {/* Projects Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {projects.map((project, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="group relative"
              >
                {/* Card background with gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 rounded-xl blur-xl transition-opacity duration-300`} />

                {/* Card content */}
                <div className="relative p-6 glassmorphism rounded-xl border border-accent/20 group-hover:border-accent/50 transition-all duration-300 h-full flex flex-col">
                  {/* Header */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors flex-1">
                        {project.title}
                      </h3>
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${
                        project.status === 'Completed'
                          ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                          : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      }`}>
                        {project.status}
                      </span>
                    </div>

                    <p className="text-gray-300 text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                    {project.tags.map((tag, i) => (
                      <motion.span
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        className="px-2 py-1 bg-accent/10 border border-accent/30 text-xs text-accent rounded-md hover:bg-accent/20 transition-colors"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>

                  {/* Link button */}
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 5 }}
                    className="inline-flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all"
                  >
                    View Project
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* View all projects button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <motion.a
              href="https://github.com/Hemanthkumar25s"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 247, 255, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border-2 border-accent text-accent font-bold rounded-lg hover:bg-accent/10 transition-all"
            >
              View All Projects on GitHub →
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
