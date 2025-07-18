"use client"

import dynamic from "next/dynamic"
import { Suspense } from "react"
import { MatrixRain } from "@/components/matrix-rain"
import { ScanLines } from "@/components/scan-lines"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/sections/hero-section"

// Lazy load non-critical sections for better initial page load performance
const AboutSection = dynamic(() => import("@/components/sections/about-section").then(mod => ({ default: mod.AboutSection })), {
  loading: () => <div className="min-h-screen flex items-center justify-center text-green-400">Loading...</div>
})

const SkillsSection = dynamic(() => import("@/components/sections/skills-section").then(mod => ({ default: mod.SkillsSection })), {
  loading: () => <div className="min-h-screen flex items-center justify-center text-green-400">Loading...</div>
})

const ProjectsSection = dynamic(() => import("@/components/sections/projects-section").then(mod => ({ default: mod.ProjectsSection })), {
  loading: () => <div className="min-h-screen flex items-center justify-center text-green-400">Loading...</div>
})

const ExperienceSection = dynamic(() => import("@/components/sections/experience-section").then(mod => ({ default: mod.ExperienceSection })), {
  loading: () => <div className="min-h-screen flex items-center justify-center text-green-400">Loading...</div>
})

const ContactSection = dynamic(() => import("@/components/sections/contact-section").then(mod => ({ default: mod.ContactSection })), {
  loading: () => <div className="min-h-screen flex items-center justify-center text-green-400">Loading...</div>
})

const Footer = dynamic(() => import("@/components/footer").then(mod => ({ default: mod.Footer })), {
  loading: () => <div className="h-32 flex items-center justify-center text-green-400">Loading...</div>
})

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-black text-green-400 font-mono relative overflow-hidden">
      <MatrixRain />
      <ScanLines />

      {/* Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-10">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,255,0,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,255,0,0.08) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      {/* Navigation - Keep this loaded immediately */}
      <Navigation />

      {/* Hero Section - Critical content, load immediately */}
      <HeroSection />

      {/* Lazy loaded sections wrapped in Suspense for better UX */}
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-green-400">Loading sections...</div>}>
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
        <Footer />
      </Suspense>
    </div>
  )
}
