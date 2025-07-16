"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { GlitchText } from "@/components/glitch-text"
import { navigationItems, fadeInUp, staggerContainer } from "@/data/portfolio-data"
import { scrollToElement } from "@/utils/portfolio-utils"

export const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <motion.nav
      className="fixed top-0 w-full bg-black/90 backdrop-blur-md border-b border-green-400/30 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            className="flex items-center space-x-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="w-8 h-8 bg-green-400 rounded border-2 border-green-400 flex items-center justify-center">
              <span className="text-black font-bold text-sm">
                <GlitchText>K</GlitchText>
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-green-400 font-bold text-lg">
                <GlitchText>kijtisak@dev</GlitchText>
              </span>
              <span className="text-green-300/70 text-xs">
                <GlitchText>~/portfolio</GlitchText>
              </span>
            </div>
          </motion.div>

          <motion.div
            className="hidden md:flex items-center space-x-6"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {navigationItems.map((item, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <button
                  onClick={() => scrollToElement(item.href)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-green-400/20 transition-all duration-300 border border-transparent hover:border-green-400/40 group cursor-pointer"
                >
                  <span className="text-green-400 text-sm font-mono">{item.prefix}</span>
                  <span className="text-green-300 text-sm font-mono group-hover:text-green-200 transition-colors">
                    <GlitchText>{item.text}</GlitchText>
                  </span>
                </button>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="flex items-center space-x-3"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg text-green-400 hover:bg-green-400/20 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <motion.div
                animate={{ rotate: mobileMenuOpen ? 45 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {mobileMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </motion.div>
            </button>

            <div className="hidden md:flex items-center space-x-2 px-3 py-2 rounded-lg bg-green-400/20 border border-green-400/40">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              <span className="text-green-300 text-sm font-mono">
                <GlitchText>ACTIVE</GlitchText>
              </span>
            </div>
          </motion.div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className="md:hidden"
          initial={false}
          animate={{
            height: mobileMenuOpen ? "auto" : 0,
            opacity: mobileMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          style={{ overflow: "hidden" }}
        >
          <div className="px-4 py-4 space-y-3 bg-black/90 border-t border-green-400/30">
            {navigationItems.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  scrollToElement(item.href)
                  setMobileMenuOpen(false)
                }}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-green-400/20 transition-all duration-300 border border-transparent hover:border-green-400/40 cursor-pointer"
              >
                <span className="text-green-400 font-mono text-sm">{item.prefix}</span>
                <span className="text-green-300 font-mono text-sm">
                  <GlitchText>{item.text}</GlitchText>
                </span>
              </button>
            ))}

            <div className="pt-3 mt-3 border-t border-green-400/20">
              <div className="flex items-center justify-center space-x-2 px-3 py-2 rounded-lg bg-green-400/20 border border-green-400/40">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                <span className="text-green-300 text-sm font-mono">
                  <GlitchText>ACTIVE</GlitchText>
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  )
} 