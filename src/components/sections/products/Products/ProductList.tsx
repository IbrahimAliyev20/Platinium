"use client"

import React, { useState, useEffect } from 'react'
import Product from './Product'
import { ProductsType } from '@/types'
import { useTranslations } from 'next-intl'

const ProductList = ({ products }: { products: ProductsType[] }) => {

    const t = useTranslations()
    const [visibleCount, setVisibleCount] = useState(8);

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >= document.body.offsetHeight - 300 &&
                visibleCount < products.length
            ) {
                setVisibleCount((prev) => Math.min(prev + 4, products.length));
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [visibleCount, products.length]);

    const visibleProducts = products.slice(0, visibleCount);

    return (
        <section>
            <div className="lg:container mx-auto  pt-3">
                {products.length === 0 ? (
                    <div className='text-center mt-[100px] text-2xl flex items-center justify-center'>
                        {t('products.noProducts')}
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                        {visibleProducts.map((product, index) => (
                            <Product key={index} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

export default ProductList
