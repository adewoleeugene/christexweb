"use client"

import { useEffect, useRef, useState } from "react"

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isPointer, setIsPointer] = useState(false)

  const cursorRef = useRef<HTMLDivElement>(null)
  const trailRefs = useRef<(HTMLDivElement | null)[]>([])

  const mousePos = useRef({ x: 0, y: 0 })
  const cursorPos = useRef({ x: 0, y: 0 })
  const trailPositions = useRef<{ x: number; y: number }[]>(
    Array(8)
      .fill(null)
      .map(() => ({ x: 0, y: 0 })),
  )

  useEffect(() => {
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches
    if (!hasFinePointer) return

    const updateMousePos = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      setIsVisible(true)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    const updateCursorType = (e: MouseEvent) => {
      const hoveredEl = e.target as HTMLElement
      if (hoveredEl && hoveredEl.closest) {
        setIsPointer(
          hoveredEl.tagName === "BUTTON" ||
          hoveredEl.tagName === "A" ||
          hoveredEl.closest("button") !== null ||
          hoveredEl.closest("a") !== null ||
          hoveredEl.closest('[class*="cursor-pointer"]') !== null ||
          window.getComputedStyle(hoveredEl).cursor === "pointer",
        )
      }
    }

    let animationId: number
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor

    const animate = () => {
      cursorPos.current.x = lerp(cursorPos.current.x, mousePos.current.x, 0.2)
      cursorPos.current.y = lerp(cursorPos.current.y, mousePos.current.y, 0.2)

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorPos.current.x}px, ${cursorPos.current.y}px, 0)`
      }

      for (let i = 0; i < trailPositions.current.length; i++) {
        const target = i === 0 ? cursorPos.current : trailPositions.current[i - 1]
        const factor = 0.15 - i * 0.01

        trailPositions.current[i].x = lerp(trailPositions.current[i].x, target.x, factor)
        trailPositions.current[i].y = lerp(trailPositions.current[i].y, target.y, factor)

        if (trailRefs.current[i]) {
          trailRefs.current[i]!.style.transform =
            `translate3d(${trailPositions.current[i].x}px, ${trailPositions.current[i].y}px, 0) translate(-50%, -50%)`
        }
      }

      animationId = requestAnimationFrame(animate)
    }

    document.addEventListener("mousemove", updateMousePos)
    document.addEventListener("mousemove", updateCursorType)
    document.addEventListener("mouseenter", handleMouseEnter)
    document.addEventListener("mouseleave", handleMouseLeave)

    animationId = requestAnimationFrame(animate)

    document.body.style.cursor = "none"
    const style = document.createElement("style")
    style.innerHTML = `*, *::before, *::after { cursor: none !important; }`
    document.head.appendChild(style)

    return () => {
      document.removeEventListener("mousemove", updateMousePos)
      document.removeEventListener("mousemove", updateCursorType)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseleave", handleMouseLeave)
      cancelAnimationFrame(animationId)
      document.body.style.cursor = ""
      document.head.removeChild(style)
    }
  }, [])

  if (!isVisible) return null

  return (
    <>
      <style jsx global>{`
        @keyframes cursor-pulse {
          0%, 100% {
            opacity: 0.6;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 0.3;
            transform: translate(-50%, -50%) scale(1.4);
          }
        }
      `}</style>

      <div className="pointer-events-none fixed inset-0 z-[9999]">
        {/* Trail dots */}
        {Array(8)
          .fill(null)
          .map((_, i) => (
            <div
              key={i}
              ref={(el) => {
                trailRefs.current[i] = el
              }}
              className="absolute left-0 top-0 rounded-full will-change-transform"
              style={{
                width: 8 - i * 0.6,
                height: 8 - i * 0.6,
                backgroundColor: "oklch(0.7 0.15 200)",
                opacity: 0.4 - i * 0.045,
              }}
            />
          ))}

        <div ref={cursorRef} className="absolute left-0 top-0 will-change-transform">
          {/* Main cursor dot - centered */}
          <div
            className="absolute rounded-full transition-[width,height] duration-200"
            style={{
              width: isPointer ? 8 : 12,
              height: isPointer ? 8 : 12,
              backgroundColor: "oklch(0.7 0.15 200)",
              boxShadow: "0 0 12px oklch(0.7 0.15 200 / 0.6)",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />

          {/* Pulsating ring - same center point */}
          <div
            className="absolute rounded-full border-2"
            style={{
              width: 40,
              height: 40,
              left: "50%",
              top: "50%",
              borderColor: "oklch(0.7 0.15 200 / 0.5)",
              opacity: isPointer ? 1 : 0,
              transition: "opacity 0.2s ease-out",
              animation: isPointer ? "cursor-pulse 1.2s ease-in-out infinite" : "none",
            }}
          />
        </div>
      </div>
    </>
  )
}
