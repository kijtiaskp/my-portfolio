"use client"

import React from "react"
import { motion } from "framer-motion"
import { GlitchText } from "@/components/glitch-text"

interface ProfileVisualProps {
  className?: string
}

export const ProfileVisual = ({ className = "" }: ProfileVisualProps) => {
  return (
    <motion.div
      className={`relative mb-8 flex justify-center lg:justify-end ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <div className="relative">
        <motion.div
          className="w-48 h-48 rounded-2xl bg-black border-2 border-green-400/40 flex items-center justify-center shadow-2xl relative overflow-hidden"
          transition={{ type: "spring", stiffness: 300 }}
        >
          {/* Sparkling Binary Background */}
          <div className="absolute inset-0 flex flex-col justify-between p-2">
            {Array.from({ length: 20 }, (_, rowIndex) => (
              <motion.div
                key={rowIndex}
                className="flex justify-between text-xs font-mono text-green-400/60"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: rowIndex * 0.1 }}
              >
                {Array.from({ length: 16 }, (_, colIndex) => {
                  // Use deterministic values based on row and column indices
                  const binaryValue = ((rowIndex * 16 + colIndex) % 2) === 0 ? "1" : "0"
                  const sparkleDuration = Math.random() * 1.5 + 0.5

                  return (
                    <motion.span
                      key={colIndex}
                      className="inline-block w-2 relative"
                      animate={{
                        opacity: [0.2, 1, 0.6],
                        color: ["#00ff88", "#00ffaa", "#00ff88"]
                      }}
                      transition={{
                        duration: sparkleDuration,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      {binaryValue}
                    </motion.span>
                  )
                })}
              </motion.div>
            ))}
          </div>

          {/* Central Profile Display */}
          <div className="relative z-10 text-center">
            <motion.div
              className="w-20 h-20 rounded-full bg-green-400/20 border-2 border-green-400/40 flex items-center justify-center mb-2"
              animate={{
                boxShadow: [
                  "0 0 10px rgba(0,255,136,0.3)",
                  "0 0 20px rgba(0,255,136,0.5)",
                  "0 0 10px rgba(0,255,136,0.3)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-3xl font-bold text-green-400">
                <GlitchText>K</GlitchText>
              </span>
            </motion.div>

            <motion.div
              className="text-xs font-mono text-green-400/80"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <GlitchText>SYSTEM ONLINE</GlitchText>
            </motion.div>
          </div>

          {/* Scanning Line Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-green-400/20 to-transparent h-1"
            animate={{ y: [0, 192, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>

        {/* Floating indicators */}
        <motion.div
          className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full shadow-lg"
          animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-2 -left-2 w-4 h-4 bg-cyan-400 rounded-full"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </motion.div>
  )
} 