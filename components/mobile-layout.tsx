"use client"
import WindowManager from "./window-manager"

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
    <div className="h-full w-full overflow-hidden bg-black">
      {/* Menu Bar - Mobile */}
      <div className="h-8 bg-black/80 backdrop-blur-md flex items-center justify-between px-4 text-white text-sm border-b border-white/10">
        <div className="flex items-center space-x-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
          </svg>
          <span className="font-semibold">Portfolio</span>
        </div>
        <span className="font-mono text-xs">12:34</span>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative">
        {/* Windows - Mobile */}
        <div className="absolute inset-0">
          <WindowManager
            windows={windows}
            onClose={closeWindow}
            onUpdatePosition={() => {}} // Disable dragging on mobile
            onBringToFront={bringToFront}
          />
        </div>

        {/* Dock - Mobile */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-2">
            <div className="flex space-x-2 overflow-x-auto">
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
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl hover:bg-white/10 transition-colors"
                >
                  {item.icon}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full"></div>
      </div>
    </div>
  )
}
