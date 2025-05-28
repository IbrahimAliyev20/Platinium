import { BrandsType } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Brand = ({ brand }: { brand: BrandsType }) => {
    const {  title, image, slug } = brand
    return (
        <Link
            href={`/products?brand_id=${slug}`}
            className="flex items-center justify-between py-2 group hover:bg-gray-50 rounded-lg transition-colors px-2"
        >
            <div className="flex items-center gap-3">
                <div className="w-[70px] h-12 relative object-cover">
                    <Image
                        src={image && image!='null'? image: '/assets/placeholder'}
                        alt='category image'
                        fill
                        style={{objectFit:"contain",}}
                    />
                </div>
                <span className="text-gray-700 group-hover:text-gray-900 transition-colors">{title}</span>
            </div>
            {/* <div className="bg-green-100 text-green-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium">
                {count}
            </div> */}
        </Link>
    )
}

export default Brand