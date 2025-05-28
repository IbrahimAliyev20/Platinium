import { getWhyUs } from '@/lib/api-client/whyUs'
import { getTranslations } from 'next-intl/server';
import React from 'react'


const VisionBanner =async () => {
    const t = await getTranslations();


    const features= await getWhyUs()


    return (
        <section id='vision-section' className="container mx-auto px-4 md:px-6 ">
            <h1 className="sm:text-3xl text-2xl md:text-4xl text-center font-title-500  text-gray-800 sm:mb-14 mb-8">{t('menu_titles.whyChooseUs')}</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                    <div key={index} className='bg-white border border-gray-300  px-5 py-10 rounded-xl'>
                        <h2 className="sm:text-xl text-[25px] font-title-500 text-gray-800 mb-4 text-center">{feature.title}</h2>
                        <p className="text-gray-600 text-center ms:text-md text-[16px]">{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default VisionBanner