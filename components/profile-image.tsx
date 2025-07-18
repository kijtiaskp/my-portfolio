"use client"

import React, { memo, useMemo } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

interface ProfileImageProps {
  src: string
  alt?: string
  priority?: boolean
}

const ProfileImage = memo(({ src, alt = "Profile Avatar", priority = false }: ProfileImageProps) => {
  // Memoize animation configurations to prevent recreation
  const animationConfigs = useMemo(() => ({
    container: {
      animate: {
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
      },
      transition: {
        filter: {
          duration: 0.3,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "reverse" as const
        },
        opacity: {
          duration: 0.3,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "reverse" as const
        },
        boxShadow: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }
    },
    image: {
      animate: {
        x: [0, 2, -1, 1, 0],
        y: [0, -1, 2, -1, 0],
        scale: [1, 1.02, 0.98, 1.01, 1]
      },
      transition: {
        duration: 0.2,
        repeat: Infinity,
        ease: "easeInOut",
        repeatType: "reverse" as const
      }
    },
    overlay: {
      animate: {
        opacity: [0, 0.3, 0, 0.2, 0],
        x: [0, 1, -1, 0],
      },
      transition: {
        duration: 0.15,
        repeat: Infinity,
        ease: "linear"
      }
    }
  }), [])

  return (
    <motion.div
      className="absolute inset-0 z-10 overflow-hidden"
      {...animationConfigs.container}
    >
      <motion.div
        className="relative w-full h-full"
        {...animationConfigs.image}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          priority={priority}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          sizes="(max-width: 768px) 192px, 192px"
          quality={85}
        />
      </motion.div>
      {/* Glitch overlay */}
      <motion.div
        className="absolute inset-0 bg-green-400/20 mix-blend-multiply"
        {...animationConfigs.overlay}
      />
    </motion.div>
  )
})

ProfileImage.displayName = "ProfileImage"

export { ProfileImage } 