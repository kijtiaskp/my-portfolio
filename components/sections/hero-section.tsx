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
import { subtitleTexts, terminalCommands } from "@/data/portfolio-data"
import { TerminalHistoryItem } from "@/types/portfolio"

export const HeroSection = () => {
  const [heroName, setHeroName] = useState("KIJTISAK PANGMEE")
  const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState(0)
  const [currentCommand, setCurrentCommand] = useState("")
  const [terminalHistory, setTerminalHistory] = useState<TerminalHistoryItem[]>([
    { type: "output", content: "Linux portfolio-server 5.15.0-kijtisak #1 SMP" },
    { type: "output", content: "Last login: Loading..." },
    { type: "output", content: "Welcome to Kijtisak's development environment!" },
    { type: "info", content: "Type 'help' to see available commands." },
  ])

  const { displayText: heroSubtitle } = useGlitchText(subtitleTexts[currentSubtitleIndex], true, true)

  // Update the login date on client side only to prevent hydration mismatch
  useEffect(() => {
    setTerminalHistory(prev => prev.map((item, index) =>
      index === 1 ? { ...item, content: "Last login: " + new Date().toLocaleString() } : item
    ))
  }, [])

  // Auto-scroll terminal to bottom
  useEffect(() => {
    const terminal = document.getElementById("terminal-scroll")
    if (terminal) {
      terminal.scrollTop = terminal.scrollHeight
    }
  }, [terminalHistory])

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

  const handleCommand = (cmd: string) => {
    const command = cmd.toLowerCase().trim()

    // Check if command is valid first
    let responseKey = command
    if (command === "ls -la" || command === "ls") responseKey = "ls"
    if (command === "cat projects" || command === "projects") responseKey = "projects"
    if (command === "tail -f logs" || command === "logs" || command === "history") responseKey = "experience"
    if (command === "ping contact") responseKey = "contact"

    const isValidCommand = command === "clear" || terminalCommands[responseKey]

    // Add command to history with appropriate color
    setTerminalHistory((prev) => [...prev, {
      type: isValidCommand ? "command" : "invalid-command",
      content: `$ ${cmd}`
    }])

    if (command === "clear") {
      setTimeout(() => {
        setTerminalHistory([
          { type: "output", content: "Terminal cleared." },
          { type: "info", content: "Type 'help' to see available commands." },
        ])
      }, 100)
      return
    }

    const responses = terminalCommands[responseKey]
    if (responses) {
      setTimeout(() => {
        setTerminalHistory((prev) => [...prev, ...responses])
      }, 300)

      // Auto-scroll to sections
      if (["projects", "experience", "contact"].includes(responseKey)) {
        setTimeout(() => {
          document.getElementById(responseKey === "experience" ? "experience" : responseKey)?.scrollIntoView({ behavior: "smooth" })
        }, 800)
      }
    } else {
      setTimeout(() => {
        setTerminalHistory((prev) => [
          ...prev,
          { type: "error", content: `bash: ${command}: command not found` },
          { type: "info", content: "Type 'help' to see available commands." },
        ])
      }, 300)
    }
  }

  return (
    <section className="min-h-screen pt-24 flex items-center justify-center px-4 relative z-10 overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating Geometric Shapes */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-16 h-16 border-2 border-green-400/20 rounded-lg rotate-45"
          animate={{
            rotate: [45, 225, 45],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-8 h-8 bg-green-400/10 rounded-full"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            scale: [1, 1.5, 1]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/6 w-12 h-12 border border-cyan-400/20"
          animate={{
            rotate: [0, 360],
            scale: [1, 0.8, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-1/2 right-1/6 w-6 h-20 bg-gradient-to-b from-green-400/20 to-transparent rounded-full"
          animate={{
            scaleY: [1, 1.5, 1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Code-like floating elements */}
        <motion.div
          className="absolute top-1/5 right-1/3 text-green-400/20 font-mono text-sm"
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          {"{ code: 'floating' }"}
        </motion.div>
        <motion.div
          className="absolute bottom-1/3 left-1/8 text-cyan-400/20 font-mono text-xs"
          animate={{
            x: [0, 20, 0],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        >
          const dev = () =&gt; magic
        </motion.div>
      </div>

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
            <motion.div
              className="flex space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              {[
                { Icon: Github, label: "GitHub", color: "hover:text-green-300 hover:bg-green-400/20" },
                { Icon: Linkedin, label: "LinkedIn", color: "hover:text-green-300 hover:bg-green-400/20" },
                { Icon: Mail, label: "Email", color: "hover:text-green-300 hover:bg-green-400/20" },
              ].map(({ Icon, label, color }, index) => (
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
          </motion.div>

          {/* Right Column - Interactive Terminal & Visual Elements */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Profile Visual - Binary Computer Screen */}
            <motion.div
              className="relative mb-8 flex justify-center lg:justify-end"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="relative">
                <motion.div
                  className="w-48 h-48 rounded-2xl bg-black border-2 border-green-400/40 flex items-center justify-center shadow-2xl relative overflow-hidden"
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Binary Rain Background */}
                  <div className="absolute inset-0 flex flex-col justify-between p-2">
                    {Array.from({ length: 20 }, (_, rowIndex) => (
                      <motion.div
                        key={rowIndex}
                        className="flex justify-between text-xs font-mono text-green-400/60"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: rowIndex * 0.1 }}
                      >
                        {Array.from({ length: 16 }, (_, colIndex) => {
                          // Use deterministic values based on row and column indices
                          const binaryValue = ((rowIndex * 16 + colIndex) % 2) === 0 ? "1" : "0"
                          const animationDelay = (rowIndex + colIndex) * 0.1
                          const animationDuration = 1 + (rowIndex % 3) * 0.5

                          return (
                            <motion.span
                              key={colIndex}
                              className="inline-block w-2"
                              animate={{
                                opacity: [0.3, 1, 0.3],
                                color: ["#00ff88", "#00ffaa", "#00ff88"]
                              }}
                              transition={{
                                duration: animationDuration,
                                repeat: Infinity,
                                delay: animationDelay
                              }}
                            >
                              {binaryValue}
                            </motion.span>
                          )
                        })}
                      </motion.div>
                    ))}
                  </div>

                  {/* Central Profile Display */}
                  <div className="relative z-10 text-center">
                    <motion.div
                      className="w-20 h-20 rounded-full bg-green-400/20 border-2 border-green-400/40 flex items-center justify-center mb-2"
                      animate={{
                        boxShadow: [
                          "0 0 10px rgba(0,255,136,0.3)",
                          "0 0 20px rgba(0,255,136,0.5)",
                          "0 0 10px rgba(0,255,136,0.3)"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <span className="text-3xl font-bold text-green-400">
                        <GlitchText>K</GlitchText>
                      </span>
                    </motion.div>

                    <motion.div
                      className="text-xs font-mono text-green-400/80"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <GlitchText>SYSTEM ONLINE</GlitchText>
                    </motion.div>
                  </div>

                  {/* Scanning Line Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-green-400/20 to-transparent h-1"
                    animate={{ y: [0, 192, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />
                </motion.div>

                {/* Floating indicators */}
                <motion.div
                  className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full shadow-lg"
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute -bottom-2 -left-2 w-4 h-4 bg-cyan-400 rounded-full"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.3, 1]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </motion.div>

            {/* Interactive Terminal */}
            <div className="code-block rounded-xl overflow-hidden relative shadow-2xl">
              {/* Terminal Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-black/90 border-b border-green-400/30 backdrop-blur-sm relative">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-400/80 border border-red-400/40" />
                  <div className="w-3 h-3 rounded-full bg-orange-400/80 border border-orange-400/40" />
                  <div className="w-3 h-3 rounded-full bg-green-400 border border-green-400/60 shadow-sm shadow-green-400/50" />
                </div>
                <span className="text-green-300 text-sm font-mono tracking-wider">kijtisak@dev:~</span>
                <div className="w-12"></div>
              </div>

              {/* Terminal Content */}
              <div className="p-4 h-80 overflow-y-auto bg-black/95 terminal-scroll" id="terminal-scroll">
                <div className="font-mono text-sm space-y-1 text-left">
                  {terminalHistory.map((line, index) => (
                    <div
                      key={index}
                      className={
                        line.type === "command"
                          ? "text-green-400"
                          : line.type === "invalid-command"
                            ? "text-red-400"
                            : line.type === "error"
                              ? "text-red-400"
                              : line.type === "info"
                                ? "text-yellow-400"
                                : "text-slate-300"
                      }
                    >
                      <pre className="whitespace-pre-wrap font-mono text-left">
                        {line.content}
                      </pre>
                    </div>
                  ))}

                  <div className="flex items-center space-x-1 pt-2">
                    <span className="text-green-400">$</span>
                    <input
                      type="text"
                      value={currentCommand}
                      onChange={(e) => setCurrentCommand(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          handleCommand(currentCommand)
                          setCurrentCommand("")
                        }
                      }}
                      className="flex-1 bg-transparent border-none outline-none text-green-400 font-mono text-left"
                      placeholder="Type 'help' to start..."
                      autoFocus
                    />
                    <div className="w-2 h-4 bg-green-400 ml-0 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>

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