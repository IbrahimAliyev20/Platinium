import { getFooterAttribute } from '@/lib/api-client/footerAttribute'
import Image from 'next/image'
import React from 'react'

const TopFooter = async () => {

    const attributes = await getFooterAttribute()

    return (
        <div className='container mx-auto w-full py-6 md:block hidden' >
            <div className=" mx-auto px-4">
                <div className="flex items-center justify-center gap-4">
                    {/* Best prices & offers */}

                    {
                        attributes.map((attribute, index) => (
                            <div key={index} className="flex items-center gap-3 bg-white p-4 rounded-lg">
                                <div className="flex-shrink-0 w-10 h-10 bg-green-100/50 rounded-full flex items-center justify-center relative">
                                    <Image
                                        src={attribute.image}
                                        alt='attribute'
                                        fill
                                    />
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-900">{attribute.title}</h3>
                                    <p className="text-[16px] text-gray-500">{attribute.description}</p>
                                </div>
                            </div>
                        ))
                    }


                </div>
            </div>
        </div>
    )
}
export default TopFooter