'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function CursorPet() {
  const [pupilPos, setPupilPos] = useState({ lx: 0, ly: 0, rx: 0, ry: 0 })
  const [isBlinking, setIsBlinking] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isSleeping, setIsSleeping] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const petRef = useRef<HTMLDivElement>(null)
  const mousePosRef = useRef({ x: 0, y: 0 })
  const animFrameRef = useRef<number>(0)
  const sleepTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isRunningRef = useRef(false)

  // Detect reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Idle blink — blink randomly every 3–5 seconds
  useEffect(() => {
    if (reducedMotion) return
    const blink = () => {
      setIsBlinking(true)
      setTimeout(() => setIsBlinking(false), 120)
    }
    const scheduleBlink = () => {
      const delay = 2500 + Math.random() * 3000
      setTimeout(() => {
        blink()
        scheduleBlink()
      }, delay)
    }
    scheduleBlink()
  }, [reducedMotion])

  // Go to sleep if no mouse movement for 8 seconds
  useEffect(() => {
    const resetSleepTimer = () => {
      setIsSleeping(false)
      if (sleepTimerRef.current) clearTimeout(sleepTimerRef.current)
      sleepTimerRef.current = setTimeout(() => setIsSleeping(true), 8000)
    }

    window.addEventListener('mousemove', resetSleepTimer)
    resetSleepTimer()

    return () => {
      window.removeEventListener('mousemove', resetSleepTimer)
      if (sleepTimerRef.current) clearTimeout(sleepTimerRef.current)
    }
  }, [])

  // Mouse tracking — only runs rAF loop while mouse is moving
  useEffect(() => {
    const updatePupils = () => {
      if (!petRef.current) return

      const rect = petRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const dx = mousePosRef.current.x - centerX
      const dy = mousePosRef.current.y - centerY
      const distance = Math.min(Math.sqrt(dx * dx + dy * dy), 120)
      const clamped = distance / 120

      const angle = Math.atan2(dy, dx)
      const maxMove = 5 * clamped

      setPupilPos({
        lx: Math.cos(angle) * maxMove,
        ly: Math.sin(angle) * maxMove,
        rx: Math.cos(angle) * maxMove,
        ry: Math.sin(angle) * maxMove,
      })

      animFrameRef.current = requestAnimationFrame(updatePupils)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY }
      if (!isRunningRef.current) {
        isRunningRef.current = true
        animFrameRef.current = requestAnimationFrame(updatePupils)
      }
    }

    const handleMouseStop = () => {
      isRunningRef.current = false
      cancelAnimationFrame(animFrameRef.current)
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Stop rAF loop after 200ms of no mouse movement
    let stopTimeout: ReturnType<typeof setTimeout>
    const debouncedStop = () => {
      clearTimeout(stopTimeout)
      stopTimeout = setTimeout(handleMouseStop, 200)
    }
    window.addEventListener('mousemove', debouncedStop)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousemove', debouncedStop)
      clearTimeout(stopTimeout)
      cancelAnimationFrame(animFrameRef.current)
    }
  }, [])

  // Ear angles based on state
  const leftEarAngle = isSleeping ? -65 : isHovered ? -8 : -40
  const rightEarAngle = isSleeping ? 65 : isHovered ? 8 : 40

  // Body bob
  const bodyAnimate = isSleeping
    ? { y: [0, 3, 0], rotate: [0, 2, -2, 0] }
    : { y: [0, 5, 0] }

  const bodyTransition = { duration: 3, repeat: Infinity, ease: 'easeInOut' }

  // Tail wiggle
  const tailAnimate = isSleeping
    ? { x: [0, 2, -2, 0], scaleY: [1, 0.85, 1] }
    : { x: [0, 3, 0], scaleY: [1, 0.9, 1] }

  return (
    <motion.div
      ref={petRef}
      className="fixed bottom-5 left-5 z-40 select-none"
      animate={isSleeping ? { scale: 0.85, opacity: 0.6 } : { scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-hidden="true"
    >
      <motion.div
        animate={reducedMotion ? {} : bodyAnimate}
        transition={reducedMotion ? {} : bodyTransition}
        className="relative"
      >
        <svg
          width="70"
          height="78"
          viewBox="-5 -5 80 88"
          className="drop-shadow-lg"
          style={{ filter: 'drop-shadow(0 4px 12px rgba(255,255,255,0.15))' }}
          aria-hidden="true"
        >
          {/* === TAIL (fluffy pom-pom) === */}
          {!reducedMotion ? (
            <motion.ellipse
              animate={tailAnimate}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              cx="54"
              cy="46"
              rx="6"
              ry="5.5"
              fill="#F5F5F5"
              style={{ transformOrigin: '54 46' }}
            />
          ) : (
            <ellipse cx="54" cy="46" rx="6" ry="5.5" fill="#F5F5F5" />
          )}

          {/* === BODY === */}
          <ellipse cx="35" cy="52" rx="16" ry="17" fill="#FFFFFF" />
          {/* Belly */}
          <ellipse cx="35" cy="54" rx="9" ry="10" fill="#FEFEFE" />

          {/* === PAWS === */}
          <ellipse cx="24" cy="66" rx="5" ry="3.5" fill="#FFFFFF" />
          <ellipse cx="46" cy="66" rx="5" ry="3.5" fill="#FFFFFF" />
          {/* Paw pads */}
          <ellipse cx="24" cy="66" rx="2.5" ry="1.8" fill="#FFD1DC" opacity="0.6" />
          <ellipse cx="46" cy="66" rx="2.5" ry="1.8" fill="#FFD1DC" opacity="0.6" />

          {/* === LEFT EAR === */}
          <motion.ellipse
            cx="18"
            cy="13"
            rx="5"
            ry="16"
            fill="#FFFFFF"
            style={{ transformOrigin: '18 26' }}
            animate={reducedMotion ? {} : { rotate: leftEarAngle }}
            transition={{ type: 'spring', stiffness: 180, damping: 16 }}
          />
          {/* Left inner ear */}
          <motion.ellipse
            cx="18"
            cy="13"
            rx="3"
            ry="12.5"
            fill="#FFB6C1"
            style={{ transformOrigin: '18 26' }}
            animate={reducedMotion ? {} : { rotate: leftEarAngle }}
            transition={{ type: 'spring', stiffness: 180, damping: 16 }}
          />

          {/* === RIGHT EAR === */}
          <motion.ellipse
            cx="52"
            cy="13"
            rx="5"
            ry="16"
            fill="#FFFFFF"
            style={{ transformOrigin: '52 26' }}
            animate={reducedMotion ? {} : { rotate: rightEarAngle }}
            transition={{ type: 'spring', stiffness: 180, damping: 16 }}
          />
          {/* Right inner ear */}
          <motion.ellipse
            cx="52"
            cy="13"
            rx="3"
            ry="12.5"
            fill="#FFB6C1"
            style={{ transformOrigin: '52 26' }}
            animate={reducedMotion ? {} : { rotate: rightEarAngle }}
            transition={{ type: 'spring', stiffness: 180, damping: 16 }}
          />

          {/* === FACE === */}
          <ellipse cx="35" cy="37" rx="13" ry="11" fill="#FFFFFF" />

          {/* Cheek fluff left */}
          <ellipse cx="23" cy="39" rx="4.5" ry="3.5" fill="#FFFFFF" />
          {/* Cheek fluff right */}
          <ellipse cx="47" cy="39" rx="4.5" ry="3.5" fill="#FFFFFF" />

          {/* === LEFT EYE === */}
          <g>
            <motion.circle
              animate={
                isBlinking || isSleeping
                  ? { cy: 34, rx: 5, ry: 0 }
                  : { cy: 34, rx: 5, ry: 5 }
              }
              transition={{ duration: 0.08 }}
              cx="28"
              r="5"
              fill="white"
            />
            {!isBlinking && !isSleeping && (
              <>
                <circle cx={28 + pupilPos.lx} cy={34 + pupilPos.ly} r="3" fill="#2D3748" />
                <circle cx={29 + pupilPos.lx * 0.4} cy={33 + pupilPos.ly * 0.4} r="1.2" fill="white" opacity="0.9" />
              </>
            )}
            {isSleeping && (
              <path d="M24 34 Q28 31 32 34" fill="none" stroke="#2D3748" strokeWidth="1.3" strokeLinecap="round" />
            )}
          </g>

          {/* === RIGHT EYE === */}
          <g>
            <motion.circle
              animate={
                isBlinking || isSleeping
                  ? { cy: 34, rx: 5, ry: 0 }
                  : { cy: 34, rx: 5, ry: 5 }
              }
              transition={{ duration: 0.08 }}
              cx="42"
              r="5"
              fill="white"
            />
            {!isBlinking && !isSleeping && (
              <>
                <circle cx={42 + pupilPos.rx} cy={34 + pupilPos.ry} r="3" fill="#2D3748" />
                <circle cx={43 + pupilPos.rx * 0.4} cy={33 + pupilPos.ry * 0.4} r="1.2" fill="white" opacity="0.9" />
              </>
            )}
            {isSleeping && (
              <path d="M38 34 Q42 31 46 34" fill="none" stroke="#2D3748" strokeWidth="1.3" strokeLinecap="round" />
            )}
          </g>

          {/* === NOSE (twitchy bunny nose) === */}
          <motion.ellipse
            cx="35"
            cy="39.5"
            rx="2.5"
            ry="1.8"
            fill="#FF6B6B"
            animate={
              !reducedMotion && !isSleeping
                ? { scaleY: [1, 0.85, 1], scaleX: [1, 1.08, 1] }
                : {}
            }
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}              style={{ transformOrigin: '35 39.5' }}
          />

          {/* === MOUTH === */}
          {/* Center line */}
          <line x1="35" y1="41.5" x2="35" y2="43.5" stroke="#A0886E" strokeWidth="0.8" />
          {/* Left curve */}
          <path d="M31 43 Q33 45 35 43.5" fill="none" stroke="#A0886E" strokeWidth="0.8" strokeLinecap="round" />
          {/* Right curve */}
          <path d="M39 43 Q37 45 35 43.5" fill="none" stroke="#A0886E" strokeWidth="0.8" strokeLinecap="round" />

          {/* === BUCK TEETH === */}
          <rect x="33.5" y="43.5" width="1.5" height="2.5" rx="0.5" fill="white" />
          <rect x="35" y="43.5" width="1.5" height="2.5" rx="0.5" fill="white" />
          {/* Tooth line */}
          <line x1="33.5" y1="44" x2="36.5" y2="44" stroke="#E0D5C0" strokeWidth="0.3" />

          {/* === BLUSH === */}
          <ellipse cx="23" cy="39" rx="3" ry="2" fill="#FF9E9E" opacity="0.3" />
          <ellipse cx="47" cy="39" rx="3" ry="2" fill="#FF9E9E" opacity="0.3" />

          {/* === WHISKERS (left) === */}
          <line x1="24" y1="38" x2="9" y2="35" stroke="#A0886E" strokeWidth="0.6" opacity="0.4" />
          <line x1="24" y1="40" x2="8" y2="41" stroke="#A0886E" strokeWidth="0.6" opacity="0.4" />
          {/* Whiskers (right) */}
          <line x1="46" y1="38" x2="61" y2="35" stroke="#A0886E" strokeWidth="0.6" opacity="0.4" />
          <line x1="46" y1="40" x2="62" y2="41" stroke="#A0886E" strokeWidth="0.6" opacity="0.4" />
        </svg>

        {/* Sleep Z's */}
        <AnimatePresence>
          {isSleeping && !reducedMotion && (
            <>
              <motion.span
                key="z1"
                initial={{ opacity: 0, x: 5, y: 5 }}
                animate={{ opacity: [0, 1, 0], x: [5, 15], y: [5, -10] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                className="absolute -top-2 -right-4 text-xs font-bold text-accent"
                style={{ textShadow: '0 0 6px rgba(0,247,255,0.5)' }}
              >
                z
              </motion.span>
              <motion.span
                key="z2"
                initial={{ opacity: 0, x: 10, y: 0 }}
                animate={{ opacity: [0, 1, 0], x: [10, 22], y: [0, -18] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                className="absolute -top-4 -right-2 text-sm font-bold text-accent"
                style={{ textShadow: '0 0 8px rgba(0,247,255,0.5)' }}
              >
                z
              </motion.span>
              <motion.span
                key="z3"
                initial={{ opacity: 0, x: 15, y: -5 }}
                animate={{ opacity: [0, 1, 0], x: [15, 30], y: [-5, -25] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.8 }}
                className="absolute -top-6 right-0 text-base font-bold text-accent"
                style={{ textShadow: '0 0 10px rgba(0,247,255,0.5)' }}
              >
                z
              </motion.span>
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
