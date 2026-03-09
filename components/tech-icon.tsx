"use client"

import { getTechIcon } from "@/lib/tech-icons"
import { useEffect, useRef } from "react"

interface TechIconProps {
  name: string
  size?: number
}

export default function TechIcon({ name, size = 14 }: TechIconProps) {
  const icon = getTechIcon(name)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (!icon || !imgRef.current) return
    fetch(icon.url)
      .then((r) => r.text())
      .then((svg) => {
        const colored = svg.replace(/fill="[^"]*"/g, "").replace("<svg", `<svg fill="${icon.color}"`)
        const blob = new Blob([colored], { type: "image/svg+xml" })
        const url = URL.createObjectURL(blob)
        if (imgRef.current) {
          imgRef.current.src = url
        }
      })
      .catch(() => {})
  }, [icon])

  if (!icon) return null

  return (
    <img ref={imgRef} alt="" width={size} height={size} className="shrink-0" />
  )
}
