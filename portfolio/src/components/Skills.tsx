'use client'

import { motion } from 'framer-motion'
import Typewriter from './Typewriter'

export default function Skills() {
  const skillCategories = [
    {
      category: 'Languages',
      icon: '💻',
      skills: ['JavaScript', 'Python', 'Java', 'Kotlin', 'HTML/CSS'],
    },
    {
      category: 'Frontend',
      icon: '🎨',
      skills: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'TypeScript'],
    },
    {
      category: 'Backend',
      icon: '⚙️',
      skills: ['Node.js', 'Express', 'MongoDB', 'MySQL', 'Firebase'],
    },
    {
      category: 'Mobile',
      icon: '📱',
      skills: ['Android Studio', 'Kotlin', 'Material Design', 'REST APIs'],
    },
    {
      category: 'Tools',
      icon: '🛠️',
      skills: ['Git', 'GitHub', 'VS Code', 'Figma', 'Docker'],
    },
    {
      category: 'AI/ML',
      icon: '🤖',
      skills: ['Gemini AI', 'Power BI', 'Tableau', 'Data Analysis'],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="skills" className="relative py-20 px-4 bg-gradient-to-b from-transparent via-card/30 to-transparent">
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
                text="Skills & Expertise"
                className="bg-gradient-to-r from-accent to-blue-400 bg-clip-text text-transparent"
                speed={80}
                delay={200}
              />
            </motion.h2>
            <motion.div className="flex justify-center">
              <div className="w-20 h-1 bg-gradient-to-r from-accent to-blue-400 rounded-full" />
            </motion.div>
          </div>

          {/* Skills Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {skillCategories.map((category, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 247, 255, 0.2)' }}
                className="group p-6 glassmorphism rounded-xl border border-accent/20 hover:border-accent/50 transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{category.icon}</span>
                    <h3 className="text-xl font-bold text-accent group-hover:text-cyan-300 transition-colors">
                      {category.category}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, i) => (
                      <motion.span
                        key={i}
                        whileHover={{ scale: 1.1 }}
                        className="px-3 py-1 bg-accent/10 border border-accent/30 text-sm text-accent rounded-full hover:bg-accent/20 transition-colors cursor-default"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Animated background */}
                <motion.div
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/5 to-accent/0 rounded-xl pointer-events-none"
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Core Competencies — Enhanced */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            {/* Section header */}
            <div className="text-center space-y-3 mb-10">
              <div className="flex items-center justify-center gap-2">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-accent/60" />
                <span className="text-xs uppercase tracking-[0.3em] text-accent font-semibold">Core Competencies</span>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-accent/60" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white">Technical Proficiency</h3>
              <p className="text-gray-400 max-w-xl mx-auto text-sm">
                Estimated proficiency levels across key technical domains
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {[
                { label: 'Full Stack Development', value: 85, icon: '🌐', gradient: 'from-accent via-blue-400 to-cyan-300' },
                { label: 'Mobile Development', value: 75, icon: '📱', gradient: 'from-green-400 via-emerald-500 to-teal-400' },
                { label: 'Frontend Design', value: 80, icon: '🎨', gradient: 'from-purple-400 via-violet-500 to-pink-400' },
                { label: 'Backend Architecture', value: 78, icon: '⚙️', gradient: 'from-indigo-400 via-blue-500 to-violet-400' },
                { label: 'Database Management', value: 72, icon: '🗄️', gradient: 'from-rose-400 via-orange-400 to-amber-400' },
              ].map((skill, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  className="group p-5 glassmorphism rounded-xl border border-accent/10 hover:border-accent/40 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{skill.icon}</span>
                    <div className="flex-1">
                      <p className="text-gray-200 font-semibold group-hover:text-white transition-colors">{skill.label}</p>
                    </div>
                    <motion.span
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: idx * 0.1 + 0.4 }}
                      viewport={{ once: true }}
                      className="text-lg font-bold text-accent tabular-nums"
                    >
                      {skill.value}%
                    </motion.span>
                  </div>

                  <div className="relative h-3 bg-dark/60 rounded-full overflow-hidden border border-accent/10">
                    {/* Shimmer background */}
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.value}%` }}
                      transition={{ duration: 1.2, ease: 'easeOut', delay: idx * 0.15 }}
                      viewport={{ once: true }}
                      className={`h-full rounded-full bg-gradient-to-r ${skill.gradient} relative overflow-hidden`}
                    >
                      {/* Shimmer overlay */}
                      <motion.div
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
                        className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]"
                      />
                    </motion.div>
                  </div>

                  {/* Dot indicators for granularity */}
                  <div className="flex justify-between mt-1.5 px-0.5">
                    {[0, 25, 50, 75, 100].map((dot) => (
                      <div
                        key={dot}
                        className={`w-1 h-1 rounded-full transition-colors duration-300 ${
                          skill.value >= dot ? 'bg-accent/40' : 'bg-gray-600/30'
                        }`}
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
