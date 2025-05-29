"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ThumbnailSliderProps {
  images: {
    id: number;
    src: string;
    alt: string;
  }[];
  currentIndex: number;
  onThumbnailClick: (index: number) => void;
}

export default function ThumbnailSlider({
  images,
  currentIndex,
  onThumbnailClick,
}: ThumbnailSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto mt-4">
      <button
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-1 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
        onClick={scrollLeft}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <div
        ref={sliderRef}
        className="flex overflow-x-auto scrollbar-hide space-x-2 py-2 px-8"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`flex-shrink-0 w-16 h-16 relative cursor-pointer rounded-md overflow-hidden transition-all duration-200 ${
              currentIndex === index
                ? "ring-2 ring-orange-500 scale-110"
                : "opacity-70 hover:opacity-100"
            }`}
            onClick={() => onThumbnailClick(index)}
          >
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              fill
              sizes="64px"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <button
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-1 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
        onClick={scrollRight}
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
