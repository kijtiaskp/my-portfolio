"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type GlitchColorType = 'error' | 'inverse' | 'neon' | 'fire' | 'ice' | 'matrix'

interface GlitchColorContextType {
  currentColor: GlitchColorType
  setColor: (color: GlitchColorType) => void
  getColorClass: (color?: GlitchColorType) => string
  isLoaded: boolean
}

const GlitchColorContext = createContext<GlitchColorContextType | undefined>(undefined)

export const useGlitchColor = () => {
  const context = useContext(GlitchColorContext)
  if (!context) {
    throw new Error('useGlitchColor must be used within a GlitchColorProvider')
  }
  return context
}

interface GlitchColorProviderProps {
  children: ReactNode
}

const STORAGE_KEY = 'glitch-color-theme'

export const GlitchColorProvider = ({ children }: GlitchColorProviderProps) => {
  const [currentColor, setCurrentColor] = useState<GlitchColorType>('error')
  const [isLoaded, setIsLoaded] = useState(false)

  // Load theme from localStorage on mount
  useEffect(() => {
    try {
      const savedColor = localStorage.getItem(STORAGE_KEY) as GlitchColorType
      if (savedColor && ['error', 'inverse', 'neon', 'fire', 'ice', 'matrix'].includes(savedColor)) {
        setCurrentColor(savedColor)
      }
    } catch (error) {
      console.warn('Failed to load glitch color theme from localStorage:', error)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  const setColor = (color: GlitchColorType) => {
    setCurrentColor(color)
    try {
      localStorage.setItem(STORAGE_KEY, color)
    } catch (error) {
      console.warn('Failed to save glitch color theme to localStorage:', error)
    }
  }

  const getColorClass = (color?: GlitchColorType) => {
    const colorToUse = color || currentColor
    switch (colorToUse) {
      case 'error':
        return 'glitch-error'
      case 'inverse':
        return 'glitch-inverse'
      case 'neon':
        return 'glitch-neon'
      case 'fire':
        return 'glitch-fire'
      case 'ice':
        return 'glitch-ice'
      case 'matrix':
        return 'glitch-matrix'
      default:
        return 'glitch-error'
    }
  }

  return (
    <GlitchColorContext.Provider value={{ currentColor, setColor, getColorClass, isLoaded }}>
      {isLoaded ? children : (
        <div className="bg-black min-h-screen flex items-center justify-center">
          <div className="text-green-400 font-mono text-sm animate-pulse">
            loading ...
          </div>
        </div>
      )}
    </GlitchColorContext.Provider>
  )
} 