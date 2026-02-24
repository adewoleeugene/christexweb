import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Calendar, MapPin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { getEvents } from "@/lib/airtable"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Events",
    description: "Connect, learn, and build with us. Discover upcoming events, workshops, and gatherings in the Christex ecosystem.",
}

export default async function EventsPage() {
    const events = await getEvents()

    return (
        <main className="min-h-screen bg-background text-foreground">
            <Header />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 lg:px-12 border-b border-white/10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-black pointer-events-none" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                        Community <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Events</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mb-8">
                        Connect, learn, and build with us. Discover upcoming events, workshops, and gatherings in the Christex ecosystem.
                    </p>
                </div>
            </section>

            {/* Events Grid */}
            <section className="py-20 px-6 lg:px-12">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {events.map((event) => (
                            <div key={event.id} className="group relative bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden hover:border-purple-500/50 transition-all duration-300">
                                {/* Event Image Placeholder */}
                                <div className="h-48 bg-gradient-to-br from-gray-900 to-gray-800 group-hover:scale-105 transition-transform duration-500 relative scroll-overflow-hidden">
                                    {event.imageUrl ? (
                                        <Image
                                            src={event.imageUrl}
                                            alt={event.title}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-white/10 font-mono text-4xl font-bold">
                                            {event.category.substring(0, 2)}
                                        </div>
                                    )}
                                </div>

                                <div className="p-6">
                                    <div className="flex items-center gap-4 text-sm text-purple-400 mb-3 font-mono">
                                        <span className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4" />
                                            {event.date}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">
                                        {event.title}
                                    </h3>

                                    <p className="text-muted-foreground text-sm mb-6 line-clamp-2">
                                        {event.description}
                                    </p>

                                    <div className="flex items-center justify-between mt-auto">
                                        <span className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <MapPin className="w-3 h-3" />
                                            {event.location}
                                        </span>

                                        {event.registrationLink && (
                                            <Button variant="ghost" className="p-0 h-auto hover:bg-transparent text-white hover:text-purple-400 transition-colors group/btn" asChild>
                                                <a href={event.registrationLink} target="_blank" rel="noopener noreferrer">
                                                    Register <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                                </a>
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Empty State / Call to Action if list is short or empty */}
                    <div className="mt-20 p-8 border border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center text-center bg-white/5">
                        <h3 className="text-lg font-bold mb-2">Host an Event?</h3>
                        <p className="text-muted-foreground mb-6 max-w-md">
                            Want to organize a meetup or workshop for the community? We can help support you.
                        </p>
                        <Button variant="outline">Contact Us</Button>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
