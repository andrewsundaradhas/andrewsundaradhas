import type React from "react"
import { Lato } from "next/font/google"
import "./globals.css"

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-lato",
  display: "swap",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={lato.variable}>
      <body className={lato.className}>{children}</body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
