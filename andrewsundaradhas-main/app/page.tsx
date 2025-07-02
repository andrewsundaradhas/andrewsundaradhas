"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useMotionValue } from "framer-motion"
import {
  Minus,
  Square,
  X,
  Mail,
  Linkedin,
  Plane,
  Cpu,
  Users,
  Mic,
  Code,
  Brain,
  Send,
  Building,
  Scale,
  User,
  Briefcase,
  MessageCircle,
  ChevronDown,
  Search,
  Settings,
  ImageIcon,
  Bell,
  FileText,
  Download,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

// Typewriter effect component
function TypewriterEffect({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setTimeout(
      () => {
        if (currentIndex < text.length) {
          setDisplayText(text.slice(0, currentIndex + 1))
          setCurrentIndex(currentIndex + 1)
        }
      },
      delay + currentIndex * 3,
    )

    return () => clearTimeout(timer)
  }, [currentIndex, text, delay])

  return (
    <span>
      {displayText}
      <span className="animate-pulse text-teal-400">|</span>
    </span>
  )
}

// Real-time clock component
function RealTimeClock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="text-right text-xs text-white">
      <div className="font-medium">{formatTime(time)}</div>
      <div className="text-gray-300">{formatDate(time)}</div>
    </div>
  )
}

// Menu Bar component
function MenuBar({
  onSpotlightClick,
  onWallpaperChange,
}: {
  onSpotlightClick: () => void
  onWallpaperChange: () => void
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="fixed top-0 left-0 right-0 h-8 bg-slate-800/80 backdrop-blur-xl border-b border-slate-600/30 z-50 flex items-center px-4 text-sm text-white">
      <div className="flex items-center space-x-6">
        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="font-bold hover:bg-slate-700/50 px-2 py-1 rounded transition-colors"
          >
            🍎 Andrew
          </button>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-8 left-0 bg-slate-800/95 backdrop-blur-xl border border-slate-600/50 rounded-lg shadow-2xl py-2 min-w-48"
            >
              <button className="w-full px-4 py-2 text-left hover:bg-slate-700/50 transition-colors flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>About This Portfolio</span>
              </button>
              <button
                onClick={onWallpaperChange}
                className="w-full px-4 py-2 text-left hover:bg-slate-700/50 transition-colors flex items-center space-x-2"
              >
                <ImageIcon className="w-4 h-4" />
                <span>Change Wallpaper</span>
              </button>
              <div className="border-t border-slate-600/50 my-1"></div>
              <button className="w-full px-4 py-2 text-left hover:bg-slate-700/50 transition-colors flex items-center space-x-2">
                <Settings className="w-4 h-4" />
                <span>System Preferences</span>
              </button>
            </motion.div>
          )}
        </div>
        <button className="hover:bg-slate-700/50 px-2 py-1 rounded transition-colors">File</button>
        <button className="hover:bg-slate-700/50 px-2 py-1 rounded transition-colors">Edit</button>
        <button className="hover:bg-slate-700/50 px-2 py-1 rounded transition-colors">View</button>
      </div>
      <div className="flex-1"></div>
      <div className="flex items-center space-x-4">
        <button
          onClick={onSpotlightClick}
          className="hover:bg-slate-700/50 p-1 rounded transition-colors"
          title="Spotlight Search"
        >
          <Search className="w-4 h-4" />
        </button>
        <a
          href="https://www.linkedin.com/in/andrew-sundaradhas/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:bg-slate-700/50 px-2 py-1 rounded transition-colors"
        >
          LinkedIn
        </a>
        <RealTimeClock />
      </div>
    </div>
  )
}

// Window component with resize functionality
function Window({
  id,
  title,
  children,
  className = "",
  initialX = 0,
  initialY = 0,
  isOpen,
  onClose,
  onMinimize,
  onMaximize,
  zIndex,
  onFocus,
  isMaximized = false,
}: {
  id: string
  title: string
  children: React.ReactNode
  className?: string
  initialX?: number
  initialY?: number
  isOpen: boolean
  onClose: () => void
  onMinimize: () => void
  onMaximize: () => void
  zIndex: number
  onFocus: () => void
  isMaximized?: boolean
}) {
  const x = useMotionValue(initialX)
  const y = useMotionValue(initialY)
  const [size, setSize] = useState({ width: 500, height: 400 })

  if (!isOpen) return null

  return (
    <motion.div
      drag={!isMaximized}
      dragMomentum={false}
      style={{
        x: isMaximized ? 0 : x,
        y: isMaximized ? 32 : y,
        zIndex,
        width: isMaximized ? "100vw" : size.width,
        height: isMaximized ? "calc(100vh - 32px)" : size.height,
      }}
      initial={{ scale: 0.8, opacity: 0, y: 50 }}
      animate={{ scale: 1, opacity: 1, y: isMaximized ? 32 : 0 }}
      exit={{ scale: 0.8, opacity: 0, y: 50 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`absolute bg-slate-800/85 backdrop-blur-2xl border border-slate-600/30 rounded-2xl shadow-2xl ${className} ${
        !isMaximized ? "cursor-move" : ""
      } glass-window overflow-hidden`}
      onMouseDown={onFocus}
      onTouchStart={onFocus}
    >
      {/* Title Bar */}
      <div className="bg-slate-700/60 backdrop-blur-md px-6 py-4 rounded-t-2xl flex items-center justify-between border-b border-slate-600/30">
        <div className="flex items-center space-x-4">
          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-400 transition-all duration-200 flex items-center justify-center group"
              onClick={onClose}
            >
              <X className="w-2 h-2 text-red-900 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-400 transition-all duration-200 flex items-center justify-center group"
              onClick={onMinimize}
            >
              <Minus className="w-2 h-2 text-yellow-900 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-400 transition-all duration-200 flex items-center justify-center group"
              onClick={onMaximize}
            >
              <Square className="w-2 h-2 text-green-900 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
          </div>
          <span className="text-sm font-medium text-white">{title}</span>
        </div>
      </div>
      {/* Content */}
      <div className="p-8 overflow-auto h-full">{children}</div>
      {/* Resize Handle */}
      {!isMaximized && (
        <div
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize opacity-0 hover:opacity-100 transition-opacity"
          onMouseDown={(e) => {
            e.preventDefault()
            const startX = e.clientX
            const startY = e.clientY
            const startWidth = size.width
            const startHeight = size.height

            const handleMouseMove = (e: MouseEvent) => {
              const newWidth = Math.max(300, startWidth + (e.clientX - startX))
              const newHeight = Math.max(200, startHeight + (e.clientY - startY))
              setSize({ width: newWidth, height: newHeight })
            }

            const handleMouseUp = () => {
              document.removeEventListener("mousemove", handleMouseMove)
              document.removeEventListener("mouseup", handleMouseUp)
            }

            document.addEventListener("mousemove", handleMouseMove)
            document.addEventListener("mouseup", handleMouseUp)
          }}
        >
          <div className="w-full h-full bg-slate-600/50 rounded-tl-lg"></div>
        </div>
      )}
    </motion.div>
  )
}

// Dock Icon component
function DockIcon({
  icon: Icon,
  label,
  isActive = false,
  onClick,
  href,
  size = "large",
  hasNotification = false,
}: {
  icon: any
  label: string
  isActive?: boolean
  onClick?: () => void
  href?: string
  size?: "small" | "large"
  hasNotification?: boolean
}) {
  const handleClick = () => {
    if (href) {
      window.open(href, "_blank")
    } else if (onClick) {
      onClick()
    }
  }

  const iconSize = size === "large" ? "w-16 h-16" : "w-12 h-12"
  const iconInnerSize = size === "large" ? "w-10 h-10" : "w-6 h-6"

  return (
    <motion.div
      whileHover={{ scale: 1.4, y: -20 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleClick}
      className="flex flex-col items-center group relative cursor-pointer"
    >
      <motion.div
        className={`${iconSize} bg-slate-800/70 backdrop-blur-xl border ${
          isActive ? "border-teal-400/50" : "border-slate-600/30"
        } rounded-2xl flex items-center justify-center group-hover:border-teal-400/70 transition-all duration-300 relative shadow-2xl glass-dock-icon`}
        whileHover={{
          boxShadow: "0 25px 50px rgba(20, 184, 166, 0.4), 0 0 30px rgba(20, 184, 166, 0.3)",
        }}
      >
        <Icon
          className={`${iconInnerSize} ${isActive ? "text-teal-400" : "text-gray-300"} group-hover:text-teal-400 transition-all duration-300`}
        />
        {hasNotification && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-white animate-pulse"></div>
        )}
        {isActive && (
          <motion.div
            layoutId="active-indicator"
            className="absolute -bottom-4 w-2 h-2 bg-teal-400 rounded-full shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
      </motion.div>
      <motion.span
        className="text-xs text-white mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 text-center font-medium bg-slate-800/80 backdrop-blur-md px-2 py-1 rounded"
        initial={{ y: 10 }}
        whileHover={{ y: 0 }}
      >
        {label}
      </motion.span>
    </motion.div>
  )
}

// Context Menu component
function ContextMenu({
  isOpen,
  position,
  onClose,
  onWallpaperChange,
}: {
  isOpen: boolean
  position: { x: number; y: number }
  onClose: () => void
  onWallpaperChange: () => void
}) {
  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      style={{ left: position.x, top: position.y }}
      className="fixed z-50 bg-slate-800/95 backdrop-blur-xl border border-slate-600/50 rounded-xl shadow-2xl py-2 min-w-48"
      onMouseLeave={onClose}
    >
      <button
        onClick={onWallpaperChange}
        className="w-full px-4 py-3 text-left text-white hover:bg-slate-700/50 transition-colors text-sm font-medium flex items-center space-x-2"
      >
        <ImageIcon className="w-4 h-4" />
        <span>Change Wallpaper</span>
      </button>
      <button className="w-full px-4 py-3 text-left text-white hover:bg-slate-700/50 transition-colors text-sm font-medium flex items-center space-x-2">
        <User className="w-4 h-4" />
        <span>About This Portfolio</span>
      </button>
      <div className="border-t border-slate-600/50 my-1"></div>
      <button className="w-full px-4 py-3 text-left text-white hover:bg-slate-700/50 transition-colors text-sm font-medium flex items-center space-x-2">
        <Code className="w-4 h-4" />
        <span>View Source Code</span>
      </button>
      <button className="w-full px-4 py-3 text-left text-white hover:bg-slate-700/50 transition-colors text-sm font-medium flex items-center space-x-2">
        <Settings className="w-4 h-4" />
        <span>System Preferences</span>
      </button>
    </motion.div>
  )
}

// Wallpaper Selector component
function WallpaperSelector({
  isOpen,
  onClose,
  onSelect,
}: {
  isOpen: boolean
  onClose: () => void
  onSelect: (wallpaper: string) => void
}) {
  const wallpapers = [
    "from-slate-900 via-blue-900 to-slate-900",
    "from-purple-900 via-blue-900 to-indigo-900",
    "from-emerald-900 via-teal-900 to-cyan-900",
    "from-rose-900 via-pink-900 to-purple-900",
    "from-amber-900 via-orange-900 to-red-900",
  ]

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-slate-800/95 backdrop-blur-xl border border-slate-600/50 rounded-2xl p-6 max-w-md w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-bold text-white mb-4">Choose Wallpaper</h3>
        <div className="grid grid-cols-2 gap-4">
          {wallpapers.map((wallpaper, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                onSelect(wallpaper)
                onClose()
              }}
              className={`h-20 rounded-lg bg-gradient-to-br ${wallpaper} border-2 border-slate-600/50 hover:border-teal-400/50 transition-colors`}
            />
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-slate-700/50 hover:bg-slate-700 text-white py-2 rounded-lg transition-colors"
        >
          Cancel
        </button>
      </motion.div>
    </motion.div>
  )
}

// Spotlight Search component
function SpotlightSearch({
  isOpen,
  onClose,
  onNavigate,
}: {
  isOpen: boolean
  onClose: () => void
  onNavigate: (section: string) => void
}) {
  const [query, setQuery] = useState("")
  const sections = [
    { id: "about", name: "About Me", icon: User },
    { id: "skills", name: "Skills", icon: Brain },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "contact", name: "Contact", icon: MessageCircle },
    { id: "resume", name: "Resume", icon: FileText },
  ]

  const filteredSections = sections.filter((section) => section.name.toLowerCase().includes(query.toLowerCase()))

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-start justify-center pt-32"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: -20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: -20 }}
        className="bg-slate-800/95 backdrop-blur-xl border border-slate-600/50 rounded-2xl p-4 max-w-md w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center space-x-3 mb-4">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none text-lg"
            autoFocus
          />
        </div>
        <div className="space-y-2">
          {filteredSections.map((section) => (
            <button
              key={section.id}
              onClick={() => {
                onNavigate(section.id)
                onClose()
              }}
              className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-700/50 transition-colors text-left"
            >
              <section.icon className="w-5 h-5 text-teal-400" />
              <span className="text-white">{section.name}</span>
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

// Skill Badge component
function SkillBadge({ name, icon: Icon }: { name: string; icon: any }) {
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        y: -5,
        boxShadow: "0 10px 25px rgba(20, 184, 166, 0.3)",
      }}
      className="bg-slate-700/60 backdrop-blur-md px-5 py-3 rounded-full border border-slate-600/50 hover:border-teal-400/70 transition-all duration-300 group cursor-pointer glass-badge"
    >
      <div className="flex items-center space-x-3">
        <motion.div whileHover={{ scale: 1.2, rotate: 5 }} transition={{ type: "spring", stiffness: 400, damping: 30 }}>
          <Icon className="w-5 h-5 text-teal-400 group-hover:drop-shadow-lg" />
        </motion.div>
        <span className="text-white text-sm font-medium">{name}</span>
      </div>
    </motion.div>
  )
}

// Desktop Icon component
function DesktopIcon({
  icon: Icon,
  label,
  onClick,
  hasNotification = false,
}: {
  icon: any
  label: string
  onClick: () => void
  hasNotification?: boolean
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.15, y: -8 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="flex flex-col items-center space-y-3 cursor-pointer group relative"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <motion.div
        className="w-20 h-20 bg-slate-800/60 backdrop-blur-xl border border-slate-600/40 rounded-2xl flex items-center justify-center group-hover:border-teal-400/70 transition-all duration-300 glass-desktop-icon relative"
        whileHover={{
          boxShadow: "0 20px 40px rgba(20, 184, 166, 0.3)",
        }}
      >
        <Icon className="w-10 h-10 text-teal-400 group-hover:scale-110 transition-transform duration-300" />
        {hasNotification && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
            <Bell className="w-2 h-2 text-white" />
          </div>
        )}
      </motion.div>
      <span className="text-sm text-white text-center font-medium group-hover:text-teal-300 transition-colors bg-slate-800/60 backdrop-blur-md px-2 py-1 rounded">
        {label}
      </span>
    </motion.div>
  )
}

export default function Portfolio() {
  const [isIntroMode, setIsIntroMode] = useState(true)
  const [isOSMode, setIsOSMode] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [openWindows, setOpenWindows] = useState<Record<string, boolean>>({})
  const [maximizedWindows, setMaximizedWindows] = useState<Record<string, boolean>>({})
  const [windowZIndices, setWindowZIndices] = useState<Record<string, number>>({})
  const [highestZIndex, setHighestZIndex] = useState(1)
  const [contextMenu, setContextMenu] = useState<{ isOpen: boolean; position: { x: number; y: number } }>({
    isOpen: false,
    position: { x: 0, y: 0 },
  })
  const [wallpaperSelector, setWallpaperSelector] = useState(false)
  const [spotlightSearch, setSpotlightSearch] = useState(false)
  const [currentWallpaper, setCurrentWallpaper] = useState("from-slate-900 via-blue-900 to-slate-900")
  const [activeSection, setActiveSection] = useState<string | null>(null)

  useEffect(() => {
    setIsLoaded(true)

    // Keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === " ") {
        e.preventDefault()
        setSpotlightSearch(true)
      }
      if (e.key === "Escape") {
        setSpotlightSearch(false)
        setWallpaperSelector(false)
        setContextMenu({ isOpen: false, position: { x: 0, y: 0 } })
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Bring window to front
  const bringToFront = (id: string) => {
    if (windowZIndices[id] !== highestZIndex) {
      setHighestZIndex(highestZIndex + 1)
      setWindowZIndices({
        ...windowZIndices,
        [id]: highestZIndex + 1,
      })
    }
  }

  // Open window
  const openWindow = (id: string) => {
    setOpenWindows({
      ...openWindows,
      [id]: true,
    })
    bringToFront(id)
    setActiveSection(id)
  }

  // Close window
  const closeWindow = (id: string) => {
    setOpenWindows({
      ...openWindows,
      [id]: false,
    })
    setMaximizedWindows({
      ...maximizedWindows,
      [id]: false,
    })
    setActiveSection(null)
  }

  // Minimize window
  const minimizeWindow = (id: string) => {
    setOpenWindows({
      ...openWindows,
      [id]: false,
    })
    setActiveSection(null)
  }

  // Maximize window
  const maximizeWindow = (id: string) => {
    setMaximizedWindows({
      ...maximizedWindows,
      [id]: !maximizedWindows[id],
    })
  }

  // Handle right click
  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setContextMenu({
      isOpen: true,
      position: { x: e.clientX, y: e.clientY },
    })
  }

  // Transition to OS mode
  const enterOSMode = () => {
    setIsIntroMode(false)
    setTimeout(() => {
      setIsOSMode(true)
    }, 1000)
  }

  // Open section directly
  const openSection = (id: string) => {
    if (isIntroMode) {
      enterOSMode()
      setTimeout(() => {
        openWindow(id)
      }, 1500)
    } else {
      openWindow(id)
    }
  }

  // Download resume function
  const downloadResume = () => {
    const link = document.createElement("a")
    link.href = "/resume-andrew-sundaradhas.png"
    link.download = "Andrew-Sundaradhas-Resume.png"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const skills = [
    { name: "C++", icon: Code },
    { name: "ROS2", icon: Cpu },
    { name: "PyTorch", icon: Brain },
    { name: "Data Structures", icon: Brain },
    { name: "ML Algorithms", icon: Brain },
    { name: "Negotiation", icon: Users },
    { name: "Public Speaking", icon: Mic },
    { name: "Robotics Integration", icon: Plane },
  ]

  const experiences = [
    {
      role: "Robotics Engineer",
      company: "Atom Robotics",
      period: "2024 - Present",
      icon: Plane,
      summary: "Developed autonomous agriculture drones with ROS2 and C++, integrating advanced sensors and ML.",
    },
    {
      role: "Director of Operations",
      company: "Vertex Innovate",
      period: "2025 - Present",
      icon: Building,
      summary: "Led superapp launches, secured partnerships, showcased negotiation and speaking skills.",
    },
    {
      role: "Research Intern",
      company: "SixthSense Legal",
      period: "2024 - Present",
      icon: Scale,
      summary: "Conducted legal research, built the firm's website, presented findings.",
    },
  ]

  const desktopIcons = [
    { id: "about", icon: User, label: "About Me", hasNotification: false },
    { id: "skills", icon: Brain, label: "Skills", hasNotification: true },
    { id: "experience", icon: Briefcase, label: "Experience", hasNotification: false },
    { id: "contact", icon: MessageCircle, label: "Contact", hasNotification: false },
    { id: "resume", icon: FileText, label: "Resume", hasNotification: false },
  ]

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${currentWallpaper} overflow-hidden relative transition-all duration-1000 ${
        isOSMode ? "desktop-cursor" : ""
      }`}
      onContextMenu={handleRightClick}
      onClick={() => setContextMenu({ isOpen: false, position: { x: 0, y: 0 } })}
    >
      {/* Menu Bar */}
      {isOSMode && (
        <MenuBar
          onSpotlightClick={() => setSpotlightSearch(true)}
          onWallpaperChange={() => setWallpaperSelector(true)}
        />
      )}

      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-10">
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="absolute top-20 left-20 w-32 h-32 border border-teal-400 rounded-lg"
          />
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 15,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="absolute bottom-20 right-20 w-24 h-24"
          >
            <Plane className="w-full h-full text-coral-400 opacity-20" />
          </motion.div>
        </div>

        {/* Dynamic Gradient Blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="absolute top-1/4 -left-20 w-80 h-80 bg-teal-500 rounded-full filter blur-[100px]"
          />
          <motion.div
            animate={{
              x: [0, -100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 25,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="absolute bottom-1/4 -right-20 w-80 h-80 bg-coral-500 rounded-full filter blur-[100px]"
          />
        </div>
      </div>

      {/* Context Menu */}
      <AnimatePresence>
        {contextMenu.isOpen && (
          <ContextMenu
            isOpen={contextMenu.isOpen}
            position={contextMenu.position}
            onClose={() => setContextMenu({ isOpen: false, position: { x: 0, y: 0 } })}
            onWallpaperChange={() => {
              setWallpaperSelector(true)
              setContextMenu({ isOpen: false, position: { x: 0, y: 0 } })
            }}
          />
        )}
      </AnimatePresence>

      {/* Wallpaper Selector */}
      <AnimatePresence>
        {wallpaperSelector && (
          <WallpaperSelector
            isOpen={wallpaperSelector}
            onClose={() => setWallpaperSelector(false)}
            onSelect={setCurrentWallpaper}
          />
        )}
      </AnimatePresence>

      {/* Spotlight Search */}
      <AnimatePresence>
        {spotlightSearch && (
          <SpotlightSearch isOpen={spotlightSearch} onClose={() => setSpotlightSearch(false)} onNavigate={openWindow} />
        )}
      </AnimatePresence>

      {/* Intro Mode */}
      <AnimatePresence>
        {isIntroMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center justify-center min-h-screen px-6"
          >
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8, type: "spring", stiffness: 100 }}
              className="text-center mb-12"
            >
              <motion.h1
                className="text-4xl md:text-6xl lg:text-8xl font-bold mb-8 tracking-tight text-white"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8, type: "spring", stiffness: 120 }}
              >
                Hi, I am{" "}
                <span className="bg-gradient-to-r from-teal-400 to-coral-400 bg-clip-text text-transparent">
                  Andrew Sundaradhas
                </span>
              </motion.h1>
              <motion.div
                className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 h-20 flex items-center justify-center px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                {isLoaded && (
                  <TypewriterEffect
                    text="Drone engineer by passion, negotiator by instinct. If it flies, computes, or needs a winning pitch—I'm on it!"
                    delay={200}
                  />
                )}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: 0 }}
                transition={{ duration: 1, delay: 4 }}
                className="animate-bounce mt-8"
              >
                <ChevronDown className="w-8 h-8 mx-auto text-teal-400" />
              </motion.div>
            </motion.div>

            {/* Intro Dock */}
            <motion.div
              initial={{ y: 120, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 2, type: "spring", stiffness: 200, damping: 30 }}
              className="bg-slate-800/40 backdrop-blur-2xl border border-slate-600/30 rounded-3xl px-6 md:px-10 py-6 md:py-8 flex flex-wrap items-center justify-center gap-4 md:gap-8 shadow-2xl glass-dock max-w-4xl"
            >
              <DockIcon icon={User} label="About Me" onClick={() => openSection("about")} />
              <DockIcon icon={Brain} label="Skills" onClick={() => openSection("skills")} hasNotification={true} />
              <DockIcon icon={Briefcase} label="Experience" onClick={() => openSection("experience")} />
              <DockIcon icon={MessageCircle} label="Contact" onClick={() => openSection("contact")} />
              <DockIcon icon={FileText} label="Resume" onClick={() => openSection("resume")} />
              <div className="w-px h-16 bg-slate-600/40 hidden md:block"></div>
              <DockIcon icon={Linkedin} label="LinkedIn" href="https://www.linkedin.com/in/andrew-sundaradhas/" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* OS Mode */}
      <AnimatePresence>
        {isOSMode && (
          <motion.div
            initial={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1 }}
            className="min-h-screen relative pt-8"
          >
            {/* Desktop Icons */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-12 p-6 md:p-12 pt-16 md:pt-20">
              {desktopIcons.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ scale: 0, opacity: 0, y: 50 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <DesktopIcon
                    icon={item.icon}
                    label={item.label}
                    onClick={() => openWindow(item.id)}
                    hasNotification={item.hasNotification}
                  />
                </motion.div>
              ))}
            </div>

            {/* Windows */}
            <AnimatePresence>
              {/* About Window */}
              <Window
                id="about"
                title="About Me"
                className="w-[90vw] max-w-lg"
                initialX={typeof window !== "undefined" ? window.innerWidth / 2 - 250 : 250}
                initialY={typeof window !== "undefined" ? window.innerHeight / 2 - 200 : 200}
                isOpen={openWindows.about}
                onClose={() => closeWindow("about")}
                onMinimize={() => minimizeWindow("about")}
                onMaximize={() => maximizeWindow("about")}
                zIndex={windowZIndices.about || 1}
                onFocus={() => bringToFront("about")}
                isMaximized={maximizedWindows.about}
              >
                <div className="flex flex-col items-center space-y-8">
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                    className="w-28 h-28 bg-gradient-to-r from-teal-400/20 to-coral-400/20 rounded-full flex items-center justify-center text-5xl border-2 border-teal-400/40 shadow-2xl glowing-portrait"
                  >
                    👨‍💻
                  </motion.div>
                  <h1 className="text-2xl md:text-3xl font-bold text-center text-white">
                    ANDREW{" "}
                    <span className="bg-gradient-to-r from-teal-400 to-coral-400 bg-clip-text text-transparent">
                      SUNDARADHAS
                    </span>
                  </h1>
                  <p className="text-gray-300 text-center leading-relaxed text-base md:text-lg">
                    I'm passionate about building intelligent drones, mastering algorithms, and closing deals with
                    confidence. I thrive at the intersection of technology, research, and communication.
                  </p>
                </div>
              </Window>

              {/* Skills Window */}
              <Window
                id="skills"
                title="Skills & Expertise"
                className="w-[90vw] max-w-md"
                initialX={typeof window !== "undefined" ? window.innerWidth / 2 - 150 : 150}
                initialY={typeof window !== "undefined" ? window.innerHeight / 2 - 100 : 100}
                isOpen={openWindows.skills}
                onClose={() => closeWindow("skills")}
                onMinimize={() => minimizeWindow("skills")}
                onMaximize={() => maximizeWindow("skills")}
                zIndex={windowZIndices.skills || 1}
                onFocus={() => bringToFront("skills")}
                isMaximized={maximizedWindows.skills}
              >
                <div className="flex flex-wrap gap-3 md:gap-4 justify-center">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: index * 0.1, type: "spring", stiffness: 300, damping: 30 }}
                    >
                      <SkillBadge name={skill.name} icon={skill.icon} />
                    </motion.div>
                  ))}
                </div>
              </Window>

              {/* Experience Window */}
              <Window
                id="experience"
                title="Professional Experience"
                className="w-[90vw] max-w-lg"
                initialX={typeof window !== "undefined" ? window.innerWidth / 2 - 50 : 50}
                initialY={typeof window !== "undefined" ? window.innerHeight / 2 : 0}
                isOpen={openWindows.experience}
                onClose={() => closeWindow("experience")}
                onMinimize={() => minimizeWindow("experience")}
                onMaximize={() => maximizeWindow("experience")}
                zIndex={windowZIndices.experience || 1}
                onFocus={() => bringToFront("experience")}
                isMaximized={maximizedWindows.experience}
              >
                <div className="space-y-6">
                  {experiences.map((exp, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2, type: "spring", stiffness: 300, damping: 30 }}
                      className="bg-slate-700/40 backdrop-blur-md rounded-xl p-4 md:p-6 border border-slate-600/40 hover:border-teal-400/50 transition-all duration-300 glass-card"
                      whileHover={{ scale: 1.02, y: -5 }}
                    >
                      <div className="flex items-start space-x-3 md:space-x-5">
                        <motion.div
                          className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-teal-400 to-coral-400 rounded-full flex items-center justify-center shadow-lg"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          <exp.icon className="w-5 h-5 md:w-6 md:h-6 text-slate-900" />
                        </motion.div>
                        <div className="flex-1">
                          <h3 className="text-lg md:text-xl font-bold text-teal-400 mb-2">{exp.role}</h3>
                          <p className="text-white font-semibold mb-2">{exp.company}</p>
                          <p className="text-gray-300 text-sm mb-3">{exp.period}</p>
                          <p className="text-gray-300 text-sm leading-relaxed">{exp.summary}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Window>

              {/* Contact Window */}
              <Window
                id="contact"
                title="Get In Touch"
                className="w-[90vw] max-w-md"
                initialX={typeof window !== "undefined" ? window.innerWidth / 2 + 50 : 50}
                initialY={typeof window !== "undefined" ? window.innerHeight / 2 + 100 : 100}
                isOpen={openWindows.contact}
                onClose={() => closeWindow("contact")}
                onMinimize={() => minimizeWindow("contact")}
                onMaximize={() => maximizeWindow("contact")}
                zIndex={windowZIndices.contact || 1}
                onFocus={() => bringToFront("contact")}
                isMaximized={maximizedWindows.contact}
              >
                <div className="space-y-6">
                  <p className="text-gray-300 text-center mb-6 text-base md:text-lg">
                    Ready to discuss drones, algorithms, or your next big project? Let's connect!
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Your Name"
                      className="bg-slate-700/40 backdrop-blur-md border-slate-600/50 focus:border-teal-400 text-white placeholder:text-gray-400 rounded-xl"
                    />
                    <Input
                      type="email"
                      placeholder="Your Email"
                      className="bg-slate-700/40 backdrop-blur-md border-slate-600/50 focus:border-teal-400 text-white placeholder:text-gray-400 rounded-xl"
                    />
                  </div>
                  <Input
                    placeholder="Subject"
                    className="bg-slate-700/40 backdrop-blur-md border-slate-600/50 focus:border-teal-400 text-white placeholder:text-gray-400 rounded-xl"
                  />
                  <Textarea
                    placeholder="Your Message"
                    rows={4}
                    className="bg-slate-700/40 backdrop-blur-md border-slate-600/50 focus:border-teal-400 text-white placeholder:text-gray-400 resize-none rounded-xl"
                  />
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button className="w-full bg-gradient-to-r from-teal-500 to-coral-500 hover:from-teal-600 hover:to-coral-600 text-white font-semibold py-3 rounded-xl shadow-lg">
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </motion.div>
                  <div className="flex justify-center space-x-6 mt-6">
                    <motion.a
                      href="https://www.linkedin.com/in/andrew-sundaradhas/"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.15, y: -3 }}
                      className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-shadow"
                    >
                      <Linkedin className="w-6 h-6" />
                    </motion.a>
                    <motion.a
                      href="mailto:andrew@example.com"
                      whileHover={{ scale: 1.15, y: -3 }}
                      className="w-12 h-12 bg-coral-500 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-shadow"
                    >
                      <Mail className="w-6 h-6" />
                    </motion.a>
                  </div>
                </div>
              </Window>

              {/* Resume Window */}
              <Window
                id="resume"
                title="Resume - Andrew Sundaradhas"
                className="w-[95vw] max-w-4xl"
                initialX={typeof window !== "undefined" ? window.innerWidth / 2 - 400 : 100}
                initialY={typeof window !== "undefined" ? window.innerHeight / 2 - 300 : 50}
                isOpen={openWindows.resume}
                onClose={() => closeWindow("resume")}
                onMinimize={() => minimizeWindow("resume")}
                onMaximize={() => maximizeWindow("resume")}
                zIndex={windowZIndices.resume || 1}
                onFocus={() => bringToFront("resume")}
                isMaximized={maximizedWindows.resume}
              >
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">Professional Resume</h2>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={downloadResume}
                      className="bg-gradient-to-r from-teal-500 to-coral-500 hover:from-teal-600 hover:to-coral-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg flex items-center space-x-2"
                    >
                      <Download className="w-5 h-5" />
                      <span>Download Resume</span>
                    </motion.button>
                  </div>

                  <div className="bg-white rounded-xl p-4 shadow-2xl">
                    <img
                      src="/resume-andrew-sundaradhas.png"
                      alt="Andrew Sundaradhas Resume"
                      className="w-full h-auto rounded-lg shadow-lg"
                      style={{
                        maxHeight: maximizedWindows.resume ? "calc(100vh - 200px)" : "600px",
                        objectFit: "contain",
                      }}
                    />
                  </div>

                  <div className="text-center">
                    <p className="text-gray-300 text-sm">
                      Click the download button above to save this resume as an image file.
                    </p>
                  </div>
                </div>
              </Window>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
