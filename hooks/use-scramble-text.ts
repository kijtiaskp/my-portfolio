"use client"

import { useEffect, useState, useRef } from "react"

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*<>[]{}/"

export function useScrambleText(text: string, duration = 600) {
  const [display, setDisplay] = useState(text)
  const frameRef = useRef<number>(0)

  useEffect(() => {
    let start: number | null = null
    const len = text.length

    const step = (ts: number) => {
      if (!start) start = ts
      const elapsed = ts - start
      const progress = Math.min(elapsed / duration, 1)
      const revealed = Math.floor(progress * len)

      let result = ""
      for (let i = 0; i < len; i++) {
        if (text[i] === " ") {
          result += " "
        } else if (i < revealed) {
          result += text[i]
        } else {
          result += CHARS[Math.floor(Math.random() * CHARS.length)]
        }
      }

      setDisplay(result)

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(step)
      } else {
        setDisplay(text)
      }
    }

    frameRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frameRef.current)
  }, [text, duration])

  return display
}
