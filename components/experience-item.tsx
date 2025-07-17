"use client"

import React from "react"
import { motion } from "framer-motion"
import { Calendar, MapPin, ExternalLink } from "lucide-react"
import { GlitchText } from "@/components/glitch-text"
import { HighlightKeywords } from "@/components/highlight-keywords"

interface ExperienceItemProps {
  job: {
    title: string
    company: string
    period: string
    duration: string
    location: string
    description: string
    current?: boolean
    side: "left" | "right"
  }
  index: number
}

export const ExperienceItem = ({ job, index }: ExperienceItemProps) => {
  return (
    <div
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
            <HighlightKeywords text={job.description} />
          </p>
        </div>
      </motion.div>
    </div>
  )
}
