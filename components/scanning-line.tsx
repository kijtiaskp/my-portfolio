"use client"

import React from "react"
import { motion } from "framer-motion"

export const ScanningLine = () => {
  return (
    <motion.div
      className="absolute inset-0 bg-gradient-to-b from-green-400/20 to-transparent h-1"
      animate={{ y: [0, 192, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
    />
  )
}
