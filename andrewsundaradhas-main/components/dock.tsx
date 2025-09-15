"use client"

import { useState } from "react"
import InteractiveTrash from "./interactive-trash"

interface Window {
  id: string
  title: string
  type: string
  icon: string
  position: { x: number; y: number }
  zIndex: number
}

interface DockProps {
  onOpenWindow: (window: Window) => void
}

export default function Dock({ onOpenWindow }: DockProps) {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null)
  const [showTrash, setShowTrash] = useState(false)

  const dockItems = [
    {
      id: "resume",
      icon: "📄",
      label: "Resume",
      action: () =>
        onOpenWindow({
          id: "resume",
          title: "Resume.pdf",
          type: "resume",
          icon: "📄",
          position: { x: 100, y: 100 },
          zIndex: 1000,
        }),
    },
    {
      id: "mail",
      icon: "✉️",
      label: "Mail",
      action: () =>
        onOpenWindow({
          id: "contact",
          title: "Contact",
          type: "contact",
          icon: "📧",
          position: { x: 100, y: 100 },
          zIndex: 1000,
        }),
    },
    {
      id: "safari",
      icon: "🌐",
      label: "Safari",
      action: () =>
        onOpenWindow({
          id: "contact",
          title: "Contact",
          type: "contact",
          icon: "📧",
          position: { x: 100, y: 100 },
          zIndex: 1000,
        }),
    },
    {
      id: "notes",
      icon: "📝",
      label: "Notes",
      action: () =>
        onOpenWindow({
          id: "about",
          title: "About Me",
          type: "about",
          icon: "👤",
          position: { x: 100, y: 100 },
          zIndex: 1000,
        }),
    },
    {
      id: "folder",
      icon: "📁",
      label: "Experience",
      action: () =>
        onOpenWindow({
          id: "experience",
          title: "Experience",
          type: "experience",
          icon: "💼",
          position: { x: 100, y: 100 },
          zIndex: 1000,
        }),
    },
    {
      id: "trash",
      icon: "🗑️",
      label: "Trash",
      action: () => {
        setShowTrash(true)
      },
    },
  ]

  return (
    <>
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40">
        <div className="bg-black/80 backdrop-blur-xl rounded-2xl border border-white/10 p-2 flex items-end space-x-1 shadow-2xl">
          {dockItems.map((item) => (
            <div
              key={item.id}
              className="relative group"
              onMouseEnter={() => setHoveredIcon(item.id)}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              {/* Tooltip - Pure White */}
              {hoveredIcon === item.id && (
                <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black/90 backdrop-blur-sm text-white text-xs px-2 py-1 rounded whitespace-nowrap border border-white/10 font-bold">
                  {item.label}
                </div>
              )}

              {/* Icon Container */}
              <div className="flex flex-col items-center">
                <button
                  onClick={item.action}
                  className="dock-item w-12 h-12 rounded-xl flex items-center justify-center text-2xl border border-transparent hover:border-white/20 mb-1"
                >
                  {item.icon}
                </button>

                {/* Pure White Label */}
                <span className="text-xs font-bold text-white transition-all duration-200">{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Trash Modal */}
      <InteractiveTrash isOpen={showTrash} onClose={() => setShowTrash(false)} />
    </>
  )
}
