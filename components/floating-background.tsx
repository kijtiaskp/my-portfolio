"use client"

import React from "react"
import { motion } from "framer-motion"

interface FloatingBackgroundProps {
  className?: string
}

export const FloatingBackground = ({ className = "" }: FloatingBackgroundProps) => {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {/* Floating Geometric Shapes */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-16 h-16 border-2 border-green-400/20 rounded-lg rotate-45"
        animate={{
          rotate: [45, 225, 45],
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-8 h-8 bg-green-400/10 rounded-full"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
          scale: [1, 1.5, 1]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/6 w-12 h-12 border border-cyan-400/20"
        animate={{
          rotate: [0, 360],
          scale: [1, 0.8, 1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-1/2 right-1/6 w-6 h-20 bg-gradient-to-b from-green-400/20 to-transparent rounded-full"
        animate={{
          scaleY: [1, 1.5, 1],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Code-like floating elements */}
      <motion.div
        className="absolute top-1/5 right-1/3 text-green-400/20 font-mono text-sm"
        animate={{
          y: [0, -30, 0],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        {"{ code: 'floating' }"}
      </motion.div>
      <motion.div
        className="absolute bottom-1/3 left-1/8 text-cyan-400/20 font-mono text-xs"
        animate={{
          x: [0, 20, 0],
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      >
        const dev = () =&gt; magic
      </motion.div>
    </div>
  )
} 