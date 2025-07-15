"use client"

import { useGlitchText } from "@/hooks/use-glitch-text"
import { useInView } from "framer-motion"
import { useRef } from "react"

interface GlitchTextProps {
  children: string
  className?: string
  delay?: number
  persistent?: boolean
}

export function GlitchText({ children, className = "", delay = 0, persistent = false }: GlitchTextProps) {
  const ref = useRef(null)
  // By setting `once` to `false`, the `isInView` status will update every time
  // the component enters or leaves the viewport, re-triggering the animation.
  const isInView = useInView(ref, { once: true })
  const { displayText, isGlitching } = useGlitchText(children, isInView, persistent)

  return (
    <span
      ref={ref}
      className={`${className} ${isGlitching ? "animate-pulse glitch-error" : ""}`}
      style={{ 
        animationDelay: `${delay}ms`
      }}
    >
      {displayText}
    </span>
  )
}
