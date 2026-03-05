import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { StatsBar } from "@/components/stats-bar"
import { ServicesSection } from "@/components/services-section"
import { BlockchainParallax } from "@/components/blockchain-parallax"
import { AboutSection } from "@/components/about-section"
import { Footer } from "@/components/footer"
import { HomeExtras } from "@/components/home-extras"
import type { Metadata } from "next"

import { getLearnResources } from "@/lib/airtable"

// Revalidate page every hour to pick up new Airtable changes
export const revalidate = 3600

export const metadata: Metadata = {
  title: "Christex Foundation | Educate. Empower. Earn.",
  description:
    "Driving Sierra Leone's digital transformation through AI and blockchain education, venture building, and civic tech solutions. 2025 Innovation Hub of the Year.",
  keywords: [
    "Christex Foundation",
    "Sierra Leone",
    "Blockchain",
    "AI",
    "Education",
    "Venture Studio",
    "Civic Tech",
    "Innovation Hub",
  ],
  alternates: {
    canonical: "/",
  },
}

export default async function HomePage() {
  let learnResources: any[] = []

  // Fetch learn resources from Airtable
  try {
    const fetchedResources = await getLearnResources()
    learnResources = fetchedResources
  } catch (e) {
    console.error("Failed to fetch learn resources from Airtable", e)
    learnResources = await getLearnResources()
  }

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Christex Foundation",
    url: "https://christex.foundation",
    logo: "https://christex.foundation/images/logomark-20on-20black.png",
    description:
      "AI and blockchain innovation hub in Sierra Leone delivering education, venture building, and civic technology programs.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Freetown",
      addressCountry: "SL",
    },
    areaServed: ["Sierra Leone", "West Africa"],
    sameAs: ["https://x.com/ChristexFndn"],
  }

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <Header learnResources={learnResources} />
      <HeroSection />
      <StatsBar />
      <AboutSection />
      <BlockchainParallax />
      <ServicesSection />
      <HomeExtras />
      <Footer />
    </main>
  )
}
