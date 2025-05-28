
import { Vendors } from '@/types'
import { useTranslations } from 'next-intl';
// import { getTranslations } from 'next-intl/server';
import Link from 'next/link'
import React from 'react'
import { IoHomeOutline } from "react-icons/io5";
import { LuChevronRight } from "react-icons/lu";




const PageHeader =  ({ title, link, subLink = '' }: Vendors) => {
    // const t = await getTranslations();
    const t = useTranslations();
    return (
        <div className='bg-[#d8e1ed] w-full  md:h-[200px] h-[150px] rounded-2xl relative px-4 sm:px-6 lg:px-[40px]'>
            <div className='absolute top-1/2 left-[5%] -translate-y-1/2  w-auto max-w-[90%] sm:max-w-none'>
                <h1 className='text-2xl sm:text-3xl lg:text-4xl font-title-500 '>{title}</h1>
                <div className='mt-2 sm:mt-4 flex items-center gap-2 flex-wrap'>
                    <Link href='/' className='text-[#0f4c9f] flex items-center gap-1 text-sm sm:text-base'>
                        <IoHomeOutline />
                        <span>{t('menu.home')}</span>
                    </Link>
                    <LuChevronRight className='text-xs sm:text-sm' />
                    <div className='text-sm sm:text-base text-gray-600  font-title-500'>{link}</div>

                    {subLink && <LuChevronRight className='text-xs sm:text-sm' />}
                    {subLink && <div className='text-sm sm:text-base text-gray-600  font-title-500'>{subLink}</div>}
                </div>
            </div>
        </div>
    )
}

export default PageHeader