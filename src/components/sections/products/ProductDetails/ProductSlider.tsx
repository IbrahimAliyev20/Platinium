'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { Search } from "lucide-react"
import { ImagesType } from '@/types'

const ProductSlider = ({ images, image, isModal = false }: { images: ImagesType[], image: string, isModal?: boolean }) => {
    const [selectedImage, setSelectedImage] = useState<number>(0)
    const [isZoomed, setIsZoomed] = useState<boolean>(false)

    const handleThumbnailClick = (index: number) => {
        setSelectedImage(index)
        setIsZoomed(false)
    }

    const toggleZoom = () => {
        setIsZoomed(!isZoomed)
    }

    return (
        <div className={`flex flex-col ${isModal ? "fixed " : ""}`}>
            <div className="mb-4 bg-white rounded-lg overflow-hidden border border-gray-200">
                <button
                    onClick={toggleZoom}
                    className="absolute top-3 right-3 md:block hidden bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-colors z-50"
                    aria-label="Zoom image"
                >
                    <Search className="w-5 h-5 text-gray-700" />
                </button>

                <div
                    className={`relative w-full md:h-[400px] h-[200px] aspect-square cursor-pointer transition-all duration-300 ${isZoomed ? "scale-150" : "scale-100"}`}
                    onClick={toggleZoom}
                >
                    {
                        images[selectedImage]?.image ?
                            <Image
                                src={images[selectedImage]?.image || "/placeholder.svg"}
                                alt='image'
                                fill
                                className="object-contain p-4"
                                priority
                            /> : <Image
                                src={image || "/placeholder.svg"}
                                alt='product image'
                                fill
                                className="object-contain p-1"
                            />
                    }
                </div>
            </div>

            <div className="w-full max-w-[420px] mx-auto overflow-x-auto pb-2 mt-4">
                <div className="flex space-x-2">
                    {images ? images.map((data, index) => (
                        <button
                            key={index}
                            onClick={() => handleThumbnailClick(index)}
                            className={`relative min-w-[72px] h-[72px] rounded-lg overflow-hidden border-2 transition-all ${selectedImage === index ? "border-green-500 shadow-md" : "border-gray-200 hover:border-gray-300"}`}
                            aria-label={`View ${index}`}
                            aria-current={selectedImage === index ? "true" : "false"}
                        >
                            <Image
                                src={data.image || "/placeholder.svg"}
                                alt='product image'
                                fill
                                className="object-contain p-1"
                                sizes="72px"
                            />
                        </button>
                    )) : <Image
                        src={image && image != 'null' ? image : "/placeholder.svg"}
                        alt='product image'
                        fill
                        className="object-contain p-1"
                        sizes="72px"
                    />}
                </div>
            </div>
        </div>
    )
}

export default ProductSlider