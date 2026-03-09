"use client"

import { useReveal } from "@/hooks/use-reveal"
import { profile, socials } from "@/data/resume"

const links = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  {
    label: "Phone",
    value: profile.phone,
    href: `tel:${profile.phone.replace(/[^+\d]/g, "")}`,
  },
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
    <section id="contact" className="relative py-32 md:py-40 px-6 overflow-hidden">
      <div className="divider mb-32" />

      {/* Background */}
      <div className="orb w-[600px] h-[600px] bg-blue-500/[0.03] left-1/2 -translate-x-1/2 bottom-0" />
      <div className="absolute inset-0 dot-grid opacity-15" />

      <div ref={ref} className="max-w-3xl mx-auto text-center relative">
        <p
          className={`text-apple-tertiary text-xs tracking-[0.25em] uppercase mb-6 reveal ${visible ? "visible" : ""}`}
        >
          Contact
        </p>

        <h2
          className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gradient-hero mb-6 reveal delay-1 ${visible ? "visible" : ""}`}
        >
          Let&apos;s build something
          <br className="hidden sm:block" />
          {" "}together.
        </h2>

        <p
          className={`text-apple-secondary text-lg mb-16 reveal delay-2 ${visible ? "visible" : ""}`}
        >
          I&apos;m open to new opportunities and interesting projects.
          <br className="hidden sm:block" />
          Feel free to reach out.
        </p>

        {/* Contact card */}
        <div
          className={`gradient-border inline-block text-left p-8 md:p-10 rounded-2xl bg-apple-card glow reveal delay-3 ${visible ? "visible" : ""}`}
        >
          <div className="space-y-5">
            {links.map((link) => (
              <div key={link.label} className="flex items-center gap-6 group">
                <span className="w-16 text-xs text-apple-tertiary shrink-0 uppercase tracking-wider">
                  {link.label}
                </span>
                {link.href ? (
                  <a
                    href={link.href}
                    target={
                      link.href.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      link.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="text-sm text-apple-secondary hover:text-apple-text transition-colors duration-300 border-b border-transparent hover:border-white/[0.15]"
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

        {/* CTA button */}
        <div
          className={`mt-12 reveal delay-4 ${visible ? "visible" : ""}`}
        >
          <a
            href={`mailto:${profile.email}`}
            className="group inline-flex items-center gap-2 px-8 py-3.5 bg-white text-black font-medium rounded-full hover:bg-white/90 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-all duration-300"
          >
            Send me an email
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
