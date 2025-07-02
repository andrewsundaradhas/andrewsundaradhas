import type React from "react"
import type { Metadata, Viewport } from "next"
import { Sora, Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@/components/analytics"

const sora = Sora({ 
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sora"
})

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
})

export const metadata: Metadata = {
  title: {
    default: "Andrew Sundaradhas - Robotics Engineer & ML Specialist",
    template: "%s | Andrew Sundaradhas"
  },
  description: "Portfolio of Andrew Sundaradhas - Expert in autonomous drones, machine learning algorithms, and strategic negotiations. Specializing in ROS2, C++, PyTorch, and robotics integration.",
  keywords: [
    "Andrew Sundaradhas",
    "Robotics Engineer",
    "Machine Learning",
    "Autonomous Drones",
    "ROS2",
    "C++",
    "PyTorch",
    "Drone Technology",
    "AI Engineer",
    "Robotics Integration",
    "Negotiation Expert",
    "Public Speaking"
  ],
  authors: [{ name: "Andrew Sundaradhas" }],
  creator: "Andrew Sundaradhas",
  publisher: "Andrew Sundaradhas",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://andrewsundaradhas.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://andrewsundaradhas.com",
    title: "Andrew Sundaradhas - Robotics Engineer & ML Specialist",
    description: "Expert in autonomous drones, machine learning algorithms, and strategic negotiations. Specializing in ROS2, C++, PyTorch, and robotics integration.",
    siteName: "Andrew Sundaradhas Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Andrew Sundaradhas - Robotics Engineer & ML Specialist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Andrew Sundaradhas - Robotics Engineer & ML Specialist",
    description: "Expert in autonomous drones, machine learning algorithms, and strategic negotiations.",
    images: ["/og-image.jpg"],
    creator: "@andrewsundaradhas",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  category: "technology",
  classification: "Portfolio",
  other: {
    "theme-color": "#14b8a6",
    "msapplication-TileColor": "#14b8a6",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Andrew Sundaradhas",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#14b8a6" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="en" 
      className={`scroll-smooth ${sora.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="application-name" content="Andrew Sundaradhas Portfolio" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Andrew Sundaradhas" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#14b8a6" />
        <meta name="msapplication-tap-highlight" content="no" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.linkedin.com" />
        
        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="https://www.linkedin.com" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Andrew Sundaradhas",
              "jobTitle": "Robotics Engineer",
              "description": "Expert in autonomous drones, machine learning algorithms, and strategic negotiations",
              "url": "https://andrewsundaradhas.com",
              "sameAs": [
                "https://www.linkedin.com/in/andrew-sundaradhas/"
              ],
              "knowsAbout": [
                "Robotics",
                "Machine Learning",
                "Autonomous Drones",
                "ROS2",
                "C++",
                "PyTorch",
                "Negotiation",
                "Public Speaking"
              ],
              "worksFor": [
                {
                  "@type": "Organization",
                  "name": "Atom Robotics"
                },
                {
                  "@type": "Organization", 
                  "name": "Vertex Innovate"
                }
              ]
            })
          }}
        />
      </head>
      <body className={`${sora.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
