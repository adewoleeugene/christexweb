"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

const stats = [
  { value: "4,500+", label: "Participants Trained" },
  { value: "14K", label: "Training Hours" },
  { value: "$52K", label: "Hackathon Earnings" },
  { value: "5K+", label: "Students Reached" },
]

export function StatsBar() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="border-y border-border bg-card">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-border">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="py-12 px-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="text-3xl md:text-4xl font-light text-foreground mb-2">{stat.value}</div>
              <div className="font-mono text-xs tracking-wider uppercase text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
