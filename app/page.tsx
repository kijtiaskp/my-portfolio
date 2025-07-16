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
  Folder,
} from "lucide-react"
import Image from "next/image"

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
interface SkillCategory {
  title: string
  color: string
  skills: string[]
}

const skillsData: SkillCategory[] = [
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

// Helper function to get technology badge colors based on skillset categories
const getTechBadgeColor = (tech: string): { bgColor: string; textColor: string; borderColor: string } => {
  const techLower = tech.toLowerCase()

  // Frontend technologies
  if (['next.js', 'react', 'reactts', 'vue.js', 'angularjs', 'tailwindcss', 'reactjs', 'vue 2', 'vue.js'].some(t => techLower.includes(t.toLowerCase()))) {
    return { bgColor: 'bg-cyan-400/10', textColor: 'text-cyan-300', borderColor: 'border-cyan-400/20' }
  }

  // Backend technologies
  if (['expressjs', 'nestjs', '.net core', 'php laravel', 'prisma', '.net framework api', '.net framework', 'asp.net', 'laravel'].some(t => techLower.includes(t.toLowerCase()))) {
    return { bgColor: 'bg-orange-400/10', textColor: 'text-orange-300', borderColor: 'border-orange-400/20' }
  }

  // Programming languages
  if (['javascript', 'typescript', 'c# asp.net', 'go', 'php', 'html5', 'css3', 'css', 'html', 'c#'].some(t => techLower.includes(t.toLowerCase()))) {
    return { bgColor: 'bg-pink-400/10', textColor: 'text-pink-300', borderColor: 'border-pink-400/20' }
  }

  // Database technologies
  if (['t-sql', 'redis', 'sql server', 'dbeaver', 'pgadmin', 'linq'].some(t => techLower.includes(t.toLowerCase()))) {
    return { bgColor: 'bg-rose-400/10', textColor: 'text-rose-300', borderColor: 'border-rose-400/20' }
  }

  // DevOps & Tools
  if (['docker', 'github actions', 'aws s3', 'vercel', 'git command', 'git', 'crud', 'http', 'api', 'aws', 'github', 'ci/cd'].some(t => techLower.includes(t.toLowerCase()))) {
    return { bgColor: 'bg-indigo-300/10', textColor: 'text-indigo-300', borderColor: 'border-indigo-300/20' }
  }

  // Others - catch-all for miscellaneous technologies
  if (['google maps api', 'google maps', 'maps api', 'visual studio code', 'cursor', 'windsurf', 'postman', 'ai prompt', 'obs', 'auth0', 'ux/ui'].some(t => techLower.includes(t.toLowerCase()))) {
    return { bgColor: 'bg-teal-300/10', textColor: 'text-teal-300', borderColor: 'border-teal-300/20' }
  }

  // Default fallback
  return { bgColor: 'bg-green-400/10', textColor: 'text-green-300', borderColor: 'border-green-400/20' }
}

// Enhanced Matrix Rain Component
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
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=[]{}|\\:;\"'<>?,.~/`functionconstvarletnewreturnifelseforthisclassexportimportasyncawaitdefintfloatboolstring"
    const fontSize = 12
    const columns = canvas.width / fontSize

    const drops: number[] = []
    for (let i = 0; i < columns; i++) {
      drops[i] = 1
    }

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = matrixChars[Math.floor(Math.random() * matrixChars.length)]
        // Use our custom green color (#00ff88)
        ctx.fillStyle = `rgba(0, 255, 136, ${Math.random() * 0.8 + 0.2})`
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.98) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, 50)

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
      className="fixed inset-0 pointer-events-none z-0 opacity-20"
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
    { type: "output", content: "Linux portfolio-server 5.15.0-kijtisak #1 SMP" },
    { type: "output", content: "Last login: Loading..." },
    { type: "output", content: "Welcome to Kijtisak's development environment!" },
    { type: "info", content: "Type 'help' to see available commands." },
  ])
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Update the login date on client side only to prevent hydration mismatch
  useEffect(() => {
    setTerminalHistory(prev => prev.map((item, index) =>
      index === 1 ? { ...item, content: "Last login: " + new Date().toLocaleString() } : item
    ))
  }, [])

  const [heroName, setHeroName] = useState("KIJTISAK PANGMEE")

  // Array of subtitle texts to cycle through
  const subtitleTexts = [
    "SOFTWARE DEVELOPER",
    "GAMER",
    "SLEEPER",
    "POTTERHEAD",
  ]

  const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState(0)
  const { displayText: heroSubtitle } = useGlitchText(subtitleTexts[currentSubtitleIndex], true, true)

  // Auto-scroll terminal to bottom
  useEffect(() => {
    const terminal = document.getElementById("terminal-scroll")
    if (terminal) {
      terminal.scrollTop = terminal.scrollHeight
    }
  }, [terminalHistory])

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

  const commands: Record<string, { type: string; content: string }[]> = {
    help: [
      { type: "output", content: "Available commands:" },
      { type: "command", content: "whoami        - Display current user information" },
      { type: "command", content: "ls -la        - List skills and technologies" },
      { type: "command", content: "cat projects  - Show project portfolio" },
      { type: "command", content: "tail -f logs  - View work experience" },
      { type: "command", content: "ping contact  - Get contact information" },
      { type: "command", content: "clear         - Clear terminal history" },
      { type: "command", content: "neofetch      - Display system information" },
    ],
    whoami: [
      { type: "output", content: "kijtisak" },
    ],
    neofetch: [
      { type: "output", content: "                   -/+oossssoo+/-" },
      { type: "output", content: "               `:+ssssssssssssssss+:`" },
      { type: "output", content: "             -+ssssssssssssssssssss+-     OS: Kijtisak Linux" },
      { type: "output", content: "           -+sssssssssssssssssssssss+-   Host: Software Developer" },
      { type: "output", content: "         -+sssssssssssssssssssssssss+-   Kernel: 5+ years experience" },
      { type: "output", content: "        `+sssssssssssssssssssssssss+`    Uptime: Available for hire" },
      { type: "output", content: "        -+sssssssssssssssssssssss+-      Packages: JavaScript, TypeScript, React" },
      { type: "output", content: "         .+sssssssssssssssssss+.        Shell: /bin/bash" },
      { type: "output", content: "           `+sssssssssssssss+`          Terminal: portfolio-terminal" },
      { type: "output", content: "             `:+ssssssss+:`             Location: Bangkok, Thailand" },
    ],
    ls: [
      { type: "output", content: "total 42" },
      { type: "output", content: "drwxr-xr-x  2 kijtisak dev  4096 Dec 15 2024 programming/" },
      { type: "output", content: "drwxr-xr-x  2 kijtisak dev  4096 Dec 15 2024 frontend/" },
      { type: "output", content: "drwxr-xr-x  2 kijtisak dev  4096 Dec 15 2024 backend/" },
      { type: "output", content: "drwxr-xr-x  2 kijtisak dev  4096 Dec 15 2024 database/" },
      { type: "output", content: "drwxr-xr-x  2 kijtisak dev  4096 Dec 15 2024 devops/" },
      { type: "output", content: "-rw-r--r--  1 kijtisak dev  1337 Dec 15 2024 resume.pdf" },
    ],
    projects: [
      { type: "output", content: "=== PROJECT PORTFOLIO ===" },
      { type: "output", content: "" },
      { type: "output", content: "[ACTIVE] e-wedding-card.git" },
      { type: "output", content: "├── language: TypeScript 87.3%" },
      { type: "output", content: "├── framework: Next.js 14.x" },
      { type: "output", content: "├── services: Google Maps API, AWS S3" },
      { type: "output", content: "├── deployment: Vercel" },
      { type: "output", content: "├── pipeline: GitHub Actions CI/CD" },
      { type: "output", content: "└── status: development branch" },
      { type: "output", content: "" },
      { type: "info", content: "git clone --depth=1 projects/*.git" },
    ],
    experience: [
      { type: "output", content: "=== WORK EXPERIENCE LOG ===" },
      { type: "output", content: "" },
      { type: "output", content: "[2023-Present] Full Stack Developer" },
      { type: "output", content: "  └─ ReactTS, Go, Vue.js, Auth0, PHP Laravel" },
      { type: "output", content: "" },
      { type: "output", content: "[2022-2023] Software Developer - BornToDev" },
      { type: "output", content: "  └─ Vue.js, ReactTS, NestJS, Prisma" },
      { type: "output", content: "" },
      { type: "output", content: "[2021-2022] Full Stack Developer - Threesixty" },
      { type: "output", content: "  └─ AngularJS, .NET Core 3.1 & 5.0" },
      { type: "output", content: "" },
      { type: "output", content: "[2018-2021] C# ASP.NET Developer - Double P" },
      { type: "output", content: "  └─ .NET Framework, SQL Server, LINQ" },
    ],
    contact: [
      { type: "output", content: "=== NETWORK INTERFACES ===" },
      { type: "output", content: "" },
      { type: "output", content: "eth0: email    -> kijtisak.pa@gmail.com" },
      { type: "output", content: "eth1: phone    -> (+66) 80 733 0752" },
      { type: "output", content: "eth2: location -> Bangkapi, Bangkok, 10240" },
      { type: "output", content: "eth3: github   -> github.com/kijtisak" },
      { type: "output", content: "eth4: linkedin -> linkedin.com/in/kijtisak" },
      { type: "output", content: "" },
      { type: "info", content: "All interfaces are UP and RUNNING" },
    ],
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

  // Cycle through subtitle texts
  useEffect(() => {
    const subtitleInterval = setInterval(() => {
      setCurrentSubtitleIndex((prevIndex) =>
        (prevIndex + 1) % subtitleTexts.length
      )
    }, 3000) // Change every 3 seconds

    return () => clearInterval(subtitleInterval)
  }, [subtitleTexts.length])

  const handleCommand = (cmd: string) => {
    const command = cmd.toLowerCase().trim()

    // Check if command is valid first
    let responseKey = command
    if (command === "ls -la" || command === "ls") responseKey = "ls"
    if (command === "cat projects" || command === "projects") responseKey = "projects"
    if (command === "tail -f logs" || command === "logs" || command === "history") responseKey = "experience"
    if (command === "ping contact") responseKey = "contact"

    const isValidCommand = command === "clear" || commands[responseKey]

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

    const responses = commands[responseKey]
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
              {[
                { href: "#about", text: "whoami", prefix: "$" },
                { href: "#projects", text: "ls -la projects/", prefix: "$" },
                { href: "#experience", text: "cat experience.log", prefix: "$" },
                { href: "#contact", text: "curl -X POST /contact", prefix: "$" },
              ].map((item, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <button
                    onClick={() => {
                      const element = document.querySelector(item.href)
                      if (element) {
                        element.scrollIntoView({
                          behavior: 'smooth',
                          block: 'start'
                        })
                      }
                    }}
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
              {[
                { href: "#about", text: "whoami", prefix: "$" },
                { href: "#projects", text: "ls -la projects/", prefix: "$" },
                { href: "#experience", text: "cat experience.log", prefix: "$" },
                { href: "#contact", text: "curl -X POST /contact", prefix: "$" },
              ].map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    const element = document.querySelector(item.href)
                    if (element) {
                      element.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                      })
                    }
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

      {/* Hero Section */}
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
              {/* Profile Visual */}
              <motion.div
                className="relative mb-8 flex justify-center lg:justify-end"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <div className="relative">
                  <motion.div
                    className="w-48 h-48 rounded-2xl bg-gradient-to-br from-green-400/20 to-slate-800/50 border-2 border-green-400/40 flex items-center justify-center shadow-2xl relative overflow-hidden"
                    whileHover={{ scale: 1.05, rotateY: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {/* Animated background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-cyan-400/10"
                      animate={{
                        background: [
                          "linear-gradient(45deg, rgba(0,255,136,0.1), rgba(0,255,255,0.1))",
                          "linear-gradient(135deg, rgba(0,255,255,0.1), rgba(0,255,136,0.1))",
                          "linear-gradient(45deg, rgba(0,255,136,0.1), rgba(0,255,255,0.1))"
                        ]
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    />
                    <span className="text-8xl font-bold text-green-400 relative z-10">
                      <GlitchText>K</GlitchText>
                    </span>
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
            <span className="text-green-300 mx-1">
              <GlitchText>cat /proc/cpuinfo</GlitchText>
            </span>
            <span className="text-green-500">
              <GlitchText>| grep "model name"</GlitchText>
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
                <GlitchText persistent>SYSTEM INFORMATION</GlitchText>
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
            <span className="text-green-300 mx-1">
              <GlitchText>find /usr/local/bin</GlitchText>
            </span>
            <span className="text-green-500">
              <GlitchText>-type f -executable</GlitchText>
            </span>
          </motion.div>

          <div>
            <motion.h3
              className="text-xl font-semibold text-center lg:text-left mb-6 text-green-400"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <GlitchText persistent>INSTALLED PACKAGES</GlitchText>
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
                  <div className="relative z-10 font-mono text-sm">
                                          <div className={`flex items-center gap-2 mb-2 ${category.color}`}>
                        <Folder className="w-4 h-4 text-green-400" />
                        <span className="font-semibold">
                          <GlitchText>{`${category.title.toLowerCase()}/`}</GlitchText>
                        </span>
                      </div>

                    <div className="ml-4 space-y-1">
                      {category.skills.map((skill: string, skillIndex: number) => (
                        <div key={skill} className="flex items-start gap-2 group">
                          <span className="text-green-400 flex-shrink-0 mt-0.5">
                            {skillIndex === category.skills.length - 1 ? "└──" : "├──"}
                          </span>
                          <div className="flex-1 min-w-0">
                            <span className="text-green-300 group-hover:text-green-200 transition-colors cursor-pointer text-xs break-words">
                              <GlitchText>{skill}</GlitchText>
                              <span className="text-green-400/50">
                                <GlitchText>.exe</GlitchText>
                              </span>
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
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
            <span className="text-green-300 mx-1">
              <GlitchText>git log --oneline</GlitchText>
            </span>
            <span className="text-green-500">
              <GlitchText>--graph --all</GlitchText>
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
                      {["Next.js", "React", "Google Maps API", "AWS S3", "GitHub Actions", "Vercel"].map((tech) => {
                        const { bgColor, textColor, borderColor } = getTechBadgeColor(tech)
                        return (
                          <Badge
                            key={tech}
                            variant="secondary"
                            className={`${bgColor} ${textColor} border ${borderColor} font-mono hover:bg-green-400/20 transition-colors`}
                          >
                            <GlitchText>{tech}</GlitchText>
                          </Badge>
                        )
                      })}
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
            <span className="text-green-400">$</span>
            <span className="text-green-300 mx-1">
              <GlitchText>tail -f /var/log/career.log</GlitchText>
            </span>
            <span className="text-green-500">
              <GlitchText>| grep -E "^[0-9]"</GlitchText>
            </span>
          </motion.div>

          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center lg:text-left font-mono"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-green-400">
              <GlitchText persistent>PROCESS HISTORY</GlitchText>
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
                      className="absolute left-[-8px] md:left-[49.4%] transform -translate-x-1/2 z-10"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="relative flex items-center justify-center">
                        <div
                          className={`w-4 h-4 ${job.current ? "bg-green-400 animate-pulse" : "bg-green-500"} rounded-full shadow-lg`}
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
            <span className="text-green-300 mx-1">
              <GlitchText>netstat -tuln</GlitchText>
            </span>
            <span className="text-green-500">
              <GlitchText>| grep :80</GlitchText>
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
                <span className="text-green-400">
                  <GlitchText persistent>NETWORK INTERFACES</GlitchText>
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
    </div>
  )
}
