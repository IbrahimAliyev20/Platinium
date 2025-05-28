import { SocialLinksType } from '@/types';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

// import { CiPhone } from "react-icons/ci";




const SubFooter = async ({ socialLinks }: { socialLinks: SocialLinksType[] }) => {
    const t = await getTranslations();


    return (
        <div className=" pt-6 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center">
                {/* Copyright */}
                <div className="mb-4 md:mb-0">
                    <Link href="https://markup.az/" target='_blank' className="text-sm text-gray-500">
                    {t('footer.allRightsReserved')}    {t('footer.copyright')}
                    </Link>
                    {/* <p className="text-sm text-gray-500"></p> */}
                </div>

                {/* Phone Numbers */}
                {/* <div className="flex flex-col md:flex-row items-center gap-4 mb-4 md:mb-0">
                    <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-2">
                            <CiPhone className="h-5 w-5 text-[#0f4c9f]" />
                        </div>
                        <div>
                            <p className="font-medium text-[#0f4c9f]">1900 - 6666</p>
                            <p className="text-xs text-gray-500">Working 8:00 - 22:00</p>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-2">
                            <CiPhone className="h-5 w-5 text-[#0f4c9f]" />
                        </div>
                        <div>
                            <p className="font-medium text-[#0f4c9f]">1900 - 8888</p>
                            <p className="text-xs text-gray-500">24/7 Support Center</p>
                        </div>
                    </div>
                </div> */}

                {/* Social Media & Subscribe */}
                <div className="flex flex-col items-center md:items-end pb-5">
                    <div className="mb-2 flex  items-center gap-2">
                        <p className="text-sm font-medium text-gray-700 ">{t('menu_titles.followUs')}</p>
                        <div className="flex space-x-2">
                            {socialLinks.map((social, index) => (
                                <a
                                    target='_blank'
                                    key={index}
                                    href={`${social.link}`}
                                    className={` text-white p-2 rounded-full hover:opacity-90 transition-opacity`}
                                >
                                    <div className='w-7 h-7 relative rounded-full '>
                                        <Image
                                            src={social.thumb_image}
                                            alt={social.name}
                                            fill
                                            className='rounded-full'

                                        />
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SubFooter