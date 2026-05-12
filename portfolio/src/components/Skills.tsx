'use client'

import { motion } from 'framer-motion'

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
              <span className="bg-gradient-to-r from-accent to-blue-400 bg-clip-text text-transparent">
                Skills & Expertise
              </span>
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

          {/* Proficiency bars */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-6 mt-12"
          >
            <h3 className="text-2xl font-bold text-white">Core Competencies</h3>

            {[
              { label: 'Full Stack Development', value: 85 },
              { label: 'Mobile Development', value: 75 },
              { label: 'Frontend Design', value: 80 },
              { label: 'Backend Architecture', value: 78 },
              { label: 'Database Management', value: 72 },
            ].map((skill, idx) => (
              <motion.div key={idx} className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-gray-300 font-medium">{skill.label}</p>
                  <p className="text-accent font-bold">{skill.value}%</p>
                </div>
                <div className="h-2 bg-card rounded-full overflow-hidden border border-accent/20">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.value}%` }}
                    transition={{ duration: 1, ease: 'easeOut', delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="h-full bg-gradient-to-r from-accent via-blue-400 to-cyan-300"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
