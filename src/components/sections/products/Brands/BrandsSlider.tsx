'use client'

import React, { useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import AutoScroll from 'embla-carousel-auto-scroll'
import Image from 'next/image'
import { BrandsType } from '@/types'
import './embla.css'

const BrandsSlider = ({ brands, direction = 'right' }: { brands: BrandsType[] | undefined, direction?: string }) => {
  const options = {
    loop: true,
    speed: 2,
    align: 'center' as const,
    draggable: true,
  }

  const autoScrollOptions = {
    playOnInit: true,
    speed: direction === 'right' ? -1.3 : 1.3,
    stopOnInteraction: false,
  }

  const [emblaRef, emblaApi] = useEmblaCarousel(options, [AutoScroll(autoScrollOptions)])

  useEffect(() => {
    const autoScroll = emblaApi?.plugins()?.autoScroll
    if (!autoScroll) return

    emblaApi
      .on('autoScroll:play', () => {})
      .on('autoScroll:stop', () => {})
      .on('reInit', () => {})
  }, [emblaApi])

  return (
    <div className="embla relative w-full  py-2 brands" style={{ maxWidth: '2600px', margin: '0 auto' }}>
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {brands?.map((brand, index) => (
            <div className="embla__slide " key={index}>
              <div className="bg-white border border-gray-100 rounded-xl  w-36 h-24 flex items-center justify-center p-2">
                <div className="relative h-20 w-full">
                  <Image
                    src={brand.image && brand.image !== 'null' ? brand.image : '/assets/placeholder.png'}
                    alt={brand.title || 'brand'}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BrandsSlider