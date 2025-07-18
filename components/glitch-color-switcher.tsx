"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Palette } from "lucide-react"
import { useGlitchColor, GlitchColorType } from "@/components/glitch-color-provider"
import { GlitchText } from "@/components/glitch-text"

const colorOptions: { type: GlitchColorType; name: string; preview: string }[] = [
  { type: 'error', name: 'Error', preview: 'R/G' },
  { type: 'inverse', name: 'Inverse', preview: 'C/M' },
  { type: 'neon', name: 'Neon', preview: 'M/C/Y' },
  { type: 'fire', name: 'Fire', preview: 'R/O' },
  { type: 'ice', name: 'Ice', preview: 'B/C' },
  { type: 'matrix', name: 'Matrix', preview: 'G' },
]

export const GlitchColorSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [glitchTrigger, setGlitchTrigger] = useState(0)
  const { currentColor, setColor } = useGlitchColor()

  // Trigger glitch effect every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchTrigger(prev => prev + 1)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const handleColorChange = (colorType: GlitchColorType) => {
    setColor(colorType)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-green-400/10 border border-green-400/20 hover:bg-green-400/20 transition-all duration-300 group"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        aria-label="Change glitch color"
      >
        <Palette className="w-4 h-4 text-green-400 group-hover:text-green-300" />
        <span className="text-green-300 text-sm font-mono group-hover:text-green-200">
          <GlitchText key={glitchTrigger}>{colorOptions.find(opt => opt.type === currentColor)?.name || 'Error'}</GlitchText>
        </span>
      </motion.button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.9 }}
          className="absolute top-full mt-2 right-0 bg-black/95 border border-green-400/30 rounded-lg p-2 backdrop-blur-md z-50 min-w-[160px]"
        >
          <div className="space-y-1">
            {colorOptions.map((option) => (
              <motion.button
                key={option.type}
                onClick={() => handleColorChange(option.type)}
                className={`w-full text-left px-3 py-2 rounded-md transition-all duration-200 flex items-center justify-between group ${
                  currentColor === option.type
                    ? 'bg-green-400/20 border border-green-400/40'
                    : 'hover:bg-green-400/10 border border-transparent'
                }`}
                whileHover={{ x: 2 }}
              >
                <span className="text-green-300 text-sm font-mono group-hover:text-green-200">
                  <GlitchText color={option.type}>{option.name}</GlitchText>
                </span>
                <span className="text-green-400/60 text-xs font-mono">
                  {option.preview}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Backdrop to close dropdown */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}
