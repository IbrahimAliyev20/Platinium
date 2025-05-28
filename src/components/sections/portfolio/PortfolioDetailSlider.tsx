'use client'

import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import './style.css'
import { Navigation } from 'swiper/modules'
import Image from 'next/image'
import { FaArrowRight, FaArrowLeft  } from "react-icons/fa";
import { PortfolioImageType } from '@/types'



const PortfolioDetailSlider = ({images}:{images:PortfolioImageType[] | undefined}) => {
    const swiperRef = useRef<SwiperType | null>(null)

    return (
        <div className='relative portfolio '>
            <button
                className='absolute flex items-center justify-center rounded-full top-[50%] -translate-y-[50%] -left-2 z-40 w-10 h-10 bg-white'
                onClick={() => swiperRef.current?.slidePrev()}
            >
               <FaArrowLeft color='gray' />
            </button>
            <button
                className='absolute flex items-center justify-center rounded-full top-[50%] -translate-y-[50%] -right-2 z-40 w-10 h-10 bg-white'
                onClick={() => swiperRef.current?.slideNext()}
            >
                <FaArrowRight color='gray' />
            </button>

            <Swiper
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                slidesPerView={4}
                spaceBetween={30}
                modules={[Navigation]}
                className="mySwiper"
                breakpoints={{
                    320: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 5,
                        spaceBetween: 20,
                    },
                }}
            >
                {images?.map((_, index) => (
                    <SwiperSlide key={index}>
                        <div className='image-container relative md:w-full h-[200px]'>
                            <Image
                                fill
                                src='/assets/images/home-banner.jpg'
                                alt={`banner${index}`}
                                sizes='100vw'
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default PortfolioDetailSlider
