"use client"

import { useEffect, useState } from "react"
import { GlitchText } from "@/components/glitch-text"

interface HighlightKeywordsProps {
  text: string
  keywordMap: Record<string, string>
}

// Helper component to highlight keywords
export const HighlightKeywords = ({ text, keywordMap }: HighlightKeywordsProps) => {
  const [keywordsRegex, setKeywordsRegex] = useState<RegExp | null>(null)

  useEffect(() => {
    const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    const escapedKeywords = Object.keys(keywordMap).map(escapeRegExp)
    if (escapedKeywords.length === 0) {
      setKeywordsRegex(null)
      return
    }
    // Create a single regex to find all keywords
    setKeywordsRegex(new RegExp(`\\b(${escapedKeywords.join("|")})\\b`, "gi"))
  }, [keywordMap])

  if (!text) return null

  // If there are no keywords, just return the text
  if (!keywordsRegex) {
    return <GlitchText>{text}</GlitchText>
  }

  const parts = text.split(keywordsRegex)

  return (
    <>
      {parts.map((part, index) => {
        // The split can result in `undefined` if a capture group in the regex doesn't match.
        // This check adds robustness and prevents the app from crashing.
        if (part === undefined) {
          return null
        }

        const lowerPart = part.toLowerCase()
        // Check if the current part is a keyword (case-insensitive)
        const colorClass = keywordMap[lowerPart]

        if (colorClass) {
          // It's a keyword, apply the color
          return (
            <span key={index} className={`${colorClass} font-semibold`}>
              <GlitchText>{part}</GlitchText>
            </span>
          )
        }

        // It's a regular part of the string
        return <GlitchText key={index}>{part}</GlitchText>
      })}
    </>
  )
} 