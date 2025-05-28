import React from 'react'
import Product from './Product'
import { ProductsType } from '@/types'
import { useTranslations } from 'next-intl'

const ProductList = ({ products }: { products: ProductsType[] }) => {

    const t = useTranslations()

    return (
        <section>
            <div className="lg:container mx-auto lg:px-[13px] pt-3">


                {products.length === 0 ? (
                    <div className='text-center mt-[100px] text-2xl flex items-center justify-center'>
                        {t('products.noProducts')}
                    </div>
                ) : products.length === 1 ? (
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">                        <Product product={products[0]} />
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                        {products.map((product, index) => (
                            <Product key={index} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

export default ProductList
