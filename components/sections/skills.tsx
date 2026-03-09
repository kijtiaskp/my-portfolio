"use client"

import { useReveal } from "@/hooks/use-reveal"
import { skills } from "@/data/resume"

export default function Skills() {
  const { ref, visible } = useReveal()

  return (
    <section id="skills" className="py-32 md:py-40 px-6">
      <div className="divider mb-32" />
      <div ref={ref} className="max-w-5xl mx-auto">
        <div className="text-center">
          <p
            className={`text-apple-tertiary text-xs tracking-[0.25em] uppercase mb-6 reveal ${visible ? "visible" : ""}`}
          >
            Skills
          </p>

          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gradient-hero mb-20 reveal delay-1 ${visible ? "visible" : ""}`}
          >
            Built with the best tools.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((group, i) => (
            <div
              key={group.category}
              className={`p-6 rounded-2xl bg-apple-card border border-white/[0.04] glow reveal delay-${Math.min(i + 2, 5)} ${visible ? "visible" : ""}`}
            >
              <h3 className="text-sm font-semibold text-apple-text mb-4">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 text-xs text-apple-secondary bg-white/[0.04] rounded-lg hover:bg-white/[0.08] hover:text-apple-text transition-colors duration-300"
                  >
                    {item}
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
