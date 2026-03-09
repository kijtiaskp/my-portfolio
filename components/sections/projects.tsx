"use client"

import { useReveal } from "@/hooks/use-reveal"
import { projects } from "@/data/resume"
import TechBadge from "@/components/tech-badge"

const statusStyle: Record<string, string> = {
  active: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  completed: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  developing: "text-amber-400 bg-amber-400/10 border-amber-400/20",
}

const statusLabel: Record<string, string> = {
  active: "Active",
  completed: "Completed",
  developing: "In Development",
}

export default function Projects() {
  const { ref, visible } = useReveal()

  return (
    <section id="projects" className="relative py-32 md:py-40 px-6 overflow-hidden">
      <div className="divider mb-32" />

      <div className="orb w-[500px] h-[500px] bg-amber-500/[0.02] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2" />
      <div className="absolute inset-0 dot-grid opacity-20" />

      <div ref={ref} className="max-w-5xl mx-auto relative">
        <div className="text-center">
          <p
            className={`text-apple-tertiary text-xs tracking-[0.25em] uppercase mb-6 reveal ${visible ? "visible" : ""}`}
          >
            Projects
          </p>

          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gradient-hero mb-6 reveal delay-1 ${visible ? "visible" : ""}`}
          >
            What I&apos;ve built.
          </h2>

          <p
            className={`text-apple-secondary max-w-lg mx-auto mb-20 reveal delay-2 ${visible ? "visible" : ""}`}
          >
            Side projects and experiments I&apos;m working on outside of office hours.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className={`group gradient-border rounded-2xl bg-apple-card overflow-hidden glow-hover reveal delay-${Math.min(i + 3, 5)} ${visible ? "visible" : ""}`}
            >
              {/* Top accent line */}
              {project.featured && (
                <div className="h-[1px] bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />
              )}

              <div className="p-8">
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div>
                    {project.featured && (
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-1 h-1 rounded-full bg-blue-400" />
                        <p className="text-[10px] text-blue-400 tracking-[0.2em] uppercase font-medium">
                          Featured
                        </p>
                      </div>
                    )}
                    <h3 className="text-xl font-semibold text-apple-text">
                      {project.title}
                    </h3>
                  </div>
                  <span
                    className={`shrink-0 px-3 py-1 text-[10px] font-medium rounded-full border ${statusStyle[project.status]}`}
                  >
                    {statusLabel[project.status]}
                  </span>
                </div>

                <p className="text-sm text-apple-secondary leading-relaxed mb-6">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <TechBadge key={tech} name={tech} />
                  ))}
                </div>

                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-6 text-sm text-apple-secondary hover:text-apple-text transition-colors group/link"
                  >
                    View project
                    <span className="transition-transform duration-300 group-hover/link:translate-x-1">
                      &rarr;
                    </span>
                  </a>
                )}
              </div>
            </div>
          ))}

          {/* Coming soon card */}
          <div
            className={`relative flex flex-col items-center justify-center p-8 rounded-2xl border border-dashed border-white/[0.06] min-h-[280px] reveal delay-4 ${visible ? "visible" : ""}`}
          >
            <div className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-4">
              <span className="text-xl text-apple-tertiary/30">+</span>
            </div>
            <p className="text-sm text-apple-tertiary/40 mb-1">
              More coming soon
            </p>
            <p className="text-xs text-apple-tertiary/25">
              Currently building in my spare time
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
