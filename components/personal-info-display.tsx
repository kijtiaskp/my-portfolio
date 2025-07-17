"use client"

import React from "react"
import { motion } from "framer-motion"
import { GlitchText } from "@/components/glitch-text"

interface PersonalInfoDisplayProps {
  className?: string
  personalData?: {
    name?: string
    role?: string
    address?: string
    phone?: string
    email?: string
    education?: {
      degree?: string
      university?: string
      period?: string
    }
    languages?: {
      thai?: string
      english?: string
    }
  }
}

export const PersonalInfoDisplay = ({ 
  className = "",
  personalData = {
    name: "Kijtisak Pangmee",
    role: "Software Developer",
    address: "Bangkapi, Bangkok, 10240",
    phone: "(+66) 80 733 0752",
    email: "kijtisak.pa@gmail.com",
    education: {
      degree: "Bachelor Degree in Information Technology",
      university: "Kasetsart University Sriracha Campus",
      period: "June 2012 – June 2020"
    },
    languages: {
      thai: "native",
      english: "good to read for work, still practicing to speak"
    }
  }
}: PersonalInfoDisplayProps) => {
  return (
    <motion.div
      className={`bg-black border-2 border-green-400/20 rounded-lg p-6 relative overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-green-400/5 to-transparent opacity-50"></div>
      <pre className="text-sm text-green-300 whitespace-pre-wrap font-mono relative z-10">
        <span className="text-green-400">
          <GlitchText>{"{"}</GlitchText>
        </span>
        <br />
        &nbsp;&nbsp;
        <span className="text-cyan-300">
          "<GlitchText>name</GlitchText>"
        </span>
        :{" "}
        <span className="text-amber-300">
          "<GlitchText>{personalData.name || ""}</GlitchText>"
        </span>
        ,
        <br />
        &nbsp;&nbsp;
        <span className="text-cyan-300">
          "<GlitchText>role</GlitchText>"
        </span>
        :{" "}
        <span className="text-amber-300">
          "<GlitchText>{personalData.role || ""}</GlitchText>"
        </span>
        ,
        <br />
        &nbsp;&nbsp;
        <span className="text-cyan-300">
          "<GlitchText>address</GlitchText>"
        </span>
        :{" "}
        <span className="text-amber-300">
          "<GlitchText>{personalData.address || ""}</GlitchText>"
        </span>
        ,
        <br />
        &nbsp;&nbsp;
        <span className="text-cyan-300">
          "<GlitchText>phone</GlitchText>"
        </span>
        :{" "}
        <span className="text-amber-300">
          "<GlitchText>{personalData.phone || ""}</GlitchText>"
        </span>
        ,
        <br />
        &nbsp;&nbsp;
        <span className="text-cyan-300">
          "<GlitchText>email</GlitchText>"
        </span>
        :{" "}
        <span className="text-amber-300">
          "<GlitchText>{personalData.email || ""}</GlitchText>"
        </span>
        ,
        <br />
        &nbsp;&nbsp;
        <span className="text-cyan-300">
          "<GlitchText>education</GlitchText>"
        </span>
        :{" "}
        <span className="text-green-400">
          <GlitchText>{"{"}</GlitchText>
        </span>
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span className="text-cyan-300">
          "<GlitchText>degree</GlitchText>"
        </span>
        :{" "}
        <span className="text-amber-300">
          "<GlitchText>{personalData.education?.degree || ""}</GlitchText>"
        </span>
        ,
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span className="text-cyan-300">
          "<GlitchText>university</GlitchText>"
        </span>
        :{" "}
        <span className="text-amber-300">
          "<GlitchText>{personalData.education?.university || ""}</GlitchText>"
        </span>
        ,
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span className="text-cyan-300">
          "<GlitchText>period</GlitchText>"
        </span>
        :{" "}
        <span className="text-amber-300">
          "<GlitchText>{personalData.education?.period || ""}</GlitchText>"
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
          "<GlitchText>languages</GlitchText>"
        </span>
        :{" "}
        <span className="text-green-400">
          <GlitchText>{"{"}</GlitchText>
        </span>
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span className="text-cyan-300">
          "<GlitchText>thai</GlitchText>"
        </span>
        :{" "}
        <span className="text-amber-300">
          "<GlitchText>{personalData.languages?.thai || ""}</GlitchText>"
        </span>
        ,
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span className="text-cyan-300">
          "<GlitchText>english</GlitchText>"
        </span>
        :{" "}
        <span className="text-amber-300">
          "<GlitchText>{personalData.languages?.english || ""}</GlitchText>"
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
  )
} 