"use client"

import React, { useRef, useEffect, useCallback, memo } from "react"

// Enhanced Matrix Rain Component with performance optimizations
const MatrixRain = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number | null>(null)
  const intervalRef = useRef<number | null>(null)
  const isVisibleRef = useRef(true)

  // Optimized draw function with original speed and behavior
  const drawMatrix = useCallback((ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, drops: number[], matrixChars: string, fontSize: number) => {
    // Skip drawing if not visible for performance
    if (!isVisibleRef.current) return

    // Black background with fade effect for the trail
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.font = `${fontSize}px monospace`

    // Draw the matrix characters
    for (let i = 0; i < drops.length; i++) {
      const text = matrixChars[Math.floor(Math.random() * matrixChars.length)]
      
      // Use our custom green color with random opacity for variation
      ctx.fillStyle = `rgba(0, 255, 136, ${Math.random() * 0.8 + 0.2})`
      ctx.fillText(text, i * fontSize, drops[i] * fontSize)

      // Reset drop when it reaches bottom with some randomness
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0
      }
      drops[i]++
    }
  }, [])

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }, [])

  // Intersection Observer to pause animation when not visible for performance
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !window.IntersectionObserver) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(canvas)

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Capture the animation frame ref at the start of the effect
    const animationFrame = animationFrameRef.current

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const matrixChars =
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=[]{}|\\:;\"'<>?,.~/`functionconstvarletnewreturnifelseforthisclassexportimportasyncawaitdefintfloatboolstring"
    const fontSize = 12
    const columns = canvas.width / fontSize

    const drops: number[] = []
    for (let i = 0; i < columns; i++) {
      drops[i] = 1
    }

    // Restore original speed (50ms) for smooth animation
    intervalRef.current = window.setInterval(() => {
      drawMatrix(ctx, canvas, drops, matrixChars, fontSize)
    }, 50) // Back to original 50ms for smooth experience

    window.addEventListener("resize", handleResize)

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current)
      }
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
      window.removeEventListener("resize", handleResize)
    }
  }, [drawMatrix, handleResize])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-20"
      style={{ background: "transparent" }}
    />
  )
})

MatrixRain.displayName = "MatrixRain"

export { MatrixRain }
