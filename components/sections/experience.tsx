"use client"

import { useReveal } from "@/hooks/use-reveal"
import { experiences } from "@/data/resume"
import TechBadge from "@/components/tech-badge"

export default function Experience() {
  const { ref, visible } = useReveal()

  return (
    <section id="experience" className="relative py-32 md:py-40 px-6 overflow-hidden">
      <div className="divider mb-32" />

      <div className="orb w-[300px] h-[300px] bg-purple-500/[0.03] -left-32 top-1/3" />

      <div ref={ref} className="max-w-3xl mx-auto relative">
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

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[11px] top-6 bottom-6 w-[1px] timeline-line hidden sm:block" />

          <div className="space-y-0">
            {experiences.map((exp, i) => (
              <div
                key={i}
                className={`relative sm:pl-10 py-8 reveal delay-${Math.min(i + 2, 5)} ${visible ? "visible" : ""}`}
              >
                {i > 0 && <div className="divider absolute top-0 inset-x-0 sm:left-10" />}

                {/* Timeline dot */}
                <div className="hidden sm:block absolute left-0 top-10">
                  <div
                    className={`w-[23px] h-[23px] rounded-full border-2 flex items-center justify-center ${
                      exp.current
                        ? "border-emerald-400/60 bg-emerald-400/10"
                        : "border-white/[0.1] bg-apple-bg"
                    }`}
                  >
                    {exp.current && (
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    )}
                    {!exp.current && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white/[0.15]" />
                    )}
                  </div>
                </div>

                {/* Content card */}
                <div className="gradient-border rounded-2xl bg-apple-card p-6 glow-hover">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-1">
                    <h3 className="text-base font-semibold text-apple-text">
                      {exp.title}
                    </h3>
                    <div className="flex items-center gap-2 shrink-0">
                      {exp.current && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-medium text-emerald-400 bg-emerald-400/10 border border-emerald-400/20">
                          Current
                        </span>
                      )}
                      <span className="text-xs text-apple-tertiary">
                        {exp.duration}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-apple-secondary font-medium">
                    {exp.company}
                  </p>
                  <p className="text-xs text-apple-tertiary/60 mt-0.5">
                    {exp.period} &middot; {exp.location}
                  </p>

                  <p className="mt-4 text-sm text-apple-secondary/80 leading-relaxed">
                    {exp.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {exp.technologies.map((tech) => (
                      <TechBadge key={tech} name={tech} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
