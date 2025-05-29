import { getPortfolios } from '@/lib/api-client/portfolios'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const PortfolioList = async() => {
const portfolios=await getPortfolios()
    return (
        <div>
            <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6'>
                {
                    portfolios
                        .map((portfolio, index) => (
                            <Link key={index} href={`portfolio/${portfolio.slug}`}>
                            <div >
                                <div style={{ width: '100%', height: '300px', position: 'relative', borderRadius: "15px" }}>
                                    <Image
                                        src={portfolio.image}
                                        alt={`/porfolio/${index}`}
                                        fill
                                        style={{ objectFit: 'cover', borderRadius: "15px" }}
                                    />
                                </div>
                                <div className='text-center py-3 text-xl font-title-500 text-[#253D47] w-[80%] mx-auto'>{portfolio.title}</div>

                            </div>
                            </Link>
                        ))
                }
            </div>

        </div>
    )
}

export default PortfolioList