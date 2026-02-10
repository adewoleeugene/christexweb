"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

const partners = [
  { name: "Solana Foundation", type: "Technology" },
  { name: "UNICEF", type: "Development" },
  { name: "UNDP", type: "Development" },
  { name: "Ministry of Communication, Technology & Innovation", type: "Government" },
  { name: "Ministry of Youth Affairs", type: "Government" },
  { name: "DSTI", type: "Government" },
  { name: "University of Sierra Leone", type: "Education" },
  { name: "Limkokwing University", type: "Education" },
  { name: "Mercy Corps Ventures", type: "Investment" },
  { name: "Felei Tech City", type: "Infrastructure" },
]

export function PartnersSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="partners" ref={ref} className="py-32 bg-background relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8"
        >
          <div>
            <div className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-4">
              Strategic Partners
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-foreground max-w-2xl text-balance leading-tight">
              Collaborating with institutions to scale our impact.
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-l border-t border-border">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group relative bg-background border-r border-b border-border p-8 h-[280px] flex flex-col justify-between hover:bg-card/30 transition-colors"
            >
              {/* Top: Type Label */}
              <div className="flex items-start justify-between">
                <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider opacity-70">
                  {partner.type}
                </span>
              </div>

              {/* Bottom: Name */}
              <div>
                {/* Use a slightly smaller text for very long names if needed, but keeping it standard for now */}
                <h3 className="text-2xl md:text-3xl text-foreground font-light leading-snug">
                  {partner.name}
                </h3>
              </div>
            </motion.div>
          ))}

          {/* Gradient Overlay for the grid area */}
          <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-accent/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
        </div>

        {/* Recognition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-24"
        >
          <div className="inline-flex items-center gap-4 px-4 py-2 rounded-full bg-card border border-border">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="font-mono text-xs tracking-wider uppercase text-muted-foreground">
              Selected for Mercy Corps Crypto for Good Fund III
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
