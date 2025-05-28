import { BrandsType } from '@/types'
import Image from 'next/image'
import React from 'react'

const HomeBrands = ({ brands }: { brands: BrandsType[] }) => {
    return (
        <div className='flex items-start justify-between gap-10'>
            {brands.slice(2, 4).map(item => (
                <div key={item.id} className='w-full'>
                    <div className='w-[100%] h-[300px] relative'>
                        <Image
                            src={(item.image && item.image != 'null') ? item.image : ""}
                            alt={item.title}
                            className='object-contain'
                            fill
                        />
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                </div>
            ))}
        </div>
    )
}

export default HomeBrands