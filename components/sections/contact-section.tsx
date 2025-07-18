"use client"

import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"
import { ContactForm } from "@/components/contact-form"
import { GlitchText } from "@/components/glitch-text"
import { contactInfo, fadeInUp, staggerContainer } from "@/data/portfolio-data"

export const ContactSection = () => {
  return (
    <AnimatedSection
      id="contact"
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
            <GlitchText>netstat -tuln</GlitchText>
          </span>
          <span className="text-green-500">
            <GlitchText>| grep :80</GlitchText>
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            className="space-y-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-green-400 font-mono">
              <span className="text-green-400">
                <GlitchText persistent>NETWORK INTERFACES</GlitchText>
              </span>
            </motion.h2>

            <motion.div
              variants={fadeInUp}
              className="bg-black border-2 border-green-400/20 rounded-lg p-6 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/5 to-transparent opacity-50"></div>
              <div className="space-y-4 text-sm font-mono relative z-10">
                {[
                  { icon: Mail, label: "EMAIL:", value: contactInfo.email },
                  { icon: Phone, label: "PHONE:", value: contactInfo.phone },
                  { icon: MapPin, label: "ADDRESS:", value: contactInfo.address },
                  { icon: Github, label: "GITHUB:", value: contactInfo.github },
                  { icon: Linkedin, label: "LINKEDIN:", value: contactInfo.linkedin },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    className="flex items-center space-x-2"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <item.icon className="w-4 h-4 text-green-400" />
                    <span className="text-green-300">
                      <GlitchText>{item.label}</GlitchText>
                    </span>
                    <span className="text-green-500">
                      <GlitchText>{item.value}</GlitchText>
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.p variants={fadeInUp} className="text-green-300 font-mono">
              <GlitchText>
                I&apos;m always open to discussing new opportunities, interesting projects, or just having a chat about
                technology. Feel free to reach out!
              </GlitchText>
            </motion.p>
          </motion.div>

          <ContactForm
            onSubmit={(data) => {
              // Handle form submission
              console.log('Contact form submitted:', data)
              // TODO: Implement actual form submission logic
            }}
          />
        </div>
      </div>
    </AnimatedSection>
  )
}
