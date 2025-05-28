'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import './style.css';

import { Pagination } from 'swiper/modules';
import Product from '../Products/Product';
import { ProductsType } from '@/types';

const MobileProductSpecification = ({relatedProducts}:{relatedProducts:ProductsType[]}) => {
    return (
        <Swiper
            slidesPerView={1}
            spaceBetween={10}
            pagination={{
                clickable: true,
            }}
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
                    slidesPerView: 3,
                    spaceBetween: 40,
                }
            }}
            modules={[Pagination]}
            className="mySwiper"
        >

            {
               relatedProducts.map((product, index) => (
                        <SwiperSlide key={index}>
                            <Product product={product} />
                        </SwiperSlide>
                    ))
            }

        </Swiper>
    )
}

export default MobileProductSpecification