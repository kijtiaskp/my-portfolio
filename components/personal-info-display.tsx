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
                      &quot;<GlitchText>name</GlitchText>&quot;
        </span>
        :{" "}
        <span className="text-amber-300">
                      &quot;<GlitchText>{personalData.name || ""}</GlitchText>&quot;
        </span>
        ,
        <br />
        &nbsp;&nbsp;
        <span className="text-cyan-300">
                      &quot;<GlitchText>role</GlitchText>&quot;
        </span>
        :{" "}
        <span className="text-amber-300">
                      &quot;<GlitchText>{personalData.role || ""}</GlitchText>&quot;
        </span>
        ,
        <br />
        &nbsp;&nbsp;
        <span className="text-cyan-300">
                      &quot;<GlitchText>address</GlitchText>&quot;
        </span>
        :{" "}
        <span className="text-amber-300">
                      &quot;<GlitchText>{personalData.address || ""}</GlitchText>&quot;
        </span>
        ,
        <br />
        &nbsp;&nbsp;
        <span className="text-cyan-300">
                      &quot;<GlitchText>phone</GlitchText>&quot;
        </span>
        :{" "}
        <span className="text-amber-300">
                      &quot;<GlitchText>{personalData.phone || ""}</GlitchText>&quot;
        </span>
        ,
        <br />
        &nbsp;&nbsp;
        <span className="text-cyan-300">
                      &quot;<GlitchText>email</GlitchText>&quot;
        </span>
        :{" "}
        <span className="text-amber-300">
                      &quot;<GlitchText>{personalData.email || ""}</GlitchText>&quot;
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
          &quot;<GlitchText>{personalData.education?.degree || ""}</GlitchText>&quot;
        </span>
        ,
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span className="text-cyan-300">
          &quot;<GlitchText>university</GlitchText>&quot;
        </span>
        :{" "}
        <span className="text-amber-300">
          &quot;<GlitchText>{personalData.education?.university || ""}</GlitchText>&quot;
        </span>
        ,
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span className="text-cyan-300">
          &quot;<GlitchText>period</GlitchText>&quot;
        </span>
        :{" "}
        <span className="text-amber-300">
          &quot;<GlitchText>{personalData.education?.period || ""}</GlitchText>&quot;
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
          &quot;<GlitchText>{personalData.languages?.thai || ""}</GlitchText>&quot;
        </span>
        ,
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span className="text-cyan-300">
          &quot;<GlitchText>english</GlitchText>&quot;
        </span>
        :{" "}
        <span className="text-amber-300">
          &quot;<GlitchText>{personalData.languages?.english || ""}</GlitchText>&quot;
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
