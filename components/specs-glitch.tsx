"use client"

import { useState, useEffect } from "react"
import { GlitchText } from "@/components/glitch-text"

interface SpecsGlitchProps {
  className?: string
}

export const SpecsGlitch = ({ className = "" }: SpecsGlitchProps) => {
  const [currentSpecs, setCurrentSpecs] = useState(0)
  const [glitchStates, setGlitchStates] = useState({
    model: false,
    processor: false,
    memory: false,
    storage: false,
    usage: false,
    gpu: false,
    display: false
  })

  const systems = [
    // MacBook + Linux/macOS
    {
      commands: {
        model: "$ system_profiler SPHardwareDataType | grep 'Model Identifier'",
        processor: "$ sysctl -n machdep.cpu.brand_string",
        memory: "$ system_profiler SPHardwareDataType | grep 'Memory:'",
        storage: "$ df -h / | tail -1 | awk '{print $3\"/\"$2\" (\"$5\")\"}'",
        gpu: "$ system_profiler SPDisplaysDataType | grep 'Chipset Model'",
        display: "$ system_profiler SPDisplaysDataType | grep 'Resolution'"
      },
      specs: {
        model: "MacBook Pro M1 Pro",
        processor: "Apple M1 Pro (8-core CPU)",
        memory: "16GB Unified Memory",
        storage: "512GB SSD",
        gpu: "14-core GPU",
        display: "Liquid Retina XDR 3024x1964"
      },
      usage: "299GB / 460GB (65%)",
      usagePercent: 65
    },
    // Gaming PC + Windows
    {
      commands: {
        model: "C:\\> Get-WmiObject -Class Win32_ComputerSystem | Select-Object Model",
        processor: "C:\\> Get-WmiObject -Class Win32_Processor | Select-Object Name",
        memory: "C:\\> Get-WmiObject -Class Win32_PhysicalMemory | Measure-Object -Property Capacity -Sum",
        storage: "C:\\> Get-WmiObject -Class Win32_LogicalDisk | Where-Object {$_.DriveType -eq 3}",
        gpu: "C:\\> Get-WmiObject -Class Win32_VideoController | Select-Object Name",
        display: "C:\\> Get-WmiObject -Class Win32_VideoController | Select-Object VideoModeDescription"
      },
      specs: {
        model: "Custom Gaming PC",
        processor: "Intel Core i9-13900K (24-core)",
        memory: "32GB DDR5-6000",
        storage: "2TB NVMe SSD",
        gpu: "RTX 4090 24GB",
        display: "4K 144Hz Gaming Monitor"
      },
      usage: "1.2TB / 2TB (60%)",
      usagePercent: 60
    }
  ]

  const triggerCascadingGlitch = (changeText = false) => {
    const sections = ['model', 'processor', 'memory', 'storage', 'usage', 'gpu', 'display']
    const glitchDelay = 100 // Delay between each section glitch

    sections.forEach((section, index) => {
      setTimeout(() => {
        setGlitchStates(prev => ({ ...prev, [section]: true }))

        // Change text during the glitch of each section
        if (changeText) {
          setTimeout(() => {
            setCurrentSpecs((prev) => (prev + 1) % systems.length)
          }, 200) // Change text in the middle of this section's glitch
        }

        // Stop glitch for this section after 400ms
        setTimeout(() => {
          setGlitchStates(prev => ({ ...prev, [section]: false }))
        }, 400)
      }, index * glitchDelay)
    })
  }

  useEffect(() => {
    const interval = setInterval(() => {
      // Phase 1: Quick cascading glitch (no text change)
      triggerCascadingGlitch(false)

      setTimeout(() => {
        // Phase 2: Second cascading glitch with text change
        triggerCascadingGlitch(true)
      }, 1000) // Wait 1 second between glitch phases
    }, 8000) // Switch every 8 seconds (longer for reading)

    return () => clearInterval(interval)
  }, [systems.length])

  const currentSystem = systems[currentSpecs]
  const isAnyGlitching = Object.values(glitchStates).some(state => state)

  return (
    <div className={`space-y-3 ${className}`}>
      <div>
        <div className="text-green-300/30">
          <GlitchText persistent={glitchStates.model} inverse={true}>
            {currentSystem.commands.model}
          </GlitchText>
        </div>
        <div className="text-green-200/30 text-xs ml-2">
          <GlitchText persistent={glitchStates.model} inverse={true}>
            {currentSystem.specs.model}
          </GlitchText>
        </div>
      </div>

      <div>
        <div className="text-green-300/30">
          <GlitchText persistent={glitchStates.processor} inverse={true}>
            {currentSystem.commands.processor}
          </GlitchText>
        </div>
        <div className="text-green-200/30 text-xs ml-2">
          <GlitchText persistent={glitchStates.processor} inverse={true}>
            {currentSystem.specs.processor}
          </GlitchText>
        </div>
      </div>

      <div>
        <div className="text-green-300/30">
          <GlitchText persistent={glitchStates.memory} inverse={true}>
            {currentSystem.commands.memory}
          </GlitchText>
        </div>
        <div className="text-green-200/30 text-xs ml-2">
          <GlitchText persistent={glitchStates.memory} inverse={true}>
            {currentSystem.specs.memory}
          </GlitchText>
        </div>
      </div>

      <div className="space-y-2">
        <div>
          <div className="text-green-300/30">
            <GlitchText persistent={glitchStates.storage} inverse={true}>
              {currentSystem.commands.storage}
            </GlitchText>
          </div>
          <div className="text-green-200/30 text-xs ml-2">
            <GlitchText persistent={glitchStates.storage} inverse={true}>
              {currentSystem.specs.storage}
            </GlitchText>
          </div>
        </div>
        <div className="space-y-1 ml-2">
          <div className="flex justify-between text-xs">
            <span className="text-green-400/30">
              <GlitchText persistent={glitchStates.usage} inverse={true}>
                USAGE:
              </GlitchText>
            </span>
            <span className="text-green-200/30">
              <GlitchText persistent={glitchStates.usage} inverse={true}>
                {currentSystem.usage}
              </GlitchText>
            </span>
          </div>
          <div className="relative">
            <div className="h-2 bg-green-900/20 border border-green-300/20 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ease-out ${isAnyGlitching ? 'bg-cyan-400/60' : 'bg-green-300/30'
                  }`}
                style={{ width: `${currentSystem.usagePercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="text-green-300/30">
          <GlitchText persistent={glitchStates.gpu} inverse={true}>
            {currentSystem.commands.gpu}
          </GlitchText>
        </div>
        <div className="text-green-200/30 text-xs ml-2">
          <GlitchText persistent={glitchStates.gpu} inverse={true}>
            {currentSystem.specs.gpu}
          </GlitchText>
        </div>
      </div>

      <div>
        <div className="text-green-300/30">
          <GlitchText persistent={glitchStates.display} inverse={true}>
            {currentSystem.commands.display}
          </GlitchText>
        </div>
        <div className="text-green-200/30 text-xs ml-2">
          <GlitchText persistent={glitchStates.display} inverse={true}>
            {currentSystem.specs.display}
          </GlitchText>
        </div>
      </div>
    </div>
  )
} 