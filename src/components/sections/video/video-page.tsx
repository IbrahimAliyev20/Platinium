"use client"

import { FaPlay } from "react-icons/fa";


import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import ImageModal from "./video-modal"
import { MediaType } from "@/types"
import { useTranslations } from "next-intl";



export default function VideoPage({ videos }: { videos: MediaType[] }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const t = useTranslations();


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

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-title-500 text-gray-900 mb-4">{t('gallery.video')}</h1>
        
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {videos.map((video, index) => (

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

              <div className="absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2   p-3 bg-white rounded-full z-[1]   "> <FaPlay /></div>
              <Image
                src={video.image || "/placeholder.svg"}
                alt='video'
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
              </div>
            </motion.div>

          ))}
        </div>

        {/* Image Modal with Slider */}
        <AnimatePresence>
          {isModalOpen && selectedImageIndex !== null && (
            <ImageModal
              videos={videos}
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
