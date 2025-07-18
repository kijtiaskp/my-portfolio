"use client"

import React, { memo, useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"

const BinaryBackground = memo(() => {
  const [binaryData, setBinaryData] = useState<Array<{
    rowIndex: number;
    cols: Array<{
      colIndex: number;
      binaryValue: string;
      delay: number;
    }>;
  }>>([])

  // Generate binary data on client-side only to prevent hydration mismatch
  useEffect(() => {
    const rows = 20 // Restored to original 20 rows
    const cols = 16 // Restored to original 16 cols
    
    const data = Array.from({ length: rows }, (_, rowIndex) => ({
      rowIndex,
      cols: Array.from({ length: cols }, (_, colIndex) => ({
        colIndex,
        // Restore random binary values for authentic look
        binaryValue: Math.random() > 0.5 ? "1" : "0",
        // Random animation delay for organic effect
        delay: Math.random() * 2
      }))
    }))
    
    setBinaryData(data)
  }, [])

  // Memoize animation configurations for performance
  const getAnimationConfig = useMemo(() => () => ({
    opacity: [0.2, 1, 0.6, 0.8, 0.3],
    color: ["#00ff88", "#00ffaa", "#00ff88", "#00dd77", "#00ff88"]
  }), [])

  // If no data yet, render placeholder to prevent hydration mismatch
  if (binaryData.length === 0) {
    return (
      <div className="absolute inset-0 flex flex-col justify-between p-2">
        {Array.from({ length: 20 }, (_, rowIndex) => (
          <div
            key={rowIndex}
            className="flex justify-between text-xs font-mono text-green-400/60"
          >
            {Array.from({ length: 16 }, (_, colIndex) => (
              <span key={colIndex} className="inline-block w-2 relative opacity-0">
                0
              </span>
            ))}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="absolute inset-0 flex flex-col justify-between p-2">
      {binaryData.map(({ rowIndex, cols }) => (
        <motion.div
          key={rowIndex}
          className="flex justify-between text-xs font-mono text-green-400/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: rowIndex * 0.05 }}
        >
          {cols.map(({ colIndex, binaryValue, delay }) => (
            <motion.span
              key={colIndex}
              className="inline-block w-2 relative"
              animate={getAnimationConfig()}
              transition={{
                duration: 1.5 + (delay * 0.5), // Use delay for duration variation instead of Math.random()
                repeat: Infinity,
                ease: "easeInOut",
                delay: delay, // Use pre-calculated delay
                repeatDelay: delay * 0.25 // Use delay for repeat variation instead of Math.random()
              }}
            >
              {binaryValue}
            </motion.span>
          ))}
        </motion.div>
      ))}
    </div>
  )
})

BinaryBackground.displayName = "BinaryBackground"

export { BinaryBackground }
