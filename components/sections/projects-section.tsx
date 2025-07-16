"use client"

import { motion } from "framer-motion"
import { Github, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatedSection } from "@/components/animated-section"
import { GlitchText } from "@/components/glitch-text"
import { projectsData, fadeInUp, staggerContainer } from "@/data/portfolio-data"
import { getTechBadgeColor } from "@/data/portfolio-data"

export const ProjectsSection = () => {
  return (
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
          {projectsData.map((project, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card className="bg-black/50 border border-green-400/20 hover:border-green-400/40 transition-all duration-300 h-full flex flex-col relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <CardHeader className="relative z-10">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-green-400 font-mono">
                      <GlitchText persistent>{project.title}</GlitchText>
                    </CardTitle>
                    <Badge 
                      variant="outline" 
                      className={`border-yellow-400 text-yellow-400 font-mono ${
                        project.status === "developing" ? "animate-pulse" : ""
                      }`}
                    >
                      <GlitchText>{project.status.toUpperCase()}</GlitchText>
                    </Badge>
                  </div>
                  <CardDescription className="text-green-300 font-mono">
                    <GlitchText>
                      {project.description}
                    </GlitchText>
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-auto relative z-10">
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => {
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
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  )
} 