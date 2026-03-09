"use client"

import { getTechIcon } from "@/lib/tech-icons"
import { useEffect, useRef } from "react"

interface TechBadgeProps {
  name: string
  size?: "sm" | "md"
}

export default function TechBadge({ name, size = "sm" }: TechBadgeProps) {
  const icon = getTechIcon(name)
  const imgRef = useRef<HTMLImageElement>(null)
  const isSmall = size === "sm"
  const iconSize = isSmall ? 12 : 14

  useEffect(() => {
    if (!icon || !imgRef.current) return
    // Fetch SVG, colorize, and set as data URI
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

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-apple-tertiary bg-white/[0.04] border border-white/[0.04] rounded-full hover:bg-white/[0.08] hover:text-apple-secondary hover:border-white/[0.08] transition-all duration-200 ${
        isSmall ? "px-2.5 py-1 text-[11px]" : "px-3 py-1.5 text-xs"
      }`}
    >
      {icon && (
        <img
          ref={imgRef}
          alt=""
          width={iconSize}
          height={iconSize}
          className="shrink-0"
        />
      )}
      {name}
    </span>
  )
}
