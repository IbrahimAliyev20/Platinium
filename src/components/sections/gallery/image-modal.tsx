"use client"

import type React from "react"
import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { MediaType } from "@/types"

interface ImageModalProps {
  images: MediaType[]
  currentIndex: number
  onClose: () => void
  onIndexChange: (index: number) => void
}

export default function ImageModal({
  images,
  currentIndex,
  onClose,
  onIndexChange,
}: ImageModalProps) {
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const navigateToPrevious = useCallback(() => {
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1
    onIndexChange(newIndex)
  }, [currentIndex, images.length, onIndexChange])

  const navigateToNext = useCallback(() => {
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1
    onIndexChange(newIndex)
  }, [currentIndex, images.length, onIndexChange])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      } else if (e.key === "ArrowLeft") {
        navigateToPrevious()
      } else if (e.key === "ArrowRight") {
        navigateToNext()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [navigateToNext, navigateToPrevious, onClose])

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart === null || touchEnd === null) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      navigateToNext()
    } else if (isRightSwipe) {
      navigateToPrevious()
    }

    setTouchStart(null)
    setTouchEnd(null)
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <button
        className="absolute top-4 right-4 z-50 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
        onClick={onClose}
      >
        <X className="w-6 h-6" />
      </button>

      <button
        className="absolute left-4 z-50 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
        onClick={(e) => {
          e.stopPropagation()
          navigateToPrevious()
        }}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        className="absolute right-4 z-50 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
        onClick={(e) => {
          e.stopPropagation()
          navigateToNext()
        }}
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div
        className="relative w-full h-full max-w-5xl max-h-[80vh] mx-auto p-4 flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <motion.div
          key="photo"
          className="relative w-full h-full"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative w-full h-full">
            <Image
              src={images[currentIndex].image || "/placeholder.svg"}
              alt={`image ${currentIndex + 1}`}
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-contain"
              priority
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-4 text-white">
            <p className="text-xs text-gray-400 mt-1">
              Image {currentIndex + 1} of {images.length}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
