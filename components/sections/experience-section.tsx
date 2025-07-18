"use client"

import { motion } from "framer-motion"
import { AnimatedSection } from "@/components/animated-section"
import { GlitchText } from "@/components/glitch-text"
import { ExperienceItem } from "@/components/experience-item"
import { experienceData } from "@/data/portfolio-data"

export const ExperienceSection = () => {

  return (
    <AnimatedSection
      id="experience"
      className="w-full p-8 bg-gradient-to-br from-green-900/20 via-green-800/10 to-green-900/20 rounded-2xl mb-8 md:mb-12 mx-auto max-w-[calc(100vw-2rem)] sm:max-w-[90vw] overflow-hidden relative z-10"
    >
      <div className="container mx-auto max-w-7xl w-full overflow-hidden">
        <motion.div
          className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-green-400/10 text-green-400 mb-4 border border-green-400/20"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <span className="text-green-400">$</span>
          <span className="text-green-300 mx-1">
            <GlitchText>tail -f /var/log/career.log</GlitchText>
          </span>
          <span className="text-green-500">
            <GlitchText>| grep -E &quot;^[0-9]&quot;</GlitchText>
          </span>
        </motion.div>

        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center lg:text-left font-mono"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-green-400">
            <GlitchText persistent>PROCESS HISTORY</GlitchText>
          </span>
        </motion.h2>

        <div className="w-full">
          <div className="mt-8">
            <div className="relative">
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-green-400/20"></div>

              {experienceData.map((job, index) => (
                <ExperienceItem key={index} job={job} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
