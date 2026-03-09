import type { Experience, Project, SkillGroup, Social, Education } from "@/types"

export const profile = {
  name: "Kijtisak Pangmee",
  title: "Full Stack Developer",
  summary:
    "Experienced in CMS and Frontend E-Commerce development. " +
    "Backend stacks change with every project — I adapt fast. " +
    "5+ years shipping production software across IT solutions, startups, " +
    "edtech, and software houses in Bangkok. " +
    "Currently working full-time and freelancing after hours.",
  email: "kijtisak.pa@gmail.com",
  phone: "(+66) 80 733 0752",
  location: "Bangkapi, Bangkok, 10240",
}

export const socials: Social[] = [
  { label: "GitHub", href: "https://github.com/kijtisak" },
  { label: "LinkedIn", href: "https://linkedin.com/in/kijtisak" },
]

export const subtitleTexts = [
  "Full Stack Developer",
  "Software Developer",
  "Programmer",
  "Gamer",
  "Sleeper",
  "Potterhead",
]

export const education: Education = {
  degree: "Bachelor's Degree",
  field: "Information Technology",
  school: "Kasetsart University",
}

export const experiences: Experience[] = [
  {
    title: "Full Stack Developer",
    company: "Apppi Co., Ltd.",
    period: "Aug 2023 – Present",
    duration: "2 yrs 8 mos",
    location: "Bangkok, Thailand",
    description:
      "Built event queue management frontend for a Google event using React/TypeScript + Cloudflare. " +
      "Developed backend reporting with Golang for Line LFC. " +
      "Delivered outsourced frontend for CJ using React/TypeScript + Golang. " +
      "Outsourced to Ascend for True Store e-commerce — started with Vue 2 + PHP Laravel, " +
      "then migrated to a new product using Nuxt.js with Commercetools and ContentStack, " +
      "deployed via AWS CI/CD. Built a secret QA tool that auto-displays 170+ report fields " +
      "for rapid validation without Postman. " +
      "Also built SCG cost management dashboard frontend using React/TypeScript.",
    technologies: ["React", "TypeScript", "Go", "Vue.js", "Nuxt.js", "PHP", "Laravel", "AWS", "Commercetools", "ContentStack"],
    current: true,
  },
  {
    title: "Software Developer",
    company: "BornToDev Co., Ltd.",
    period: "Mar 2022 – Jul 2023",
    duration: "1 yr 5 mos",
    location: "Bangkok, Thailand",
    description:
      "Outsourced to Ascend to work on True Store e-commerce platform. " +
      "Added features to the BornToDev learning platform using React/TypeScript " +
      "with NestJS + Prisma on the backend.",
    technologies: ["React", "TypeScript", "Vue.js", "NestJS", "Prisma", "MySQL"],
    current: false,
  },
  {
    title: "Full Stack Developer",
    company: "360TRUCK",
    period: "May 2021 – Feb 2022",
    duration: "10 mos",
    location: "Bangkok, Thailand",
    description:
      "Added features as assigned using AngularJS and .NET Core 3.1 & 5.0 " +
      "for the logistics platform's web application.",
    technologies: ["Angular", "TypeScript", ".NET Core", "C#"],
    current: false,
  },
  {
    title: "Web Developer",
    company: "Double P Enterprise",
    period: "Aug 2018 – Apr 2021",
    duration: "2 yrs 9 mos",
    location: "Bangkok, Thailand",
    description:
      "Primarily worked with C# ASP.NET and .NET Core API. " +
      "Built features across web applications with some Angular and brief Android development. " +
      "Introduced Git version control to the organization and trained the team on its usage.",
    technologies: ["C#", ".NET Core", ".NET Framework", "SQL Server", "Angular", "Git"],
    current: false,
  },
]

export const skills: SkillGroup[] = [
  {
    category: "Languages",
    items: ["TypeScript", "JavaScript", "Go", "C#", "PHP"],
  },
  {
    category: "Frontend",
    items: ["React", "Next.js", "Vue.js", "Nuxt.js", "Angular", "Tailwind CSS", "HTML5", "CSS3"],
  },
  {
    category: "Backend",
    items: [".NET Core", ".NET Framework", "Express.js", "NestJS", "Laravel", "Prisma"],
  },
  {
    category: "Data & APIs",
    items: ["SQL Server", "MySQL", "Redis", "REST API", "GraphQL"],
  },
  {
    category: "Infrastructure",
    items: ["AWS", "AWS S3", "Docker", "CI/CD", "GitHub Actions", "Git", "GitHub", "GitLab"],
  },
  {
    category: "Services",
    items: ["Auth0", "Commercetools", "ContentStack", "Google Maps API", "Cloudflare"],
  },
]

export const projects: Project[] = [
  {
    title: "E-Wedding Card",
    description:
      "Bootstrapped file structure with Cursor using Next.js tech stack. " +
      "Integrated Google Maps for venue location, stored images on AWS S3, " +
      "and set up GitHub Actions CI/CD for GitHub Pages deployment.",
    technologies: ["Next.js", "React", "Google Maps API", "AWS S3", "GitHub Actions", "GitHub Pages"],
    status: "developing",
    featured: true,
  },
]

export const navItems = ["About", "Experience", "Skills", "Projects", "Contact"]
