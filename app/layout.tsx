import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://christex.foundation"),
  title: {
    default: "Christex Foundation | AI & Blockchain Innovation Hub in Sierra Leone",
    template: "%s | Christex Foundation",
  },
  description:
    "Christex Foundation is an AI and blockchain innovation hub in Sierra Leone. We deliver digital skills training, venture studio support, and civic tech programs across West Africa.",
  generator: "Next.js",
  applicationName: "Christex Foundation",
  keywords: [
    "Christex Foundation",
    "innovation hub",
    "blockchain innovation hub",
    "AI innovation hub",
    "Sierra Leone innovation hub",
    "West Africa innovation hub",
    "blockchain education",
    "AI education",
    "digital skills training",
    "venture studio",
    "civic tech",
    "Freetown",
    "Sierra Leone",
  ],
  authors: [{ name: "Christex Foundation" }],
  creator: "Christex Foundation",
  publisher: "Christex Foundation",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://christex.foundation",
    title: "Christex Foundation | AI & Blockchain Innovation Hub in Sierra Leone",
    description:
      "An AI and blockchain innovation hub in Sierra Leone building talent, startups, and civic technology with practical education and venture support.",
    siteName: "Christex Foundation",
    images: [
      {
        url: "/images/logomark-20on-20black.png",
        width: 1200,
        height: 630,
        alt: "Christex Foundation - AI & Blockchain Innovation Hub",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Christex Foundation | AI & Blockchain Innovation Hub",
    description:
      "AI and blockchain innovation hub in Sierra Leone focused on digital skills, venture building, and civic technology.",
    site: "@ChristexFndn",
    creator: "@ChristexFndn",
    images: ["/images/logomark-20on-20black.png"],
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
