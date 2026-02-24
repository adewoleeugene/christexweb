import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { CustomCursor } from "@/components/custom-cursor"
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
    default: "Christex Foundation | Educate. Empower. Earn.",
    template: "%s | Christex Foundation",
  },
  description:
    "Driving Sierra Leone's digital transformation through AI and blockchain education, venture building, and civic tech solutions. 2025 Innovation Hub of the Year.",
  generator: "Next.js",
  applicationName: "Christex Foundation",
  keywords: ["Christex Foundation", "Sierra Leone", "Blockchain", "AI", "Education", "Venture Studio", "Civic Tech", "Innovation Hub"],
  authors: [{ name: "Christex Foundation" }],
  creator: "Christex Foundation",
  publisher: "Christex Foundation",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://christex.foundation",
    title: "Christex Foundation | Educate. Empower. Earn.",
    description:
      "Driving Sierra Leone's digital transformation through AI and blockchain education, venture building, and civic tech solutions. 2025 Innovation Hub of the Year.",
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
    title: "Christex Foundation | Educate. Empower. Earn.",
    description:
      "Driving Sierra Leone's digital transformation through AI and blockchain education. 2025 Innovation Hub of the Year.",
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
        <CustomCursor />
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
