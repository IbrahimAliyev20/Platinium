'use client'

import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import './style.css'
import { Navigation } from 'swiper/modules'
import Image from 'next/image'
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import {  ProductsType } from '@/types'
import Link from 'next/link'
import { useTranslations } from 'next-intl'



const RelatedProductsSlider = ({ relatedProducts }: { relatedProducts: ProductsType[] | undefined }) => {
    const swiperRef = useRef<SwiperType | null>(null)

    const t = useTranslations();


    return (
        <div className='relative product'>
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
                {relatedProducts?.map((product, index) => (
                    <SwiperSlide key={index}>
                        <Link href={`/products/${product.slug}`} className="block sm:text-md text-sm">

                            <div className="p-4 flex flex-col h-full">
                                {/* Product Image */}
                                <div className="relative w-full h-48 mb-4 flex items-center justify-center bg-gray-50 rounded-xl">
                                    <Image
                                        src={product.image && product.image != 'null' ? product.image : '/assets/placeholder.png'}
                                        alt='product'
                                        width={150}
                                        height={150}
                                        className="object-contain"
                                        priority
                                    />
                                </div>


                                <div className="flex flex-col flex-grow">
                                    <span className="text-gray-400 text-[12px] mb-1">{product.category}</span>

                                    <h3 className="text-gray-800 font-medium md:text-[14px] text-md mb-1 leading-tight line-clamp-2"

                                    >
                                        {
                                            product.name
                                        }
                                    </h3>

                                    <p className="text-gray-500 text-sm mb-4">By <span className='text-[#082854]'>{product.brand}</span> </p>

                                    <div className="mt-auto cursor-pointer ">
                                        {/* <Link href={`/products/${product.slug}`} className="block sm:text-md text-sm"> */}
                                        <button className="md:w-[100%] w-full py-2 px-4 whitespace-nowrap bg-blue-100 text-[#082854] rounded-lg transition-colors duration-200 flex items-center justify-center cursor-pointer  ">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="sm:h-5 sm:w-5 h-4 w-4 mr-2"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                                />
                                            </svg>
                                            {t('buttons.viewDetails')}
                                        </button>
                                        {/* </Link> */}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default RelatedProductsSlider
