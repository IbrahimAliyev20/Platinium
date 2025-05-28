

import { getAbout } from '@/lib/api-client/about'
import Image from 'next/image'
import React, { ReactNode } from 'react'

const AboutBanner = async ({ children }: {children?:ReactNode}) => {

    const about = await getAbout()

    return (
        <section id='about-section' className="container mx-auto px-4 md:px-6 ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

                <div>
                    <h1 className="sm:text-3xl text-2xl md:text-4xl font-title-500 text-gray-800">{about.title}</h1>

                    <div className='flex flex-col gap-2 my-3 sm:text-md text-[16px]'
                        dangerouslySetInnerHTML={{
                            __html: about.description,
                        }}
                    >
                    </div>

                    {children}
                    {/* <div>
                        <Link href='/about' className="bg-[#0f4c9f] text-white px-6 py-3 rounded-md transition-colors duration-300 inline-flex items-center">
                            Daha çox
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 ml-2"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </Link>
                    </div> */}

                </div>

                <div className="relative h-full rounded-lg overflow-hidden shadow-xl">

                    <Image
                        src={about.image}
                        alt="Chefs working in a professional kitchen"
                        width={600}
                        height={400}
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>
            </div>
        </section>
    )
}

export default AboutBanner