"use client"

import React, { useState, useEffect, useRef } from "react"
import { useGlitchText } from "@/hooks/use-glitch-text"
import { useGlitchColor } from "./glitch-color-provider"

interface DynamicGlitchTextProps {
  defaultText?: string
  alternateText?: string
  interval?: number
  className?: string
}

export const DynamicGlitchText = ({
  defaultText = "Welcome to kijtisak.p's development environment",
  alternateText = "Wake up, it's a simulation",
  interval = 5000,
  className = ""
}: DynamicGlitchTextProps) => {
  const [currentText, setCurrentText] = useState(defaultText)
  const [shouldTriggerGlitch, setShouldTriggerGlitch] = useState(true)
  const { displayText, isGlitching } = useGlitchText(currentText, shouldTriggerGlitch, false)
  const { getColorClass } = useGlitchColor()
  const ref = useRef(null)

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Start glitch
      setShouldTriggerGlitch(true)

      // Change text during glitch (after 200ms when glitch is active)
      setTimeout(() => {
        setCurrentText(prev =>
          prev === defaultText ? alternateText : defaultText
        )
      }, 200)

      // Reset trigger after glitch completes (after 800ms)
      setTimeout(() => {
        setShouldTriggerGlitch(false)
      }, 800)

    }, interval)

    return () => clearInterval(intervalId)
  }, [defaultText, alternateText, interval])

  return (
    <span
      ref={ref}
      className={`${className} ${isGlitching ? `animate-pulse ${getColorClass()}` : ""}`}
    >
      {displayText}
    </span>
  )
} 