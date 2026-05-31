'use client'

import { useEffect, useRef, useState } from 'react'

interface TypewriterProps {
  text: string | string[]
  speed?: number
  delay?: number
  className?: string
  startOnView?: boolean
  triggerOnce?: boolean
}

export default function Typewriter({
  text,
  speed = 60,
  delay = 0,
  className = '',
  startOnView = false,
  triggerOnce = true,
}: TypewriterProps) {
  const textValue = Array.isArray(text) ? text.join('\n') : text
  const [displayedText, setDisplayedText] = useState('')
  const [started, setStarted] = useState(!startOnView)
  const ref = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    if (!startOnView) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          if (triggerOnce) {
            observer.disconnect()
          }
        }
      },
      { threshold: 0.2 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [startOnView, triggerOnce])

  useEffect(() => {
    if (!started) {
      return
    }

    let currentIndex = 0
    let typingTimer: ReturnType<typeof setTimeout>
    let startTimer: ReturnType<typeof setTimeout>

    const typeNext = () => {
      if (currentIndex <= textValue.length) {
        setDisplayedText(textValue.slice(0, currentIndex))
        currentIndex += 1
        typingTimer = setTimeout(typeNext, speed)
      }
    }

    startTimer = setTimeout(typeNext, delay)

    return () => {
      clearTimeout(startTimer)
      clearTimeout(typingTimer)
    }
  }, [started, textValue, speed, delay])

  const preserveNewlines = textValue.includes('\n')

  return (
    <span
      ref={ref}
      className={`inline-block overflow-hidden ${className}`}
      style={preserveNewlines ? { whiteSpace: 'pre-line' } : undefined}
    >
      {displayedText}
      <span className="typewriter-cursor">|</span>
    </span>
  )
}
