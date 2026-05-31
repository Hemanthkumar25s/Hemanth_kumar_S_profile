'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Typewriter from './Typewriter'

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

  const heroVideoSrc = 'https://assets.mixkit.co/videos/preview/mixkit-technology-network-background-532-large.mp4'

  const GitHubIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.084 1.84 1.237 1.84 1.237 1.07 1.835 2.81 1.305 3.495.998.108-.775.42-1.305.762-1.605-2.665-.303-5.467-1.333-5.467-5.93 0-1.31.468-2.38 1.236-3.22-.124-.303-.536-1.523.117-3.176 0 0 1.008-.323 3.3 1.23a11.5 11.5 0 0 1 3.003-.404c1.02.005 2.043.138 3.003.404 2.29-1.553 3.296-1.23 3.296-1.23.655 1.653.243 2.873.12 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.807 5.624-5.48 5.922.43.37.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .32.216.694.825.576C20.565 21.796 24 17.298 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  )

  const LinkedInIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.25 8.75h4.5V24h-4.5V8.75zm7.75 0h4.316v2.122h.062c.603-1.143 2.077-2.346 4.275-2.346 4.57 0 5.412 3.008 5.412 6.922V24h-4.5v-7.471c0-1.783-.032-4.079-2.487-4.079-2.49 0-2.87 1.945-2.87 3.955V24h-4.5V8.75z" />
    </svg>
  )

  const MailIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z" />
    </svg>
  )

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-20 px-4"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src={heroVideoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/45 mix-blend-multiply" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,247,255,0.18),transparent_25%)] animate-bg-pan" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.16),transparent_30%)] animate-bg-pan-reverse" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent)]" />
      </div>
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
        className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
      >
        {/* Text content */}
        <motion.div variants={itemVariants} className="space-y-6 md:order-1">
          <div className="space-y-2">
            <motion.p
              variants={itemVariants}
              animate={{ y: [0, -8, 0], rotate: [0, 2, -2, 0] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
              className="text-accent text-lg font-semibold"
            >
              Welcome to my portfolio 👋
            </motion.p>
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl font-bold leading-tight"
            >
              <Typewriter
                text={["Hemanth", "Kumar S"]}
                className="bg-gradient-to-r from-accent via-blue-400 to-cyan-300 bg-clip-text text-transparent"
                speed={80}
                delay={300}
              />
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

          <motion.div
            variants={itemVariants}
            className="mt-8 rounded-3xl border border-accent/10 bg-card/80 p-6 text-gray-300 shadow-[0_0_40px_rgba(0,247,255,0.08)]"
          >
            <p className="text-base leading-relaxed">
              <span className="font-semibold text-white">Full Stack + Mobile Developer</span> with experience building responsive apps, strong UI flows, and polished interactions.
            </p>
          </motion.div>

          {/* Social links */}
          <motion.div variants={itemVariants} className="flex gap-6 pt-8">
            {[
              { icon: <GitHubIcon />, label: 'GitHub', href: 'https://github.com/Hemanthkumar25s' },
              { icon: <LinkedInIcon />, label: 'LinkedIn', href: 'https://linkedin.com/in/hemanthkumars25' },
              { icon: <MailIcon />, label: 'Email', href: 'mailto:hemanthkumar.s3125@gmail.com' },
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
        <motion.div variants={itemVariants} className="relative rounded-3xl overflow-hidden border border-accent/20 bg-white/5 shadow-[0_0_60px_rgba(0,247,255,0.08)] md:order-2">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-blue-500/10 to-transparent" />
          <div className="relative overflow-hidden">
            <Image
              src="/profile.jpeg"
              alt="Hemanth Kumar S"
              width={500}
              height={600}
              priority
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-transparent to-transparent" />
          </div>
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
