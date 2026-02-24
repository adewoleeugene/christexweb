"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, MonitorPlay, BookOpen, ExternalLink, Copy, Check } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"


// import type { LearnResource } from "@/lib/airtable" // Import this type

const communityItems = [
  { title: "Problem Bank", href: "https://build.christex.foundation/", description: "Find problems to solve." },
  { title: "Bounty", href: "https://earn.christex.foundation/", description: "Earn rewards for contributions." },
  // { title: "Events", href: "/events", description: "Upcoming community gatherings." },
  // { title: "Hackathon", href: "/hackathon", description: "Participate in hackathons." },
  { title: "News", href: "/blog", description: "Latest updates and articles." },
]

// Default/Fallback data
const defaultLearnItems = [
  {
    category: "Videos",
    icon: MonitorPlay,
    items: [
      {
        title: "Season One: Wave One | Educational Videos",
        href: "https://www.youtube.com/playlist?list=PLjuk89-5uXoCH5M92lJ85gUdaD9Z--Vop"
      },
      {
        title: "AI Series",
        href: "https://www.youtube.com/playlist?list=PLjuk89-5uXoD336iw-5RH8OORD6kDSF6U",
        featured: true,
        thumbnail: "https://i.ytimg.com/vi/zqLXS0zsTtM/maxresdefault.jpg",
        description: "Dive deep into the fundamentals of Artificial Intelligence."
      },
      {
        title: "Solana - How it works",
        href: "https://www.youtube.com/playlist?list=PLjuk89-5uXoBU7-f_HZOSi8qiZwKH5tOf"
      },
      {
        title: "Season One | Wave Two | Product Workshop",
        href: "https://www.youtube.com/playlist?list=PLjuk89-5uXoD1VHrmR0E6_ShUwQ-FQivV"
      },
      {
        title: "Season One | Wave Two | Digital Literacy",
        href: "https://www.youtube.com/playlist?list=PLjuk89-5uXoCGSrw9pZu5s1A59p0DADAa"
      },
      {
        title: "Season One | Wave Two | Engineering Essentials",
        href: "https://www.youtube.com/playlist?list=PLjuk89-5uXoDuFfvc9I5iW6Y_VEEcjfHk"
      },
    ]
  },
  /*
  {
    category: "Articles",
    icon: BookOpen,
    items: [
      { title: "Coming soon", href: "#" }
    ]
  }
  */

]

// Define types to strictly match what Airtable returns
interface LearnResource {
  id: string;
  title: string;
  url: string;
  category: string;
  featured?: boolean;
  thumbnail?: string;
  description?: string;
}

interface HeaderProps {
  learnResources?: LearnResource[];
}

export function Header({ learnResources = [] }: HeaderProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  // Merge/Transform learn resources
  // If resources are passed, group them. If not, use default.
  // Note: We need to map category string to an icon.
  const categoryIcons: Record<string, any> = {
    "Videos": MonitorPlay,
    "Articles": BookOpen,
    // Add others as needed
  };

  const menuItems = React.useMemo(() => {
    if (!learnResources || learnResources.length === 0) return defaultLearnItems;

    const grouped = learnResources.reduce((acc, item) => {
      const cat = item.category || "Other";
      if (!acc[cat]) {
        acc[cat] = {
          category: cat,
          icon: categoryIcons[cat] || BookOpen,
          items: []
        };
      }
      acc[cat].items.push({
        title: item.title,
        href: item.url,
        featured: item.featured,
        thumbnail: item.thumbnail,
        description: item.description
      });
      return acc;
    }, {} as Record<string, any>);

    return Object.values(grouped);
  }, [learnResources]);

  // State for the "Featured" item in the menu
  const [featuredItem, setFeaturedItem] = useState<{
    title: string;
    description: string;
    category: string;
    link: string;
    date: string;
    imageUrl?: string | null;
  } | null>(null);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const res = await fetch('/api/latest-update');
        if (res.ok) {
          const data = await res.json();
          setFeaturedItem(data);
        }
      } catch (e) {
        console.error("Failed to fetch latest update for menu", e);
      }
    };

    fetchLatest();
  }, []);

  // Default fallback
  const effectiveFeaturedItem = featuredItem || {
    title: "Latest News",
    description: "Check out our latest updates and community stories.",
    category: "News", // Label
    link: "/blog",
    date: "",
    imageUrl: null
  };

  const isCommunityActive = communityItems.some(item =>
    item.href.startsWith('/') && (pathname === item.href || pathname?.startsWith(item.href + '/'))
  )

  const isLearnActive = menuItems.some((section: any) =>
    section.items.some((item: any) =>
      item.href.startsWith('/') && (pathname === item.href || pathname?.startsWith(item.href + '/'))
    )
  )

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16">
          <motion.a
            href="/"
            className="flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Image src="/images/logomark-20on-20black.png" alt="Christex Foundation" width={32} height={32} className="h-8 w-auto" />
            <span className="font-mono text-sm tracking-wider uppercase text-foreground hidden sm:block">
              Christex Foundation
            </span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <NavigationMenu className="z-50" delayDuration={0}>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={cn(
                      "bg-transparent text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent data-[active]:bg-transparent",
                      isCommunityActive && "text-primary font-semibold bg-primary/10 hover:bg-primary/10"
                    )}
                  >
                    Community
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[500px] grid-cols-[1fr_220px] gap-4 p-4 md:w-[600px] md:grid-cols-[1fr_240px]">
                      <ul className="grid gap-2">
                        {communityItems.map((item) => {
                          const isActive = item.href.startsWith('/') && (pathname === item.href || pathname?.startsWith(item.href + '/'))
                          return (
                            <ListItem
                              key={item.title}
                              title={item.title}
                              href={item.href}
                              className={isActive ? "bg-primary/10 text-primary" : ""}
                            >
                              {item.description}
                            </ListItem>
                          )
                        })}
                      </ul>
                      <a
                        href={effectiveFeaturedItem.link}
                        className="flex flex-col justify-end rounded-xl bg-neutral-900 border border-white/10 p-6 no-underline outline-none focus:shadow-md h-full relative overflow-hidden group select-none hover:border-primary/50 transition-colors"
                      >
                        {/* Background Image if available */}
                        {effectiveFeaturedItem.imageUrl ? (
                          <>
                            <Image
                              src={effectiveFeaturedItem.imageUrl}
                              alt={effectiveFeaturedItem.title}
                              fill
                              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-70 transition-opacity duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                          </>
                        ) : (
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        )}

                        <div className="relative z-10 mt-auto">
                          <div className="text-xs font-mono text-primary mb-2 uppercase tracking-widest">{effectiveFeaturedItem.category || "Featured"}</div>
                          <div className="mb-2 text-xl font-bold text-white leading-tight line-clamp-3">
                            {effectiveFeaturedItem.title}
                          </div>
                          <p className="text-sm leading-tight text-white/80 mb-4 line-clamp-3">
                            {effectiveFeaturedItem.description}
                          </p>
                          <div className="inline-flex items-center justify-center rounded-full bg-white text-black px-4 py-1.5 text-xs font-bold font-mono uppercase tracking-wide group-hover:bg-primary transition-colors">
                            Read More
                          </div>
                        </div>
                      </a>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={cn(
                      "bg-transparent text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent data-[active]:bg-transparent",
                      isLearnActive && "text-primary font-semibold bg-primary/10 hover:bg-primary/10"
                    )}
                  >
                    Learn
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[500px] grid-cols-[1fr_220px] gap-4 p-4 md:w-[600px] md:grid-cols-[1fr_240px]">
                      <div className="flex flex-col gap-3">
                        {menuItems.map((section: any) => (
                          <div key={section.category} className="space-y-3">
                            {/* <h4 className="font-medium leading-none flex items-center gap-2">
                              <section.icon className="h-4 w-4" />
                              {section.category}
                            </h4> */}
                            <ul className="grid gap-2">
                              {section.items.map((item: any) => {
                                const isActive = item.href.startsWith('/') && (pathname === item.href || pathname?.startsWith(item.href + '/'))
                                return (
                                  <ListItem
                                    key={item.title}
                                    title={item.title}
                                    href={item.href}
                                    className={isActive ? "bg-primary/10 text-primary" : ""}
                                  >

                                  </ListItem>
                                )
                              })}
                            </ul>
                          </div>
                        ))}
                      </div>

                      {/* Featured Learn Item (Dynamic) */}
                      {(() => {
                        const featuredLearnItem = menuItems.flatMap((sec: any) => sec.items).find((i: any) => i.featured)

                        if (!featuredLearnItem) return null;

                        return (
                          <a
                            href={featuredLearnItem.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col justify-end rounded-xl bg-neutral-900 border border-white/10 p-6 no-underline outline-none focus:shadow-md h-full relative overflow-hidden group select-none hover:border-primary/50 transition-colors"
                          >
                            {(featuredLearnItem as any).thumbnail ? (
                              <Image
                                src={(featuredLearnItem as any).thumbnail}
                                alt={featuredLearnItem.title}
                                fill
                                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-60 transition-opacity duration-500 scale-105 group-hover:scale-110"
                              />
                            ) : (
                              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

                            <div className="relative z-10 mt-auto">
                              <div className="text-xs font-mono text-primary mb-2 uppercase tracking-widest">Featured</div>
                              <div className="mb-2 text-xl font-bold text-white leading-tight">
                                {featuredLearnItem.title}
                              </div>
                              {(featuredLearnItem as any).description && (
                                <p className="text-sm leading-tight text-white/80 mb-4">
                                  {(featuredLearnItem as any).description}
                                </p>
                              )}
                              <div className="inline-flex items-center justify-center rounded-full bg-white text-black px-4 py-1.5 text-xs font-bold font-mono uppercase tracking-wide group-hover:bg-primary transition-colors">
                                Watch Now
                              </div>
                            </div>
                          </a>
                        )
                      })()}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/team" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        "group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground hover:bg-transparent focus:bg-transparent focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-transparent data-[state=open]:bg-transparent transition-colors",
                        (pathname === '/team' || pathname?.startsWith('/team/')) && "text-primary font-semibold bg-primary/10 hover:bg-primary/10"
                      )}
                    >
                      The Team
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className="ml-2"
            >
              <button
                onClick={() => {
                  navigator.clipboard.writeText("hello@christex.foundation")
                  toast.success("Email copied to clipboard!", {
                    description: "hello@christex.foundation",
                    duration: 3000,
                  })
                  window.location.href = "mailto:hello@christex.foundation"
                }}
                className="inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground hover:bg-transparent focus:bg-transparent transition-colors outline-none cursor-pointer"
              >
                Partner With Us
              </button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-foreground" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <nav className="flex flex-col px-6 py-4 gap-4 max-h-[80vh] overflow-y-auto">
              <Accordion type="single" collapsible className="w-full border-none">
                <AccordionItem value="community" className="border-none">
                  <AccordionTrigger
                    className={cn(
                      "py-2 font-mono text-xs tracking-wider uppercase text-muted-foreground hover:text-foreground hover:no-underline",
                      isCommunityActive && "text-primary font-semibold"
                    )}
                  >
                    Community
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-3 pl-4 pt-2">
                      {communityItems.map((item) => {
                        const isActive = item.href.startsWith('/') && (pathname === item.href || pathname?.startsWith(item.href + '/'))
                        return (
                          <a
                            key={item.title}
                            href={item.href}
                            className={cn(
                              "text-sm text-foreground/80 hover:text-foreground",
                              isActive && "text-foreground font-semibold"
                            )}
                            onClick={() => setIsOpen(false)}
                          >
                            {item.title}
                          </a>
                        )
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="learn" className="border-none">
                  <AccordionTrigger
                    className={cn(
                      "py-2 font-mono text-xs tracking-wider uppercase text-muted-foreground hover:text-foreground hover:no-underline",
                      isLearnActive && "text-primary font-semibold"
                    )}
                  >
                    Learn
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-4 pl-4 pt-2">
                      {menuItems.map((section: any) => (
                        <div key={section.category} className="space-y-2">
                          <div className="text-xs font-semibold text-muted-foreground uppercase">{section.category}</div>
                          <div className="flex flex-col gap-2 pl-2">
                            {section.items.map((item: any) => {
                              const isActive = item.href.startsWith('/') && (pathname === item.href || pathname?.startsWith(item.href + '/'))
                              return (
                                <a
                                  key={item.title}
                                  href={item.href}
                                  className={cn(
                                    "text-sm text-foreground/80 hover:text-foreground",
                                    isActive && "text-foreground font-semibold"
                                  )}
                                  onClick={() => setIsOpen(false)}
                                >
                                  {item.title}
                                </a>
                              )
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Link
                href="/team"
                className={cn(
                  "py-2 font-mono text-xs tracking-wider uppercase text-muted-foreground hover:text-foreground border-b border-white/10",
                  (pathname === '/team' || pathname?.startsWith('/team/')) && "text-primary font-semibold"
                )}
                onClick={() => setIsOpen(false)}
              >
                The Team
              </Link>

              <Button
                variant="outline"
                size="sm"
                className="font-mono text-xs tracking-wider uppercase rounded-none border-foreground text-foreground hover:bg-foreground hover:text-background w-fit bg-transparent mt-4"
                onClick={() => {
                  navigator.clipboard.writeText("hello@christex.foundation")
                  toast.success("Email copied to clipboard!", {
                    description: "hello@christex.foundation",
                  })
                  window.location.href = "mailto:hello@christex.foundation"
                  setIsOpen(false)
                }}
              >
                Partner With Us
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none text-white group-hover:text-primary">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-white/60 group-hover:text-white/80">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
