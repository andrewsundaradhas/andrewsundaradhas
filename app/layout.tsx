import type React from "react"
import type { Metadata } from "next"
import { Sora } from "next/font/google"
import "./globals.css"

const sora = Sora({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Andrew Sundaradhas - Drone Engineer & ML Enthusiast",
  description:
    "Portfolio of Andrew Sundaradhas - Drone Engineer, Machine Learning Enthusiast, and Expert Negotiator with outstanding public speaking skills.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={sora.className}>{children}</body>
    </html>
  )
}
