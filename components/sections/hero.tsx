"use client"

import { useEffect, useState } from "react"
import { profile, socials, subtitleTexts } from "@/data/resume"
import TechIcon from "@/components/tech-icon"
import ScrambleText from "@/components/scramble-text"

const heroTechs = ["React", "TypeScript", "Go", "Vue.js", "Next.js", "Nuxt.js", ".NET Core", "AWS"]

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
      {/* Ambient orbs */}
      <div className="orb w-[500px] h-[500px] bg-blue-500/[0.04] top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div className="orb w-[300px] h-[300px] bg-purple-500/[0.03] bottom-1/4 right-1/4" />
      <div className="orb w-[200px] h-[200px] bg-cyan-500/[0.02] top-1/3 left-1/4" />

      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-40" />

      {/* Radial fade at edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#000000_70%)]" />

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        {/* Status badge */}
        <div
          className={`transition-all duration-1000 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.06] mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="text-xs text-apple-secondary">
              Available for opportunities
            </span>
          </div>
        </div>

        <p
          className={`text-apple-secondary text-sm tracking-[0.2em] uppercase mb-6 transition-all duration-1000 delay-100 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {profile.title}
        </p>

        <div
          className={`inline-block transition-all duration-1000 delay-200 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="border-glow-wrapper relative inline-block rounded-2xl p-[1px]">
            <div className="relative rounded-2xl bg-apple-bg px-8 py-6 sm:px-12 sm:py-8">
              <h1 className="text-gradient-hero text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] font-bold tracking-tight leading-[0.95]">
                {profile.name.split(" ")[0]}
                <br />
                <span className="text-shine">
                  {profile.name.split(" ").slice(1).join(" ")}
                </span>
              </h1>
            </div>
          </div>
        </div>

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
          <ScrambleText
            key={roleIndex}
            text={subtitleTexts[roleIndex]}
            className="inline-block text-sm tracking-widest uppercase text-[#6e6e73]"
          />
        </div>

        <div
          className={`mt-10 flex flex-wrap items-center justify-center gap-4 transition-all duration-1000 delay-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <a
            href="#contact"
            className="group px-7 py-3 bg-white text-black font-medium rounded-full hover:bg-white/90 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-all duration-300"
          >
            Get in touch
            <span className="inline-block ml-1.5 transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </a>
          <a
            href={socials[0].href}
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3 border border-white/[0.12] text-apple-text rounded-full hover:bg-white/[0.06] hover:border-white/[0.2] transition-all duration-300"
          >
            GitHub
          </a>
        </div>

        {/* Tech marquee */}
        <div
          className={`mt-20 transition-all duration-1000 delay-[900ms] ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="text-[10px] text-apple-tertiary/40 tracking-[0.3em] uppercase mb-5">
            Tech I work with
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs text-apple-tertiary/60">
            {heroTechs.map((tech) => (
              <span key={tech} className="flex items-center gap-1.5 hover:text-apple-secondary transition-colors duration-300">
                <TechIcon name={tech} size={14} />
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 transition-all duration-1000 delay-[1100ms] ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="text-[10px] text-apple-tertiary/40 tracking-[0.2em] uppercase">
          Scroll
        </span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-apple-secondary/30 to-transparent" />
      </div>
    </section>
  )
}
