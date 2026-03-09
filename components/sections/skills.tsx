"use client"

import { useReveal } from "@/hooks/use-reveal"
import { skills } from "@/data/resume"
import TechBadge from "@/components/tech-badge"

const categoryIcons: Record<string, string> = {
  Languages: "{ }",
  Frontend: "</>",
  Backend: ">>>",
  "Data & APIs": "[ ]",
  Infrastructure: "$ _",
  Services: ":::",
}

export default function Skills() {
  const { ref, visible } = useReveal()

  return (
    <section id="skills" className="relative py-32 md:py-40 px-6 overflow-hidden">
      <div className="divider mb-32" />

      <div className="orb w-[350px] h-[350px] bg-cyan-500/[0.03] -right-20 bottom-1/4" />

      <div ref={ref} className="max-w-5xl mx-auto relative">
        <div className="text-center">
          <p
            className={`text-apple-tertiary text-xs tracking-[0.25em] uppercase mb-6 reveal ${visible ? "visible" : ""}`}
          >
            Skills
          </p>

          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gradient-hero mb-6 reveal delay-1 ${visible ? "visible" : ""}`}
          >
            Built with the best tools.
          </h2>

          <p
            className={`text-apple-secondary max-w-lg mx-auto mb-20 reveal delay-2 ${visible ? "visible" : ""}`}
          >
            Every project demands different tools. Here&apos;s what I reach for.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((group, i) => (
            <div
              key={group.category}
              className={`gradient-border p-6 rounded-2xl bg-apple-card glow-hover reveal delay-${Math.min(i + 2, 6)} ${visible ? "visible" : ""}`}
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.06] text-apple-tertiary font-mono text-xs">
                  {categoryIcons[group.category] || "..."}
                </span>
                <h3 className="text-sm font-semibold text-apple-text">
                  {group.category}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <TechBadge key={item} name={item} size="md" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
