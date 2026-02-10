import Airtable from 'airtable';

// Initialize Airtable
const baseId = process.env.AIRTABLE_BASE_ID;
const apiKey = process.env.AIRTABLE_API_KEY;
const eventsTableId = process.env.AIRTABLE_EVENTS_TABLE_ID;
const blogTableId = process.env.AIRTABLE_BLOG_TABLE_ID;
const galleryTableId = process.env.AIRTABLE_GALLERY_TABLE_ID;

// Fail gracefully if keys are not present (during build or dev without keys)
const base = (baseId && apiKey)
    ? new Airtable({ apiKey }).base(baseId)
    : null;

export interface Event {
    id: string;
    title: string;
    date: string;
    location: string;
    description: string;
    category: string;
    imageUrl?: string;
    registrationLink?: string;
}

export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    author: string;
    date: string;
    category: string;
    content: string;
    imageUrl?: string;
    videoUrl?: string; // YouTube or other video link
    contentImages?: string[]; // Array of additional image URLs
    slug: string; // For SEO-friendly URLs
    readTime?: string;
}

export interface LearnResource {
    id: string;
    title: string;
    url: string;
    category: string;
    featured?: boolean;
    thumbnail?: string;
    description?: string;
}

// Mock data for fallback
const MOCK_EVENTS: Event[] = [
    {
        id: 'mock-1',
        title: "Sierra Leone Tech Summit 2026",
        date: "2026-03-15",
        location: "Freetown, Sierra Leone",
        description: "Join us for the biggest tech gathering in West Africa, featuring keynote speakers from global tech giants.",
        category: "Conference",
        registrationLink: "#"
    },
    {
        id: 'mock-2',
        title: "AI & Blockchain Workshop",
        date: "2026-04-02",
        location: "Virtual / Discord",
        description: "A hands-on workshop diving deep into the intersection of AI agents and blockchain technology.",
        category: "Workshop",
        registrationLink: "#"
    },
];

const MOCK_NEWS: BlogPost[] = [
    {
        id: 'mock-1',
        title: "The Future of Digital Identity in West Africa",
        excerpt: "How decentralized identity solutions are empowering citizens and businesses across the region.",
        author: "Christex Team",
        date: "2026-01-12",
        category: "Blockchain",
        slug: "future-digital-identity-west-africa",
        content: `
# Digital Identity Revolution

In West Africa, the lack of formal identification systems has long been a barrier to financial inclusion and access to essential services. **Decentralized identity (DID)** solutions offer a promising path forward.

## The Problem

Traditional centralized databases are vulnerable to hacks and often exclude rural populations.

{{image:1}}

## The Solution

By leveraging blockchain technology, we can create self-sovereign identities that are owned and controlled by the user.

- **Privacy-first**: Users control who sees their data.
- **Portable**: Can be used across different services and borders.
- **Secure**: Cryptographically secured on the blockchain.

{{image:2}}

## Case Study: Sierra Leone

We heavily invested in pilot programs...
        `,
        readTime: "5 min read",
        contentImages: [
            "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&q=80&w=1000",
            "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000"
        ]
    },
    {
        id: 'mock-2',
        title: "Building Resilient Communities with AI",
        excerpt: "Exploring the role of artificial intelligence in analyzing local data.",
        author: "Sarah Johnson",
        date: "2026-02-04",
        category: "AI & Society",
        slug: "building-resilient-communities-ai",
        content: "Full content would go here...",
        readTime: "8 min read"
    }
];

const MOCK_LEARN_RESOURCES: LearnResource[] = [];

export async function getEvents(): Promise<Event[]> {
    if (!base || !eventsTableId) {
        console.warn("Airtable credentials or table ID missing, using mock data for Events.");
        return MOCK_EVENTS;
    }

    try {
        const records = await base(eventsTableId).select({
            sort: [{ field: 'Date', direction: 'asc' }],
            filterByFormula: "IS_AFTER({Date}, TODAY())" // Only future events
        }).all();

        return records.map(record => ({
            id: record.id,
            title: record.get('Title') as string,
            date: record.get('Date') as string,
            location: record.get('Location') as string,
            description: record.get('Description') as string,
            category: record.get('Category') as string,
            imageUrl: (record.get('Image') as any)?.[0]?.url,
            registrationLink: record.get('RegistrationLink') as string,
        }));
    } catch (error) {
        console.error("Error fetching events from Airtable:", error);
        return MOCK_EVENTS;
    }
}

export async function getGalleryImages(): Promise<string[]> {
    if (!base || !galleryTableId) {
        return [];
    }

    try {
        const records = await base(galleryTableId).select({
            maxRecords: 100,
            view: "Grid view" // Optional: specify a view if needed
        }).all();

        // Extract all images from all records
        const images: string[] = [];
        records.forEach(record => {
            const attachments = record.get('Images') as any[];
            if (attachments && Array.isArray(attachments)) {
                attachments.forEach(photo => {
                    // Prioritize web-safe thumbnails if available (handles HEIC/DNG conversion automatically)
                    const thumbnailUrl = photo.thumbnails?.full?.url ||
                        photo.thumbnails?.large?.url ||
                        photo.thumbnails?.small?.url;

                    if (thumbnailUrl) {
                        images.push(thumbnailUrl);
                    } else {
                        // If no thumbnails exist (common for raw files like DNG/HEIC that Airtable hasn't processed yet),
                        // we MUST filter out non-web formats to avoid broken images on the frontend.
                        // Only allow fallback to raw URL for natively supported web formats.
                        const filename = photo.filename || '';
                        const type = photo.type || '';

                        const isWebSafe = /\.(jpg|jpeg|png|gif|webp)$/i.test(filename) ||
                            /image\/(jpeg|png|gif|webp)/.test(type);

                        if (isWebSafe && photo.url) {
                            images.push(photo.url);
                        }
                    }
                });
            }
        });

        return images;
    } catch (error) {
        console.error("Error fetching gallery images from Airtable:", error);
        return [];
    }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
    if (!base || !blogTableId) {
        console.warn("Airtable credentials or table ID missing (base is null), using mock data for Blog.");
        return MOCK_NEWS;
    }

    try {
        const records = await base(blogTableId).select({
            sort: [{ field: 'Date', direction: 'desc' }],
        }).all();

        return records.map(record => mapRecordToBlogPost(record));
    } catch (error) {
        console.error("Error fetching news from Airtable:", error);
        return MOCK_NEWS;
    }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    if (!base || !blogTableId) {
        return MOCK_NEWS.find(p => p.slug === slug) || null;
    }

    try {
        const decodedSlug = decodeURIComponent(slug);

        const records = await base(blogTableId).select({
            filterByFormula: `{Slug} = '${decodedSlug}'`,
            maxRecords: 1
        }).firstPage();

        if (records.length === 0) {
            return null;
        }

        return mapRecordToBlogPost(records[0]);
    } catch (error) {
        console.error("Error fetching single post from Airtable:", error);
        return null;
    }
}

export async function getLearnResources(): Promise<LearnResource[]> {
    const learnTableId = process.env.AIRTABLE_LEARN_TABLE_ID;

    if (!base || !learnTableId) {
        return MOCK_LEARN_RESOURCES;
    }

    try {
        const records = await base(learnTableId).select({
            sort: [{ field: 'Title', direction: 'asc' }]
        }).all();

        return records.map(record => ({
            id: record.id,
            title: record.get('Title') as string,
            url: record.get('URL') as string,
            category: record.get('Category') as string,
            featured: record.get('Featured') as boolean,
            thumbnail: (record.get('Thumbnail') as any)?.[0]?.url || (record.get('ThumbnailURL') as string),
            description: record.get('Description') as string,
        }));
    } catch (error) {
        console.error("Error fetching learn resources from Airtable:", error);
        return MOCK_LEARN_RESOURCES;
    }
}

function mapRecordToBlogPost(record: any): BlogPost {
    // Helper to safely extract attachment URLs array
    const contentImages = (record.get('ContentImages') as any[])?.map((img: any) => img.url) || [];

    let excerpt = record.get('Excerpt') as string;
    const content = record.get('Content') as string || "";

    // Auto-generate excerpt if missing
    if (!excerpt && content) {
        // Simple markdown stripper and truncate
        let plainText = content
            .replace(/^#+\s+/gm, '') // Remove headers
            .replace(/(\*\*|__)(.*?)\1/g, '$2') // Remove bold
            .replace(/(\*|_)(.*?)\1/g, '$2') // Remove italics
            .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Remove links
            .replace(/`{3}[\s\S]*?`{3}/g, '') // Remove code blocks
            .replace(/`(.+?)`/g, '$1') // Remove inline code
            .replace(/{{image:\d+}}/g, '') // Remove our custom image tags
            .replace(/\n+/g, ' '); // Inline newlines

        if (plainText.length > 160) {
            excerpt = plainText.substring(0, 160).trim() + "...";
        } else {
            excerpt = plainText;
        }
    }

    let readTime = record.get('ReadTime') as string;
    // Auto-calculate read time if missing
    if (!readTime && content) {
        const wordsPerMinute = 200;
        const wordCount = content.trim().split(/\s+/).length;
        // Ensure at least 1 min read
        const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
        readTime = `${minutes} min read`;
    }

    // Debugging Image Field
    const rawImage = record.get('Image');

    // Fallback logic: Use explicit 'Image' field first, otherwise first 'ContentImages'
    let mainImageUrl = (rawImage as any)?.[0]?.url;
    if (!mainImageUrl && contentImages.length > 0) {
        mainImageUrl = contentImages[0];
    }

    // Video URL processing
    const videoUrl = record.get('VideoURL') as string;

    return {
        id: record.id,
        title: record.get('Title') as string,
        excerpt: excerpt,
        author: record.get('Author') as string,
        date: record.get('Date') as string,
        category: record.get('Category') as string,
        slug: record.get('Slug') as string || record.id,
        content: content,
        imageUrl: mainImageUrl, // Use the resolved URL
        videoUrl: videoUrl,
        readTime: readTime,
        contentImages,
    };
}

export async function submitIdea(data: {
    title: string;
    problem: string;
    solution: string;
    resources: string;
    category: string;
}) {
    if (!base) {
        console.error("Airtable not initialized");
        return { success: false, error: "Database connection failed" };
    }

    try {
        // Use table name 'Ideas' directly or an env var if preferred
        const tableId = 'tbltYJmENoTTmbRyx';

        await base(tableId).create([
            {
                fields: {
                    Title: data.title,
                    Problem: data.problem,
                    Solution: data.solution,
                    Resources: data.resources,
                    Category: data.category,
                    Status: 'New'
                }
            }
        ], { typecast: true });
        return { success: true };
    } catch (error: any) {
        console.error("Error submitting idea to Airtable:", error);
        return { success: false, error: error.message || JSON.stringify(error) };
    }
}
