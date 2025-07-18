"use client"

import React, { useState, useEffect } from "react"
import { terminalCommands } from "@/data/portfolio-data"
import { TerminalHistoryItem } from "@/types/portfolio"

interface InteractiveTerminalProps {
  className?: string
}

export const InteractiveTerminal = ({ className = "" }: InteractiveTerminalProps) => {
  const [currentCommand, setCurrentCommand] = useState("")
  const [terminalHistory, setTerminalHistory] = useState<TerminalHistoryItem[]>([
    { type: "output", content: "Linux portfolio-server 5.15.0-kijtisak #1 SMP" },
    { type: "output", content: "Last login: Loading..." },
    { type: "output", content: "Welcome to Kijtisak's development environment!" },
    { type: "info", content: "Type 'help' to see available commands." },
  ])

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
        setTerminalHistory((prev) => [...prev, ...responses as TerminalHistoryItem[]])
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
    <div className={`code-block rounded-xl overflow-hidden relative shadow-2xl ${className}`}>
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
  )
}
