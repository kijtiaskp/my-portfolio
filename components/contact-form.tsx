"use client"

import React from "react"
import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GlitchText } from "@/components/glitch-text"

interface ContactFormProps {
  className?: string
  onSubmit?: (data: { name: string; email: string; message: string }) => void
}

export const ContactForm = ({ className = "", onSubmit }: ContactFormProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
    }
    onSubmit?.(data)
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <Card className="bg-black/50 border border-green-400/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 to-transparent opacity-50"></div>
        <CardHeader className="relative z-10">
          <CardTitle className="text-green-400 flex items-center space-x-2 font-mono">
            <MessageCircle className="w-5 h-5" />
            <span>
              <GlitchText>SEND MESSAGE</GlitchText>
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="name" className="text-green-300 font-mono">
                <GlitchText>NAME</GlitchText>
              </Label>
              <Input
                id="name"
                name="name"
                required
                className="bg-black/50 border-green-400/30 text-green-300 focus:border-green-400 focus:ring-green-400 focus:ring-1 font-mono transition-colors"
                placeholder="Your name..."
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-green-300 font-mono">
                <GlitchText>EMAIL</GlitchText>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                className="bg-black/50 border-green-400/30 text-green-300 focus:border-green-400 focus:ring-green-400 focus:ring-1 font-mono transition-colors"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <Label htmlFor="message" className="text-green-300 font-mono">
                <GlitchText>MESSAGE</GlitchText>
              </Label>
              <Textarea
                id="message"
                name="message"
                required
                className="bg-black/50 border-green-400/30 text-green-300 focus:border-green-400 focus:ring-green-400 focus:ring-1 font-mono transition-colors"
                placeholder="Your message..."
                rows={4}
              />
            </div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button 
                type="submit"
                className="w-full bg-green-400 text-black hover:bg-green-300 font-mono transition-all duration-300"
              >
                <GlitchText>SEND MESSAGE</GlitchText>
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
