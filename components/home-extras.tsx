"use client"

import dynamic from "next/dynamic"

const CustomCursor = dynamic(
  () => import("@/components/custom-cursor").then((mod) => mod.CustomCursor),
  { ssr: false }
)
const VentureStudioSection = dynamic(
  () => import("@/components/venture-studio-section").then((mod) => mod.VentureStudioSection),
  { ssr: false, loading: () => <div className="py-24 md:py-32" /> }
)
const PartnersSection = dynamic(
  () => import("@/components/partners-section").then((mod) => mod.PartnersSection),
  { ssr: false, loading: () => <div className="py-24 md:py-32" /> }
)
const ContactSection = dynamic(
  () => import("@/components/contact-section").then((mod) => mod.ContactSection),
  { ssr: false, loading: () => <div className="py-24 md:py-32" /> }
)
const GallerySection = dynamic(
  () => import("@/components/gallery-section").then((mod) => mod.GallerySection),
  { ssr: false, loading: () => <div className="py-24" /> }
)

export function HomeExtras() {
  return (
    <>
      <CustomCursor />
      <VentureStudioSection />
      <PartnersSection />
      <ContactSection />
      <GallerySection />
    </>
  )
}
