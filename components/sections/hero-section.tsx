"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Github,
  Linkedin,
  Mail,
  Download,
  MessageCircle,
  ChevronDown
} from "lucide-react"
import { useGlitchText } from "@/hooks/use-glitch-text"
import { GlitchText } from "@/components/glitch-text"
import { ProfileVisual } from "@/components/profile-visual"
import { SocialLinks } from "@/components/social-links"
import { FloatingBackground } from "@/components/floating-background"
import { InteractiveTerminal } from "@/components/interactive-terminal"
import { subtitleTexts } from "@/data/portfolio-data"

export const HeroSection = () => {
  const [heroName, setHeroName] = useState("KIJTISAK PANGMEE")
  const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState(0)
  // Removed terminal state management as it's now handled by InteractiveTerminal component

  const { displayText: heroSubtitle } = useGlitchText(subtitleTexts[currentSubtitleIndex], true, true)

  // Removed terminal useEffects as they're now handled by InteractiveTerminal component

  // Special glitch effect for the hero name
  useEffect(() => {
    const fullName = "KIJTISAK PANGMEE"
    const nickname = "kijtisakp"
    const GLITCH_CHARS = "!<>-_\\/[]{}—=+*^?#________"
    let timeout: NodeJS.Timeout

    const glitchEffect = (targetText: string, onComplete: () => void) => {
      let iterations = 0
      const interval = setInterval(() => {
        const newText = targetText
          .split("")
          .map(() => GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)])
          .join("")
        setHeroName(newText)

        iterations++
        if (iterations > 12) {
          clearInterval(interval)
          setHeroName(targetText)
          onComplete()
        }
      }, 50)
    }

    const nameAnimationLoop = () => {
      timeout = setTimeout(() => {
        glitchEffect(nickname, () => {
          timeout = setTimeout(() => {
            glitchEffect(fullName, nameAnimationLoop)
          }, 2500) // Show nickname for 2.5s
        })
      }, 4000) // Show full name for 4s
    }

    nameAnimationLoop()

    return () => clearTimeout(timeout)
  }, [])

  // Cycle through subtitle texts
  useEffect(() => {
    const subtitleInterval = setInterval(() => {
      setCurrentSubtitleIndex((prevIndex) =>
        (prevIndex + 1) % subtitleTexts.length
      )
    }, 3000) // Change every 3 seconds

    return () => clearInterval(subtitleInterval)
  }, [])

  // Removed handleCommand function as it's now handled by InteractiveTerminal component

  return (
    <section className="min-h-screen pt-24 flex items-center justify-center px-4 relative z-10 overflow-hidden">
      {/* Floating Background Elements */}
      <FloatingBackground />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Column - Main Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Status Badge */}
            <motion.div
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-green-400/10 border border-green-400/30 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05, borderColor: "rgba(0, 255, 136, 0.6)" }}
            >
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              <span className="text-green-400 font-mono text-sm">
                <GlitchText>SYSTEM ONLINE</GlitchText>
              </span>
            </motion.div>

            {/* Name and Title */}
            <div className="space-y-6">
              <motion.h1
                className="text-4xl lg:text-6xl xl:text-7xl font-bold leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <span className="block text-green-400 font-mono">Hello, I'm</span>
                <motion.span
                  className="block font-mono relative"
                  style={{
                    color: "#ffffff",
                    textShadow: "0 0 10px #ffffff, 0 0 20px #ffffff, 0 0 30px #ffffff",
                    filter: "saturate(1.5) brightness(1.2)",
                  }}
                  animate={{
                    textShadow: [
                      "0 0 10px #ffffff, 0 0 20px #ffffff, 0 0 30px #ffffff",
                      "0 0 15px #ffffff, 0 0 25px #ffffff, 0 0 35px #ffffff",
                      "0 0 10px #ffffff, 0 0 20px #ffffff, 0 0 30px #ffffff",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {heroName}
                </motion.span>
              </motion.h1>

              <motion.div
                className="text-xl lg:text-2xl text-slate-300 font-mono"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <span className="text-green-400">$</span> {heroSubtitle}
                <motion.span
                  className="inline-block w-3 h-6 bg-green-400 ml-1"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
            </div>

            {/* Description */}
            <motion.p
              className="text-lg text-green-300/80 font-mono leading-relaxed max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <GlitchText>
                Crafting innovative digital solutions with cutting-edge technologies.
                Specializing in full-stack development and transforming ideas into reality.
              </GlitchText>
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-green-400 text-black hover:bg-green-300 border border-green-400 font-mono transition-all duration-300 shadow-lg hover:shadow-green-400/25 px-6 py-3">
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
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  <GlitchText>Get In Touch</GlitchText>
                </Button>
              </motion.div>
            </motion.div>

            {/* Social Links */}
            <SocialLinks />
          </motion.div>

          {/* Right Column - Interactive Terminal & Visual Elements */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Profile Visual */}
            <ProfileVisual />

            {/* Interactive Terminal */}
            <InteractiveTerminal />

            {/* Floating Code Snippets */}
            <motion.div
              className="absolute -right-8 top-1/4 bg-black/60 border border-green-400/20 rounded-lg p-3 backdrop-blur-sm hidden xl:block"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              whileHover={{ scale: 1.05, borderColor: "rgba(0,255,136,0.4)" }}
            >
              <pre className="text-xs text-green-300 font-mono">
                <GlitchText>{`const skills = [\n  'JavaScript',\n  'TypeScript',\n  'React', 'Vue.js'\n]`}</GlitchText>
              </pre>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="flex justify-center mt-16 lg:mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-green-400/70"
          >
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
