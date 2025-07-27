"use client"

import { useEffect, useState } from "react"

export default function HelloAnimation() {
  const [isVisible, setIsVisible] = useState(true)
  const [showGlow, setShowGlow] = useState(false)

  useEffect(() => {
    // Start glow effect after writing animation completes
    const glowTimer = setTimeout(() => {
      setShowGlow(true)
    }, 3200)

    // Fade out the entire animation
    const fadeTimer = setTimeout(() => {
      setIsVisible(false)
    }, 4500)

    return () => {
      clearTimeout(glowTimer)
      clearTimeout(fadeTimer)
    }
  }, [])

  return (
    <div
      className={`fixed inset-0 bg-black flex items-center justify-center z-50 transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      {/* Apple-style "hello" Animation - Perfectly Centered */}
      <div className="flex items-center justify-center w-full h-full">
        <svg
          viewBox="0 0 400 120"
          className="hello-svg"
          aria-label="hello"
          style={{
            width: "min(60vw, 500px)",
            height: "auto",
          }}
        >
          {/* Gradient Definition */}
          <defs>
            <linearGradient id="helloGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#f8f8f8" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>

            {/* Glow Filter */}
            <filter id="appleGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Enhanced Glow for pulsing */}
            <filter id="applePulseGlow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="8" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Clean, readable "hello" text using simple text element */}
          <text
            x="200"
            y="70"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="none"
            stroke="url(#helloGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="1000"
            strokeDashoffset="1000"
            filter={showGlow ? "url(#applePulseGlow)" : "url(#appleGlow)"}
            style={{
              fontFamily: "cursive, 'Apple Chancery', 'Brush Script MT', fantasy",
              fontSize: "48px",
              fontWeight: "300",
              animation: "helloDraw 3s cubic-bezier(0.8, 0, 0.3, 1) forwards",
            }}
          >
            hello
          </text>

          {/* Elegant underline */}
          <path
            fill="none"
            stroke="url(#helloGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="200"
            strokeDashoffset="200"
            opacity="0.7"
            filter="url(#appleGlow)"
            d="M120 85 Q200 80 280 85"
            style={{
              animation: "helloDraw 2s cubic-bezier(0.8, 0, 0.3, 1) 1s forwards",
            }}
          />
        </svg>

        {/* Breathing glow background effect */}
        {showGlow && (
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 500px 250px at center, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 50%, transparent 80%)",
              animation: "appleBreath 4s ease-in-out infinite",
            }}
          />
        )}
      </div>

      <style jsx>{`
        .hello-svg {
          filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.3));
        }

        @keyframes helloDraw {
          from {
            stroke-dashoffset: 1000;
          }
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes appleBreath {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(0.98);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.02);
          }
        }

        /* Pulsing glow effect after animation */
        ${
          showGlow
            ? `
        text {
          animation: helloPulse 3s ease-in-out infinite !important;
        }

        @keyframes helloPulse {
          0%, 100% {
            filter: url(#appleGlow);
            opacity: 0.9;
          }
          50% {
            filter: url(#applePulseGlow);
            opacity: 1;
          }
        }
        `
            : ""
        }

        /* Responsive scaling */
        @media (max-width: 768px) {
          .hello-svg {
            width: min(70vw, 400px) !important;
          }
        }

        @media (max-width: 480px) {
          .hello-svg {
            width: min(80vw, 320px) !important;
          }
        }

        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {
          .hello-svg text,
          .hello-svg path {
            animation: none !important;
            stroke-dashoffset: 0 !important;
          }
        }
      `}</style>
    </div>
  )
}
