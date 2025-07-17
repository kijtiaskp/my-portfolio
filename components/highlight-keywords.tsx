"use client"

import React from "react"
import { createSkillColorMap } from "@/data/portfolio-data"

interface HighlightKeywordsProps {
  text: string
  className?: string
}

// Component to highlight skills in text
export const HighlightKeywords = ({ text, className = "" }: HighlightKeywordsProps) => {
  const skillColorMap = createSkillColorMap()

  // Create skill aliases for better matching
  const skillAliases: Record<string, string> = {
    'reactts': 'react (js/ts)',
    'react': 'react (js/ts)',
    'typescript': 'typescript',
    'javascript': 'javascript',
    'vue.js': 'vue.js (v. 2/3)',
    'vue': 'vue.js (v. 2/3)',
    'angularjs': 'angular',
    'angular': 'angular',
    'nestjs': 'nestjs',
    'express.js': 'express.js',
    'express': 'express.js',
    'php': 'php',
    'laravel': 'laravel',
    'go': 'go',
    'html': 'html5',
    'html5': 'html5',
    'css': 'css3',
    'css3': 'css3',
    '.net core': '.net core',
    '.net framework': '.net framework',
    'asp.net': 'c# asp.net',
    'c#': 'c# asp.net',
    'git': 'git',
    'auth0': 'auth0',
    'prisma': 'prisma',
    'next.js': 'next.js',
    'tailwindcss': 'tailwindcss',
    'sql server': 'sql server',
    'linq': 'linq'
  }

  // Separate patterns for .NET technologies (no word boundaries) and other skills
  const dotNetPatterns = ['.net core', '.net framework']
  const otherPatterns = [
    ...Object.keys(skillColorMap).filter(skill => !dotNetPatterns.includes(skill)),
    ...Object.keys(skillAliases).filter(alias => !dotNetPatterns.includes(alias))
  ]

  // Sort by length (longest first) to match longer terms first
  const sortedOtherPatterns = otherPatterns.sort((a, b) => b.length - a.length)

  // Create regex patterns
  const escapedDotNetPatterns = dotNetPatterns.map(s =>
    s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  )
  const escapedOtherPatterns = sortedOtherPatterns.map(s =>
    s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  )

  // Combine patterns: .NET patterns without word boundaries, others with word boundaries
  const dotNetRegex = new RegExp(`(${escapedDotNetPatterns.join('|')})`, 'gi')
  const otherRegex = new RegExp(`\\b(${escapedOtherPatterns.join('|')})\\b`, 'gi')

  // First split by .NET patterns, then by other patterns
  let parts = text.split(dotNetRegex)

  // Process each part for other patterns
  parts = parts.map(part => {
    if (!part) return part
    const subParts = part.split(otherRegex)
    return subParts
  }).flat()

  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (!part) return null

        const lowerPart = part.toLowerCase()
        const aliasedSkill = skillAliases[lowerPart] || lowerPart
        const color = skillColorMap[aliasedSkill]

        if (color) {
          return (
            <span key={index} className={`text-${color} font-semibold`}>
              {part}
            </span>
          )
        }

        return <span key={index}>{part}</span>
      })}
    </span>
  )
}
