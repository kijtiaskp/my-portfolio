"use client"

import { useReveal } from "@/hooks/use-reveal"
import { experiences } from "@/data/resume"

export default function Experience() {
  const { ref, visible } = useReveal()

  return (
    <section id="experience" className="py-32 md:py-40 px-6">
      <div className="divider mb-32" />
      <div ref={ref} className="max-w-3xl mx-auto">
        <p
          className={`text-apple-tertiary text-xs tracking-[0.25em] uppercase mb-6 text-center reveal ${visible ? "visible" : ""}`}
        >
          Experience
        </p>

        <h2
          className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-center text-gradient-hero mb-20 reveal delay-1 ${visible ? "visible" : ""}`}
        >
          Where I&apos;ve made impact.
        </h2>

        <div className="space-y-0">
          {experiences.map((exp, i) => (
            <div
              key={i}
              className={`relative py-10 reveal delay-${Math.min(i + 2, 5)} ${visible ? "visible" : ""}`}
            >
              {i > 0 && <div className="divider absolute top-0 inset-x-0" />}

              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-1">
                <h3 className="text-lg font-semibold text-apple-text">
                  {exp.title}
                </h3>
                {exp.current && (
                  <span className="shrink-0 inline-flex items-center gap-1.5 text-xs text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Present
                  </span>
                )}
              </div>

              <p className="text-sm text-apple-tertiary">
                {exp.company}
              </p>
              <p className="text-xs text-apple-tertiary/60 mt-1">
                {exp.period} &middot; {exp.duration} &middot; {exp.location}
              </p>

              <p className="mt-4 text-sm text-apple-secondary leading-relaxed">
                {exp.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs text-apple-secondary bg-white/[0.04] border border-white/[0.06] rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
