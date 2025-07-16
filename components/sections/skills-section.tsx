"use client"

import { motion } from "framer-motion"
import { Folder } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"
import { GlitchText } from "@/components/glitch-text"
import { skillsData, fadeInUp, staggerContainer } from "@/data/portfolio-data"

export const SkillsSection = () => {
  return (
    <AnimatedSection
      id="skills"
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
            <GlitchText>find /usr/local/bin</GlitchText>
          </span>
          <span className="text-green-500">
            <GlitchText>-type f -executable</GlitchText>
          </span>
        </motion.div>

        <div>
          <motion.h3
            className="text-xl font-semibold text-center lg:text-left mb-6 text-green-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <GlitchText persistent>INSTALLED PACKAGES</GlitchText>
          </motion.h3>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 w-full overflow-hidden"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {skillsData.map((category) => (
              <motion.div
                key={category.title}
                className="bg-black/50 border border-green-400/20 p-3 rounded-md shadow-lg relative overflow-hidden"
                variants={fadeInUp}
                whileHover={{
                  boxShadow: "0 10px 25px rgba(0, 255, 0, 0.1)",
                  borderColor: "rgba(0, 255, 0, 0.4)",
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 font-mono text-sm">
                  <div className={`flex items-center gap-2 mb-2 ${category.color}`}>
                    <Folder className="w-4 h-4 text-green-400" />
                    <span className="font-semibold">
                      <GlitchText>{`${category.title.toLowerCase()}/`}</GlitchText>
                    </span>
                  </div>

                  <div className="ml-4 space-y-1">
                    {category.skills.map((skill: string, skillIndex: number) => (
                      <div key={skill} className="flex items-start gap-2 group">
                        <span className="text-green-400 flex-shrink-0 mt-0.5">
                          {skillIndex === category.skills.length - 1 ? "└──" : "├──"}
                        </span>
                        <div className="flex-1 min-w-0">
                          <span className="text-green-300 group-hover:text-green-200 transition-colors cursor-pointer text-xs break-words">
                            <GlitchText>{skill}</GlitchText>
                            <span className="text-green-400/50">
                              <GlitchText>.exe</GlitchText>
                            </span>
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  )
} 