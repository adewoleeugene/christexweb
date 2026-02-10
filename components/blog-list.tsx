"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { BlogPost } from "@/lib/airtable"
import { Button } from "@/components/ui/button"
import { Filter, Search, Calendar } from "lucide-react"

interface BlogListProps {
    posts: BlogPost[]
    categories: string[]
}

export function BlogList({ posts }: BlogListProps) {
    // Hide the entire section if there are no posts to display
    if (!posts || posts.length === 0) {
        return null
    }

    const [selectedCategory, setSelectedCategory] = useState("All")
    const [searchQuery, setSearchQuery] = useState("")

    // Derive categories from current posts to ensure we only show active categories
    const categories = useMemo(() => {
        const cats = new Set(posts.map(p => p.category).filter(Boolean))
        return ["All", ...Array.from(cats)]
    }, [posts])

    const filteredPosts = posts.filter(post => {
        const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (post.excerpt && post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
        return matchesCategory && matchesSearch
    })

    return (
        <>
            {/* Navigation / Filter Bar */}
            <section className="py-8 px-6 lg:px-12 border-b border-border sticky top-16 z-40 bg-background/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

                    {/* Categories */}
                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full md:w-auto pb-2 md:pb-0">
                        <Filter className="w-4 h-4 text-muted-foreground shrink-0 mr-2" />
                        {categories.map((cat, i) => (
                            <Button
                                key={cat}
                                variant={selectedCategory === cat ? "secondary" : "ghost"}
                                onClick={() => setSelectedCategory(cat)}
                                className={`rounded-full font-mono text-xs uppercase h-8 transition-all ${selectedCategory === cat ? "bg-primary/10 text-primary hover:bg-primary/20" : "text-muted-foreground hover:text-foreground"}`}
                            >
                                {cat}
                            </Button>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="hidden md:flex items-center relative w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-muted/50 border border-border rounded-full pl-10 pr-4 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                        />
                    </div>
                </div>
            </section>

            {/* Latest Posts Grid */}
            <section className="py-20 px-6 lg:px-12 relative overflow-visible">
                {/* Background Decor - Subtle teal sweep */}
                <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-teal-500/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen -z-10" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex items-center justify-between mb-12">
                        <div className="flex items-baseline gap-4">
                            <h3 className="text-2xl font-bold">Latest Updates</h3>
                            <span className="text-sm text-muted-foreground font-mono">
                                {filteredPosts.length} {filteredPosts.length === 1 ? 'Article' : 'Articles'}
                            </span>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 min-h-[400px]">
                        <AnimatePresence mode="popLayout">
                            {filteredPosts.map((post) => (
                                <motion.article
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.2 }}
                                    key={post.id}
                                    className="group flex flex-col h-full cursor-pointer"
                                >
                                    {/* Image Placeholder */}
                                    <Link href={`/blog/${post.slug}`} className="block overflow-hidden rounded-2xl mb-6 relative aspect-[16/10] border border-border">
                                        {post.imageUrl ? (
                                            <Image src={post.imageUrl} alt={post.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                                        ) : (
                                            <div className="w-full h-full bg-neutral-900 group-hover:scale-105 transition-transform duration-500" />
                                        )}
                                        <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider border border-border">
                                            {post.category}
                                        </div>
                                    </Link>

                                    <div className="flex-1 flex flex-col">
                                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3 font-mono">
                                            <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {post.date}</span>
                                            <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                                            <span>{post.readTime}</span>
                                        </div>

                                        <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                            <Link href={`/blog/${post.slug}`} className="focus:outline-none">
                                                {post.title}
                                            </Link>
                                        </h2>

                                        <p className="text-muted-foreground mb-6 line-clamp-3">
                                            {post.excerpt}
                                        </p>
                                    </div>
                                </motion.article>
                            ))}
                        </AnimatePresence>

                        {filteredPosts.length === 0 && (
                            <div className="col-span-full py-20 text-center text-muted-foreground">
                                <p>No articles found matching your criteria.</p>
                                <Button
                                    variant="link"
                                    onClick={() => { setSelectedCategory("All"); setSearchQuery("") }}
                                    className="mt-2"
                                >
                                    Clear filters
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    )
}
