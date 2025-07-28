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
    const helloTimer = setTimeout(() => {
      setShowHello(false)
      setIsBooting(true)
    }, 3000)

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

  return (
    <>
      {/* Desktop/Tablet Layout */}
      <div className="desktop-layout">
        <div className="h-screen w-full overflow-hidden relative bg-black">
          <div className="absolute inset-0 bg-black" />
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
          <MenuBar onOpenWindow={openWindow} />
          <WindowManager
            windows={windows}
            onClose={closeWindow}
            onUpdatePosition={updateWindowPosition}
            onBringToFront={bringToFront}
          />
          <Dock onOpenWindow={openWindow} />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="mobile-layout">
        <div className="iphone-wrapper">
          <div className="iphone-frame-svg">
            <svg viewBox="0 0 375 812" className="w-full h-full">
              <rect x="0" y="0" width="375" height="812" rx="59" ry="59" fill="#2a2a2a" />
              <rect x="8" y="8" width="359" height="796" rx="51" ry="51" fill="#000" />
              <rect x="12" y="12" width="351" height="788" rx="47" ry="47" fill="transparent" />
            </svg>
          </div>
          <div className="iphone-content">
            <MobileLayout 
              openWindow={openWindow} 
              windows={windows} 
              closeWindow={closeWindow} 
              bringToFront={bringToFront} 
            />
          </div>
        </div>
      </div>
    </>
  )
}
