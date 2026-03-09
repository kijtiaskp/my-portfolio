// Icon source: jsdelivr + simple-icons (monochrome SVG)
// We apply brand colors via CSS filter

const CDN = "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons"

const slugMap: Record<string, string> = {
  // Languages
  "TypeScript": "typescript",
  "JavaScript": "javascript",
  "Go": "go",
  "C#": "sharp",
  "C# ASP.NET": "sharp",
  "PHP": "php",

  // Frontend
  "React": "react",
  "React (JS/TS)": "react",
  "Next.js": "nextdotjs",
  "Vue.js": "vuedotjs",
  "Vue.js (v. 2/3)": "vuedotjs",
  "Nuxt.js": "nuxt",
  "Angular": "angular",
  "Tailwind CSS": "tailwindcss",
  "TailwindCSS": "tailwindcss",
  "HTML5": "html5",
  "CSS3": "css3",

  // Backend
  ".NET Core": "dotnet",
  ".NET Framework": "dotnet",
  "Express.js": "express",
  "NestJS": "nestjs",
  "Laravel": "laravel",
  "Prisma": "prisma",

  // Data & APIs
  "SQL Server": "microsoftsqlserver",
  "MySQL": "mysql",
  "Redis": "redis",
  "GraphQL": "graphql",
  "REST API": "openapiinitiative",

  // Infrastructure
  "AWS": "amazonwebservices",
  "AWS S3": "amazons3",
  "Docker": "docker",
  "CI/CD": "githubactions",
  "GitHub Actions": "githubactions",
  "Git": "git",
  "GitHub": "github",
  "GitLab": "gitlab",
  "GitHub Pages": "github",

  // Services
  "Auth0": "auth0",
  "Google Maps API": "googlemaps",
  "Cloudflare": "cloudflare",
  "ContentStack": "contentstack",
  "POSTMAN": "postman",

  // Other
  "LINQ": "dotnet",
}

// Brand hex colors per slug
const brandColors: Record<string, string> = {
  typescript: "#3178C6",
  javascript: "#F7DF1E",
  go: "#00ADD8",
  sharp: "#512BD4",
  php: "#777BB4",
  react: "#61DAFB",
  nextdotjs: "#FFFFFF",
  vuedotjs: "#4FC08D",
  nuxt: "#00DC82",
  angular: "#DD0031",
  tailwindcss: "#06B6D4",
  html5: "#E34F26",
  css3: "#1572B6",
  dotnet: "#512BD4",
  express: "#FFFFFF",
  nestjs: "#E0234E",
  laravel: "#FF2D20",
  prisma: "#2D3748",
  microsoftsqlserver: "#CC2927",
  mysql: "#4479A1",
  redis: "#FF4438",
  graphql: "#E10098",
  openapiinitiative: "#6BA539",
  amazonwebservices: "#FF9900",
  amazons3: "#569A31",
  docker: "#2496ED",
  githubactions: "#2088FF",
  git: "#F05032",
  github: "#FFFFFF",
  gitlab: "#FC6D26",
  auth0: "#EB5424",
  googlemaps: "#4285F4",
  cloudflare: "#F38020",
  contentstack: "#7C2B73",
  postman: "#FF6C37",
}

export function getTechIcon(tech: string): { url: string; color: string } | null {
  const slug = slugMap[tech]
  if (!slug) return null
  return {
    url: `${CDN}/${slug}.svg`,
    color: brandColors[slug] || "#86868b",
  }
}
