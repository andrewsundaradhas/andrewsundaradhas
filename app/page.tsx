"use client"

import { useState, useEffect } from "react"
import HelloAnimation from "@/components/hello-animation"
import BootAnimation from "@/components/boot-animation"
import MenuBar from "@/components/menu-bar"
import Dock from "@/components/dock"
import WindowManager from "@/components/window-manager"
import MobileLayout from "@/components/mobile-layout"
import { AppWindow } from "@/types"

export default function MacOSPortfolio() {
  const [showHello, setShowHello] = useState(true)
  const [isBooting, setIsBooting] = useState(false)
  const [windows, setWindows] = useState<AppWindow[]>([])
  const [nextZIndex, setNextZIndex] = useState(1000)

  useEffect(() => {
    // Hello animation for 3 seconds
    const helloTimer = setTimeout(() => {
      setShowHello(false)
      setIsBooting(true)
    }, 3000)

    // Boot animation for 2 seconds after hello
    const bootTimer = setTimeout(() => {
      setIsBooting(false)
    }, 5000)

    return () => {
      clearTimeout(helloTimer)
      clearTimeout(bootTimer)
    }
  }, [])

  const openWindow = (windowData: AppWindow) => {
    const existingWindow = windows.find((w) => w.id === windowData.id)
    if (existingWindow) {
      setWindows((prev) => prev.map((w) => (w.id === windowData.id ? { ...w, zIndex: nextZIndex } : w)))
      setNextZIndex((prev) => prev + 1)
      return
    }

    const newWindow = {
      ...windowData,
      zIndex: nextZIndex,
      position: { x: 100 + windows.length * 30, y: 100 + windows.length * 30 },
    }
    setWindows((prev) => [...prev, newWindow])
    setNextZIndex((prev) => prev + 1)
  }

  const closeWindow = (windowId: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== windowId))
  }

  const updateWindowPosition = (windowId: string, position: { x: number; y: number }) => {
    setWindows((prev) => prev.map((w) => (w.id === windowId ? { ...w, position } : w)))
  }

  const bringToFront = (windowId: string) => {
    setWindows((prev) => prev.map((w) => (w.id === windowId ? { ...w, zIndex: nextZIndex } : w)))
    setNextZIndex((prev) => prev + 1)
  }

  if (showHello) {
    return <HelloAnimation />
  }

  if (isBooting) {
    return <BootAnimation />
  }

  // Desktop/Tablet Layout (unchanged)
  const DesktopLayout = () => (
    <div className="h-screen w-full overflow-hidden relative bg-black">
      {/* Pure Black Desktop Background */}
      <div className="absolute inset-0 bg-black" />

      {/* Subtle texture overlay for depth */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />

      {/* Menu Bar */}
      <MenuBar onOpenWindow={openWindow} />

      {/* Windows */}
      <WindowManager
        windows={windows}
        onClose={closeWindow}
        onUpdatePosition={updateWindowPosition}
        onBringToFront={bringToFront}
      />

      {/* Dock */}
      <Dock onOpenWindow={openWindow} />
    </div>
  )

  // Mobile Layout with iPhone Frame
  const MobileLayoutWithFrame = () => (
    <div className="iphone-wrapper">
      {/* iPhone Frame */}
      <div className="iphone-frame-svg">
        <svg
          viewBox="0 0 375 812"
          className="w-full h-full"
          style={{ filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.4))" }}
        >
          {/* iPhone Frame Definition */}
          <defs>
            <linearGradient id="frameGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2a2a2a" />
              <stop offset="50%" stopColor="#1a1a1a" />
              <stop offset="100%" stopColor="#0a0a0a" />
            </linearGradient>
            <linearGradient id="screenReflection" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
            </linearGradient>
          </defs>

          {/* Outer Frame */}
          <rect
            x="0"
            y="0"
            width="375"
            height="812"
            rx="59"
            ry="59"
            fill="url(#frameGradient)"
            stroke="#333"
            strokeWidth="1"
          />

          {/* Inner Frame (Screen Bezel) */}
          <rect x="8" y="8" width="359" height="796" rx="51" ry="51" fill="#000" stroke="#444" strokeWidth="0.5" />

          {/* Screen Area (Transparent for content) */}
          <rect x="12" y="12" width="351" height="788" rx="47" ry="47" fill="transparent" />

          {/* Notch */}
          <path
            d="M 150 0 Q 150 0 150 8 L 150 20 Q 150 28 158 28 L 217 28 Q 225 28 225 20 L 225 8 Q 225 0 225 0 Z"
            fill="url(#frameGradient)"
          />

          {/* Speaker Grille */}
          <rect x="165" y="10" width="45" height="3" rx="1.5" ry="1.5" fill="#333" />

          {/* Front Camera */}
          <circle cx="140" cy="16" r="5" fill="#111" />
          <circle cx="140" cy="16" r="3" fill="#000" />

          {/* Screen Reflection Effect */}
          <rect x="12" y="12" width="351" height="788" rx="47" ry="47" fill="url(#screenReflection)" opacity="0.3" />

          {/* Side Buttons */}
          <rect x="-2" y="180" width="4" height="30" rx="2" ry="2" fill="#2a2a2a" />
          <rect x="-2" y="220" width="4" height="50" rx="2" ry="2" fill="#2a2a2a" />
          <rect x="-2" y="280" width="4" height="50" rx="2" ry="2" fill="#2a2a2a" />
          <rect x="373" y="200" width="4" height="80" rx="2" ry="2" fill="#2a2a2a" />

          {/* Home Indicator Area */}
          <rect x="155" y="790" width="65" height="4" rx="2" ry="2" fill="#333" opacity="0.6" />
        </svg>
      </div>

      {/* iPhone Content */}
      <div className="iphone-content">
        <MobileLayout openWindow={openWindow} windows={windows} closeWindow={closeWindow} bringToFront={bringToFront} />
      </div>
    </div>
  )

  // Render based on device type
  return (
    <>
      {/* Desktop/Tablet Layout */}
      <div className="desktop-layout">
        <DesktopLayout />
      </div>

      {/* Mobile Layout with iPhone Frame */}
      <div className="mobile-layout">
        <MobileLayoutWithFrame />
      </div>
    </>
  )
}
