"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Layers, Rocket, Globe } from "lucide-react"

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const cards = [
    {
      icon: Layers,
      title: "Four-Stage Learning",
      description: "Foundations → Core Tech Skills → Emerging Technologies → Practice & Deploy. Project-based learning that prepares learners for real-world impact.",
      delay: 0.2
    },
    {
      icon: Rocket,
      title: "Hybrid Venture Model",
      description: "Build-first studio-originated ventures combined with founder-led support. From ideation to spinout with shared infrastructure.",
      delay: 0.3
    },
    {
      icon: Globe,
      title: "Open Access",
      description: "All training is completely free. No entry requirements. Equipment and internet provided. All workshops published online.",
      delay: 0.4
    }
  ]

  return (
    <section id="about" ref={ref} className="relative py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left Column - Story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-[1px] bg-primary"></div>
              <span className="font-mono text-xs tracking-widest uppercase text-primary">About Us</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-light text-foreground mb-8 text-balance leading-tight">
              Driving digital transformation in <span className="text-muted-foreground">Sierra Leone</span>.
            </h2>

            <div className="space-y-6 text-muted-foreground leading-relaxed text-lg font-light">
              <p>
                Founded in 2022, Christex Foundation equips Sierra Leone with the skills and infrastructure needed to thrive in the global digital economy.
              </p>
              <p>
                With a special focus on <span className="text-foreground">AI and blockchain</span>, we deliver grassroots programmes that prepare technical talent and build sustainable startups.
              </p>
              <p>
                Our approach blends education, entrepreneurship, and direct earning opportunities to build a pipeline of skilled innovators and sustainable startups. We&apos;ve trained over 4,500 participants and our community has earned $52,000+ in global hackathons.
              </p>
            </div>

            <div className="mt-12 flex items-center gap-12 border-t border-border pt-8 relative">
              <div className="relative z-10 flex items-center gap-12">
                <div>
                  <div className="text-3xl font-light text-foreground">4,500+</div>
                  <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider mt-2">Learners Trained</div>
                </div>
                <div>
                  <div className="text-3xl font-light text-foreground">$52k+</div>
                  <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider mt-2">Hackathon Earnings</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Cards Grid */}
          <div className="grid grid-cols-1 gap-6">
            {cards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: card.delay }}
                className="group relative p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-500"
              >
                {/* Tech Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />

                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-6 text-foreground group-hover:text-primary group-hover:bg-primary/10 transition-colors duration-500">
                    <card.icon size={24} strokeWidth={1.5} />
                  </div>

                  <h3 className="text-xl font-medium text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {card.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
      {/* Decorative Orbs - Subtly spread out behind stats */}
      <div className="absolute top-[600px] left-[-5%] w-[600px] h-[600px] bg-orange-500/10 blur-[130px] rounded-full pointer-events-none mix-blend-screen" />

      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-48 -left-24 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[140px] pointer-events-none mix-blend-screen" />
    </section>
  )
}
