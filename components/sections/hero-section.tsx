"use client"

import React, { useState, useEffect, useCallback, useMemo, memo } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Download,
  MessageCircle,
  ChevronDown
} from "lucide-react"
import { useGlitchText } from "@/hooks/use-glitch-text"
import { GlitchText } from "@/components/glitch-text"
import { ProfileVisual } from "@/components/profile-visual"
import { SocialLinks } from "@/components/social-links"
import { InteractiveTerminal } from "@/components/interactive-terminal"
import { subtitleTexts } from "@/data/portfolio-data"

const HeroSection = memo(() => {
  const [heroName, setHeroName] = useState("KIJTISAK PANGMEE")
  const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState(0)

  // Memoize glitch constants
  const glitchConstants = useMemo(() => ({
    fullName: "KIJTISAK PANGMEE",
    nickname: "kijtisakp",
    chars: "!<>-_\\/[]{}—=+*^?#________"
  }), [])

  const { displayText: heroSubtitle } = useGlitchText(subtitleTexts[currentSubtitleIndex], true, true)

  // Memoized glitch effect function
  const createGlitchEffect = useCallback((targetText: string, onComplete: () => void) => {
    let iterations = 0
    const interval = setInterval(() => {
      const newText = targetText
        .split("")
        .map(() => glitchConstants.chars[Math.floor(Math.random() * glitchConstants.chars.length)])
        .join("")
      setHeroName(newText)

      iterations++
      if (iterations > 12) {
        clearInterval(interval)
        setHeroName(targetText)
        onComplete()
      }
    }, 50)
    
    return interval
  }, [glitchConstants.chars])

  // Name animation effect with cleanup
  useEffect(() => {
    let timeout: NodeJS.Timeout
    let activeInterval: NodeJS.Timeout | null = null

    const nameAnimationLoop = (): void => {
      timeout = setTimeout(() => {
        activeInterval = createGlitchEffect(glitchConstants.nickname, () => {
          timeout = setTimeout(() => {
            activeInterval = createGlitchEffect(glitchConstants.fullName, nameAnimationLoop)
          }, 2500) // Show nickname for 2.5s
        })
      }, 4000) // Show full name for 4s
    }

    nameAnimationLoop()

    return () => {
      if (timeout) clearTimeout(timeout)
      if (activeInterval) clearInterval(activeInterval)
    }
  }, [createGlitchEffect, glitchConstants.fullName, glitchConstants.nickname])

  // Optimized subtitle cycling with proper cleanup
  useEffect(() => {
    const subtitleInterval = setInterval(() => {
      setCurrentSubtitleIndex((prevIndex) =>
        (prevIndex + 1) % subtitleTexts.length
      )
    }, 3000) // Change every 3 seconds

    return () => clearInterval(subtitleInterval)
  }, [])

  // Memoized motion variants
  const motionVariants = useMemo(() => ({
    leftColumn: {
      initial: { opacity: 0, x: -50 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.8 }
    },
    rightColumn: {
      initial: { opacity: 0, x: 50 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.8, delay: 0.3 }
    },
    statusBadge: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: 0.2 }
    }
  }), [])

  return (
    <section className="min-h-screen pt-24 flex items-center justify-center px-4 relative z-10 overflow-hidden">
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Column - Main Content */}
          <motion.div
            className="space-y-8"
            {...motionVariants.leftColumn}
          >
            {/* Status Badge */}
            <motion.div
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-green-400/10 border border-green-400/30 backdrop-blur-sm"
              {...motionVariants.statusBadge}
              whileHover={{ scale: 1.05, borderColor: "rgba(0, 255, 136, 0.6)" }}
            >
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              <span className="text-green-400 font-mono text-sm">
                <GlitchText>SYSTEM ONLINE</GlitchText>
              </span>
            </motion.div>

            {/* Name and Title */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="space-y-2"
              >
                <div>
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-green-400 font-mono leading-tight">
                    Hello, I&apos;m
                  </h1>
                </div>
                <div>
                  <motion.span
                    className="block font-mono relative text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"
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
                </div>
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
              </motion.div>

              {/* Description */}
              <motion.p
                className="text-green-300/90 text-lg leading-relaxed font-mono max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <span className="text-green-300">
                  Crafting innovative digital solutions with cutting-edge technologies. 
                  Specializing in full-stack development and transforming ideas into reality.
                </span>
              </motion.p>
            </div>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <Button
                size="lg"
                className="bg-green-400 text-black hover:bg-green-300 font-mono transition-colors duration-300"
              >
                <Download className="w-5 h-5 mr-2" />
                Download CV
              </Button>
              <Button
                variant="outline"
                className="border-green-400/50 text-green-400 hover:bg-green-400/10 bg-transparent font-mono transition-all duration-300 hover:border-green-400 hover:text-green-400 px-6 py-3"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                <GlitchText>Get In Touch</GlitchText>
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <SocialLinks />
            </motion.div>
          </motion.div>

          {/* Right Column - Interactive Terminal & Visual Elements */}
          <motion.div
            className="relative"
            {...motionVariants.rightColumn}
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
})

HeroSection.displayName = "HeroSection"

export { HeroSection }
