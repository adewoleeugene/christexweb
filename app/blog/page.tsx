import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Calendar, User, ArrowUpRight, Filter, Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getBlogPosts, BlogPost } from "@/lib/airtable"
import { Button } from "@/components/ui/button"
import { BlogList } from "@/components/blog-list"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "News & Insights",
    description: "Latest updates, stories, and insights from the Christex Foundation team and community.",
}

export default async function BlogPage() {
    const posts = await getBlogPosts()

    // Designate the first post as "Featured"
    const featuredPost = posts[0]
    const recentPosts = posts.slice(1)

    // Extract unique categories for filter (mock implementation for now)
    const categories = ["All", ...Array.from(new Set(posts.map(p => p.category)))]

    return (
        <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
            <Header />

            {/* Featured Section */}
            {featuredPost && (
                <section className="pt-32 pb-16 px-6 lg:px-12 border-b border-border relative">
                    {/* Background Decor - Subtle orange glow */}
                    <div className="absolute top-24 -right-24 w-96 h-96 bg-orange-500/10 blur-[100px] rounded-full pointer-events-none mix-blend-screen" />

                    <div className="max-w-7xl mx-auto relative z-10">
                        <h1 className="text-5xl md:text-7xl font-bold mb-12">News & Insights</h1>

                        <div className="grid lg:grid-cols-2 gap-12 items-center group cursor-pointer">
                            <Link href={`/blog/${featuredPost.slug}`} className="aspect-[16/10] bg-muted rounded-2xl overflow-hidden relative border border-border block">
                                {featuredPost.imageUrl ? (
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={featuredPost.imageUrl}
                                            alt={featuredPost.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            priority
                                        />
                                    </div>
                                ) : (
                                    <div className="w-full h-full bg-neutral-900 group-hover:scale-105 transition-transform duration-500" />
                                )}
                            </Link>

                            <div className="flex flex-col justify-center">
                                <div className="inline-flex items-center gap-2 mb-4">
                                    <span className="px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-mono uppercase tracking-wider">
                                        Featured
                                    </span>
                                    <span className="text-sm text-muted-foreground font-mono">{featuredPost.date}</span>
                                </div>

                                <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight group-hover:text-primary transition-colors">
                                    <Link href={`/blog/${featuredPost.slug}`}>
                                        {featuredPost.title}
                                    </Link>
                                </h2>

                                <p className="text-lg text-muted-foreground mb-8 line-clamp-3">
                                    {featuredPost.excerpt}
                                </p>

                                <div className="flex items-center gap-3">
                                    {featuredPost.author && (
                                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                                            <User className="w-5 h-5 text-muted-foreground" />
                                        </div>
                                    )}
                                    <div className="flex flex-col">
                                        {featuredPost.author && (
                                            <span className="text-sm font-medium">{featuredPost.author}</span>
                                        )}
                                        <span className="text-xs text-muted-foreground">{featuredPost.readTime}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Navigation & Latest Posts Grid with Filter/Search */}
            <BlogList posts={recentPosts} categories={categories} />

            <Footer />
        </main>
    )
}
