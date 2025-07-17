"use client"

import React from "react"
import { motion } from "framer-motion"

export const FloatingIndicators = () => {
  return (
    <>
      {/* Top right indicator */}
      <motion.div
        className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full shadow-lg"
        animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Bottom left indicator */}
      <motion.div
        className="absolute -bottom-2 -left-2 w-4 h-4 bg-cyan-400 rounded-full"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.3, 1]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
    </>
  )
} 