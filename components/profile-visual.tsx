"use client"

import React from "react"
import { motion } from "framer-motion"
import { BinaryBackground } from "@/components/binary-background"
import { ProfileImage } from "@/components/profile-image"
import { ScanningLine } from "@/components/scanning-line"
import { FloatingIndicators } from "@/components/floating-indicators"

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
          <BinaryBackground />

          {/* Profile Image */}
          <ProfileImage src="https://kijtisak-portfolio.s3.ap-southeast-1.amazonaws.com/avatar.jpg" />



          {/* Scanning Line Effect */}
          <ScanningLine />
        </motion.div>

        {/* Floating indicators */}
        <FloatingIndicators />
      </div>
    </motion.div>
  )
}
