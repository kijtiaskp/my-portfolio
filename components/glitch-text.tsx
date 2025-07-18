"use client"

import { useGlitchText } from "@/hooks/use-glitch-text"
import { useGlitchColor, GlitchColorType } from "@/components/glitch-color-provider"
import { useInView } from "framer-motion"
import { useRef } from "react"

interface GlitchTextProps {
  children: string
  className?: string
  delay?: number
  persistent?: boolean
  inverse?: boolean
  color?: GlitchColorType
}

export function GlitchText({ children, className = "", delay = 0, persistent = false, inverse = false, color }: GlitchTextProps) {
  const ref = useRef(null)
  // By setting `once` to `false`, the `isInView` status will update every time
  // the component enters or leaves the viewport, re-triggering the animation.
  const isInView = useInView(ref, { once: true })
  const { displayText, isGlitching } = useGlitchText(children, isInView, persistent)
  const { getColorClass } = useGlitchColor()

  // Get the color class to use
  const colorClass = color 
    ? getColorClass(color)
    : inverse 
      ? getColorClass('inverse')
      : getColorClass()

  return (
    <span
      ref={ref}
      className={`${className} ${isGlitching ? `animate-pulse ${colorClass}` : ""}`}
      style={{
        animationDelay: `${delay}ms`
      }}
    >
      {displayText}
    </span>
  )
}
