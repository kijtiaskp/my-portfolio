"use client"

import { useReveal } from "@/hooks/use-reveal"
import { projects } from "@/data/resume"

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
    <section id="projects" className="py-32 md:py-40 px-6">
      <div className="divider mb-32" />
      <div ref={ref} className="max-w-5xl mx-auto">
        <div className="text-center">
          <p
            className={`text-apple-tertiary text-xs tracking-[0.25em] uppercase mb-6 reveal ${visible ? "visible" : ""}`}
          >
            Projects
          </p>

          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gradient-hero mb-20 reveal delay-1 ${visible ? "visible" : ""}`}
          >
            What I&apos;ve built.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className={`group relative p-8 rounded-2xl bg-apple-card border border-white/[0.04] glow hover:border-white/[0.08] transition-all duration-500 reveal delay-${Math.min(i + 2, 5)} ${visible ? "visible" : ""}`}
            >
              {project.featured && (
                <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />
              )}

              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  {project.featured && (
                    <p className="text-[10px] text-blue-400 tracking-[0.2em] uppercase mb-2">
                      Featured
                    </p>
                  )}
                  <h3 className="text-lg font-semibold text-apple-text">
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
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs text-apple-tertiary bg-white/[0.04] rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-6 text-sm text-apple-secondary hover:text-apple-text transition-colors"
                >
                  View project &rarr;
                </a>
              )}
            </div>
          ))}

          {/* More coming card */}
          <div
            className={`flex flex-col items-center justify-center p-8 rounded-2xl border border-dashed border-white/[0.06] min-h-[250px] reveal delay-3 ${visible ? "visible" : ""}`}
          >
            <span className="text-3xl text-apple-tertiary/30 mb-3">+</span>
            <p className="text-sm text-apple-tertiary/40">More coming soon</p>
          </div>
        </div>
      </div>
    </section>
  )
}
