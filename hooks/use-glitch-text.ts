"use client"

import { useState, useEffect, useRef } from "react"

const GLITCH_CHARS = "!<>-_\\/[]{}—=+*^?#________"

export const useGlitchText = (text: any, trigger = true, persistent = false) => {
  const safeText = String(text ?? "")
  const [displayText, setDisplayText] = useState(safeText)
  const [isGlitching, setIsGlitching] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const persistentIntervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setDisplayText(safeText)

    const cleanup = () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      if (persistentIntervalRef.current) clearInterval(persistentIntervalRef.current)
    }
    cleanup()

    if (!trigger) {
      setIsGlitching(false)
      return
    }

    const startGlitch = (duration = 10, onComplete?: () => void) => {
      setIsGlitching(true)
      let glitchIterations = 0

      intervalRef.current = setInterval(() => {
        if (glitchIterations >= duration) {
          if (intervalRef.current) clearInterval(intervalRef.current)
          setDisplayText(safeText)
          setIsGlitching(false)
          if (onComplete) onComplete()
          return
        }

        setDisplayText(
          safeText
            .split("")
            .map((char) =>
              char !== " " && Math.random() > 0.7
                ? GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
                : char,
            )
            .join(""),
        )
        glitchIterations++
      }, 50)
    }

    timeoutRef.current = setTimeout(() => {
      startGlitch(10, () => {
        if (persistent) {
          persistentIntervalRef.current = setInterval(() => {
            if (Math.random() < 0.15) {
              startGlitch(5) // A shorter, random glitch
            }
          }, 2500)
        }
      })
    }, 100)

    return cleanup
  }, [safeText, trigger, persistent])

  return { displayText, isGlitching }
}
