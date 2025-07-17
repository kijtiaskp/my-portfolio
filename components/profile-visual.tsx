"use client"

import React from "react"
import { motion } from "framer-motion"
import { GlitchText } from "@/components/glitch-text"
import { BinaryBackground } from "@/components/binary-background"
import { ProfileImage } from "@/components/profile-image"
import { ScanningLine } from "@/components/scanning-line"
import { FloatingIndicators } from "@/components/floating-indicators"

interface ProfileVisualProps {
  className?: string
}

export const ProfileVisual = ({ className = "" }: ProfileVisualProps) => {
  return (
    <motion.div
      className={`relative mb-8 flex justify-center lg:justify-end ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <div className="relative">
        <motion.div
          className="w-48 h-48 rounded-2xl bg-black border-2 border-green-400/40 flex items-center justify-center shadow-2xl relative overflow-hidden"
          transition={{ type: "spring", stiffness: 300 }}
        >
          {/* Sparkling Binary Background */}
          <BinaryBackground />

          {/* Profile Image */}
          <ProfileImage src="https://kijtisak-portfolio.s3.ap-southeast-1.amazonaws.com/avatar.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAWMZSO5WS2F4IPRFQ%2F20250717%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20250717T143130Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aDmFwLXNvdXRoZWFzdC0xIkgwRgIhAIqMXALemH9rAiq6QGi5XYbebIgK0rnzcZeVG0P7yHCHAiEA2vR9vlYuIysEfWLzXLMjy%2F%2FnyRSAWOoyx6ASom0mNxcq2gIIeBAAGgw0Mzk4MDMxMTI4NjkiDDRGd6ndNV4NCOF1Oyq3Amui8lMel6Ra4%2BZJomys8fNFT3MkAhsy56jcDrAnDTABlIR7Qux4pPuJT97NfoI1HTI%2FH0uM9KbBGrM%2FoXdYgsoRg7%2BEI25kDwwR2vbEPyX2Tkbt2Z5aAkJCR7rxGTyCs65Hq7TiK7%2F7TjRiPmJJEYN0nA8ImherIXCGf%2F3lcTPm4dxqgm1J8Bwi7WLvVJFYvdPAF8iPB5viLTb1iiLc94F1%2BP87c23dO8SzKDyvcvPF9cqF1fY%2Fj7mAeTSzSDOvR70iZHmFtjbGJT1%2FKwTfgwnEVbVw2Lutp3Xa7MkQrUP3fyqnkDG%2B%2F03Y7WemjrVi1ojfJv4RR59AlHVMJU7UvNuwJdi4gIIUdp2kr5lDcu9jRTpkv2f1pEuF9l0TxtkVpx2xTctLGhWtqBcX%2FC2Xf31zhyyyCGx9MMiN5MMGOqwC27Y9My3oZgl%2BZxALKI1n23Xqj041zUdIUAIU46T3O09WFK1Jqc4HfCrbjhiQ0YQgGYzz6uLnWV1GMhTZsV%2B%2B64Cwf5RJ7Jo9xbL%2FEV8Hvqgtq%2FjcQxxhhYvtVeV%2Bv7BIuvCy4itLydQiGdhZdSy0DOyMAQhOhs6nH4x3zyA2EqkZex1ZJQ8Wgmc5LKkuhKMukt6QpUNsHvZjS1FO4No49sKqsxhFHYhixpQPuIykBDOf7nH3yQeg3gb4yDS3vFOgrACLvhZZshVqBie1cfmKgSTlsunrsXrd8dMLjnQ2%2BqsgVX0FD3E0sPDiBMOXXP25Mp8iI6zhX0LE2LdiG2l6i4BJsVRl%2FTL9E%2FhDefTErFkieCBumdZRnT9fcUx9qNUFs7V77OKytvL9OxWg&X-Amz-Signature=5789c96844e37cae6e511c7bac1c079a34dc9b7de9b90278c3b2e5922e2cbb43&X-Amz-SignedHeaders=host&response-content-disposition=inline" />

          {/* System Status Text */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
            <motion.div
              className="text-xs font-mono text-green-400/80"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <GlitchText>SYSTEM ONLINE</GlitchText>
            </motion.div>
          </div>

          {/* Scanning Line Effect */}
          <ScanningLine />
        </motion.div>

        {/* Floating indicators */}
        <FloatingIndicators />
      </div>
    </motion.div>
  )
}
