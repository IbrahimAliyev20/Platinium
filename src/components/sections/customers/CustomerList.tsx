import React from 'react'
import Customer from './Customer'
import { ClientsType } from '@/types'
import Link from 'next/link'

const CustomerList = ({ clients }: { clients: ClientsType[] }) => {
    return (
        <div>
            <div className='grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 gap-3 lg:px-20 md:px-15 px-5'>
                {
                   clients.map((client, index) => (

                        <Link target='_blank' key={index} href={client.link} className="m-10"> <Customer  client={client} /></Link>
                        ))
                }
            </div>
        </div>
    )
}

export default CustomerList