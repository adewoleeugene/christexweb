"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"
import { LLMAnimation } from "./llm-animation"
import ColorBends from "./ColorBends"

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return isMobile
}

export function HeroSection() {
  const isMobile = useIsMobile()
  const [isIdle, setIsIdle] = useState(false)
  const [isHoveringButtons, setIsHoveringButtons] = useState(false)
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null)
  const heroRef = useRef<HTMLElement>(null)

  const resetIdleTimer = useCallback(() => {
    if (isMobile) return

    setIsIdle(false)
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current)
    }
    idleTimerRef.current = setTimeout(() => {
      if (!isHoveringButtons) {
        setIsIdle(true)
      }
    }, 30000)
  }, [isHoveringButtons, isMobile])

  useEffect(() => {
    if (isMobile) return

    resetIdleTimer()
    const events = ["scroll"]
    events.forEach((event) => {
      window.addEventListener(event, resetIdleTimer, { passive: true })
    })
    return () => {
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current)
      }
      events.forEach((event) => {
        window.removeEventListener(event, resetIdleTimer)
      })
    }
  }, [resetIdleTimer, isMobile])

  useEffect(() => {
    if (isMobile) return
    if (isHoveringButtons && isIdle) {
      setIsIdle(false)
    }
    if (isHoveringButtons && idleTimerRef.current) {
      clearTimeout(idleTimerRef.current)
    }
  }, [isHoveringButtons, isIdle, isMobile])

  const showContent = isMobile || !isIdle

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* ColorBends background - shows by default */}
      <AnimatePresence>
        {!isIdle && (
          <motion.div
            className="absolute inset-0 z-0"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <div className="w-full h-full">
              <ColorBends
                rotation={45}
                speed={0.2}
                colors={["#5227FF", "#FF9FFC", "#dc2eff"]}
                transparent
                autoRotate={0}
                scale={1.2}
                frequency={1}
                warpStrength={1.2}
                mouseInfluence={1}
                parallax={0.5}
                noise={0.1}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LLM Animation - shows when idle */}
      <AnimatePresence>
        {isIdle && (
          <motion.div
            className="absolute inset-0 z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <LLMAnimation />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showContent && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showContent && (
          <motion.div
            className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <div className="space-y-8">
              <div className="flex items-center justify-center">
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-white rounded-full border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                  <span className="font-mono text-xs tracking-widest uppercase text-black font-bold">
                    2025 Innovation Hub of the Year
                  </span>
                </div>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-foreground text-balance max-w-4xl mx-auto">
                Educate. Empower.
                <br />
                <span className="text-muted-foreground">Earn.</span>
              </h1>

              <p className="font-mono text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Driving Sierra Leone's digital transformation through AI and blockchain education, venture building, and
                civic technology solutions.
              </p>

              <div
                className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
                onMouseEnter={() => setIsHoveringButtons(true)}
                onMouseLeave={() => {
                  setIsHoveringButtons(false)
                  resetIdleTimer()
                }}
              >
                <motion.a
                  href="#services"
                  className="inline-flex items-center justify-center px-8 py-3 bg-foreground text-background font-mono text-xs tracking-widest uppercase hover:bg-foreground/90 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Explore Our Work
                </motion.a>
                <motion.button
                  onClick={() => {
                    navigator.clipboard.writeText("hello@christex.foundation")
                    toast.success("Email copied to clipboard!", {
                      description: "hello@christex.foundation",
                      duration: 3000,
                    })
                    window.location.href = "mailto:hello@christex.foundation"
                  }}
                  className="inline-flex items-center justify-center px-8 py-3 border border-border text-foreground font-mono text-xs tracking-widest uppercase hover:bg-secondary transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Partner With Us
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showContent && (
          <>
            <motion.div
              className="absolute bottom-8 left-6 lg:left-12 z-20 hidden lg:block"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <div className="font-mono text-xs text-muted-foreground space-y-1">
                <div className="flex items-center gap-4">
                  <span className="text-muted-foreground/50">TYPE:</span>
                  <span>NON-PROFIT</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-muted-foreground/50">FOCUS:</span>
                  <span>AI / BLOCKCHAIN</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute bottom-8 right-6 lg:right-12 z-20 hidden lg:block"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <div className="font-mono text-xs text-muted-foreground text-right space-y-1">
                <div className="flex items-center justify-end gap-4">
                  <span className="text-muted-foreground/50">SINCE:</span>
                  <span>2022</span>
                </div>
                <div className="flex items-center justify-end gap-4">
                  <span className="text-muted-foreground/50">LOCATION:</span>
                  <span>FREETOWN, SIERRA LEONE</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isMobile && isIdle && (
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <span className="font-mono text-xs text-muted-foreground/50 tracking-widest uppercase">
              Scroll to interact
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
