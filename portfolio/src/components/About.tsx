'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Typewriter from './Typewriter'

function EducationCard({ edu, idx }: { edu: { title: string; field: string; school: string; status: string }; idx: number }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['12deg', '-12deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-12deg', '12deg'])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: idx * 0.12 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      className="group relative"
    >
      {/* Animated gradient border ring */}
      <motion.div
        animate={{
          background: [
            'linear-gradient(45deg, rgba(0,247,255,0.4), rgba(99,102,241,0.3), rgba(168,85,247,0.3), rgba(0,247,255,0.4))',
            'linear-gradient(225deg, rgba(0,247,255,0.4), rgba(99,102,241,0.3), rgba(168,85,247,0.3), rgba(0,247,255,0.4))',
            'linear-gradient(45deg, rgba(0,247,255,0.4), rgba(99,102,241,0.3), rgba(168,85,247,0.3), rgba(0,247,255,0.4))',
          ],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        className="absolute -inset-[1.5px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"
        style={{ zIndex: 0 }}
      />

      {/* Flowing gradient background */}
      <motion.div
        animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-15 transition-opacity duration-500"
        style={{
          background: 'linear-gradient(135deg, rgba(0,247,255,0.15), rgba(99,102,241,0.1), rgba(168,85,247,0.1))',
          backgroundSize: '200% 200%',
        }}
      />

      {/* Shimmer scan line */}
      <motion.div
        animate={{
          top: ['-10%', '110%'],
          opacity: [0, 0.5, 0],
        }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.3 }}
        className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />

      <div
        className="relative p-6 glassmorphism rounded-xl border border-accent/20 group-hover:border-accent/50 transition-all duration-300"
        style={{ transformStyle: 'preserve-3d', transform: 'translateZ(20px)' }}
      >
        <div className="flex items-start justify-between gap-4" style={{ transformStyle: 'preserve-3d', transform: 'translateZ(30px)' }}>
          <div className="space-y-2">
            <h4 className="text-xl font-bold text-accent group-hover:text-cyan-300 transition-colors">{edu.title}</h4>
            <p className="text-lg text-gray-200">{edu.field}</p>
            <p className="text-gray-400">{edu.school}</p>
          </div>
          <div className="px-4 py-2 bg-accent/10 border border-accent/30 rounded-lg" style={{ transformStyle: 'preserve-3d', transform: 'translateZ(40px)' }}>
            <p className="text-sm text-accent font-semibold">{edu.status}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function About() {
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

  const education = [
    {
      title: 'Bachelor of Engineering',
      field: 'Information Science and Engineering',
      school: 'JSS Academy of Technical Education',
      status: 'Student',
    },
  ]

  const highlights = [
    '🎓 B.E in Information Science',
    '💡 Full Stack Developer',
    '📱 Mobile App Developer',
    '🤖 AI & ML Enthusiast',
    '🚀 Building practical tech solutions',
    '⚡ 17+ GitHub repositories',
  ]

  return (
    <section id="about" className="relative py-20 px-4">
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
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold"
            >
              <Typewriter
                text="About Me"
                className="bg-gradient-to-r from-accent to-blue-400 bg-clip-text text-transparent"
                speed={80}
                delay={200}
              />
            </motion.h2>
            <motion.div
              variants={itemVariants}
              className="flex justify-center"
            >
              <div className="w-20 h-1 bg-gradient-to-r from-accent to-blue-400 rounded-full" />
            </motion.div>
          </div>

          {/* Main content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
          >
            {/* Left side - Text */}
            <motion.div variants={itemVariants} className="space-y-6">
              <p className="text-gray-300 text-lg leading-relaxed">
                I'm a passionate developer from Bangalore, 
                currently pursuing a B.E. in Information Science and Engineering and a proud Reliance Foundation Scholar (2022–26). 
                With a strong foundation in full-stack and mobile app development, I focus on building scalable, 
                user-centric solutions that solve real-world problems.
              </p>

              <p className="text-gray-300 text-lg leading-relaxed">
                My journey in tech has been driven by curiosity and a desire to learn. From web technologies like React and Node.js 
                to mobile development with Kotlin and Android Studio, I'm constantly expanding my skill set to stay at the forefront 
                of modern development practices.
              </p>

              <p className="text-gray-300 text-lg leading-relaxed">
                I believe in clean code, thoughtful design, and creating technology that makes a difference. Every project I work on 
                is an opportunity to learn something new and push my boundaries as a developer.
              </p>
            </motion.div>

            {/* Right side - Highlights */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              {highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ x: 10 }}
                  className="p-4 glassmorphism rounded-lg border border-accent/20 hover:border-accent/50 transition-colors"
                >
                  <p className="text-lg font-medium text-white">{highlight}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Education */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <motion.h3
              variants={itemVariants}
              className="text-2xl font-bold text-white"
            >
              Education
            </motion.h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {education.map((edu, index) => (
                <EducationCard key={index} edu={edu} idx={index} />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
