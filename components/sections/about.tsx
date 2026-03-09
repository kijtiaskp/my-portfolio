"use client"

import { useReveal } from "@/hooks/use-reveal"
import { education } from "@/data/resume"

const highlights = [
  { value: "5+", label: "Years of Experience" },
  { value: "4", label: "Companies" },
  { value: "10+", label: "Tech Stacks" },
]

export default function About() {
  const { ref, visible } = useReveal()

  return (
    <section id="about" className="py-32 md:py-40 px-6">
      <div className="divider mb-32" />
      <div ref={ref} className="max-w-5xl mx-auto">
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

          <p
            className={`mt-4 text-apple-tertiary text-sm reveal delay-2 ${visible ? "visible" : ""}`}
          >
            {education.degree} in {education.field} — {education.school}
          </p>
        </div>

        <div
          className={`mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 reveal delay-3 ${visible ? "visible" : ""}`}
        >
          {highlights.map((h) => (
            <div
              key={h.label}
              className="text-center py-10 rounded-2xl bg-apple-card border border-white/[0.04] glow"
            >
              <p className="text-4xl md:text-5xl font-bold text-gradient-hero">
                {h.value}
              </p>
              <p className="mt-2 text-sm text-apple-secondary">{h.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
