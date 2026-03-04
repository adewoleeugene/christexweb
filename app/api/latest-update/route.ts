import { NextResponse } from 'next/server';
import { getBlogPosts, getEvents } from '@/lib/airtable';

export const revalidate = 3600;

export async function GET() {
    try {
        const [posts, events] = await Promise.all([
            getBlogPosts(),
            getEvents()
        ]);

        // Latest post (already sorted DESC in lib).
        const latestPost = posts[0]
            ? {
                type: 'blog',
                title: posts[0].title,
                description: posts[0].excerpt,
                category: posts[0].category,
                link: `/blog/${posts[0].slug}`,
                date: posts[0].date,
                sortDate: new Date(posts[0].date).getTime(),
                imageUrl: posts[0].imageUrl
            }
            : null;

        // Next upcoming event (already sorted ASC in lib).
        const nextEvent = events[0]
            ? {
                type: 'event',
                title: events[0].title,
                description: events[0].description,
                category: "Event",
                link: events[0].registrationLink || "/events",
                date: events[0].date,
                sortDate: new Date(events[0].date).getTime(),
                imageUrl: events[0].imageUrl
            }
            : null;

        let featuredItem = latestPost;

        // If there is an event, and it's happening within 14 days, prioritize it
        if (nextEvent) {
            const now = new Date().getTime();
            const eventTime = nextEvent.sortDate;
            const twoWeeks = 14 * 24 * 60 * 60 * 1000;

            if (!featuredItem) {
                featuredItem = nextEvent;
            } else if (eventTime > now && eventTime - now < twoWeeks) {
                featuredItem = nextEvent;
            }
        }

        if (featuredItem) {
            return NextResponse.json(featuredItem);
        }

        // Final Fallback
        return NextResponse.json({
            title: "Community Updates",
            description: "Stay tuned for the latest news and events.",
            category: "Update",
            link: "/blog",
            date: new Date().toISOString().split('T')[0],
            imageUrl: null
        });

    } catch (error) {
        console.error("Error in /api/latest-update:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
