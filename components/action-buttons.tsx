"use client"

import React from "react"
import { motion } from "framer-motion"
import { Download, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GlitchText } from "@/components/glitch-text"

interface ActionButtonsProps {
  className?: string
  onDownloadCV?: () => void
  onGetInTouch?: () => void
}

export const ActionButtons = ({ 
  className = "", 
  onDownloadCV,
  onGetInTouch 
}: ActionButtonsProps) => {
  return (
    <motion.div
      className={`flex flex-wrap gap-4 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      <motion.div
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button 
          className="bg-green-400 text-black hover:bg-green-300 border border-green-400 font-mono transition-all duration-300 shadow-lg hover:shadow-green-400/25 px-6 py-3"
          onClick={onDownloadCV}
        >
          <Download className="w-4 h-4 mr-2" />
          <GlitchText>Download CV</GlitchText>
        </Button>
      </motion.div>
      <motion.div
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          variant="outline"
          className="border-green-400/50 text-green-400 hover:bg-green-400/10 bg-transparent font-mono transition-all duration-300 hover:border-green-400 px-6 py-3"
          onClick={onGetInTouch}
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          <GlitchText>Get In Touch</GlitchText>
        </Button>
      </motion.div>
    </motion.div>
  )
}
