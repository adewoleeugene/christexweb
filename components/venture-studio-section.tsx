"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import {
  Terminal,
  LayoutGrid,
  Wallet,
  Truck,
  Building2,

  Code2,
  ArrowUpRight,
  Database
} from "lucide-react"

import { SubmitIdeaModal } from "@/components/submit-idea-modal"

const categories = [
  { id: "all", label: "All", icon: LayoutGrid },
  { id: "FinTech", label: "FinTech", icon: Wallet },
  { id: "CivicTech", label: "CivicTech", icon: Building2 },
  { id: "Logistics", label: "Logistics", icon: Truck },
  { id: "Infrastructure", label: "Infrastructure", icon: Database },

]

const ventures = [
  {
    id: 1,
    name: "Mocha",
    category: "FinTech",
    description: "Borderless, fee-free money transfers via WhatsApp for the African diaspora.",
    status: "Active",
    url: "https://www.getmocha.io/",
  },
  {
    id: 2,
    name: "SendMe",
    category: "Logistics",
    description: "Online shopping and last-mile delivery service for Sierra Leone.",
    status: "Active",
    url: "https://www.sendmesl.com/",
  },
  {
    id: 3,
    name: "SAMS",
    category: "CivicTech",
    description: "Smart Asset Management System using distributed ledger technology for government.",
    status: "Deployed",
    url: null,
  },
  {
    id: 4,
    name: "DPG Pipeline",
    category: "Infrastructure",
    description: "Platform helping projects become certified Digital Public Goods.",
    status: "Building",
    url: "https://launch.publicgood.dev/",
  },

]

export function VentureStudioSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredVentures = activeCategory === "all"
    ? ventures
    : ventures.filter(v => v.category === activeCategory)

  return (
    <section id="ventures" ref={ref} className="py-24 md:py-32 bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row border border-border bg-card/20 backdrop-blur-sm shadow-2xl overflow-hidden rounded-sm"
        >
          {/* Sidebar / Categories */}
          <div className="w-full lg:w-72 border-b lg:border-b-0 lg:border-r border-border flex flex-col">
            {/* Terminal Header */}
            <div className="h-16 flex items-center px-6 border-b border-border bg-card/50">
              <Terminal className="w-4 h-4 mr-3 text-muted-foreground" />
              <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
                Ventures Studio
              </span>
            </div>

            {/* Categories Title */}
            <div className="p-8 pb-4">
              <h3 className="text-2xl font-light text-foreground leading-tight mb-2">
                Explore<br />
                Categories
              </h3>
            </div>

            {/* Category Buttons */}
            <div className="flex-1 overflow-y-auto">
              <div className="flex flex-col">
                {categories.map((cat) => {
                  const Icon = cat.icon
                  const isActive = activeCategory === cat.id
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`
                        w-full text-left px-8 py-4 flex items-center gap-3 transition-all duration-200 border-l-2
                        ${isActive
                          ? "bg-foreground text-background border-accent"
                          : "text-muted-foreground hover:text-foreground hover:bg-white/5 border-transparent"
                        }
                      `}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? "text-background" : "text-muted-foreground"}`} />
                      <span className="font-medium text-sm">{cat.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Main Content / List */}
          <div className="flex-1 bg-black/40 min-h-[600px] flex flex-col">
            {/* List Header */}
            <div className="h-16 flex items-center justify-between px-8 border-b border-border bg-card/50">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="font-mono text-xs text-muted-foreground">System Online</span>
              </div>
              <span className="font-mono text-xs text-muted-foreground hidden sm:block">
                Displaying {filteredVentures.length} Result{filteredVentures.length !== 1 && 's'}
              </span>
            </div>

            {/* List Items */}
            <div className="flex-1 overflow-y-auto pb-6">
              {filteredVentures.map((venture, index) => (
                <motion.div
                  key={venture.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative flex flex-col sm:flex-row items-start sm:items-center gap-6 p-8 mx-6 mt-6 rounded-2xl border border-border/50 hover:border-primary/50 transition-colors overflow-hidden bg-card/40"
                >
                  {/* Clickable Overlay */}
                  {venture.url && (
                    <a
                      href={venture.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 z-20 cursor-pointer"
                      aria-label={`Visit ${venture.name}`}
                    />
                  )}

                  {/* Hover Tech Pattern - Consistent with Services/About */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Number Badge */}
                  <div className="relative z-10 flex-shrink-0 w-8 h-8 rounded-full border border-border flex items-center justify-center text-xs font-mono text-muted-foreground group-hover:border-primary group-hover:text-primary transition-colors mt-1 sm:mt-0 bg-background/50 backdrop-blur-sm">
                    {index + 1}
                  </div>

                  {/* Content */}
                  <div className="relative z-10 flex-1 min-w-0 pr-4">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-lg font-normal text-foreground truncate group-hover:text-primary transition-colors">
                        {venture.name}
                      </h4>
                      {venture.url && <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 font-light group-hover:text-muted-foreground/80">
                      {venture.description}
                    </p>
                  </div>

                  {/* Category Tag (Right Side) */}
                  <div className="relative z-10 hidden sm:flex items-center gap-2 text-right">
                    <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground/60 group-hover:text-primary transition-colors">
                      {venture.category}
                    </span>
                    {(() => {
                      const CatIcon = categories.find((c) => c.id === venture.category)?.icon || Code2
                      return (
                        <CatIcon className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary transition-colors" />
                      )
                    })()}
                  </div>
                </motion.div>
              ))}

              {filteredVentures.length === 0 && (
                <div className="p-12 text-center text-muted-foreground font-mono text-sm">
                  No ventures found in this category.
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-6">
            Have an idea that solves a real problem in Africa? We partner with exceptional founders.
          </p>
          <SubmitIdeaModal />
        </div>
      </div>
    </section>
  )
}
