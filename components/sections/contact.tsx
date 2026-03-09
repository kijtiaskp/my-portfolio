"use client"

import { useReveal } from "@/hooks/use-reveal"
import { profile, socials } from "@/data/resume"

const links = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/[^+\d]/g, "")}` },
  ...socials.map((s) => ({
    label: s.label,
    value: s.href.replace("https://", ""),
    href: s.href,
  })),
  { label: "Location", value: profile.location, href: null as string | null },
]

export default function Contact() {
  const { ref, visible } = useReveal()

  return (
    <section id="contact" className="py-32 md:py-40 px-6">
      <div className="divider mb-32" />
      <div ref={ref} className="max-w-3xl mx-auto text-center">
        <p
          className={`text-apple-tertiary text-xs tracking-[0.25em] uppercase mb-6 reveal ${visible ? "visible" : ""}`}
        >
          Contact
        </p>

        <h2
          className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gradient-hero mb-8 reveal delay-1 ${visible ? "visible" : ""}`}
        >
          Let&apos;s build something
          <br className="hidden sm:block" />
          {" "}together.
        </h2>

        <p
          className={`text-apple-secondary text-lg mb-16 reveal delay-2 ${visible ? "visible" : ""}`}
        >
          I&apos;m open to new opportunities and interesting projects.
        </p>

        <div
          className={`inline-block text-left p-8 md:p-10 rounded-2xl bg-apple-card border border-white/[0.04] glow reveal delay-3 ${visible ? "visible" : ""}`}
        >
          <div className="space-y-4">
            {links.map((link) => (
              <div key={link.label} className="flex items-baseline gap-6">
                <span className="w-16 text-xs text-apple-tertiary shrink-0">
                  {link.label}
                </span>
                {link.href ? (
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-sm text-apple-secondary hover:text-apple-text transition-colors duration-300"
                  >
                    {link.value}
                  </a>
                ) : (
                  <span className="text-sm text-apple-secondary">
                    {link.value}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
