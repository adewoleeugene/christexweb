import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { StatsBar } from "@/components/stats-bar"
import { ServicesSection } from "@/components/services-section"
import { BlockchainParallax } from "@/components/blockchain-parallax"
import { AboutSection } from "@/components/about-section"
import { VentureStudioSection } from "@/components/venture-studio-section"
import { PartnersSection } from "@/components/partners-section"
import { ContactSection } from "@/components/contact-section"
import { GallerySection } from "@/components/gallery-section"
import { Footer } from "@/components/footer"
import fs from "fs"
import path from "path"

import { getGalleryImages, getLearnResources } from "@/lib/airtable"

// Revalidate page every hour to pick up new Airtable changes
export const revalidate = 3600

export default async function HomePage() {
  let galleryImages: string[] = []
  let learnResources: any[] = []

  // Try to fetch from Airtable first
  try {
    const [remoteImages, fetchedResources] = await Promise.all([
      getGalleryImages(),
      getLearnResources()
    ])

    if (remoteImages.length > 0) {
      galleryImages = remoteImages
    }
    learnResources = fetchedResources
  } catch (e) {
    console.error("Failed to fetch data from Airtable", e)
    // Retrying individually just in case one failed (though lib handles errors)
    learnResources = await getLearnResources()
  }

  // Fallback to local file system if needed (and available server-side)
  if (galleryImages.length === 0) {
    try {
      const galleryDir = path.join(process.cwd(), "public/images/gallery")
      if (fs.existsSync(galleryDir)) {
        const files = fs.readdirSync(galleryDir).filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
        galleryImages = files.map(file => `/images/gallery/${file}`)
      }
    } catch (e) {
      // Local fallback failed too, empty array will trigger default images in component
    }
  }

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Header learnResources={learnResources} />
      <HeroSection />
      <StatsBar />
      <AboutSection />
      <BlockchainParallax />
      <ServicesSection />
      <VentureStudioSection />
      <PartnersSection />
      <ContactSection />
      <GallerySection images={galleryImages.length > 0 ? galleryImages : undefined} />
      <Footer />
    </main>
  )
}
