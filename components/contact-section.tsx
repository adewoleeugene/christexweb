"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { ArrowUpRight, Mail, MapPin, Wallet, GraduationCap, Building2, Server } from "lucide-react"

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

export function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const collaborationAreas = [
    {
      title: "Fund Education",
      description: "Co-design scalable digital skills training across Sierra Leone.",
      icon: GraduationCap,
      label: "EDUCATION & AI",
    },
    {
      title: "Startup Incubation",
      description: "Launch startup challenges through our venture studio.",
      icon: Wallet,
      label: "VENTURE BUILDING",
    },
    {
      title: "CivicTech Initiatives",
      description: "Support DPG-aligned projects and public sector transformation.",
      icon: Building2,
      label: "GOV & POLICY",
    },
    {
      title: "Infrastructure",
      description: "Back core infrastructure for financial inclusion and IP protection.",
      icon: Server,
      label: "CORE INFRA",
    },
  ]

  return (
    <section id="contact" ref={ref} className="py-32 bg-background border-t border-border relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-8 h-[1px] bg-primary"></div>
            <span className="font-mono text-xs tracking-widest uppercase text-primary">Let's Collaborate</span>
            <div className="w-8 h-[1px] bg-primary"></div>
          </div>

          <h2 className="text-3xl md:text-5xl font-light text-foreground mb-6 text-balance">
            Partner with us to drive <br />
            <span className="text-muted-foreground">Africa's digital future.</span>
          </h2>

          <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {"We're actively seeking strategic partners, donors, and consultants to scale our impact across education, innovation, and civic technology."}
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {collaborationAreas.map((area, index) => {
            const isHovered = hoveredCard === index

            return (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className={`group relative p-8 h-[280px] flex flex-col justify-between rounded-2xl border transition-all duration-500 cursor-pointer overflow-hidden ${isHovered
                  ? "bg-card border-primary/50 opacity-100 scale-[1.02] shadow-2xl"
                  : "bg-background border-border/30 opacity-40 hover:opacity-100"
                  }`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Hover Tech Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="relative z-10 flex justify-between items-start">
                  <span className="font-mono text-xs tracking-widest text-muted-foreground/50 group-hover:text-primary transition-colors">
                    0{index + 1}
                  </span>
                  <div className={`p-2 rounded-lg transition-colors duration-300 ${isHovered ? "bg-secondary text-primary" : "bg-secondary/30 text-muted-foreground"}`}>
                    <area.icon size={20} className="transition-transform duration-500 group-hover:scale-110" />
                  </div>
                </div>

                <div className="relative z-10 mt-auto">
                  <span className="block font-mono text-[9px] tracking-widest uppercase text-muted-foreground/60 mb-2 group-hover:text-primary transition-colors">
                    {area.label}
                  </span>
                  <h3 className="text-xl font-normal text-foreground/50 mb-3 group-hover:text-primary transition-colors">
                    {area.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 group-hover:text-foreground/80 transition-colors">
                    {area.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Footer Contact Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-between gap-8 pt-12 border-t border-border"
        >
          <div className="flex flex-col md:flex-row gap-12">
            <a href="mailto:hello@christex.foundation" className="group flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:border-primary group-hover:bg-primary/10 transition-colors">
                <Mail className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <div>
                <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1">Email Us</div>
                <div className="text-foreground group-hover:text-primary transition-colors">hello@christex.foundation</div>
              </div>
            </a>

            <a
              href="https://maps.google.com/?q=Fourah+Bay+College+Mount+Aureol+Freetown+Sierra+Leone"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:border-primary group-hover:bg-primary/10 transition-colors">
                <MapPin className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <div>
                <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1">Visit Us</div>
                <div className="text-foreground group-hover:text-primary transition-colors">Freetown, Sierra Leone</div>
              </div>
            </a>
          </div>


        </motion.div>
      </div>

      {/* Decorative Gradients */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent/10 blur-[150px] rounded-full pointer-events-none translate-x-1/3 translate-y-1/3" />
    </section>
  )
}
