"use client"

import React from "react"
import { motion } from "framer-motion"

export const BinaryBackground = () => {
  return (
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
  )
} 