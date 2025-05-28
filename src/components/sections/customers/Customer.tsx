import { ClientsType } from '@/types'
import Image from 'next/image'
import React from 'react'

const Customer = ({ client }: { client: ClientsType }) => {
    return (
        <div>
            <div className='w-full h-[100px] relative'>
                <Image
                    src={client.image}
                    fill
                    alt='logo'
                    className='object-contain'
                />
            </div>
        </div>
    )
}

export default Customer