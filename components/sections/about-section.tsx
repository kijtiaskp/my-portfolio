"use client"

import { motion } from "framer-motion"
import { Terminal } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"
import { GlitchText } from "@/components/glitch-text"
import { SpecsGlitch } from "@/components/specs-glitch"
import { fadeInUp, staggerContainer } from "@/data/portfolio-data"

export const AboutSection = () => {
  return (
    <AnimatedSection
      id="about"
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
            <GlitchText>cat /proc/cpuinfo</GlitchText>
          </span>
          <span className="text-green-500">
            <GlitchText>| grep &quot;model name&quot;</GlitchText>
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.h2 className="text-3xl font-bold text-green-400 min-h-[50px]" variants={fadeInUp}>
              <GlitchText persistent>SYSTEM INFORMATION</GlitchText>
            </motion.h2>

            <motion.div
              className="bg-black border-2 border-green-400/20 rounded-lg p-6 relative overflow-hidden"
              variants={fadeInUp}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/5 to-transparent opacity-50"></div>
              <pre className="text-sm text-green-300 whitespace-pre-wrap font-mono relative z-10">
                <span className="text-green-400">
                  <GlitchText>{"{"}</GlitchText>
                </span>
                <br />
                &nbsp;&nbsp;
                <span className="text-cyan-300">
                  &quot;<GlitchText>name</GlitchText>&quot;
                </span>
                :{" "}
                <span className="text-amber-300">
                  &quot;<GlitchText>Kijtisak Pangmee</GlitchText>&quot;
                </span>
                ,
                <br />
                &nbsp;&nbsp;
                <span className="text-cyan-300">
                  &quot;<GlitchText>role</GlitchText>&quot;
                </span>
                :{" "}
                <span className="text-amber-300">
                  &quot;<GlitchText>Software Developer</GlitchText>&quot;
                </span>
                ,
                <br />
                &nbsp;&nbsp;
                <span className="text-cyan-300">
                  &quot;<GlitchText>address</GlitchText>&quot;
                </span>
                :{" "}
                <span className="text-amber-300">
                  &quot;<GlitchText>Bangkapi, Bangkok, 10240</GlitchText>&quot;
                </span>
                ,
                <br />
                &nbsp;&nbsp;
                <span className="text-cyan-300">
                  &quot;<GlitchText>phone</GlitchText>&quot;
                </span>
                :{" "}
                <span className="text-amber-300">
                  &quot;<GlitchText>(+66) 80 733 0752</GlitchText>&quot;
                </span>
                ,
                <br />
                &nbsp;&nbsp;
                <span className="text-cyan-300">
                  &quot;<GlitchText>email</GlitchText>&quot;
                </span>
                :{" "}
                <span className="text-amber-300">
                  &quot;<GlitchText>kijtisak.pa@gmail.com</GlitchText>&quot;
                </span>
                ,
                <br />
                &nbsp;&nbsp;
                <span className="text-cyan-300">
                  &quot;<GlitchText>education</GlitchText>&quot;
                </span>
                :{" "}
                <span className="text-green-400">
                  <GlitchText>{"{"}</GlitchText>
                </span>
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span className="text-cyan-300">
                  &quot;<GlitchText>degree</GlitchText>&quot;
                </span>
                :{" "}
                <span className="text-amber-300">
                  &quot;<GlitchText>Bachelor Degree in Information Technology</GlitchText>&quot;
                </span>
                ,
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span className="text-cyan-300">
                  &quot;<GlitchText>university</GlitchText>&quot;
                </span>
                :{" "}
                <span className="text-amber-300">
                  &quot;<GlitchText>Kasetsart University Sriracha Campus</GlitchText>&quot;
                </span>
                ,
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span className="text-cyan-300">
                  &quot;<GlitchText>period</GlitchText>&quot;
                </span>
                :{" "}
                <span className="text-amber-300">
                  &quot;<GlitchText>June 2012 – June 2020</GlitchText>&quot;
                </span>
                <br />
                &nbsp;&nbsp;
                <span className="text-green-400">
                  <GlitchText>{"}"}</GlitchText>
                </span>
                ,
                <br />
                &nbsp;&nbsp;
                <span className="text-cyan-300">
                  &quot;<GlitchText>languages</GlitchText>&quot;
                </span>
                :{" "}
                <span className="text-green-400">
                  <GlitchText>{"{"}</GlitchText>
                </span>
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span className="text-cyan-300">
                  &quot;<GlitchText>thai</GlitchText>&quot;
                </span>
                :{" "}
                <span className="text-amber-300">
                  &quot;<GlitchText>native</GlitchText>&quot;
                </span>
                ,
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span className="text-cyan-300">
                  &quot;<GlitchText>english</GlitchText>&quot;
                </span>
                :{" "}
                <span className="text-amber-300">
                  &quot;<GlitchText>good to read for work, still practicing to speak</GlitchText>&quot;
                </span>
                <br />
                &nbsp;&nbsp;
                <span className="text-green-400">
                  <GlitchText>{"}"}</GlitchText>
                </span>
                <br />
                <span className="text-green-400">
                  <GlitchText>{"}"}</GlitchText>
                </span>
              </pre>
            </motion.div>

            <motion.p className="text-green-300 leading-relaxed font-mono" variants={fadeInUp}>
              <GlitchText>
                I am Kijtisak Pangmee, a dedicated Software Developer based in Bangkok, Thailand. I specialize in
                building robust and scalable applications, transforming complex challenges into elegant and efficient
                solutions. My passion lies in continuous learning and delivering high-quality software.
              </GlitchText>
            </motion.p>
          </motion.div>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="relative p-6 w-full"
              transition={{ type: "spring", stiffness: 300 }}
            >

              {/* Header */}
              <div className="relative z-10 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Terminal className="w-5 h-5 text-green-400/30" />
                  <span className="text-green-400/30 font-mono text-sm">
                    <GlitchText>sudo system_profiler SPHardwareDataType --verbose</GlitchText>
                  </span>
                </div>
                <div className="h-px bg-green-400/10 mb-4"></div>
                <div className="text-xs text-red-400/30 mb-2">
                  <GlitchText>WARNING: Accessing system hardware data...</GlitchText>
                </div>
              </div>

              {/* Glitching Specs */}
              <div className="relative z-10 space-y-4 font-mono text-sm">
                <SpecsGlitch />
              </div>


            </motion.div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  )
}
