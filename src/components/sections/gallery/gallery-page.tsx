"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import ImageModal from "./image-modal"
import { MediaType } from "@/types"
import { useTranslations } from "next-intl"

export default function GalleryPage({ initialPhotos = [], initialNextUrl = null }: { initialPhotos?: MediaType[], initialNextUrl?: string | null }) {
  const [photos, setPhotos] = useState<MediaType[]>(initialPhotos)
  const [nextUrl, setNextUrl] = useState<string | null>(initialNextUrl)
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const t = useTranslations()

  const openModal = (index: number) => {
    setSelectedImageIndex(index)
    setIsModalOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedImageIndex(null)
    document.body.style.overflow = "auto"
  }

  const fetchMorePhotos = useCallback(async () => {
    if (!nextUrl || loading) return

    setLoading(true)
    try {
      const response = await fetch(nextUrl)
      if (!response.ok) {
        throw new Error("Failed to fetch more photos")
      }
      const data = await response.json()
      
      setPhotos(prev => [...prev, ...(data.data || [])])
      setNextUrl(data.links?.next || null)
    } catch {
      setError("Failed to load more photos")
    } finally {
      setLoading(false)
    }
  }, [nextUrl, loading])

  useEffect(() => {
    const handleScroll = () => {
      const bottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 200
      if (bottom && nextUrl && !loading) {
        fetchMorePhotos()
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [nextUrl, loading, fetchMorePhotos])

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-title-500 text-gray-900 mb-4">{t('gallery.image')}</h1>
        </div>

        {error && (
          <div className="text-center text-red-500 mb-4">
            {error}
          </div>
        )}

        {photos.length === 0 && !loading && !error && (
          <div className="text-center text-gray-600">
            {t('gallery.nophoto')}
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              className="relative aspect-square overflow-hidden rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => openModal(index)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Image
                src={photo.image || "/placeholder.svg"}
                alt="gallery photo"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end" />
            </motion.div>
          ))}
        </div>

        {loading && (
          <div className="text-center mt-8">
            <div className="w-10 h-10 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin mx-auto"></div>
            <p className="text-gray-600 mt-2">{t('gallery.loading')}</p>
          </div>
        )}

        <AnimatePresence>
          {isModalOpen && selectedImageIndex !== null && (
            <ImageModal
              images={photos}
              currentIndex={selectedImageIndex}
              onClose={closeModal}
              onIndexChange={setSelectedImageIndex}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
