import { Portfolio } from '@/types'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import React from 'react'
import { IoHomeOutline } from 'react-icons/io5'
import { LuChevronRight } from 'react-icons/lu'

const PageHeaderLinks = ({ title, link }: Portfolio) => {

    const t = useTranslations();

    return (
        <div>
            <div className='flex items-center gap-2'>
                <Link href='/' className='text-[#0f4c9f] flex items-center gap-1 text-[10px] sm:text-base'>
                    <IoHomeOutline />
                    <span>{t('menu.home')}</span>
                </Link>
                <LuChevronRight className='text-xs sm:text-sm' />
                <div className='text-[#0f4c9f] text-[10px]'>{title}</div>
                <LuChevronRight className='text-xs sm:text-sm' />
                <div className='text-[10px] sm:text-base text-gray-600  font-title-500'>{link}</div>
            </div>
        </div>
    )
}

export default PageHeaderLinks