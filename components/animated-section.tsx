"use client"

import React, { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  id?: string
}

// Animated Section Component
export function AnimatedSection({
  children,
  className = "",
  id,
}: AnimatedSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {isInView && (
        <motion.div
          className="absolute inset-0 border-2 border-green-400 rounded-2xl pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.7, 0, 0.4, 0], scale: [1, 1.01, 1, 1.005, 1] }}
          transition={{ duration: 0.5, delay: 0.3, ease: "circOut" }}
        />
      )}
      {children}
    </motion.section>
  )
} 