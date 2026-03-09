"use client"

import { useReveal } from "@/hooks/use-reveal"
import { education } from "@/data/resume"

const highlights = [
  { value: "5+", label: "Years of Experience", icon: "Y" },
  { value: "4", label: "Companies", icon: "C" },
  { value: "10+", label: "Tech Stacks", icon: "T" },
]

export default function About() {
  const { ref, visible } = useReveal()

  return (
    <section id="about" className="relative py-32 md:py-40 px-6 overflow-hidden">
      <div className="divider mb-32" />

      {/* Background decoration */}
      <div className="orb w-[400px] h-[400px] bg-indigo-500/[0.03] -right-40 top-1/4" />

      <div ref={ref} className="max-w-5xl mx-auto relative">
        <div className="max-w-3xl mx-auto text-center">
          <p
            className={`text-apple-tertiary text-xs tracking-[0.25em] uppercase mb-6 reveal ${visible ? "visible" : ""}`}
          >
            About
          </p>

          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight text-gradient-hero reveal delay-1 ${visible ? "visible" : ""}`}
          >
            Adapts fast.
            <br className="hidden sm:block" />
            {" "}Delivers always.
          </h2>

          <p
            className={`mt-8 text-apple-secondary text-lg leading-relaxed reveal delay-2 ${visible ? "visible" : ""}`}
          >
            Full Stack Developer based in Bangkok with experience across
            IT solutions, startups, edtech, and software houses. Every project
            brings a different stack — I adapt and deliver. From CMS platforms
            and e-commerce to queue management and cost dashboards, I ship
            production software that works.
          </p>

          {/* Education badge */}
          <div
            className={`mt-6 inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/[0.06] reveal delay-3 ${visible ? "visible" : ""}`}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-apple-tertiary"
            >
              <path d="M12 3L1 9l11 6 9-4.91V17M5 13.18v4L12 21l7-3.82v-4" />
            </svg>
            <span className="text-sm text-apple-secondary">
              {education.degree} in {education.field}
            </span>
            <span className="text-xs text-apple-tertiary">
              {education.school}
            </span>
          </div>
        </div>

        <div
          className={`mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 reveal delay-4 ${visible ? "visible" : ""}`}
        >
          {highlights.map((h) => (
            <div
              key={h.label}
              className="gradient-border text-center py-10 rounded-2xl bg-apple-card glow-hover"
            >
              <p className="text-5xl md:text-6xl font-bold text-gradient-hero">
                {h.value}
              </p>
              <p className="mt-3 text-sm text-apple-secondary">{h.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
