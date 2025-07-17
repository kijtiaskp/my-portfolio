"use client"

import React from "react"
import { motion } from "framer-motion"
import { Github, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GlitchText } from "@/components/glitch-text"

interface SocialLinksProps {
  className?: string
}

export const SocialLinks = ({ className = "" }: SocialLinksProps) => {
  const socialItems = [
    { Icon: Github, label: "GitHub", color: "hover:text-green-300 hover:bg-green-400/20" },
    { Icon: Linkedin, label: "LinkedIn", color: "hover:text-green-300 hover:bg-green-400/20" },
    { Icon: Mail, label: "Email", color: "hover:text-green-300 hover:bg-green-400/20" },
  ]

  return (
    <motion.div
      className={`flex space-x-4 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.7 }}
    >
      {socialItems.map(({ Icon, label, color }, index) => (
        <motion.div
          key={label}
          whileHover={{ y: -3, scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="ghost"
            size="icon"
            className={`text-green-400/80 ${color} border border-green-400/30 hover:border-green-400 transition-all duration-300 font-mono`}
            title={label}
          >
            <Icon className="w-5 h-5" />
          </Button>
        </motion.div>
      ))}
    </motion.div>
  )
}
