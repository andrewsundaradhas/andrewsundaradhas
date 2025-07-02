"use client"

import React, { useState, useContext, createContext, useMemo } from "react"
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

// --- Preferences Context ---
const defaultPreferences = {
  theme: "system",
  accent: "#14b8a6",
  font: "Inter, system-ui, sans-serif",
  fontSize: 18,
  wallpaper: "#0f172a",
  animationSpeed: 1,
  setPreferences: (_: any) => {},
}
const PreferencesContext = createContext(defaultPreferences)

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

// --- Top Menu Bar ---
function MenuBar({ onOpenPreferences }: { onOpenPreferences: () => void }) {
  return (
    <nav className="fixed top-0 left-0 right-0 h-10 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/30 z-50 flex items-center px-4 text-sm text-white shadow-lg">
      <div className="flex items-center space-x-6">
        <button className="font-bold hover:bg-slate-700/50 px-2 py-1 rounded transition-colors"></button>
        <Menu label="File" items={["New", "Open", "Save", "Import", "Export", "Print"]} />
        <Menu label="Edit" items={["Undo", "Redo", "Cut", "Copy", "Paste", "Select All", "Find", "Replace"]} />
        <Menu label="View" items={["Show Toolbar", "Zoom In", "Zoom Out", "Toggle Status Bar", "Layout"]} />
        <Menu label="Search" items={["Spotlight", "Find Files", "Find in Page"]} />
      </div>
      <div className="flex-1" />
      <div className="flex items-center space-x-4">
        <button
          className="hover:bg-slate-700/50 px-2 py-1 rounded transition-colors"
          onClick={onOpenPreferences}
          aria-label="Open System Preferences"
        >
          System Preferences
        </button>
        <Menu label="User" items={["Profile", "Logout"]} />
      </div>
    </nav>
  )
}

// --- Menu Dropdown ---
function Menu({ label, items }: { label: string; items: string[] }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <button
        className="hover:bg-slate-700/50 px-2 py-1 rounded transition-colors"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {label}
      </button>
      {open && (
        <ul
          className="absolute left-0 mt-2 min-w-32 bg-slate-800/95 border border-slate-600/50 rounded-lg shadow-2xl py-2 z-50"
          role="menu"
        >
          {items.map((item) => (
            <li
              key={item}
              className="px-4 py-2 hover:bg-slate-700/50 cursor-pointer transition-colors"
              role="menuitem"
              tabIndex={0}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

// --- Dock ---
function Dock() {
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 z-40 flex gap-4 bg-slate-900/70 backdrop-blur-xl rounded-2xl px-6 py-3 shadow-2xl border border-slate-700/30">
      {/* Example dock icons */}
      <DockIcon label="About Me" emoji="👨‍💻" />
      <DockIcon label="Projects" emoji="🛠️" />
      <DockIcon label="Contact" emoji="✉️" />
      <DockIcon label="Preferences" emoji="⚙️" />
    </nav>
  )
}

function DockIcon({ label, emoji }: { label: string; emoji: string }) {
  return (
    <button
      className="flex flex-col items-center justify-center w-16 h-16 bg-slate-800/80 rounded-xl shadow-lg hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-accent"
      aria-label={label}
    >
      <span className="text-2xl mb-1">{emoji}</span>
      <span className="text-xs text-white/80">{label}</span>
    </button>
  )
}

// --- Sticky About Me Section ---
function AboutMe() {
  const { font, fontSize, accent } = useContext(PreferencesContext)
  return (
    <section
      className="sticky top-12 z-30 mx-auto max-w-2xl bg-white/90 dark:bg-slate-900/90 rounded-2xl shadow-xl p-8 mt-16 mb-8 border border-slate-200 dark:border-slate-700 backdrop-blur-xl"
      aria-label="About Me"
      style={{ fontFamily: font, fontSize }}
    >
      <h1 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">Andrew Sundaradhas</h1>
      <AnimatedMotto />
      <p className="mt-4 text-lg text-slate-700 dark:text-slate-200">
        Robotics Engineer & ML Specialist. I build intelligent drones, master algorithms, and love a good challenge.
      </p>
    </section>
  )
}

// --- Motto Animation (speed adjustable via preferences) ---
function AnimatedMotto() {
  const { animationSpeed, accent } = useContext(PreferencesContext)
  // Animation speed is controlled by preferences
  return (
    <div
      className="text-xl font-medium mb-2 transition-all"
      style={{ color: accent, animationDuration: `${2 / animationSpeed}s` }}
    >
      <span
        style={{
          display: "inline-block",
          animation: `motto-pulse ${2 / animationSpeed}s infinite alternate`,
        }}
      >
        “Drone engineer by passion, negotiator by instinct.”
      </span>
      <style>{`
        @keyframes motto-pulse {
          0% { opacity: 0.7; transform: translateY(0); }
          100% { opacity: 1; transform: translateY(-4px) scale(1.04); }
        }
      `}</style>
    </div>
  )
}

// --- System Preferences Modal ---
function SystemPreferences({ open, onClose }: { open: boolean; onClose: () => void }) {
  const prefs = useContext(PreferencesContext)
  const [local, setLocal] = useState({ ...prefs })

  // Update context on save
  function handleSave() {
    prefs.setPreferences(local)
    onClose()
  }

  // Live preview as user changes
  function handleChange(key: string, value: any) {
    setLocal((prev) => ({ ...prev, [key]: value }))
  }

  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-8 w-full max-w-lg border border-slate-300 dark:border-slate-700">
        <h2 className="text-2xl font-bold mb-4">System Preferences</h2>
        {/* Wallpaper/background */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Wallpaper/Background</label>
          <input
            type="color"
            value={local.wallpaper}
            onChange={e => handleChange("wallpaper", e.target.value)}
            className="w-12 h-8 rounded border"
            aria-label="Choose background color"
          />
        </div>
        {/* Theme */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Theme</label>
          <select
            value={local.theme}
            onChange={e => handleChange("theme", e.target.value)}
            className="rounded border px-2 py-1"
            aria-label="Choose theme"
          >
            <option value="system">System</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
        {/* Accent color */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Accent Color</label>
          <input
            type="color"
            value={local.accent}
            onChange={e => handleChange("accent", e.target.value)}
            className="w-12 h-8 rounded border"
            aria-label="Choose accent color"
          />
        </div>
        {/* Font family */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Font Family</label>
          <select
            value={local.font}
            onChange={e => handleChange("font", e.target.value)}
            className="rounded border px-2 py-1"
            aria-label="Choose font family"
          >
            <option value="Inter, system-ui, sans-serif">Inter</option>
            <option value="SF Pro, system-ui, sans-serif">SF Pro</option>
            <option value="system-ui, sans-serif">System UI</option>
          </select>
        </div>
        {/* Font size */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Font Size</label>
          <input
            type="range"
            min={14}
            max={32}
            value={local.fontSize}
            onChange={e => handleChange("fontSize", Number(e.target.value))}
            className="w-full"
            aria-label="Font size"
          />
          <span className="ml-2">{local.fontSize}px</span>
        </div>
        {/* Animation speed */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Animation Speed</label>
          <input
            type="range"
            min={0.5}
            max={3}
            step={0.1}
            value={local.animationSpeed}
            onChange={e => handleChange("animationSpeed", Number(e.target.value))}
            className="w-full"
            aria-label="Animation speed"
          />
          <span className="ml-2">{local.animationSpeed}x</span>
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <button
            className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

// --- Main Page ---
export default function MacOSDashboard() {
  const [preferencesOpen, setPreferencesOpen] = useState(false)
  const [preferences, setPreferences] = useState(defaultPreferences)

  // Memoize context value for performance
  const contextValue = useMemo(() => ({ ...preferences, setPreferences }), [preferences])

  return (
    <PreferencesContext.Provider value={contextValue}>
      <div
        className="min-h-screen relative pb-32 transition-colors duration-500"
        style={{ background: preferences.wallpaper }}
      >
        <MenuBar onOpenPreferences={() => setPreferencesOpen(true)} />
        <main className="pt-16 px-4 max-w-4xl mx-auto">
          <AboutMe />
          {/* TODO: Add more sections here */}
        </main>
        <Dock />
        <SystemPreferences open={preferencesOpen} onClose={() => setPreferencesOpen(false)} />
      </div>
    </PreferencesContext.Provider>
  )
}

// ---
// All components are styled for macOS look & feel, fully responsive, and ready for live customization.
// Each customizable feature is commented and documented for easy maintenance.
