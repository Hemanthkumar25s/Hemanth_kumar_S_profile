'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'

// ─── Knowledge Base ──────────────────────────────────────────────────────────
const knowledgeBase = {
  about: {
    name: 'Hemanth Kumar S',
    title: 'Student Developer & Tech Enthusiast',
    location: 'Bangalore, Karnataka, India',
    education: 'B.E. in Information Science and Engineering at JSS Academy of Technical Education',
    scholar: 'Reliance Foundation Scholar (2022–26)',
    description:
      'A passionate developer from Bangalore, currently pursuing a B.E. in Information Science and Engineering. Building innovative web and mobile applications with modern technologies. Passionate about Full Stack Development, Android, and creating practical tech solutions.',
    highlights: [
      'Full Stack Developer',
      'Mobile App Developer',
      'AI & ML Enthusiast',
      'Building practical tech solutions',
      '17+ GitHub repositories',
    ],
  },
  skills: {
    categories: [
      { category: 'Languages', skills: ['JavaScript', 'Python', 'Java', 'Kotlin', 'HTML/CSS'] },
      { category: 'Frontend', skills: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'TypeScript'] },
      { category: 'Backend', skills: ['Node.js', 'Express', 'MongoDB', 'MySQL', 'Firebase'] },
      { category: 'Mobile', skills: ['Android Studio', 'Kotlin', 'Material Design', 'REST APIs'] },
      { category: 'Tools', skills: ['Git', 'GitHub', 'VS Code', 'Figma', 'Docker'] },
      { category: 'AI/ML', skills: ['Gemini AI', 'Power BI', 'Tableau', 'Data Analysis'] },
    ],
    proficiencies: [
      { label: 'Full Stack Development', value: 85 },
      { label: 'Mobile Development', value: 75 },
      { label: 'Frontend Design', value: 80 },
      { label: 'Backend Architecture', value: 78 },
      { label: 'Database Management', value: 72 },
    ],
  },
  projects: [
    {
      title: 'GramaYatri',
      description: 'Helping rural commuters track their buses in real-time with community-powered live arrival estimates. Built with Kotlin, Jetpack Compose, Firebase, and Room.',
      status: 'Completed',
      link: 'https://github.com/Hemanthkumar25s/GramaYatri',
      apps: ['GramaYatri User', 'GramaYatri Driver', 'GramaYatri Ticketing'],
    },
    {
      title: 'Sante Price Index',
      description: 'Vendor intelligence platform with live Mandi price tracking, automated profit optimization, and multi-lingual AI assistant for fresh-market retailers.',
      status: 'Completed',
      link: 'https://github.com/Hemanthkumar25s/Sante_Price_index',
    },
    {
      title: 'AI Based Mock Interview Platform',
      description: 'Intelligent interview preparation platform powered by Gemini AI with real-time feedback, question variations, and performance analytics.',
      status: 'Completed',
    },
    {
      title: 'Mini Social Media Platform',
      description: 'Full-stack social networking application with user authentication, post creation, real-time notifications, and social interactions.',
      status: 'Completed',
    },
    {
      title: 'VogueAI - Virtual Stylist',
      description: 'AI-powered fashion recommendation system providing personalized styling suggestions using computer vision and machine learning.',
      status: 'Completed',
      link: 'https://github.com/Hemanthkumar25s/VogueAI-Virtual-Stylist',
    },
    {
      title: 'AI Interior Design Consultant',
      description: 'Interactive room makeover application using Gemini AI for visual space analysis, design recommendations, and visual comparisons.',
      status: 'Completed',
      link: 'https://github.com/Hemanthkumar25s/AI-Interior-Design-Consultant',
    },
  ],
  contact: {
    email: 'hemanthkumar.s3125@gmail.com',
    linkedin: 'linkedin.com/in/hemanthkumars25',
    github: 'github.com/Hemanthkumar25s',
    location: 'Bangalore, Karnataka, India',
  },
  resume: {
    summary: 'Student Developer with experience in Full Stack Web Development, Mobile App Development (Android/Kotlin), and AI/ML. Building scalable, user-centric solutions.',
    education: 'B.E. in Information Science and Engineering, JSS Academy of Technical Education, Bangalore',
    skills: ['JavaScript', 'TypeScript', 'Python', 'Java', 'Kotlin', 'React', 'Next.js', 'Node.js', 'MongoDB', 'Firebase', 'Android', 'Tailwind CSS', 'Git'],
  },
  testimonials: [
    'Hemanth brings thoughtful engineering and polished UI design to every project.',
    'A talented student developer with strong attention to detail and a passion for building user-friendly apps.',
    'He consistently pushes the user experience higher with smooth interactions and responsive layouts.',
  ],
  services: [
    { title: 'Web Development', description: 'Building responsive and fast React/Next.js websites with modern UI and strong performance.' },
    { title: 'Mobile Apps', description: 'Creating polished Android experiences using Kotlin, Jetpack Compose and API integrations.' },
  ],
}

// ─── Intent Matching Engine ──────────────────────────────────────────────────
type Intent =
  | 'greeting'
  | 'about'
  | 'skills'
  | 'projects'
  | 'project_detail'
  | 'contact'
  | 'contact_send'
  | 'resume'
  | 'github'
  | 'linkedin'
  | 'education'
  | 'services'
  | 'testimonials'
  | 'help'
  | 'unknown'

interface IntentPattern {
  intent: Intent
  patterns: RegExp[]
  response: (input: string) => string
}

function createMatcher(): IntentPattern[] {
  return [
    {
      intent: 'greeting',
      patterns: [/^(hi|hello|hey|greetings|good morning|good evening|good afternoon|sup|howdy)\b/i],
      response: () =>
        "Hello! I'm Hemanth's personal assistant. I can help you learn about his skills, projects, education, resume, and more. How can I assist you today?",
    },
    {
      intent: 'about',
      patterns: [
        /^about\s+(him|hemanth|you|yourself)/i,
        /who\s+is\s+(hemanth|he|you)/i,
        /tell\s+me\s+about\s+(hemanth|him|yourself|the\s+person)/i,
        /introduce\s+(yourself|hemanth|him)/i,
        /what\s+(do|does)\s+(you|he)\s+do/i,
      ],
      response: () =>
        `Hemanth Kumar S is a Student Developer & Tech Enthusiast from Bangalore, India. He's currently pursuing a B.E. in Information Science and Engineering at JSS Academy of Technical Education and is a Reliance Foundation Scholar (2022–26). He's passionate about Full Stack Development, Mobile Apps, and AI/ML, building practical tech solutions that make a difference.`,
    },
    {
      intent: 'education',
      patterns: [
        /education/i,
        /college/i,
        /university/i,
        /degree/i,
        /study|studying|studies/i,
        /academic/i,
        /school/i,
        /b\.?e/i,
        /bachelor/i,
        /information\s*science/i,
      ],
      response: () =>
        `Hemanth is pursuing a Bachelor of Engineering (B.E.) in Information Science and Engineering at JSS Academy of Technical Education, Bangalore. He is also a proud Reliance Foundation Scholar (2022–26).`,
    },
    {
      intent: 'skills',
      patterns: [
        /skills/i,
        /technologies/i,
        /tech\s*stack/i,
        /what\s+(does|can)\s+(he|you)\s+(know|use|work\s*with)/i,
        /proficienc/i,
        /expertise/i,
        /languages?\s+(he|you)\s+(know|use)/i,
        /tools/i,
        /frameworks/i,
      ],
      response: () => {
        const cats = knowledgeBase.skills.categories
        return `Hemanth's technical skills include:\n${cats.map((c) => `• ${c.category}: ${c.skills.join(', ')}`).join('\n')}\n\nHis core proficiencies are Full Stack Development (85%), Frontend Design (80%), Backend Architecture (78%), Mobile Development (75%), and Database Management (72%).`
      },
    },
    {
      intent: 'projects',
      patterns: [
        /projects?/i,
        /what\s+(has|did)\s+(he|you)\s+(built|create|made|developed)/i,
        /showcase/i,
        /portfolio\s*(projects?)?/i,
        /work\s*(done|completed)?/i,
        /apps?\s*(built|created)?/i,
      ],
      response: () => {
        const projs = knowledgeBase.projects
        return `Hemanth has completed ${projs.length} featured projects:\n${projs.map((p) => `• ${p.title}: ${p.description.split('.')[0]}.`).join('\n')}\n\nTo learn more about a specific project, just ask!`
      },
    },
    {
      intent: 'contact',
      patterns: [
        /contact/i,
        /reach\s+(out|him|you)/i,
        /get\s+in\s+touch/i,
        /email/i,
        /message\s+(him|you)/i,
        /communicate/i,
        /connect/i,
      ],
      response: () =>
        `You can reach Hemanth via:\n📧 Email: hemanthkumar.s3125@gmail.com\n💼 LinkedIn: linkedin.com/in/hemanthkumars25\n💻 GitHub: github.com/Hemanthkumar25s\n📍 Location: Bangalore, Karnataka, India\n\nWould you like to send him a message directly through this chat? Just say "send message" and I'll help you with that!`,
    },
    {
      intent: 'contact_send',
      patterns: [
        /send\s+(a\s+)?message/i,
        /send\s+contact/i,
        /message\s+him/i,
        /i\s+want\s+to\s+contact/i,
        /contact\s+form/i,
      ],
      response: () =>
        "Sure! I'll help you send a message to Hemanth. Please provide your name, email, and message.",
    },
    {
      intent: 'resume',
      patterns: [
        /resume/i,
        /c\.?v\.?/i,
        /curriculum\s*vitae/i,
        /qualifications?/i,
        /background/i,
        /experience/i,
        /summary/i,
      ],
      response: () =>
        `Hemanth's Resume Summary:\n🎓 ${knowledgeBase.resume.education}\n💡 ${knowledgeBase.resume.summary}\n🛠️ Skills: ${knowledgeBase.resume.skills.join(', ')}\n\nYou can view or download his full resume from the Resume page on this website.`,
    },
    {
      intent: 'github',
      patterns: [
        /github/i,
        /git\s*hub/i,
        /repositor/i,
        /code\s*(repos?)?/i,
        /source\s*code/i,
      ],
      response: () =>
        `Hemanth's GitHub profile: github.com/Hemanthkumar25s\nHe has 17+ repositories including projects like GramaYatri, Sante Price Index, VogueAI, AI Interior Design Consultant, and more. Check them out!`,
    },
    {
      intent: 'linkedin',
      patterns: [
        /linkedin/i,
        /linked\s*in/i,
        /profile/i,
      ],
      response: () =>
        `Hemanth's LinkedIn profile: linkedin.com/in/hemanthkumars25\nConnect with him there to see his professional experience and network!`,
    },
    {
      intent: 'services',
      patterns: [
        /services?/i,
        /offer/i,
        /what\s+(do|can)\s+(you|he)\s+provide/i,
        /hire/i,
        /work\s+(with|together)/i,
        /collaborate/i,
      ],
      response: () =>
        `Hemanth offers:\n🌐 Web Development - Responsive React/Next.js websites with modern UI\n📱 Mobile Apps - Polished Android experiences with Kotlin & Jetpack Compose\n\nHe's always open to collaboration on interesting projects!`,
    },
    {
      intent: 'testimonials',
      patterns: [
        /testimonial/i,
        /review/i,
        /feedback/i,
        /what\s+(do|did)\s+others?\s+say/i,
        /people\s+say/i,
        /recommend/i,
      ],
      response: () =>
        `Here's what people say about Hemanth:\n${knowledgeBase.testimonials.map((t, i) => `${i + 1}. "${t}"`).join('\n')}`,
    },
    {
      intent: 'project_detail',
      patterns: [
        /tell\s+me\s+more\s+about\s+(.+)/i,
        /details?\s+(about\s+)?(.+)/i,
        /what\s+is\s+(.+)/i,
        /explain\s+(.+)/i,
      ],
      response: (input: string) => {
        const projs = knowledgeBase.projects
        const match = input.match(/about\s+(.+)/i)?.[1] || input.match(/details?\s+(about\s+)?(.+)/i)?.[2] || input.match(/what\s+is\s+(.+)/i)?.[1] || input.match(/explain\s+(.+)/i)?.[1]
        if (match) {
          const found = projs.find((p) => p.title.toLowerCase().includes(match.toLowerCase()) || match.toLowerCase().includes(p.title.toLowerCase()))
          if (found) {
            let resp = `**${found.title}** (${found.status})\n${found.description}`
            if (found.link) resp += `\n🔗 GitHub: ${found.link}`
            if (found.apps) resp += `\n📱 Apps: ${found.apps.join(', ')}`
            return resp
          }
        }
        return "I'm not sure which project you're asking about. Here are all projects: GramaYatri, Sante Price Index, AI Mock Interview Platform, Mini Social Media Platform, VogueAI, AI Interior Design Consultant. Which one would you like to know more about?"
      },
    },
    {
      intent: 'help',
      patterns: [
        /help/i,
        /what\s+(can|do)\s+you\s+do/i,
        /commands?/i,
        /options/i,
        /what\s+should\s+i\s+ask/i,
        /how\s+(do|can)\s+i\s+use/i,
        /capabilities/i,
        /features?/i,
      ],
      response: () =>
        `I can help you with:\n👤 About Hemanth — who he is, his background\n🎓 Education — his degree and studies\n🛠️ Skills & Technologies — what he works with\n📱 Projects — his featured work\n📄 Resume — his professional summary\n📧 Contact — how to reach him\n💼 Services — what he offers\n⭐ Testimonials — what others say\n💬 Send Message — contact him directly\n\nJust type your question naturally!`,
    },
  ]
}

interface Message {
  role: 'user' | 'assistant'
  text: string
  isTyping?: boolean
}

// ─── Contact Flow ────────────────────────────────────────────────────────────
type ContactStep = 'idle' | 'awaiting_name' | 'awaiting_email' | 'awaiting_message' | 'submitting' | 'done'

export default function PersonalAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [contactStep, setContactStep] = useState<ContactStep>('idle')
  const contactDataRef = useRef({ name: '', email: '', message: '' })
  const [hasOpened, setHasOpened] = useState(false)
  const matchers = useRef(createMatcher())
  const chatEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const addMessage = (text: string, role: 'user' | 'assistant') => {
    setMessages((prev) => [...prev, { role, text }])
  }

  const typeResponse = async (text: string) => {
    setIsTyping(true)
    // Simulate typing for natural feel
    const typingDelay = Math.min(text.length * 8, 800)
    await new Promise((r) => setTimeout(r, typingDelay))
    setIsTyping(false)
    addMessage(text, 'assistant')
  }

  const matchIntent = (input: string): IntentPattern | null => {
    for (const m of matchers.current) {
      for (const p of m.patterns) {
        if (p.test(input)) return m
      }
    }
    return null
  }

  const handleSendMessage = async () => {
    const text = input.trim()
    if (!text || isTyping) return

    setInput('')
    addMessage(text, 'user')

    // Handle contact form flow
    if (contactStep === 'awaiting_name') {
      contactDataRef.current = { ...contactDataRef.current, name: text }
      setContactStep('awaiting_email')
      await typeResponse('Great! Please provide your email address so Hemanth can reply to you.')
      return
    }

    if (contactStep === 'awaiting_email') {
      // Basic email validation
      if (!text.includes('@') || !text.includes('.')) {
        await typeResponse("That doesn't look like a valid email. Please enter a valid email address (e.g., name@example.com).")
        return
      }
      contactDataRef.current = { ...contactDataRef.current, email: text }
      setContactStep('awaiting_message')
      await typeResponse('Thanks! Now, what message would you like to send to Hemanth?')
      return
    }

    if (contactStep === 'awaiting_message') {
      const finalData = { ...contactDataRef.current, message: text }
      setContactStep('submitting')

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(finalData),
        })

        if (!response.ok) throw new Error('Failed to send')

        setContactStep('done')
        await typeResponse(
          '✅ Your message has been sent successfully! Hemanth will get back to you as soon as possible. Is there anything else I can help you with?'
        )
      } catch {
        setContactStep('idle')
        await typeResponse(
          "Sorry, there was an issue sending your message. Please try again later, or email Hemanth directly at hemanthkumar.s3125@gmail.com."
        )
      }
      contactDataRef.current = { name: '', email: '', message: '' }
      return
    }

    // Reset contact step if user types something else
    if (contactStep === 'done') {
      setContactStep('idle')
    }

    // Match intent
    const match = matchIntent(text)

    if (match) {
      if (match.intent === 'contact_send') {
        setContactStep('awaiting_name')
        await typeResponse(
          "I'd be happy to help you send a message! First, what's your name?"
        )
      } else {
        await typeResponse(match.response(text))
      }
    } else {
      // Fallback - check if any project name is mentioned
      const projMatch = knowledgeBase.projects.find(
        (p) => text.toLowerCase().includes(p.title.toLowerCase()) || p.title.toLowerCase().includes(text.toLowerCase())
      )
      if (projMatch) {
        let resp = `**${projMatch.title}** (${projMatch.status})\n${projMatch.description}`
        if (projMatch.link) resp += `\n🔗 GitHub: ${projMatch.link}`
        if (projMatch.apps) resp += `\n📱 Apps: ${projMatch.apps.join(', ')}`
        await typeResponse(resp)
      } else {
        await typeResponse(
          "I'm not sure I understand. Feel free to ask me about Hemanth's skills, projects, education, resume, or how to contact him. Type 'help' to see what I can do!"
        )
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleOpen = () => {
    setIsOpen(true)
    if (!hasOpened) {
      setHasOpened(true)
      setTimeout(() => {
        addMessage(
          "👋 Hi! I'm Hemanth Kumar S's personal assistant. I can help you learn about his skills, projects, education, resume, and more. How can I help you today?",
          'assistant'
        )
      }, 400)
    }
  }

  return (
    <>
      {/* Toggle button */}
      <motion.button
        data-testid="assistant-toggle"
        onClick={() => (isOpen ? setIsOpen(false) : handleOpen())}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-accent to-blue-400 text-dark font-bold shadow-lg hover:shadow-[0_0_30px_rgba(0,247,255,0.4)] flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={isOpen ? { rotate: 45 } : { rotate: 0 }}
        aria-label="Toggle AI Assistant"
      >
        {isOpen ? (
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z" />
            <circle cx="12" cy="11" r="1.5" />
            <circle cx="8" cy="11" r="1.5" />
            <circle cx="16" cy="11" r="1.5" />
          </svg>
        )}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            data-testid="assistant-panel"
            className="fixed bottom-24 right-5 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[calc(100vh-10rem)] glassmorphism rounded-2xl border border-accent/20 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex-shrink-0 p-4 border-b border-accent/10 bg-gradient-to-r from-accent/10 to-blue-400/10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-r from-accent to-blue-400 flex items-center justify-center text-dark font-bold text-sm">
                  AI
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-white truncate">Hemanth's Assistant</h3>
                  <p className="text-xs text-gray-400">AI-Powered • Knowledge Base</p>
                </div>
                {isTyping && (
                  <div className="flex gap-1">
                    <motion.span
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      className="w-1.5 h-1.5 rounded-full bg-accent"
                    />
                    <motion.span
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
                      className="w-1.5 h-1.5 rounded-full bg-accent"
                    />
                    <motion.span
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
                      className="w-1.5 h-1.5 rounded-full bg-accent"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-r from-accent to-blue-400 text-dark font-medium rounded-tr-sm'
                        : 'bg-card/80 border border-accent/10 text-gray-200 rounded-tl-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className="flex-shrink-0 p-3 border-t border-accent/10">
              <div className="flex gap-2">
                <input
                  data-testid="assistant-input"
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={contactStep === 'awaiting_name' ? 'Enter your name...' : contactStep === 'awaiting_email' ? 'Enter your email...' : contactStep === 'awaiting_message' ? 'Enter your message...' : 'Ask me anything...'}
                  className="flex-1 px-4 py-2.5 bg-dark/60 border border-accent/20 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all"
                  disabled={isTyping}
                />
                <motion.button
                  data-testid="assistant-send"
                  onClick={handleSendMessage}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!input.trim() || isTyping}
                  className="px-3.5 py-2.5 bg-gradient-to-r from-accent to-blue-400 text-dark rounded-xl font-bold disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19V5m0 0l-7 7m7-7l7 7" />
                  </svg>
                </motion.button>
              </div>
              <p className="mt-1.5 text-[10px] text-gray-500 text-center">
                Ask about skills, projects, resume, contact & more
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
