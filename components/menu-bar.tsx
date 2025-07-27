"use client"

import { useState, useEffect } from "react"

interface Window {
  id: string
  title: string
  type: string
  icon: string
  position: { x: number; y: number }
  zIndex: number
}

interface MenuBarProps {
  onOpenWindow: (window: Window) => void
}

export default function MenuBar({ onOpenWindow }: MenuBarProps) {
  const [currentTime, setCurrentTime] = useState("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        }),
      )
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const menuItems = [
    {
      label: "About",
      action: () =>
        onOpenWindow({
          id: "about",
          title: "About Me",
          type: "about",
          icon: "👤",
        }),
    },
    {
      label: "Experience",
      action: () =>
        onOpenWindow({
          id: "experience",
          title: "Experience",
          type: "experience",
          icon: "💼",
        }),
    },
    {
      label: "Skills",
      action: () =>
        onOpenWindow({
          id: "skills",
          title: "Skills",
          type: "skills",
          icon: "⚡",
        }),
    },
    {
      label: "Contact",
      action: () =>
        onOpenWindow({
          id: "contact",
          title: "Contact",
          type: "contact",
          icon: "📧",
        }),
    },
  ]

  return (
    <div className="fixed top-0 left-0 right-0 h-7 bg-black/80 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-4 text-sm z-50">
      {/* Left Side */}
      <div className="flex items-center space-x-4">
        {/* Apple Logo */}
        <div className="cursor-pointer hover:bg-white/10 px-2 py-1 rounded transition-colors menu-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-white">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
          </svg>
        </div>

        <span className="font-bold text-white">Portfolio</span>

        {/* Menu Items - Pure White, Bold */}
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={item.action}
            className="menu-item px-3 py-1 rounded transition-all duration-200 hover:bg-white/10 font-bold text-white"
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Right Side */}
      <div className="flex items-center space-x-4">
        <a
          href="https://www.linkedin.com/in/andrew-sundaradhas/"
          target="_blank"
          rel="noopener noreferrer"
          className="menu-item px-3 py-1 rounded transition-all duration-200 hover:bg-white/10 font-bold text-white"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/andrewsundaradhas"
          target="_blank"
          rel="noopener noreferrer"
          className="menu-item px-3 py-1 rounded transition-all duration-200 hover:bg-white/10 font-bold text-white"
        >
          GitHub
        </a>
        <span className="font-mono text-white font-bold">{currentTime}</span>
      </div>
    </div>
  )
}
