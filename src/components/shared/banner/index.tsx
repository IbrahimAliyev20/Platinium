'use client'

import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

import './style.css';

import { Navigation } from 'swiper/modules';
import Image from 'next/image';
import { BannerType } from '@/types';
import { useLocale } from 'next-intl';

const HomeBanner = () => {


  const [banners, setBanners] = useState<BannerType[] | []>([])
    const locale = useLocale();
  

  useEffect(() => {
    (async () => {
      const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/hero`,{
        headers: { 'Accept-Language': locale },

      })
      const banners = await data.json()
      setBanners(banners.data)
    })()
  }, [locale])

  return (
    <div className='banner'>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {
          banners.map((banner, index) => (
            <SwiperSlide key={index}>
              <div className='image-container relative md:w-full lg:h-[500px] md:h-[500px] h-[230px] '>
                <Image
                  fill
                  src={banner.image}
                  alt={banner.title}
                  sizes='100vw'
                  style={{ objectFit: 'cover' }}
                />
                {/* <div className="absolute inset-0 bg-blue-900/60 z-10 rounded-2xl"></div> */}


                {/* <div className='absolute top-[40%] z-20  sm:left-[5%] left-[15%]  lg:text-[50px] sm:text-[40px] text-[30px] lg:w-[40%] sm:w-[60%] w-[80%]  text-left text-white font-title-500 md:leading-[50px] sm:leading-[40px] leading-[30px]'>
                  {banner.title}
                  </div> */}
              </div>
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  )
}

export default HomeBanner