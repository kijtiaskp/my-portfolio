"use client"

import { motion } from "framer-motion"
import { Calendar, MapPin, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { AnimatedSection } from "@/components/animated-section"
import { GlitchText } from "@/components/glitch-text"
import { HighlightKeywords } from "@/components/highlight-keywords"
import { experienceData } from "@/data/portfolio-data"
import { createSkillColorMap, getTechBadgeColor } from "@/utils/portfolio-utils"

export const ExperienceSection = () => {
  const skillColorMap = createSkillColorMap()

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
            <GlitchText>| grep -E "^[0-9]"</GlitchText>
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
                <div
                  key={index}
                  className={`relative flex items-center w-full mb-8 ${
                    job.side === "left" ? "md:justify-start" : "md:justify-end"
                  }`}
                >
                  <motion.div
                    className="absolute left-[-8px] md:left-[49.4%] transform -translate-x-1/2 z-10"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="relative flex items-center justify-center">
                      <div
                        className={`w-4 h-4 ${
                          job.current ? "bg-green-400 animate-pulse" : "bg-green-500"
                        } rounded-full shadow-lg`}
                      ></div>

                      <div
                        className={`hidden md:block absolute whitespace-nowrap text-xs font-semibold text-green-300 ${
                          job.side === "left" ? "left-6" : "right-6"
                        }`}
                      >
                        <GlitchText>{`${job.period} (${job.duration})`}</GlitchText>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className={`bg-black/60 backdrop-blur-sm border border-green-400/20 p-4 rounded-lg ml-8 md:ml-0 ${
                      job.side === "left" ? "md:mr-auto md:ml-8" : "md:ml-auto md:mr-8"
                    } w-full md:w-5/12 shadow-lg hover:border-green-400/40 transition-all duration-300 relative overflow-hidden group`}
                    initial={{ opacity: 0, x: job.side === "left" ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="text-green-400 font-semibold font-mono">
                            <GlitchText>{job.title}</GlitchText>
                          </h4>
                          <div className="text-lime-300 text-sm flex items-center gap-1 group">
                            <span className="hover:underline flex items-center gap-1 font-mono">
                              <GlitchText>{job.company}</GlitchText>
                              <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </span>
                          </div>
                        </div>
                        {job.current && (
                          <span className="text-xs bg-green-400/20 text-green-400 px-2 py-1 rounded border border-green-400/30 font-mono animate-pulse">
                            <GlitchText>Current</GlitchText>
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-3 text-xs text-green-300/70 mb-3 font-mono">
                        <span className="flex md:hidden items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <GlitchText>{`${job.period} (${job.duration})`}</GlitchText>
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <GlitchText>{job.location}</GlitchText>
                        </span>
                      </div>

                      <p className="text-sm mb-3 text-green-300 leading-relaxed font-mono">
                        <HighlightKeywords text={job.description} keywordMap={skillColorMap} />
                      </p>

                      <div className="flex flex-wrap gap-2 mt-3">
                        {job.technologies.map((tech) => {
                          const { bgColor, textColor, borderColor } = getTechBadgeColor(tech)
                          return (
                            <Badge
                              key={tech}
                              variant="secondary"
                              className={`${bgColor} ${textColor} border ${borderColor} font-mono hover:bg-green-400/20 transition-colors text-xs`}
                            >
                              <GlitchText>{tech}</GlitchText>
                            </Badge>
                          )
                        })}
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
} 