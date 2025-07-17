"use client"

import React from "react"
import { motion } from "framer-motion"

interface ProfileImageProps {
  src: string
  alt?: string
}

export const ProfileImage = ({ src, alt = "Profile Avatar" }: ProfileImageProps) => {
  return (
    <motion.div
      className="absolute inset-0 z-10 overflow-hidden"
      animate={{
        filter: [
          "sepia(1) hue-rotate(90deg) saturate(2) brightness(0.8)",
          "sepia(1) hue-rotate(100deg) saturate(2.2) brightness(0.9)",
          "sepia(1) hue-rotate(80deg) saturate(1.8) brightness(0.7)",
          "sepia(1) hue-rotate(90deg) saturate(2) brightness(0.8)"
        ],
        opacity: [0.3, 0.45, 0.35, 0.45],
        boxShadow: [
          "0 0 10px rgba(0,255,136,0.3)",
          "0 0 20px rgba(0,255,136,0.5)",
          "0 0 10px rgba(0,255,136,0.3)"
        ]
      }}
      transition={{
        filter: {
          duration: 0.3,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "reverse"
        },
        opacity: {
          duration: 0.3,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "reverse"
        },
        boxShadow: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
    >
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        animate={{
          x: [0, 2, -1, 1, 0],
          y: [0, -1, 2, -1, 0],
          scale: [1, 1.02, 0.98, 1.01, 1]
        }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "reverse"
        }}
      />
      {/* Glitch overlay */}
      <motion.div
        className="absolute inset-0 bg-green-400/20 mix-blend-multiply"
        animate={{
          opacity: [0, 0.3, 0, 0.2, 0],
          x: [0, 1, -1, 0],
        }}
        transition={{
          duration: 0.15,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </motion.div>
  )
} 