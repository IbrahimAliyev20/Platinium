import { SettingsType } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = ({settings}:{settings:SettingsType}) => {
    return (

        <div className='sm:w-[180px] sm:h-[90px] w-[130px] h-[70px]     relative logo object-contain' >
            <Link href='/'>
            <Image
                src={settings.favicon}
                alt='logo'
                width={170}
                height={170}
            />
            </Link>
        </div>

    )
}

export default Logo