"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const footerLinks = {
  programs: [
    { label: "Skills Training", href: "#services" },
    { label: "Venture Studio", href: "#ventures" },
    { label: "Innovation Hub", href: "#services" },
    { label: "CivicTech", href: "#services" },
  ],
  ventures: [
    { label: "Mocha", href: "https://www.getmocha.io/" },
    { label: "SendMe", href: "https://sendmesl.com/" },
    { label: "DPG pipeline", href: "https://launch.publicgood.dev/" },
  ],
  resources: [
    { label: "About Us", href: "#about" },
    { label: "Partners", href: "#partners" },
    { label: "Bounty Programme", href: "#" },
    { label: "Open Learning", href: "#" },
    {
      label: "Media Kit",
      href: "https://drive.google.com/drive/folders/1duceU8Oi9rRBeEcQL8e5IBJpCfZ7734b?usp=sharing",
    },
  ],

}

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-6 lg:px-12 py-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <Image src="/images/logomark-20on-20black.png" alt="Christex Foundation" width={32} height={32} className="h-8 w-auto" />
              <span className="font-mono text-sm tracking-wider uppercase text-foreground">Christex Foundation</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mb-4">
              Driving Sierra Leone's digital transformation through AI and blockchain education, venture building, and
              civic tech solutions.
            </p>
            <p className="font-mono text-xs text-muted-foreground mb-6">Freetown, Sierra Leone</p>
            <div className="font-mono text-xs text-muted-foreground">
              © {new Date().getFullYear()} Christex Foundation. All rights reserved.
            </div>
          </div>

          {/* Programs Links */}
          <div>
            <div className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-4">Programs</div>
            <ul className="space-y-3">
              {footerLinks.programs.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Ventures Links */}
          <div>
            <div className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-4">Ventures</div>
            <ul className="space-y-3">
              {footerLinks.ventures.map((link) => {
                const isExternal = link.href.startsWith("http")
                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <div className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-4">Resources</div>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => {
                const isExternal = link.href.startsWith("http")
                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>


        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-mono text-xs text-muted-foreground">
            <span className="text-muted-foreground/50">STATUS:</span>{" "}
            <span className="text-accent">● {new Date().getFullYear()} INNOVATION HUB OF THE YEAR</span>
          </div>
          <div className="font-mono text-xs text-muted-foreground flex flex-wrap items-center gap-6">
            <a
              href="https://discord.gg/christexfndn"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Discord
            </a>
            <a
              href="https://chat.whatsapp.com/D2rH0mP8hHV085CWH4rsFC"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              WhatsApp
            </a>
            <a
              href="https://x.com/christexfndn?s=21&t=aVMPuPg0zSBHOHlkMl6VxA"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              X
            </a>
            <a
              href="https://www.tiktok.com/@christexfndn?_t=8ni5BlPoxmQ&_r=1"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              TikTok
            </a>
            <a
              href="https://www.youtube.com/@ChristexFndn"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              YouTube
            </a>
            <a
              href="https://linkedin.com/company/christex-foundation"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/christex-foundation"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </motion.div>
    </footer>
  )
}
