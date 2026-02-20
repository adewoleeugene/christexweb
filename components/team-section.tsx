"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { ArrowUpRight, Grid, Layers, Code, Users } from "lucide-react"

interface TeamMember {
    name: string
    role: string
    category: string
    socials?: { label: string; href: string }[]
    image?: string
}

const team: TeamMember[] = [
    // Management
    {
        name: "David Ogoo",
        role: "Founder",
        category: "Management",
        image: "/images/team/david-ogoo.webp",
        socials: []
    },
    {
        name: "Mahawa Sandy",
        role: "Ops & Strategy Support",
        category: "Management",
        image: "/images/team/mahawa-sandy.webp",
        socials: []
    },
    {
        name: "Nematulai Barrie",
        role: "Comms Lead",
        category: "Management",
        image: "/images/team/nematulai-barrie.webp",
        socials: []
    },
    {
        name: "Francess Beresford-Renner",
        role: "Ops & Strategy Lead",
        category: "Management",
        image: "/images/team/francess-beresford-renner.webp",
        socials: []
    },
    // Design
    {
        name: "Timothy Williams",
        role: "Interaction Designer",
        category: "Design",
        image: "/images/team/timothy-williams.webp",
        socials: []
    },
    {
        name: "Ayorinde John",
        role: "Multimedia Producer",
        category: "Design",
        image: "/images/team/ayorinde-john.webp",
        socials: []
    },
    // Development
    {
        name: "Saidu Bundu-Kamara",
        role: "Software Engineer",
        category: "Development",
        image: "/images/team/saidu-bundu-kamara.webp",
        socials: []
    },
    {
        name: "Mitchel Dennis",
        role: "Software Engineer",
        category: "Development",
        image: "/images/team/mitchel-dennis.webp",
        socials: []
    },
    {
        name: "Eugene John",
        role: "Software Engineer",
        category: "Development",
        image: "/images/team/eugene-john.webp",
        socials: []
    },
    {
        name: "Benjamin Thorpe",
        role: "Software Engineer",
        category: "Development",
        image: "/images/team/benjamin.webp",
        socials: []
    },
    {
        name: "Mark Gbla",
        role: "Software Engineer",
        category: "Development",
        image: "/images/team/mark-gbla.webp",
        socials: []
    },
]

const categories = [
    { id: "All", label: "All", icon: Grid },
    { id: "Management", label: "Management", icon: Users },
    { id: "Design", label: "Design", icon: Layers },
    { id: "Development", label: "Development", icon: Code },
]

export function TeamSection() {
    const [activeCategory, setActiveCategory] = useState("All")
    const [hoveredMember, setHoveredMember] = useState<string | null>(null)

    useEffect(() => {
        if (hoveredMember) {
            const el = document.getElementById(`nav-${hoveredMember.replace(/\s+/g, '-')}`)
            const container = document.getElementById("nav-container")
            if (el && container) {
                const cRect = container.getBoundingClientRect()
                const eRect = el.getBoundingClientRect()

                // Mobile: horizontal scroll check
                if (eRect.left < cRect.left || eRect.right > cRect.right) {
                    container.scrollTo({
                        left: container.scrollLeft + (eRect.left - cRect.left) - (cRect.width / 2) + (eRect.width / 2),
                        behavior: 'smooth'
                    })
                }

                // Desktop: vertical scroll check
                if (eRect.top < cRect.top || eRect.bottom > cRect.bottom) {
                    container.scrollTo({
                        top: container.scrollTop + (eRect.top - cRect.top) - (cRect.height / 2) + (eRect.height / 2),
                        behavior: 'smooth'
                    })
                }
            }
        }
    }, [hoveredMember])

    const filteredTeam = activeCategory === "All"
        ? team
        : team.filter(member => member.category === activeCategory)

    return (
        <section className="relative w-full min-h-screen lg:h-screen lg:max-h-screen py-4 md:py-8 bg-background text-foreground flex flex-col">
            <div className="container mx-auto px-4 md:px-6 flex-1 flex flex-col">

                {/* System Status */}
                <div className="flex-none mb-6">
                    <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground uppercase tracking-widest">
                        <span>System Online</span>
                        <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                    </div>
                </div>

                <div className="flex-1 flex flex-col lg:flex-row gap-8 lg:gap-12 min-h-0 lg:items-stretch items-start">

                    {/* Sidebar / Navigation */}
                    <div className="flex-none lg:w-64 space-y-4 lg:space-y-0 mb-6 lg:mb-0 flex flex-col">
                        <h2 className="text-xl font-medium mb-4 lg:mb-6 shrink-0 lg:h-[28px] flex lg:items-center">Personnel Directory</h2>
                        <nav id="nav-container" className="flex flex-wrap lg:flex-col lg:flex-nowrap lg:justify-between flex-1 gap-2 lg:gap-1 max-h-none scrollbar-none pb-2 lg:pb-0 relative">

                            {team.map((member) => (
                                <div
                                    key={member.name}
                                    id={`nav-${member.name.replace(/\s+/g, '-')}`}
                                    onPointerEnter={(e) => {
                                        if (e.pointerType === "mouse") setHoveredMember(member.name)
                                    }}
                                    onPointerLeave={(e) => {
                                        if (e.pointerType === "mouse") setHoveredMember(null)
                                    }}
                                    onClick={() => {
                                        setHoveredMember(prev => prev === member.name ? null : member.name);
                                        const card = document.getElementById(`person-${member.name.replace(/\s+/g, '-')}`);
                                        if (card) {
                                            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                        }
                                    }}
                                    className={cn(
                                        "flex flex-col px-4 py-2 lg:py-3 text-xs lg:text-sm transition-all duration-300 border border-border lg:border-0 lg:border-l-2 rounded-full lg:rounded-none text-left group cursor-pointer lg:cursor-default shrink-0",
                                        hoveredMember === member.name
                                            ? "border-primary lg:border-primary bg-primary/10 lg:bg-muted/40 text-foreground font-medium"
                                            : "lg:border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/20"
                                    )}
                                >
                                    <span>{member.name}</span>
                                    <span className="text-[10px] text-muted-foreground/70 uppercase tracking-wider font-normal mt-0.5 group-hover:text-muted-foreground transition-colors hidden lg:block">
                                        {member.role}
                                    </span>
                                </div>
                            ))}
                        </nav>
                    </div>

                    {/* Main Content Grid */}
                    <div className="flex-1 min-h-0 scrollbar-none pr-0 lg:pr-2 flex flex-col w-full">
                        {/* 52px spacer perfectly offsets the 28px heading + 24px (mb-6) from the sidebar above it */}
                        <div className="hidden lg:block h-[52px] shrink-0" />
                        <motion.div
                            layout
                            className="flex-1 grid auto-rows-fr grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:pb-0 pb-8"
                        >
                            <AnimatePresence mode="popLayout">
                                {filteredTeam.map((member, index) => {
                                    const isHovered = hoveredMember === member.name
                                    const isDimmed = hoveredMember !== null && !isHovered

                                    return (
                                        <motion.div
                                            layout
                                            key={member.name}
                                            id={`person-${member.name.replace(/\s+/g, '-')}`}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ duration: 0.3 }}
                                            onPointerEnter={(e) => {
                                                if (e.pointerType === "mouse") setHoveredMember(member.name)
                                            }}
                                            onPointerLeave={(e) => {
                                                if (e.pointerType === "mouse") setHoveredMember(null)
                                            }}
                                            onClick={() => setHoveredMember(prev => prev === member.name ? null : member.name)}
                                            className={cn(
                                                "group aspect-[3/4] lg:aspect-auto lg:h-full relative border border-border/40 bg-card/30 overflow-hidden rounded-lg transition-all duration-500",
                                                isDimmed ? "opacity-30 scale-95 grayscale" : "opacity-100 scale-100",
                                                isHovered ? "ring-1 ring-primary/50 shadow-lg scale-[1.02] z-10" : ""
                                            )}
                                        >
                                            <div className="flex flex-col h-full w-full">
                                                {/* Image & Overlay Section */}
                                                <div className="relative h-full w-full overflow-hidden bg-muted">
                                                    {member.image ? (
                                                        <Image
                                                            src={member.image}
                                                            alt={member.name}
                                                            fill
                                                            className={cn(
                                                                "object-cover object-top transition-all duration-500",
                                                                isHovered ? "grayscale-0 scale-105" : "grayscale group-hover:grayscale-0 group-hover:scale-105"
                                                            )}
                                                        />
                                                    ) : (
                                                        <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground">
                                                            No Image
                                                        </div>
                                                    )}

                                                    {/* Text Overlay */}
                                                    <motion.div
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: isHovered ? 1 : 0 }}
                                                        transition={{ duration: 0.3 }}
                                                        className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent"
                                                    >
                                                        <h3 className="text-base md:text-lg font-medium text-white flex items-center gap-2">
                                                            {member.name}
                                                        </h3>
                                                        <p className="text-xs md:text-sm text-white/70 mt-1 font-mono uppercase tracking-wide">
                                                            {member.role}
                                                        </p>
                                                    </motion.div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )
                                })}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}
