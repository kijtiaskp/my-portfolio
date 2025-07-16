export interface SkillCategory {
  title: string
  color: string
  skills: string[]
}

export interface Experience {
  title: string
  company: string
  period: string
  duration: string
  location: string
  description: string
  technologies: string[]
  current: boolean
  side: "left" | "right"
}

export interface Project {
  title: string
  description: string
  technologies: string[]
  status: "active" | "completed" | "developing"
  githubUrl?: string
  demoUrl?: string
  featured?: boolean
}

export interface TerminalHistoryItem {
  type: "output" | "command" | "invalid-command" | "error" | "info"
  content: string
}

export interface ContactInfo {
  email: string
  phone: string
  address: string
  github: string
  linkedin: string
}

export interface NavigationItem {
  href: string
  text: string
  prefix: string
}

export interface SocialLink {
  icon: any // LucideIcon type
  label: string
  color: string
  url?: string
}

export interface TechBadgeColors {
  bgColor: string
  textColor: string
  borderColor: string
}

export interface AnimationVariants {
  initial: any
  animate: any
  transition?: any
}

export interface Command {
  type: string
  content: string
}

export interface Commands {
  [key: string]: Command[]
} 