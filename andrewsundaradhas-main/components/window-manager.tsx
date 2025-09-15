"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import AboutWindow from "./windows/about-window"
import SkillsWindow from "./windows/skills-window"
import ExperienceWindow from "./windows/experience-window"
import ContactWindow from "./windows/contact-window"
import ResumeWindow from "./windows/resume-window"

interface Window {
  id: string
  title: string
  type: string
  icon: string
  position: { x: number; y: number }
  zIndex: number
}

interface WindowManagerProps {
  windows: Window[]
  onClose: (windowId: string) => void
  onUpdatePosition: (windowId: string, position: { x: number; y: number }) => void
  onBringToFront: (windowId: string) => void
}

export default function WindowManager({ windows, onClose, onUpdatePosition, onBringToFront }: WindowManagerProps) {
  const [dragState, setDragState] = useState<{
    isDragging: boolean
    windowId: string | null
    offset: { x: number; y: number }
  }>({
    isDragging: false,
    windowId: null,
    offset: { x: 0, y: 0 },
  })

  const handleMouseDown = (e: React.MouseEvent, windowId: string) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setDragState({
      isDragging: true,
      windowId,
      offset: {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      },
    })
    onBringToFront(windowId)
  }

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!dragState.isDragging || !dragState.windowId) return

    const newPosition = {
      x: e.clientX - dragState.offset.x,
      y: e.clientY - dragState.offset.y,
    }

    // Constrain to viewport
    newPosition.x = Math.max(0, Math.min(window.innerWidth - 400, newPosition.x))
    newPosition.y = Math.max(28, Math.min(window.innerHeight - 300, newPosition.y))

    onUpdatePosition(dragState.windowId, newPosition)
  }, [dragState, onUpdatePosition])

  const handleMouseUp = useCallback(() => {
    setDragState({
      isDragging: false,
      windowId: null,
      offset: { x: 0, y: 0 },
    })
  }, [])

  useEffect(() => {
    if (dragState.isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }
    }
  }, [dragState, handleMouseMove, handleMouseUp])

  const renderWindowContent = (window: Window) => {
    switch (window.type) {
      case "about":
        return <AboutWindow />
      case "skills":
        return <SkillsWindow />
      case "experience":
        return <ExperienceWindow />
      case "contact":
        return <ContactWindow />
      case "resume":
        return <ResumeWindow />
      default:
        return <div>Unknown window type</div>
    }
  }

  return (
    <>
      {windows.map((window) => (
        <div
          key={window.id}
          className="fixed bg-black/90 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden"
          style={{
            left: window.position.x,
            top: window.position.y,
            zIndex: window.zIndex,
            width: "420px",
            minHeight: "320px",
            maxHeight: "80vh",
          }}
          onClick={() => onBringToFront(window.id)}
        >
          {/* Window Header */}
          <div
            className="h-8 bg-black/80 border-b border-white/10 flex items-center justify-between px-4 cursor-move select-none backdrop-blur-sm"
            onMouseDown={(e) => handleMouseDown(e, window.id)}
          >
            {/* Traffic Lights */}
            <div className="flex items-center space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onClose(window.id)
                }}
                className="window-control w-3 h-3 bg-red-500 rounded-full hover:bg-red-400 transition-colors shadow-sm"
              />
              <div className="window-control w-3 h-3 bg-yellow-500 rounded-full shadow-sm" />
              <div className="window-control w-3 h-3 bg-green-500 rounded-full shadow-sm" />
            </div>
            {/* Window Title */}
            <div className="flex items-center space-x-2 text-white text-sm font-semibold">
              <span>{window.icon}</span>
              <span>{window.title}</span>
            </div>
            <div className="w-12" />
          </div>

          {/* Window Content with proper scrolling */}
          <div
            className="p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
            style={{
              maxHeight: "calc(80vh - 32px)",
              scrollbarWidth: "thin",
            }}
          >
            {renderWindowContent(window)}
          </div>
        </div>
      ))}
    </>
  )
}
