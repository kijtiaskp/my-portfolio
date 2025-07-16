import { 
  SkillCategory, 
  Experience, 
  NavigationItem, 
  ContactInfo, 
  Commands,
  Project
} from "@/types/portfolio"

export const skillsData: SkillCategory[] = [
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
    skills: ["ExpressJS", "Express.js", "NestJS", ".NET Core", "PHP Laravel", "Prisma", ".NET Framework API", ".NET Framework", "ASP.NET", "Laravel"],
  },
  {
    title: "Database",
    color: "text-rose-400",
    skills: ["T-SQL (SQL Server)", "Redis", "Microsoft SQL Server Management", "DBeaver", "PGAdmin", "SQL Server", "LINQ", "T-SQL"],
  },
  {
    title: "DevOps & Tools",
    color: "text-indigo-300",
    skills: ["Docker", "GitHub Actions", "AWS S3", "Vercel", "GIT command", "GIT", "Git", "CRUD", "HTTP", "API", "Jest", "Google Maps API"],
  },
  {
    title: "Others",
    color: "text-teal-300",
    skills: ["Visual Studio Code", "Cursor", "Windsurf", "POSTMAN", "AI prompt", "OBS", "Auth0", "UX/UI"],
  },
]

export const experienceData: Experience[] = [
  {
    title: "Full stack developer",
    company: "99/133 Ladprao 18, Jompol, Chatuchak, Bangkok 10900",
    period: "August 2023 – Present",
    duration: "Ongoing",
    location: "Bangkok, Thailand",
    description:
      "Developed a web-application frontend for event queue management using ReactTS. Contributed to multiple CMS projects (Backend Go, ReactTS/ExpressJS, Vue 2) by adding/modifying sprint-assigned features, integrating Auth0, refactoring codebase, and restructuring files for easier maintenance. Also worked on a Web Store/CMS (Vue 2 / PHP Laravel legacy code) adding features and unit tests across frontend and backend.",
    technologies: ["React", "TypeScript", "Next.js", "Vue.js", "Go", "Express.js", "Auth0", "PHP", "Laravel", "Jest"],
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
    technologies: ["React", "TypeScript", "Vue.js", "NestJS", "Prisma", "JavaScript", "HTML", "CSS"],
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
    technologies: ["Angular", "TypeScript", ".NET Core", "C#", "JavaScript", "HTML", "CSS", "HTTP"],
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
    technologies: ["C#", "ASP.NET", ".NET Core", ".NET Framework", "SQL Server", "LINQ", "Git"],
    current: false,
    side: "right",
  },
]

export const projectsData: Project[] = [
  {
    title: "E-WEDDING CARD",
    description: "Bootstrapped file structure with Cursor using Next.js tech stack. Integrated Google Maps for venue location, stored images on AWS S3, and set up GitHub Actions CI/CD for Vercel deployment.",
    technologies: ["Next.js", "React", "Google Maps API", "AWS S3", "GitHub Actions", "Vercel"],
    status: "developing",
    featured: true,
  },
]

export const navigationItems: NavigationItem[] = [
  { href: "#about", text: "whoami", prefix: "$" },
  { href: "#projects", text: "ls -la projects/", prefix: "$" },
  { href: "#experience", text: "cat experience.log", prefix: "$" },
  { href: "#contact", text: "curl -X POST /contact", prefix: "$" },
]

export const contactInfo: ContactInfo = {
  email: "kijtisak.pa@gmail.com",
  phone: "(+66) 80 733 0752",
  address: "Bangkapi, Bangkok, 10240",
  github: "github.com/kijtisak",
  linkedin: "linkedin.com/in/kijtisak",
}

export const terminalCommands: Commands = {
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

export const subtitleTexts = [
  "SOFTWARE DEVELOPER",
  "GAMER",
  "SLEEPER",
  "POTTERHEAD",
]

// Animation variants
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
}

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
} 