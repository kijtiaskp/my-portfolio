"use client"

import { useState, useEffect } from "react"
import { navItems } from "@/data/resume"

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/70 backdrop-blur-2xl backdrop-saturate-150 border-b border-white/[0.04]"
          : ""
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 h-12 flex items-center justify-between">
        <a
          href="#"
          className="text-sm font-semibold tracking-tight text-apple-text/90 hover:text-white transition-colors"
        >
          <span className="font-mono">&lt;kijtiaskp/&gt;</span>
        </a>

        <ul className="hidden md:flex items-center gap-7">
          {navItems.map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className="text-xs text-apple-secondary hover:text-apple-text transition-colors duration-300"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden p-2 -mr-2 text-apple-secondary hover:text-apple-text transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            {open ? (
              <path d="M3 3l10 10M13 3L3 13" />
            ) : (
              <path d="M1 4h14M1 8h14M1 12h14" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-black/90 backdrop-blur-2xl border-t border-white/[0.04] px-6 py-5">
          <ul className="flex flex-col gap-4">
            {navItems.map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="text-sm text-apple-secondary hover:text-apple-text transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}
