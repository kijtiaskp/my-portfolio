"use client"

import { useEffect, useState } from "react"
import { profile, socials, subtitleTexts } from "@/data/resume"

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setRoleIndex((i) => (i + 1) % subtitleTexts.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-500/[0.03] blur-[120px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <div
          className={`transition-all duration-1000 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-apple-secondary text-sm tracking-[0.2em] uppercase mb-6">
            {profile.title}
          </p>
        </div>

        <h1
          className={`text-gradient-hero text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] font-bold tracking-tight leading-[0.95] transition-all duration-1000 delay-150 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {profile.name.split(" ")[0]}
          <br />
          <span className="text-shine">{profile.name.split(" ").slice(1).join(" ")}</span>
        </h1>

        <div
          className={`mt-8 transition-all duration-1000 delay-300 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-apple-secondary text-lg sm:text-xl max-w-xl mx-auto leading-relaxed">
            {profile.summary}
          </p>
        </div>

        <div
          className={`mt-6 h-7 transition-all duration-1000 delay-500 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
        >
          <span
            key={roleIndex}
            className="inline-block text-apple-tertiary text-sm tracking-widest uppercase animate-[fadeUp_0.5s_ease]"
          >
            {subtitleTexts[roleIndex]}
          </span>
        </div>

        <div
          className={`mt-10 flex flex-wrap items-center justify-center gap-5 text-sm transition-all duration-1000 delay-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <a
            href="#contact"
            className="px-7 py-3 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-all duration-300"
          >
            Get in touch
          </a>
          <a
            href={socials[0].href}
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3 border border-white/[0.15] text-apple-text rounded-full hover:bg-white/[0.06] transition-all duration-300"
          >
            GitHub
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-1000 delay-1000 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="w-[1px] h-10 bg-gradient-to-b from-apple-secondary/40 to-transparent" />
      </div>
    </section>
  )
}
