export interface Experience {
  title: string
  company: string
  period: string
  duration: string
  location: string
  description: string
  technologies: string[]
  current?: boolean
}

export interface Project {
  title: string
  description: string
  technologies: string[]
  status: "active" | "completed" | "developing"
  url?: string
  featured?: boolean
}

export interface SkillGroup {
  category: string
  items: string[]
}

export interface Education {
  degree: string
  field: string
  school: string
}

export interface Social {
  label: string
  href: string
}
