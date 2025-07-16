import { TechBadgeColors } from "@/types/portfolio"
import { skillsData } from "@/data/portfolio-data"

// Color mapping based on skillsData categories
const skillCategoryColors = {
  'text-pink-400': {
    bgColor: 'bg-pink-400/10',
    textColor: 'text-pink-300',
    borderColor: 'border-pink-400/20'
  },
  'text-cyan-400': {
    bgColor: 'bg-cyan-400/10',
    textColor: 'text-cyan-300',
    borderColor: 'border-cyan-400/20'
  },
  'text-orange-400': {
    bgColor: 'bg-orange-400/10',
    textColor: 'text-orange-300',
    borderColor: 'border-orange-400/20'
  },
  'text-rose-400': {
    bgColor: 'bg-rose-400/10',
    textColor: 'text-rose-300',
    borderColor: 'border-rose-400/20'
  },
  'text-indigo-300': {
    bgColor: 'bg-indigo-300/10',
    textColor: 'text-indigo-300',
    borderColor: 'border-indigo-300/20'
  },
  'text-teal-300': {
    bgColor: 'bg-teal-300/10',
    textColor: 'text-teal-300',
    borderColor: 'border-teal-300/20'
  }
}

// Helper function to get technology badge colors based on skillset categories from skillsData
export const getTechBadgeColor = (tech: string): TechBadgeColors => {
  const techLower = tech.toLowerCase()
  
  // Find the technology in skillsData categories
  for (const category of skillsData) {
    const foundSkill = category.skills.find(skill => 
      skill.toLowerCase() === techLower || 
      techLower.includes(skill.toLowerCase()) ||
      skill.toLowerCase().includes(techLower)
    )
    
    if (foundSkill) {
      // Use predefined color mapping based on category color
      const colorConfig = skillCategoryColors[category.color as keyof typeof skillCategoryColors]
      if (colorConfig) {
        return colorConfig
      }
    }
  }

  // Default fallback for unmatched technologies
  return { bgColor: 'bg-green-400/10', textColor: 'text-green-300', borderColor: 'border-green-400/20' }
}

// Create skill color map for keyword highlighting
export const createSkillColorMap = () => {
  return skillsData.reduce(
    (acc, category) => {
      category.skills.forEach((skill) => {
        acc[skill.toLowerCase()] = category.color
      })
      return acc
    },
    {} as Record<string, string>,
  )
}

// Scroll to element helper
export const scrollToElement = (selector: string) => {
  const element = document.querySelector(selector)
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }
} 