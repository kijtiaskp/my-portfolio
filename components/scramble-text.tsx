"use client"

import { useScrambleText } from "@/hooks/use-scramble-text"

interface ScrambleTextProps {
  text: string
  className?: string
}

export default function ScrambleText({ text, className }: ScrambleTextProps) {
  const display = useScrambleText(text)

  return (
    <span className={className}>
      {display}
    </span>
  )
}
