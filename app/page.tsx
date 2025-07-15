"use client"

import type React from "react"
import { useGlitchText } from "@/hooks/use-glitch-text" // Declare the useGlitchText hook

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Download,
  MapPin,
  Calendar,
  MessageCircle,
  ChevronDown,
  Eye,
  Zap,
  Phone,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useRef, useMemo } from "react"
import { motion, useInView } from "framer-motion"
import { GlitchText } from "@/components/glitch-text"
import { ScanLines } from "@/components/scan-lines"

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

// Data moved outside component for stability
const skillsData = [
  {
    title: "Programming",
    color: "text-pink-400",
    skills: ["JavaScript", "TypeScript", "C# ASP.NET", "Go", "PHP", "HTML5", "CSS3", "CSS", "HTML", "C#"],
  },
  {
    title: "Frontend",
    color: "text-cyan-400",
    skills: ["ReactTS", "Vue.JS", "AngularJS", "Next.js", "TailwindCSS", "ReactJS", "Vue 2", "Vue.js", "React"],
  },
  {
    title: "Backend",
    color: "text-orange-400",
    skills: ["ExpressJS", "NestJS", ".NET Core", "PHP Laravel", "Prisma", ".NET Framework API", ".NET Framework", "ASP.NET", "Laravel"],
  },
  {
    title: "Database",
    color: "text-rose-400",
    skills: ["T-SQL (SQL Server)", "Redis", "Microsoft SQL Server Management", "DBeaver", "PGAdmin", "SQL Server", "LINQ", "T-SQL"],
  },
  {
    title: "DevOps & Tools",
    color: "text-indigo-300",
    skills: ["Docker", "GitHub Actions", "AWS S3", "Vercel", "GIT command", "GIT", "CRUD", "HTTP", "API"],
  },
  {
    title: "Others",
    color: "text-teal-300",
    skills: ["Visual Studio Code", "Cursor", "Windsurf", "POSTMAN", "AI prompt", "OBS", "Auth0", "UX/UI"],
  },
]

// Helper component to highlight keywords, moved outside Portfolio component
const HighlightKeywords = ({ text, keywordMap }: { text: string; keywordMap: Record<string, string> }) => {
  const [keywordsRegex, setKeywordsRegex] = useState<RegExp | null>(null)

  useEffect(() => {
    const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    const escapedKeywords = Object.keys(keywordMap).map(escapeRegExp)
    if (escapedKeywords.length === 0) {
      setKeywordsRegex(null)
      return
    }
    // Create a single regex to find all keywords
    setKeywordsRegex(new RegExp(`\\b(${escapedKeywords.join("|")})\\b`, "gi"))
  }, [keywordMap])

  if (!text) return null

  // If there are no keywords, just return the text
  if (!keywordsRegex) {
    return <GlitchText>{text}</GlitchText>
  }

  const parts = text.split(keywordsRegex)

  return (
    <>
      {parts.map((part, index) => {
        // The split can result in `undefined` if a capture group in the regex doesn't match.
        // This check adds robustness and prevents the app from crashing.
        if (part === undefined) {
          return null
        }

        const lowerPart = part.toLowerCase()
        // Check if the current part is a keyword (case-insensitive)
        const colorClass = keywordMap[lowerPart]

        if (colorClass) {
          // It's a keyword, apply the color
          return (
            <span key={index} className={`${colorClass} font-semibold`}>
              <GlitchText>{part}</GlitchText>
            </span>
          )
        }

        // It's a regular part of the string
        return <GlitchText key={index}>{part}</GlitchText>
      })}
    </>
  )
}

// Matrix Rain Component with original intensity
const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const matrixChars =
      "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}|;:,.<>?"
    const fontSize = 14
    const columns = canvas.width / fontSize

    const drops: number[] = []
    for (let i = 0; i < columns; i++) {
      drops[i] = 1
    }

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.04)" // Original background fill
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = "#00ff00"
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = matrixChars[Math.floor(Math.random() * matrixChars.length)]
        ctx.fillStyle = `rgba(0, 255, 0, ${Math.random()})` // Original character opacity
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, 40) // Original interval

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-30" // Original opacity
      style={{ background: "transparent" }}
    />
  )
}

// Animated Section Component
function AnimatedSection({
  children,
  className = "",
  id,
}: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {isInView && (
        <motion.div
          className="absolute inset-0 border-2 border-green-400 rounded-2xl pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.7, 0, 0.4, 0], scale: [1, 1.01, 1, 1.005, 1] }}
          transition={{ duration: 0.5, delay: 0.3, ease: "circOut" }}
        />
      )}
      {children}
    </motion.section>
  )
}

export default function Portfolio() {
  const [currentCommand, setCurrentCommand] = useState("")
  const [terminalHistory, setTerminalHistory] = useState([
    "Welcome to Kijtisak's portfolio!",
    "Software Developer based in Bangkok, Thailand",
    "Type 'help' to see available commands.",
  ])

  const [heroName, setHeroName] = useState("KIJTISAK PANGMEE")
  const { displayText: heroSubtitle } = useGlitchText("SOFTWARE DEVELOPER", true, true)

  const skillColorMap = useMemo(() => {
    return skillsData.reduce(
      (acc, category) => {
        category.skills.forEach((skill) => {
          acc[skill.toLowerCase()] = category.color
        })
        return acc
      },
      {} as Record<string, string>,
    )
  }, [])

  const commands = {
    help: "Available commands: about, projects, experience, contact, skills, clear",
    about: "Loading personal information...",
    projects: "Loading project portfolio...",
    experience: "Loading work experience...",
    contact: "Loading contact information...",
    skills: "Loading technical skills...",
    clear: "Terminal cleared.",
  }

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

  const handleCommand = (cmd: string) => {
    const command = cmd.toLowerCase().trim()
    if (command === "clear") {
      setTerminalHistory([])
      return
    }

    const response = commands[command as keyof typeof commands] || `Command '${command}' not recognized.`
    setTerminalHistory((prev) => [...prev, `$ ${cmd}`, response])

    if (["about", "projects", "experience", "contact", "skills"].includes(command)) {
      setTimeout(() => {
        document.getElementById(command)?.scrollIntoView({ behavior: "smooth" })
      }, 500)
    }
  }

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono relative overflow-hidden">
      <MatrixRain />
      <ScanLines />

      {/* Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-10">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,255,0,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,255,0,0.08) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      {/* Navigation */}
      <motion.nav
        className="fixed top-0 w-full bg-black/80 backdrop-blur-sm border-b border-green-400/20 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center space-x-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Eye className="w-5 h-5 text-green-400" />
              <span className="text-green-400 font-bold">
                <GlitchText>kijtisak@localhost:~$</GlitchText>
              </span>
            </motion.div>

            <motion.div
              className="hidden md:flex items-center space-x-4"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {[
                { href: "#about", text: "about" },
                { href: "#projects", text: "projects" },
                { href: "#experience", text: "experience" },
                { href: "#contact", text: "contact" },
              ].map((item, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Link
                    href={item.href}
                    className="flex items-center space-x-2 px-3 py-1 rounded hover:bg-green-400/10 transition-all duration-300 border border-transparent hover:border-green-400/20 group"
                  >
                    <span className="text-green-400/80 group-hover:text-green-400 transition-colors">$</span>
                    <span className="text-green-300/80 group-hover:text-green-300 transition-colors">
                      <GlitchText>{item.text}</GlitchText>
                    </span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="flex items-center space-x-2 px-3 py-1 rounded bg-green-400/10 border border-green-400/20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Zap className="w-4 h-4 text-green-400" />
              <span className="text-green-300">
                <GlitchText>ONLINE</GlitchText>
              </span>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="min-h-screen pt-20 flex items-center justify-center px-4 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div className="space-y-6" variants={staggerContainer} initial="initial" animate="animate">
              <motion.div className="space-y-4" variants={fadeInUp}>
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-green-400">$</span>
                  <span className="text-green-300">
                    <GlitchText>whoami</GlitchText>
                  </span>
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold text-green-400 min-h-[80px]">
                  {heroName}
                  <span className="animate-pulse">_</span>
                </h1>
                <div className="text-xl text-green-300 min-h-[60px]">
                  {heroSubtitle}
                  <span className="animate-pulse">_</span>
                </div>
              </motion.div>

              <motion.div
                className="bg-black/50 border border-green-400/20 p-4 rounded font-mono text-sm relative overflow-hidden"
                variants={fadeInUp}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/5 to-transparent opacity-50"></div>
                <div className="relative z-10">
                  <div className="text-green-400 mb-2">
                    <GlitchText>// SYSTEM.INFO</GlitchText>
                  </div>
                  <div className="text-green-300">
                    <div>
                      <GlitchText>{"{"}</GlitchText>
                    </div>
                    <div className="pl-4">
                      <span>
                        "<GlitchText>name</GlitchText>"
                      </span>
                      :{" "}
                      <span>
                        "<GlitchText>Kijtisak Pangmee</GlitchText>"
                      </span>
                      ,
                      <br />
                      <span>
                        "<GlitchText>role</GlitchText>"
                      </span>
                      :{" "}
                      <span>
                        "<GlitchText>Software Developer</GlitchText>"
                      </span>
                      ,
                      <br />
                      <span>
                        "<GlitchText>location</GlitchText>"
                      </span>
                      :{" "}
                      <span>
                        "<GlitchText>Bangkok, Thailand</GlitchText>"
                      </span>
                      ,
                      <br />
                      <span>
                        "<GlitchText>status</GlitchText>"
                      </span>
                      :{" "}
                      <span>
                        "<GlitchText>Available for opportunities</GlitchText>"
                      </span>
                    </div>
                    <div>
                      <GlitchText>{"}"}</GlitchText>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div className="flex flex-wrap gap-4" variants={fadeInUp}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="bg-green-400 text-black hover:bg-green-300 border border-green-400 font-mono transition-all duration-300">
                    <Download className="w-4 h-4 mr-2" />
                    <GlitchText>Download CV</GlitchText>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    className="border-green-400 text-green-400 hover:bg-green-400/10 bg-transparent font-mono transition-all duration-300"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    <GlitchText>Contact Me</GlitchText>
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div className="flex space-x-4" variants={fadeInUp}>
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
              </motion.div>
            </motion.div>

            {/* Terminal Window */}
            <motion.div
              className="bg-black border-2 border-green-400/30 rounded-lg overflow-hidden shadow-lg relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 to-transparent"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between px-4 py-2 bg-green-400/10 border-b border-green-400/20">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  </div>
                  <div className="text-sm text-green-400 font-mono">
                    <GlitchText>/dev/ttyS0</GlitchText>
                  </div>
                  <div className="w-16"></div>
                </div>

                <div className="p-4 h-80 overflow-y-auto bg-black">
                  <div className="space-y-2 text-sm font-mono">
                    {terminalHistory.map((line, index) => (
                      <motion.div
                        key={index}
                        className={line.startsWith("$") ? "text-green-400" : "text-green-300"}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <GlitchText>{line}</GlitchText>
                      </motion.div>
                    ))}

                    <div className="flex items-center space-x-2">
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
                        className="flex-1 bg-transparent border-none outline-none text-green-400 font-mono"
                        placeholder="Type a command..."
                        autoFocus
                      />
                      <div className="w-2 h-4 bg-green-400 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="flex justify-center mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.5 }}
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              <ChevronDown className="w-6 h-6 text-green-400" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <AnimatedSection
        id="about"
        className="w-full p-8 bg-gradient-to-br from-green-900/20 via-green-800/10 to-green-900/20 rounded-2xl mb-8 md:mb-12 mx-auto max-w-[calc(100vw-2rem)] sm:max-w-[90vw] overflow-hidden relative z-10"
      >
        <div className="container mx-auto max-w-7xl w-full overflow-hidden">
          <motion.div
            className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-green-400/10 text-green-400 mb-4 border border-green-400/20"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-green-400">$</span>
            <span className="text-green-300">
              <GlitchText>cat</GlitchText>
            </span>
            <span className="text-green-500">
              <GlitchText>about.json</GlitchText>
            </span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-6"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <motion.h2 className="text-3xl font-bold text-green-400 min-h-[50px]" variants={fadeInUp}>
                <GlitchText persistent>ABOUT ME</GlitchText>
              </motion.h2>

              <motion.div
                className="bg-black border-2 border-green-400/20 rounded-lg p-6 relative overflow-hidden"
                variants={fadeInUp}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/5 to-transparent opacity-50"></div>
                <pre className="text-sm text-green-300 whitespace-pre-wrap font-mono relative z-10">
                  <span className="text-green-400">
                    <GlitchText>{"{"}</GlitchText>
                  </span>
                  <br />
                  &nbsp;&nbsp;
                  <span className="text-cyan-300">
                    "<GlitchText>name</GlitchText>"
                  </span>
                  :{" "}
                  <span className="text-amber-300">
                    "<GlitchText>Kijtisak Pangmee</GlitchText>"
                  </span>
                  ,
                  <br />
                  &nbsp;&nbsp;
                  <span className="text-cyan-300">
                    "<GlitchText>role</GlitchText>"
                  </span>
                  :{" "}
                  <span className="text-amber-300">
                    "<GlitchText>Software Developer</GlitchText>"
                  </span>
                  ,
                  <br />
                  &nbsp;&nbsp;
                  <span className="text-cyan-300">
                    "<GlitchText>address</GlitchText>"
                  </span>
                  :{" "}
                  <span className="text-amber-300">
                    "<GlitchText>Bangkapi, Bangkok, 10240</GlitchText>"
                  </span>
                  ,
                  <br />
                  &nbsp;&nbsp;
                  <span className="text-cyan-300">
                    "<GlitchText>phone</GlitchText>"
                  </span>
                  :{" "}
                  <span className="text-amber-300">
                    "<GlitchText>(+66) 80 733 0752</GlitchText>"
                  </span>
                  ,
                  <br />
                  &nbsp;&nbsp;
                  <span className="text-cyan-300">
                    "<GlitchText>email</GlitchText>"
                  </span>
                  :{" "}
                  <span className="text-amber-300">
                    "<GlitchText>kijtisak.pa@gmail.com</GlitchText>"
                  </span>
                  ,
                  <br />
                  &nbsp;&nbsp;
                  <span className="text-cyan-300">
                    "<GlitchText>education</GlitchText>"
                  </span>
                  :{" "}
                  <span className="text-green-400">
                    <GlitchText>{"{"}</GlitchText>
                  </span>
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="text-cyan-300">
                    "<GlitchText>degree</GlitchText>"
                  </span>
                  :{" "}
                  <span className="text-amber-300">
                    "<GlitchText>Bachelor Degree in Information Technology</GlitchText>"
                  </span>
                  ,
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="text-cyan-300">
                    "<GlitchText>university</GlitchText>"
                  </span>
                  :{" "}
                  <span className="text-amber-300">
                    "<GlitchText>Kasetsart University Sriracha Campus</GlitchText>"
                  </span>
                  ,
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="text-cyan-300">
                    "<GlitchText>period</GlitchText>"
                  </span>
                  :{" "}
                  <span className="text-amber-300">
                    "<GlitchText>June 2012 – June 2020</GlitchText>"
                  </span>
                  <br />
                  &nbsp;&nbsp;
                  <span className="text-green-400">
                    <GlitchText>{"}"}</GlitchText>
                  </span>
                  ,
                  <br />
                  &nbsp;&nbsp;
                  <span className="text-cyan-300">
                    "<GlitchText>languages</GlitchText>"
                  </span>
                  :{" "}
                  <span className="text-green-400">
                    <GlitchText>{"{"}</GlitchText>
                  </span>
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="text-cyan-300">
                    "<GlitchText>thai</GlitchText>"
                  </span>
                  :{" "}
                  <span className="text-amber-300">
                    "<GlitchText>native</GlitchText>"
                  </span>
                  ,
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="text-cyan-300">
                    "<GlitchText>english</GlitchText>"
                  </span>
                  :{" "}
                  <span className="text-amber-300">
                    "<GlitchText>good to read for work, still practicing to speak</GlitchText>"
                  </span>
                  <br />
                  &nbsp;&nbsp;
                  <span className="text-green-400">
                    <GlitchText>{"}"}</GlitchText>
                  </span>
                  <br />
                  <span className="text-green-400">
                    <GlitchText>{"}"}</GlitchText>
                  </span>
                </pre>
              </motion.div>

              <motion.p className="text-green-300 leading-relaxed font-mono" variants={fadeInUp}>
                <GlitchText>
                  I am Kijtisak Pangmee, a dedicated Software Developer based in Bangkok, Thailand. I specialize in
                  building robust and scalable applications, transforming complex challenges into elegant and efficient
                  solutions. My passion lies in continuous learning and delivering high-quality software.
                </GlitchText>
              </motion.p>
            </motion.div>

            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-64 h-64 rounded-full border-4 border-green-400/40 overflow-hidden shadow-lg relative">
                  <Image
                    src="/placeholder.svg?height=256&width=256"
                    alt="Kijtisak Pangmee Profile"
                    width={256}
                    height={256}
                    className="w-full h-full object-cover filter brightness-50 contrast-150"
                  />
                  <div className="absolute inset-0 bg-green-400/10"></div>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-green-400 text-black px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
                  <GlitchText>ONLINE</GlitchText>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Skills Section */}
      <AnimatedSection
        id="skills"
        className="w-full p-8 bg-gradient-to-br from-green-900/20 via-green-800/10 to-green-900/20 rounded-2xl mb-8 md:mb-12 mx-auto max-w-[calc(100vw-2rem)] sm:max-w-[90vw] overflow-hidden relative z-10"
      >
        <div className="container mx-auto max-w-7xl w-full overflow-hidden">
          <motion.div
            className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-green-400/10 text-green-400 mb-4 border border-green-400/20"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-green-400">$</span>
            <span className="text-green-300">
              <GlitchText>ls</GlitchText>
            </span>
            <span className="text-green-500">
              <GlitchText>skills/ --tree</GlitchText>
            </span>
          </motion.div>

          <div>
            <motion.h3
              className="text-xl font-semibold text-center lg:text-left mb-6 text-green-400"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <GlitchText persistent>SKILLSET</GlitchText>
            </motion.h3>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 w-full overflow-hidden"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {skillsData.map((category) => (
                <motion.div
                  key={category.title}
                  className="bg-black/50 border border-green-400/20 p-3 rounded-md shadow-lg relative overflow-hidden"
                  variants={fadeInUp}
                  whileHover={{
                    boxShadow: "0 10px 25px rgba(0, 255, 0, 0.1)",
                    borderColor: "rgba(0, 255, 0, 0.4)",
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <h4 className={`text-sm font-medium mb-2 ${category.color}`}>
                      <GlitchText>{category.title}</GlitchText>
                    </h4>
                    <ul className="space-y-1 text-sm">
                      {category.skills.map((skill) => (
                        <li key={skill} className="flex items-center gap-1">
                          <span className={category.color}>•</span>
                          <span className="text-green-300 hover:underline cursor-pointer transition-colors hover:text-green-200">
                            <GlitchText>{skill}</GlitchText>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Projects Section */}
      <AnimatedSection
        id="projects"
        className="w-full p-8 bg-gradient-to-br from-green-900/20 via-green-800/10 to-green-900/20 rounded-2xl mb-8 md:mb-12 mx-auto max-w-[calc(100vw-2rem)] sm:max-w-[90vw] overflow-hidden relative z-10"
      >
        <div className="container mx-auto max-w-7xl w-full overflow-hidden">
          <motion.div
            className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-green-400/10 text-green-400 mb-4 border border-green-400/20"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-green-400">$</span>
            <span className="text-green-300">
              <GlitchText>ls</GlitchText>
            </span>
            <span className="text-green-500">
              <GlitchText>projects/</GlitchText>
            </span>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp}>
              <Card className="bg-black/50 border border-green-400/20 hover:border-green-400/40 transition-all duration-300 h-full flex flex-col relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <CardHeader className="relative z-10">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-green-400 font-mono">
                      <GlitchText persistent>E-WEDDING CARD</GlitchText>
                    </CardTitle>
                    <Badge variant="outline" className="border-yellow-400 text-yellow-400 font-mono animate-pulse">
                      <GlitchText>DEVELOPING</GlitchText>
                    </Badge>
                  </div>
                  <CardDescription className="text-green-300 font-mono">
                    <GlitchText>
                      Bootstrapped file structure with Cursor using Next.js tech stack. Integrated Google Maps for venue
                      location, stored images on AWS S3, and set up GitHub Actions CI/CD for Vercel deployment.
                    </GlitchText>
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-auto relative z-10">
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {["Next.js", "React", "Google Maps API", "AWS S3", "GitHub Actions", "Vercel"].map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="bg-blue-400/10 text-blue-300 border border-blue-400/20 font-mono hover:bg-green-400/20 transition-colors"
                        >
                          <GlitchText>{tech}</GlitchText>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-green-400/50 text-green-300 hover:bg-green-400/10 bg-transparent font-mono transition-all duration-300"
                        >
                          <Github className="w-4 h-4 mr-2" />
                          <GlitchText>CODE</GlitchText>
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          size="sm"
                          className="bg-green-400 text-black hover:bg-green-300 font-mono transition-all duration-300"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          <GlitchText>DEMO</GlitchText>
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Experience Section */}
      <AnimatedSection
        id="experience"
        className="w-full p-8 bg-gradient-to-br from-green-900/20 via-green-800/10 to-green-900/20 rounded-2xl mb-8 md:mb-12 mx-auto max-w-[calc(100vw-2rem)] sm:max-w-[90vw] overflow-hidden relative z-10"
      >
        <div className="container mx-auto max-w-7xl w-full overflow-hidden">
          <motion.div
            className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-green-400/10 text-green-400 mb-4 border border-green-400/20"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-green-300 mr-2">$</span>
            <span>
              <GlitchText>tree experiences/</GlitchText>
            </span>
          </motion.div>

          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center lg:text-left font-mono"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            My{" "}
            <span className="text-green-400">
              <GlitchText persistent>Experiences</GlitchText>
            </span>
          </motion.h2>

          <div className="w-full">
            <div className="mt-8">
              <div className="relative">
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-green-400/20"></div>

                {[
                  {
                    title: "Full stack developer",
                    company: "99/133 Ladprao 18, Jompol, Chatuchak, Bangkok 10900",
                    period: "August 2023 – Present",
                    duration: "Ongoing",
                    location: "Bangkok, Thailand",
                    description:
                      "Developed a web-application frontend for event queue management using ReactTS. Contributed to multiple CMS projects (Backend Go, ReactTS/ExpressJS, Vue 2) by adding/modifying sprint-assigned features, integrating Auth0, refactoring codebase, and restructuring files for easier maintenance. Also worked on a Web Store/CMS (Vue 2 / PHP Laravel legacy code) adding features and unit tests across frontend and backend.",
                    current: true,
                    side: "left",
                  },
                  {
                    title: "Software Developer (Frontend | ReactJS/Prisma/NestJS)",
                    company: "BornToDev Co., Ltd., 144/25(A) 6th Floor, Khlong Chan Place, Bangkok",
                    period: "Mar 2022 – July 2023",
                    duration: "1 year 5 months",
                    location: "Bangkok, Thailand",
                    description:
                      "Developed JavaScript, HTML, CSS for web applications using Vue.js and ReactTS. Developed API services with NestJS and Prisma. Actively discussed UX/UI improvements and reported issues to graphic designers.",
                    current: false,
                    side: "right",
                  },
                  {
                    title: "Full Stack Developer (AngularJS, .NET Core 3.1 & 5.0)",
                    company: "Threesixty Supply Chain Co., Ltd., 7th Floor, Bangkok Tower, Bangkok",
                    period: "May 2021 – February 2022",
                    duration: "10 months",
                    location: "Bangkok, Thailand",
                    description:
                      "Developed TypeScript, HTML, CSS, and JavaScript for web application pages. Connected HTTP services from .NET Core backend API. Discussed UX/UI design with CTO and presented alternative designs. Developed API services for frontend web applications.",
                    current: false,
                    side: "left",
                  },
                  {
                    title: "C# ASP.NET Web Developer",
                    company: "Double P Enterprise Co., Ltd., RCA Rama 9, Bangkok",
                    period: "August 2018 – April 2021",
                    duration: "2 years 9 months",
                    location: "Bangkok, Thailand",
                    description:
                      "Designed and developed based on business analysis assignments. Fixed bugs in existing web applications. Utilized GIT for project management. Performed technical analyses for new feature development and maintained existing web applications. Developed .NET Core API using LINQ for SQL Server data manipulation (protected against SQL Injection) and .NET Framework API for CRUD operations via query statements. Responsible for setting up web applications and deployment on UAT and production client servers.",
                    current: false,
                    side: "right",
                  },
                ].map((job, index) => (
                  <div
                    key={index}
                    className={`relative flex items-center w-full mb-8 ${job.side === "left" ? "md:justify-start" : "md:justify-end"}`}
                  >
                    <motion.div
                      className="absolute left-0 md:left-1/2 transform -translate-x-1/2 z-10"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="relative flex items-center justify-center">
                        <div
                          className={`w-4 h-4 ${job.current ? "bg-green-400 animate-pulse" : "bg-green-500"} rounded-full border-2 border-black shadow-lg`}
                        ></div>

                        <div
                          className={`hidden md:block absolute whitespace-nowrap text-xs font-semibold text-green-300 ${job.side === "left" ? "left-6" : "right-6"}`}
                        >
                          <GlitchText>
                            {`${job.period} (${job.duration})`}
                          </GlitchText>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      className={`bg-black/60 backdrop-blur-sm border border-green-400/20 p-4 rounded-lg ml-8 md:ml-0 ${job.side === "left" ? "md:mr-auto md:ml-8" : "md:ml-auto md:mr-8"} w-full md:w-5/12 shadow-lg hover:border-green-400/40 transition-all duration-300 relative overflow-hidden group`}
                      initial={{ opacity: 0, x: job.side === "left" ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative z-10">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="text-green-400 font-semibold font-mono">
                              <GlitchText>{job.title}</GlitchText>
                            </h4>
                            <div className="text-lime-300 text-sm flex items-center gap-1 group">
                              <span className="hover:underline flex items-center gap-1 font-mono">
                                <GlitchText>{job.company}</GlitchText>
                                <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                              </span>
                            </div>
                          </div>
                          {job.current && (
                            <span className="text-xs bg-green-400/20 text-green-400 px-2 py-1 rounded border border-green-400/30 font-mono animate-pulse">
                              <GlitchText>Current</GlitchText>
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-3 text-xs text-green-300/70 mb-3 font-mono">
                          <span className="flex md:hidden items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <GlitchText>
                              {`${job.period} (${job.duration})`}
                            </GlitchText>
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            <GlitchText>{job.location}</GlitchText>
                          </span>
                        </div>

                        <p className="text-sm mb-3 text-green-300 leading-relaxed font-mono">
                          <HighlightKeywords text={job.description} keywordMap={skillColorMap} />
                        </p>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Contact Section */}
      <AnimatedSection
        id="contact"
        className="w-full p-8 bg-gradient-to-br from-green-900/20 via-green-800/10 to-green-900/20 rounded-2xl mb-8 md:mb-12 mx-auto max-w-[calc(100vw-2rem)] sm:max-w-[90vw] overflow-hidden relative z-10"
      >
        <div className="container mx-auto max-w-7xl w-full overflow-hidden">
          <motion.div
            className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-green-400/10 text-green-400 mb-4 border border-green-400/20"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-green-400">$</span>
            <span className="text-green-300">
              <GlitchText>curl</GlitchText>
            </span>
            <span className="text-green-500">
              <GlitchText>-X POST /contact</GlitchText>
            </span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              className="space-y-6"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-green-400 font-mono">
                CONTACT{" "}
                <span className="text-green-300">
                  <GlitchText persistent>INFO</GlitchText>
                </span>
              </motion.h2>

              <motion.div
                variants={fadeInUp}
                className="bg-black border-2 border-green-400/20 rounded-lg p-6 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/5 to-transparent opacity-50"></div>
                <div className="space-y-4 text-sm font-mono relative z-10">
                  {[
                    { icon: Mail, label: "EMAIL:", value: "kijtisak.pa@gmail.com" },
                    { icon: Phone, label: "PHONE:", value: "(+66) 80 733 0752" },
                    { icon: MapPin, label: "ADDRESS:", value: "Bangkapi, Bangkok, 10240" },
                    { icon: Github, label: "GITHUB:", value: "github.com/kijtisak" },
                    { icon: Linkedin, label: "LINKEDIN:", value: "linkedin.com/in/kijtisak" },
                  ].map((item, index) => (
                    <motion.div
                      key={item.label}
                      className="flex items-center space-x-2"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <item.icon className="w-4 h-4 text-green-400" />
                      <span className="text-green-300">
                        <GlitchText>{item.label}</GlitchText>
                      </span>
                      <span className="text-green-500">
                        <GlitchText>{item.value}</GlitchText>
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.p variants={fadeInUp} className="text-green-300 font-mono">
                <GlitchText>
                  I'm always open to discussing new opportunities, interesting projects, or just having a chat about
                  technology. Feel free to reach out!
                </GlitchText>
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="bg-black/50 border border-green-400/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 to-transparent opacity-50"></div>
                <CardHeader className="relative z-10">
                  <CardTitle className="text-green-400 flex items-center space-x-2 font-mono">
                    <MessageCircle className="w-5 h-5" />
                    <span>
                      <GlitchText>SEND MESSAGE</GlitchText>
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <form className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="text-green-300 font-mono">
                        <GlitchText>NAME</GlitchText>
                      </Label>
                      <Input
                        id="name"
                        className="bg-black/50 border-green-400/30 text-green-300 focus:border-green-400 focus:ring-green-400 focus:ring-1 font-mono transition-colors"
                        placeholder="Your name..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-green-300 font-mono">
                        <GlitchText>EMAIL</GlitchText>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        className="bg-black/50 border-green-400/30 text-green-300 focus:border-green-400 focus:ring-green-400 focus:ring-1 font-mono transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="message" className="text-green-300 font-mono">
                        <GlitchText>MESSAGE</GlitchText>
                      </Label>
                      <Textarea
                        id="message"
                        className="bg-black/50 border-green-400/30 text-green-300 focus:border-green-400 focus:ring-green-400 focus:ring-1 font-mono transition-colors"
                        placeholder="Your message..."
                        rows={4}
                      />
                    </div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button className="w-full bg-green-400 text-black hover:bg-green-300 font-mono transition-all duration-300">
                        <GlitchText>SEND MESSAGE</GlitchText>
                      </Button>
                    </motion.div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Footer */}
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
                <GlitchText>© 2024 Kijtisak Pangmee. All rights reserved.</GlitchText>
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
    </div>
  )
}
