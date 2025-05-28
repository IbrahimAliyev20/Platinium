import Image from 'next/image'
import React from 'react'
import BrandsSlider from '../products/Brands/BrandsSlider'
import { BrandsType } from '@/types'
// import { getTranslations } from 'next-intl/server'



const Brands = async ({ brands }: { brands: BrandsType[] }) => {
    // const t = await getTranslations();



    return (
        <section>
            <div >
                
                {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 items-center justify-items-center"> */}

                {brands.length > 5
                    ?
                    <BrandsSlider brands={brands} direction='right' />
                    :
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 items-center justify-items-center">
                       {
                         brands.map((brand, index) => (
                        <div key={index} className="w-full max-w-[160px] flex items-center justify-center">
                            <div className="relative h-12 w-full ">
                                <Image
                                    src={brand.image && brand.image != 'null' ? brand.image : '/assets/placeholder.png'}
                                    alt={brand.title || 'brand'}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                        ))
                       }
                    </div>
                }
            </div>
            <div className='pb-16'>
                
                {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 items-center justify-items-center"> */}

                {brands.length > 5
                    ?
                    <BrandsSlider brands={brands} direction='rihgt' />
                    :
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 items-center justify-items-center">
                       {
                         brands.map((brand, index) => (
                        <div key={index} className="w-full max-w-[160px] flex items-center justify-center">
                            <div className="relative h-12 w-full ">
                                <Image
                                    src={brand.image && brand.image != 'null' ? brand.image : '/assets/placeholder.png'}
                                    alt={brand.title || 'brand'}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                        ))
                       }
                    </div>
                }
            </div>
        </section>
    )
}

export default Brands