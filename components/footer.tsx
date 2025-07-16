"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GlitchText } from "@/components/glitch-text"

export const Footer = () => {
  return (
    <motion.footer
      className="py-8 px-4 border-t border-green-400/20 relative z-10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2 text-green-300 font-mono">
            <span className="text-green-400">$</span>
            <span>
              <GlitchText>echo "© 2024 Kijtisak Pangmee" &gt; /dev/null && exit 0</GlitchText>
            </span>
          </div>
          <div className="flex items-center space-x-4">
            {[Github, Linkedin, Mail].map((Icon, index) => (
              <motion.div key={index} whileHover={{ y: -2, scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-green-400 hover:text-green-300 border border-green-400/20 hover:bg-green-400/10 transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  )
} 