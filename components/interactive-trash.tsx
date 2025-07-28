"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"

interface InteractiveTrashProps {
  isOpen: boolean
  onClose: () => void
}

export default function InteractiveTrash({ isOpen, onClose }: InteractiveTrashProps) {
  const [negativeWords, setNegativeWords] = useState([
    "Doubt",
    "Fear",
    "Procrastination",
    "Regret",
    "Failure",
    "Negativity",
    "Anxiety",
    "Stress",
    "Perfectionism",
    "Overthinking",
  ])
  const [deletedWords, setDeletedWords] = useState<string[]>([])
  const [draggedWord, setDraggedWord] = useState<string | null>(null)
  const [isTrashActive, setIsTrashActive] = useState(false)
  const [showUndo, setShowUndo] = useState(false)
  const [lastDeleted, setLastDeleted] = useState<string>("")
  const [showConfetti, setShowConfetti] = useState(false)
  const dragRef = useRef<HTMLDivElement>(null)
  const undoTimeoutRef = useRef<NodeJS.Timeout>()

  // Handle drag start
  const handleDragStart = (word: string, e: React.DragEvent) => {
    setDraggedWord(word)
    e.dataTransfer.setData("text/plain", word)
    e.dataTransfer.effectAllowed = "move"

    // Add dragging class for visual feedback
    const target = e.target as HTMLElement
    target.classList.add("dragging")
  }

  const handleDragEnd = (e: React.DragEvent) => {
    const target = e.target as HTMLElement
    target.classList.remove("dragging")
    setDraggedWord(null)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsTrashActive(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    // Only deactivate if we're leaving the trash zone entirely
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX
    const y = e.clientY

    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      setIsTrashActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const word = e.dataTransfer.getData("text/plain")

    if (word && negativeWords.includes(word)) {
      // Animate word deletion
      setNegativeWords((prev) => prev.filter((w) => w !== word))
      setDeletedWords((prev) => [...prev, word])
      setLastDeleted(word)
      setIsTrashActive(false)
      setDraggedWord(null)
      setShowUndo(true)

      // Clear previous timeout
      if (undoTimeoutRef.current) {
        clearTimeout(undoTimeoutRef.current)
      }

      // Hide undo after 3 seconds
      undoTimeoutRef.current = setTimeout(() => setShowUndo(false), 3000)

      // Show confetti if all words are deleted
      if (negativeWords.length === 1) {
        setShowConfetti(true)
        setTimeout(() => setShowConfetti(false), 2000)
      }
    }
  }

  const handleUndo = () => {
    if (lastDeleted) {
      setNegativeWords((prev) => [...prev, lastDeleted])
      setDeletedWords((prev) => prev.filter((w) => w !== lastDeleted))
      setLastDeleted("")
      setShowUndo(false)

      if (undoTimeoutRef.current) {
        clearTimeout(undoTimeoutRef.current)
      }
    }
  }

  const handleReset = () => {
    setNegativeWords([
      "Doubt",
      "Fear",
      "Procrastination",
      "Regret",
      "Failure",
      "Negativity",
      "Anxiety",
      "Stress",
      "Perfectionism",
      "Overthinking",
    ])
    setDeletedWords([])
    setShowUndo(false)
    setLastDeleted("")
    setShowConfetti(false)
  }

  // Touch support for mobile
  const handleTouchStart = (word: string, e: React.TouchEvent) => {
    setDraggedWord(word)
    const target = e.target as HTMLElement
    target.classList.add("dragging")
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const target = e.target as HTMLElement
    target.classList.remove("dragging")

    // Check if touch ended over trash zone
    const touch = e.changedTouches[0]
    const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY)

    if (elementBelow?.closest(".trash-zone") && draggedWord) {
      // Simulate drop
      if (negativeWords.includes(draggedWord)) {
        setNegativeWords((prev) => prev.filter((w) => w !== draggedWord))
        setDeletedWords((prev) => [...prev, draggedWord])
        setLastDeleted(draggedWord)
        setShowUndo(true)

        if (undoTimeoutRef.current) {
          clearTimeout(undoTimeoutRef.current)
        }
        undoTimeoutRef.current = setTimeout(() => setShowUndo(false), 3000)

        if (negativeWords.length === 1) {
          setShowConfetti(true)
          setTimeout(() => setShowConfetti(false), 2000)
        }
      }
    }

    setDraggedWord(null)
    setIsTrashActive(false)
  }

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (undoTimeoutRef.current) {
        clearTimeout(undoTimeoutRef.current)
      }
    }
  }, [])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="negativity-trash-container">
        {/* Header */}
        <div className="flex items-center justify-between w-full mb-6">
          <h2 className="text-2xl font-bold text-white">🗑️ Negativity Trash</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-red-500 hover:bg-red-400 transition-colors flex items-center justify-center text-white font-bold"
          >
            ×
          </button>
        </div>

        {/* Instructions */}
        <p className="text-white/70 text-sm mb-6 text-center max-w-sm font-medium">
          Drag negative words into the trash to delete them from your mindset! 🧠✨
        </p>

        {/* Negative Words */}
        <div className="negative-words-list">
          {negativeWords.map((word, index) => (
            <div
              key={word}
              draggable
              onDragStart={(e) => handleDragStart(word, e)}
              onDragEnd={handleDragEnd}
              onTouchStart={(e) => handleTouchStart(word, e)}
              onTouchEnd={handleTouchEnd}
              className="negative-word-chip"
              style={{
                animation: `slideInChip 0.4s ease-out ${index * 0.08}s both`,
              }}
            >
              {word}
            </div>
          ))}
        </div>

        {/* Trash Drop Zone */}
        <div
          ref={dragRef}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`trash-zone ${isTrashActive ? "active" : ""}`}
        >
          <div className="trash-icon">🗑️</div>
          <p className={`trash-label ${isTrashActive ? "active" : ""}`}>
            {isTrashActive ? "Drop to Delete!" : "Drag here"}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          {showUndo && (
            <button onClick={handleUndo} className="undo-button">
              ↶ Undo &quot;{lastDeleted}&quot;
            </button>
          )}
          <button onClick={handleReset} className="reset-button">
            🔄 Reset All
          </button>
        </div>

        {/* Success Message */}
        {negativeWords.length === 0 && (
          <div className="success-message">
            <div className="text-4xl mb-3">🎉</div>
            <p className="text-green-400 font-bold text-lg">Amazing! You&apos;ve cleared all negativity!</p>
            <p className="text-gray-300 text-sm mt-2">Your mindset is now clean and positive! ✨</p>
          </div>
        )}

        {/* Confetti Effect */}
        {showConfetti && (
          <div className="confetti-container">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="confetti-piece"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 0.5}s`,
                  backgroundColor: ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#feca57"][
                    Math.floor(Math.random() * 5)
                  ],
                }}
              />
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="stats">
          Deleted: {deletedWords.length} | Remaining: {negativeWords.length}
        </div>
      </div>

      <style jsx>{`
        .negativity-trash-container {
          max-width: 480px;
          width: 92vw;
          max-height: 90vh;
          margin: 0 auto;
          padding: 2vw 3vw;
          background: rgba(0, 0, 0, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          overflow-y: auto;
        }

        .negative-words-list {
          display: flex;
          flex-wrap: wrap;
          gap: 12px 10px;
          justify-content: center;
          margin: 0 0 20px 0;
          max-width: 100%;
        }

        .negative-word-chip {
          padding: 0.7em 1.3em;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #FFF;
          font-size: 1rem;
          font-weight: 500;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
          cursor: grab;
          transition: all 0.2s ease;
          user-select: none;
          touch-action: none;
          min-height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .negative-word-chip:hover {
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(255, 255, 255, 0.25);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
          transform: translateY(-2px);
        }

        .negative-word-chip:active,
        .negative-word-chip.dragging {
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
          transform: scale(1.06);
          z-index: 5;
          cursor: grabbing;
        }

        .trash-zone {
          width: 120px;
          height: 100px;
          margin: 12px auto 20px auto;
          background: rgba(255, 255, 255, 0.03);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          border: 2px dashed rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          padding: 16px;
        }

        .trash-zone.active {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.4);
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
          animation: trashWiggle 0.32s;
        }

        .trash-icon {
          font-size: 2.5rem;
          margin-bottom: 8px;
          transition: transform 0.18s;
        }

        .trash-zone.active .trash-icon {
          transform: scale(1.1);
          color: rgba(255, 255, 255, 0.9);
        }

        .trash-label {
          font-size: 0.9rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.7);
          transition: color 0.18s;
        }

        .trash-label.active {
          color: rgba(255, 255, 255, 0.9);
        }

        .action-buttons {
          display: flex;
          gap: 12px;
          margin-top: 16px;
          flex-wrap: wrap;
          justify-content: center;
          width: 100%;
        }

        .undo-button {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          font-weight: 600;
          padding: 12px 20px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 0.9rem;
          animation: slideInButton 0.3s ease-out;
        }

        .undo-button:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }

        .reset-button {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: white;
          font-weight: 600;
          padding: 12px 20px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 0.9rem;
        }

        .reset-button:hover {
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(255, 255, 255, 0.25);
          transform: translateY(-2px);
        }

        .success-message {
          margin-top: 20px;
          padding: 20px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          text-align: center;
          animation: successPulse 0.6s ease-out;
        }

        .stats {
          margin-top: 16px;
          text-align: center;
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.5);
          font-weight: 500;
        }

        .confetti-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
          border-radius: 24px;
        }

        .confetti-piece {
          position: absolute;
          width: 8px;
          height: 8px;
          animation: confettiFall 2s linear forwards;
        }

        @keyframes slideInChip {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes slideInButton {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes trashWiggle {
          0%, 100% { transform: rotate(0deg); }
          30% { transform: rotate(-8deg); }
          60% { transform: rotate(10deg); }
        }

        @keyframes successPulse {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes confettiFall {
          0% {
            transform: translateY(-100px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(400px) rotate(360deg);
            opacity: 0;
          }
        }

        /* Mobile Responsive */
        @media (max-width: 480px) {
          .negativity-trash-container {
            padding: 4vw;
            max-width: 95vw;
          }

          .negative-word-chip {
            font-size: 1rem;
            padding: 0.6em 1.1em;
            min-height: 44px;
          }

          .trash-zone {
            width: 100px;
            height: 80px;
            margin: 16px auto;
          }

          .trash-icon {
            font-size: 2rem;
          }

          .action-buttons {
            flex-direction: column;
            width: 100%;
          }

          .undo-button,
          .reset-button {
            width: 100%;
            padding: 14px;
          }
        }

        /* Very small screens */
        @media (max-width: 320px) {
          .negative-word-chip {
            font-size: 0.9rem;
            padding: 0.5em 1em;
          }
        }

        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {
          .negative-word-chip,
          .trash-zone,
          .undo-button,
          .reset-button {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </div>
  )
}
