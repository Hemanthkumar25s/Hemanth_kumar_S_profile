'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [toast, setToast] = useState('')

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const subject = `Message from ${formData.name}`
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=hemanthkumar.s3125@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    window.open(gmailLink, '_blank')
    setSubmitted(true)
    setToast('Your message is prepared in Gmail. Please send it from the Gmail window.')

    setTimeout(() => setSubmitted(false), 3000)
    setTimeout(() => setToast(''), 5000)
  }

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

  // SVG Logo Components
  const GitHubLogo = () => (
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  )

  const LinkedInLogo = () => (
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.002 1.413-.103.249-.129.597-.129.946v5.446h-3.554s.047-8.842 0-9.769h3.554v1.391c.432-.668 1.202-1.618 2.923-1.618 2.135 0 3.74 1.393 3.74 4.385v5.611zM5.337 8.855c-1.144 0-1.915-.762-1.915-1.715 0-.953.77-1.715 1.958-1.715 1.188 0 1.915.762 1.915 1.715 0 .953-.727 1.715-1.958 1.715zm1.581 11.597H3.715V8.683h3.203v11.769zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )

  const GmailLogo = () => (
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  )

  const LocationLogo = () => (
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c1.93 0 3.5-1.57 3.5-3.5S17.43 3 15.5 3 12 4.57 12 6.5s1.57 3.5 3.5 3.5z" />
    </svg>
  )

  return (
    <section id="contact" className="relative py-20 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-16"
        >
          {/* Section title */}
          <div className="text-center space-y-4">
            <motion.h2
              className="text-4xl md:text-5xl font-bold"
            >
              <span className="bg-gradient-to-r from-accent to-blue-400 bg-clip-text text-transparent">
                Get In Touch
              </span>
            </motion.h2>
            <motion.div className="flex justify-center">
              <div className="w-20 h-1 bg-gradient-to-r from-accent to-blue-400 rounded-full" />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-gray-300 text-lg"
            >
              Have a question or want to collaborate? Feel free to reach out!
            </motion.p>
          </div>

          {/* Contact content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
          >
            {/* Contact info */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-2xl font-bold text-white">Contact Information</h3>

              {[
                {
                  icon: GmailLogo,
                  title: 'Email',
                  value: 'hemanthkumar.s3125@gmail.com',
                  href: 'https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=hemanthkumar.s3125@gmail.com',
                },
                {
                  icon: LocationLogo,
                  title: 'Location',
                  value: 'Bangalore, Karnataka, India',
                  href: '#',
                },
                {
                  icon: LinkedInLogo,
                  title: 'LinkedIn',
                  value: 'linkedin.com/in/hemanthkumars25',
                  href: 'https://linkedin.com/in/hemanthkumars25',
                },
                {
                  icon: GitHubLogo,
                  title: 'GitHub',
                  value: 'github.com/Hemanthkumar25s',
                  href: 'https://github.com/Hemanthkumar25s',
                },
              ].map((contact, idx) => {
                const IconComponent = contact.icon
                return (
                  <motion.a
                    key={idx}
                    href={contact.href}
                    target={contact.href.startsWith('http') ? '_blank' : ''}
                    rel="noopener noreferrer"
                    variants={itemVariants}
                    whileHover={{ x: 10 }}
                    className="p-5 glassmorphism rounded-lg border border-accent/20 hover:border-accent/50 transition-all group cursor-pointer flex items-start gap-4 bg-card/40"
                  >
                    <div className="text-accent group-hover:scale-110 transition-transform flex-shrink-0 mt-1">
                      <IconComponent />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-400 font-medium">{contact.title}</p>
                      <p className="text-base font-semibold text-gray-100 group-hover:text-cyan-300 transition-colors break-all">
                        {contact.value}
                      </p>
                    </div>
                  </motion.a>
                )
              })}
            </motion.div>

            {/* Contact form */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-2xl font-bold text-white">Send a Message</h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                {toast ? (
                  <div className="rounded-lg border border-accent/30 bg-accent/10 p-4 text-sm text-cyan-200">
                    {toast}
                  </div>
                ) : null}
                {/* Name input */}
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  className="space-y-2"
                >
                  <label className="text-sm text-gray-300 font-medium">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-card border border-accent/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                    placeholder="Enter your name"
                  />
                </motion.div>

                {/* Email input */}
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  className="space-y-2"
                >
                  <label className="text-sm text-gray-300 font-medium">Your Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-card border border-accent/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                    placeholder="your@email.com"
                  />
                </motion.div>

                {/* Message input */}
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  className="space-y-2"
                >
                  <label className="text-sm text-gray-300 font-medium">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-card border border-accent/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all resize-none"
                    placeholder="Your message here..."
                  />
                </motion.div>

                {/* Submit button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 247, 255, 0.4)' }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-6 py-3 bg-gradient-to-r from-accent to-blue-400 text-dark font-bold rounded-lg hover:shadow-lg transition-all"
                >
                  {submitted ? '✓ Message Ready!' : 'Send Message'}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center space-y-6 pt-8 border-t border-accent/20"
          >
            <h3 className="text-2xl font-bold text-white">Connect With Me</h3>
            <div className="flex justify-center gap-8">
              {[
                { Component: GitHubLogo, label: 'GitHub', href: 'https://github.com/Hemanthkumar25s' },
                { Component: LinkedInLogo, label: 'LinkedIn', href: 'https://linkedin.com/in/hemanthkumars25' },
                { Component: GmailLogo, label: 'Gmail', href: 'https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=hemanthkumar.s3125@gmail.com' },
              ].map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : ''}
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-accent hover:text-cyan-300 transition-colors p-3 rounded-lg hover:bg-accent/10"
                  title={social.label}
                >
                  <social.Component />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
