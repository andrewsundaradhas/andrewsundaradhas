"use client"

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

interface MobileLayoutProps {
  openWindow: (window: Window) => void
  windows: Window[]
  closeWindow: (windowId: string) => void
  bringToFront: (windowId: string) => void
}

export default function MobileLayout({ openWindow, windows, closeWindow, bringToFront }: MobileLayoutProps) {
  return (
    <div className="h-screen w-full bg-black overflow-hidden">
      {/* Mobile Menu Bar */}
      <div className="mobile-menu-bar">
        <div className="flex items-center space-x-3">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
          </svg>
          <span className="font-bold text-white text-lg">Portfolio</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-white text-sm font-mono">12:34</span>
        </div>
      </div>

      {/* Mobile Content Area */}
      <div className="mobile-content">
        {/* Welcome Message - Only show when no windows are open */}
        {windows.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full px-6 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-6">
              <span className="text-4xl">👤</span>
            </div>
            <h1 className="text-2xl font-bold text-white mb-4">Andrew Sundaradhas</h1>
            <p className="text-lg text-gray-300 mb-6">Context Engineer & Robotics Engineer</p>
            <p className="text-base text-gray-400 leading-relaxed max-w-sm">
              From autonomous drones to intelligent AI models — I make complex tech simple and effective.
            </p>
          </div>
        )}

        {/* Windows Container */}
        <div className="relative">
          {windows.map((window) => (
            <div
              key={window.id}
              className="mobile-window"
              style={{ zIndex: window.zIndex }}
              onClick={() => bringToFront(window.id)}
            >
              {/* Window Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{window.icon}</span>
                  <span className="font-semibold text-white">{window.title}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    closeWindow(window.id)
                  }}
                  className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white text-lg font-bold hover:bg-red-400 transition-colors"
                  style={{ minWidth: '40px', minHeight: '40px' }}
                >
                  ×
                </button>
              </div>

              {/* Window Content */}
              <div className="mobile-scroll" style={{ maxHeight: "calc(100vh - 200px)" }}>
                <div className="p-4">
                  {renderWindowContent(window)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Dock */}
      <div className="mobile-dock">
        <div className="flex space-x-2">
          {[
            { id: "about", icon: "👤", label: "About" },
            { id: "skills", icon: "⚡", label: "Skills" },
            { id: "experience", icon: "💼", label: "Experience" },
            { id: "contact", icon: "📧", label: "Contact" },
            { id: "resume", icon: "📄", label: "Resume" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() =>
                openWindow({
                  id: item.id,
                  title: item.label,
                  type: item.id,
                  icon: item.icon,
                  position: { x: 50, y: 50 },
                  zIndex: 1000,
                })
              }
              className="mobile-dock-item bg-white/10 hover:bg-white/20 text-white"
              title={item.label}
            >
              {item.icon}
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  function renderWindowContent(window: Window) {
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
        return <div className="text-white">Unknown window type</div>
    }
  }
}
