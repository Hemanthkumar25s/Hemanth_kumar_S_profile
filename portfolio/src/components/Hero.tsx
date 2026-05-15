'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-20 px-4"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            y: [0, 50, 0],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-0 left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, -50, 0],
            x: [0, -30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-0 right-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
      >
        {/* Text content */}
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="space-y-2">
            <motion.p
              variants={itemVariants}
              className="text-accent text-lg font-semibold"
            >
              Welcome to my portfolio 👋
            </motion.p>
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl font-bold leading-tight"
            >
              <span className="bg-gradient-to-r from-accent via-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Hemanth Kumar S
              </span>
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-2xl text-blue-200 font-light"
            >
              Student Developer & Tech Enthusiast
            </motion.p>
          </div>

          <motion.p
            variants={itemVariants}
            className="text-gray-300 text-lg leading-relaxed"
          >
            Building innovative web and mobile applications with modern technologies.
            Passionate about Full Stack Development, Android, and creating practical tech solutions.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <motion.a
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 247, 255, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              href="/projects"
              className="px-8 py-3 bg-gradient-to-r from-accent to-blue-400 text-dark font-bold rounded-lg hover-glow"
            >
              View Projects
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 247, 255, 0.2)' }}
              whileTap={{ scale: 0.95 }}
              href="/resume"
              className="px-8 py-3 border-2 border-accent text-accent font-bold rounded-lg hover:bg-accent/10"
            >
              View Resume
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05, borderColor: '#00F7FF' }}
              whileTap={{ scale: 0.95 }}
              href="/contact"
              className="px-8 py-3 border-2 border-accent text-accent font-bold rounded-lg hover:bg-accent/10"
            >
              Get in Touch
            </motion.a>
          </motion.div>

          {/* Social links */}
          <motion.div variants={itemVariants} className="flex gap-6 pt-8">
            {[
              { icon: '🔗', label: 'GitHub', href: 'https://github.com/Hemanthkumar25s' },
              { icon: '💼', label: 'LinkedIn', href: 'https://linkedin.com/in/hemanthkumars25' },
              { icon: '📧', label: 'Email', href: 'mailto:hemanthkumar.s3125@gmail.com' },
            ].map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
                className="text-2xl hover:text-accent transition-colors"
                title={social.label}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Image section */}
        <motion.div
          variants={itemVariants}
          className="relative"
        >
          <motion.div
            animate={{
              y: [0, 20, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative"
          >
            {/* Glowing border effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent via-blue-400 to-accent rounded-2xl blur-xl opacity-50" />

            {/* Image container */}
            <div className="relative rounded-2xl overflow-hidden border border-accent/50">
              <Image
                src="/profile.jpeg"
                alt="Hemanth Kumar S"
                width={400}
                height={500}
                priority
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-30" />
            </div>
          </motion.div>

          {/* Decorative elements */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute -top-10 -right-10 w-40 h-40 border border-accent/20 rounded-full pointer-events-none"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="absolute -bottom-10 -left-10 w-40 h-40 border border-blue-400/20 rounded-full pointer-events-none"
          />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm text-accent">Scroll down</p>
          <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </motion.div>
    </section>
  )
}
