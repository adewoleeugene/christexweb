import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getBlogPostBySlug, getBlogPosts, BlogPost } from "@/lib/airtable"
import { notFound } from "next/navigation"
import { User, Calendar, Clock, ArrowLeft, ChevronRight, ChevronLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const post = await getBlogPostBySlug(slug)

    if (!post) {
        return {
            title: 'Post Not Found',
        }
    }

    return {
        title: post.title,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            images: post.imageUrl ? [{ url: post.imageUrl }] : [],
            type: 'article',
            publishedTime: post.date,
            authors: post.author ? [post.author] : [],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
            images: post.imageUrl ? [post.imageUrl] : [],
        },
    }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    // Fetch all posts to determine next/prev
    const allPosts = await getBlogPosts();
    const currentIndex = allPosts.findIndex(p => p.slug === slug);

    // If not found in the list (rare race condition if list is cached but slug fetch works), try fetching single
    // But usually currentIndex === -1 is enough to 404
    if (currentIndex === -1) {
        notFound()
    }
    const post = allPosts[currentIndex];

    // Determine Next/Prev
    // "Previous" (older) is index + 1
    // "Next" (newer) is index - 1
    const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
    const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

    // Pre-process content to handle the custom tags
    let processedContent = post.content || "";

    // 1. Replace {{image:N}} tags
    if (post.contentImages && post.contentImages.length > 0) {
        post.contentImages.forEach((url, index) => {
            const tag = `{{image:${index + 1}}}`;
            processedContent = processedContent.replace(
                new RegExp(tag, 'g'),
                `![Blog Image ${index + 1}](${url})`
            );
        });
    }

    // 2. Wrap {{video}} tags logic
    // Replace {{video}} with the content from VideoURL column if available
    if (post.videoUrl) {
        processedContent = processedContent.replace(/{{video}}/g, `![youtube-embed](${post.videoUrl})`);
    }

    // Replace {{video:http...}} with the specific URL
    processedContent = processedContent.replace(/{{video:(https?:\/\/[^\}]+)}}/g, `![youtube-embed]($1)`);

    // Cleanup: Remove any remaining placeholder tags
    processedContent = processedContent.replace(/{{image:\d+}}/g, '');
    processedContent = processedContent.replace(/{{video}}/g, '');

    return (
        <main className="min-h-screen bg-background text-foreground pb-20 overflow-x-hidden">
            <Header />

            <article className="pt-32 pb-12 px-6 lg:px-12 relative overflow-visible">
                {/* Background Decor - Visible orange glow */}
                <div className="absolute top-24 -right-1/4 w-[700px] h-[700px] bg-orange-500/15 blur-[140px] rounded-full pointer-events-none mix-blend-screen" />

                <div className="max-w-3xl mx-auto relative z-10">

                    <header className="mb-12">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground font-mono mb-6">
                            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full uppercase text-xs font-bold tracking-wider">
                                {post.category}
                            </span>
                            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {post.date}</span>
                            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {post.readTime}</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">{post.title}</h1>

                        <div className="flex items-center gap-4 pb-8 border-b border-border">
                            {post.author && (
                                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                                    <User className="w-6 h-6 text-muted-foreground" />
                                </div>
                            )}
                            <div>
                                {post.author && <div className="font-bold">{post.author}</div>}
                                {post.author && <div className="text-sm text-muted-foreground">Author</div>}
                            </div>
                        </div>
                    </header>

                    {/* Header Image Section */}
                    {post.imageUrl && (
                        <div className="mb-12 rounded-2xl overflow-hidden aspect-video border border-border relative">
                            <Image
                                src={post.imageUrl}
                                alt={post.title}
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 768px) 100vw, 800px"
                            />
                        </div>
                    )}

                    <div className="prose prose-invert prose-lg max-w-none">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                img: ({ node, ...props }) => {
                                    if (props.alt === 'youtube-embed' && props.src) {
                                        const getEmbedUrl = (url: string) => {
                                            const ytRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
                                            const match = url.match(ytRegex);
                                            // Handle plain video ID if passed (edge case but good to support)
                                            if (!match && /^[a-zA-Z0-9_-]{11}$/.test(url)) return `https://www.youtube.com/embed/${url}`;

                                            if (match && match[1]) {
                                                return `https://www.youtube.com/embed/${match[1]}?autoplay=0`;
                                            }
                                            return null;
                                        };

                                        const embedUrl = getEmbedUrl(props.src as string);

                                        if (embedUrl) {
                                            return (
                                                <div className="my-8 rounded-xl overflow-hidden aspect-video border border-border bg-black">
                                                    <iframe
                                                        src={embedUrl}
                                                        title="Embedded Video"
                                                        className="w-full h-full"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                    />
                                                </div>
                                            );
                                        }
                                    }

                                    return (
                                        <div className="my-8 rounded-xl overflow-hidden border border-border">
                                            <Image
                                                src={props.src as string || ''}
                                                alt={props.alt || ''}
                                                width={0}
                                                height={0}
                                                sizes="100vw"
                                                className="w-full h-auto"
                                            />
                                        </div>
                                    )
                                },
                                h2: ({ node, ...props }) => <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground" {...props} />,
                                h3: ({ node, ...props }) => <h3 className="text-2xl font-bold mt-8 mb-4 text-foreground" {...props} />,
                                p: ({ node, ...props }) => <p className="text-muted-foreground leading-relaxed mb-6" {...props} />,
                                a: ({ node, ...props }) => <a className="text-primary hover:underline underline-offset-4" {...props} />,
                                ul: ({ node, ...props }) => <ul className="list-disc list-outside ml-6 mb-6 text-muted-foreground" {...props} />,
                                li: ({ node, ...props }) => <li className="mb-2" {...props} />,
                            }}
                        >
                            {processedContent}
                        </ReactMarkdown>
                    </div>

                </div>
            </article>

            {/* Next Post Navigation Block (Bottom of Article) */}
            {nextPost && (
                <section className="py-12 border-t border-border mt-12 mb-20 relative">
                    <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
                        <p className="text-sm font-mono text-muted-foreground mb-4 uppercase tracking-widest">Next Article</p>
                        <h2 className="text-3xl font-bold mb-8 hover:text-primary transition-colors">
                            <Link href={`/blog/${nextPost.slug}`}>{nextPost.title}</Link>
                        </h2>
                        <Button asChild variant="outline" className="rounded-full">
                            <Link href={`/blog/${nextPost.slug}`}>Read Next ›</Link>
                        </Button>
                    </div>
                </section>
            )}

            {/* Enhanced Bottom Decor - Teal sweep */}
            <div className="relative h-0 overflow-visible">
                <div className="absolute bottom-[-100px] left-[-10%] w-[700px] h-[700px] bg-teal-500/10 blur-[140px] rounded-full pointer-events-none mix-blend-screen" />
            </div>

            <Footer />

            {/* Navigation Bar (Fixed Bottom) */}
            <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md text-white py-4 px-6 border-t border-white/10 shadow-2xl">
                <div className="max-w-7xl mx-auto flex items-center justify-between font-mono text-sm leading-none">
                    <div className="flex-1 truncate pr-4">
                        {/* Left: Previous (Older) Post */}
                        {prevPost ? (
                            <Link href={`/blog/${prevPost.slug}`} className="hover:text-primary transition-colors flex items-center gap-2 group">
                                <span className="text-primary group-hover:-translate-x-1 transition-transform">‹</span>
                                <span className="truncate">{prevPost.title}</span>
                            </Link>
                        ) : (
                            <span className="text-zinc-600 cursor-not-allowed flex items-center gap-2">
                                <span className="text-zinc-600">‹</span> End of Archive
                            </span>
                        )}
                    </div>

                    <div className="flex-none pl-4 text-right">
                        <Link href="/blog" className="hover:text-primary transition-colors flex items-center gap-2 group">
                            <span className="hidden md:inline">Christex Foundation Blog</span>
                            <span className="md:hidden">Blog</span>
                            <span className="text-primary group-hover:translate-x-1 transition-transform">›</span>
                        </Link>
                    </div>
                </div>
            </div>

        </main>
    )
}
