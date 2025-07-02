"use client"

import { useEffect } from "react"

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}

export function Analytics() {
  useEffect(() => {
    // Simple analytics tracking - can be replaced with actual analytics service
    if (typeof window !== "undefined") {
      // Track page view
      console.log("Page view tracked")
    }
  }, [])

  return null
} 