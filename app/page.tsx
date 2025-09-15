"use client"

import { useState, useEffect } from "react"
import { useMediaQuery } from "react-responsive"
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
  const isMobile = useMediaQuery({ maxWidth: 768 })

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

  // Open About window by default on mobile
  useEffect(() => {
    if (isMobile && windows.length === 0 && !showHello && !isBooting) {
      setWindows([
        {
          id: "about",
          title: "About",
          type: "about",
          icon: "👤",
          position: { x: 50, y: 50 },
          zIndex: nextZIndex,
        },
      ])
      setNextZIndex((prev) => prev + 1)
    }
  }, [isMobile, windows.length, showHello, isBooting, nextZIndex])

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
        <MobileLayout 
          openWindow={openWindow} 
          windows={windows} 
          closeWindow={closeWindow} 
          bringToFront={bringToFront} 
        />
      </div>
    </>
  )
}
