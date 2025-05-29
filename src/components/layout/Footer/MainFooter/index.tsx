import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { getContact } from '@/lib/api-client/contact'
import { getCategories } from '@/lib/api-client/categories'
import { SettingsType } from '@/types'
import { getTranslations } from 'next-intl/server'

const MainFooter = async ({settings}:{settings:SettingsType}) => {
    const data = await getContact()
    const categories = await getCategories()
    const t = await getTranslations();

    return (
        <footer className="border-t border-gray-200 pt-10 pb-6 bg-white">
            <div className="container mx-auto px-6">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <div className="mb-6">
                            <Link href="/" className="inline-block">
                                <div className="flex items-center">
                                    <Image src={settings.favicon} alt="Nest" width={140} height={60} className="h-18 w-auto mb-4" />
                                </div>
                            </Link>
                            <h4>{data.footer_text}</h4>
                        </div>
                    </div>

                    {/* Company Links */}
                    <div className='ml-0 lg:ml-0 xl:ml-19'>
                        <h3 className="text-lg font-medium text-gray-900 mb-4 ">{t('footer.company')}</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/about" className="text-gray-600 hover:text-green-500 text-[16px] transition-colors">
                                    {t('menu.about')}
                                </Link>
                            </li>
                            <li>
                                <Link href="/products" className="text-gray-600 hover:text-green-500 text-[16px] transition-colors">
                                    {t('menu.categories')}
                                </Link>
                            </li>
                            <li>
                                <Link href="/portfolio" className="text-gray-600 hover:text-green-500 text-[16px] transition-colors">
                                    {t('menu.portfolio')}
                                </Link>
                            </li>
                            <li>
                                <Link href="/news" className="text-gray-600 hover:text-green-500 text-[16px] transition-colors">
                                    {t('menu.news')}
                                </Link>
                            </li>
                            <li>
                                <Link href="/gallery" className="text-gray-600 hover:text-green-500 text-[16px] transition-colors">
                                    {t('menu.submenus.photos')}
                                </Link>
                            </li>
                            <li>
                                <Link href="/videos" className="text-gray-600 hover:text-green-500 text-[16px] transition-colors">
                                    {t('menu.submenus.videos')}
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-gray-600 hover:text-green-500 text-[16px] transition-colors">
                                    {t('menu.contact')}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Corporate Links (Only Main Categories) */}
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">{t('footer.category')}</h3>
                        <ul className="space-y-3">
                            {
                                categories.map((category) => (
                                    <li key={category.id}>
                                        <Link href={`/products?category_id=${category.slug}`} className="text-gray-600 hover:text-green-500 text-[17px] transition-colors">
                                            {category.name}
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>

                    {/* Popular Links */}
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">{t('footer.information')}</h3>
                        <div className="space-y-3">
                            <div className="flex items-start">
                                <MapPin className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                                <p className="ml-2 text-gray-600 text-sm">
                                    <span className="font-medium">{t('topbar.addressLabel')}:</span> {data.address}
                                </p>
                            </div>
                            <div className="flex items-center">
                                <Phone className="h-5 w-5 text-gray-500 flex-shrink-0" />
                                <p className="ml-2 text-gray-600 text-sm">
                                    <span className="font-medium">{t('topbar.callUs')}</span> <a href="tel:+994708884582">{data.phone}</a>
                                </p>
                            </div>
                            <div className="flex items-center">
                                <Mail className="h-5 w-5 text-gray-500 flex-shrink-0" />
                                <p className="ml-2 text-gray-600 text-sm">
                                    <span className="font-medium">{t('topbar.email')}</span> <a href="mailto:info@platinium.az">{data.email}</a>
                                </p>
                            </div>
                            <div className="flex items-center">
                                <Clock className="h-5 w-5 text-gray-500 flex-shrink-0" />
                                <p className="ml-2 text-gray-600 text-sm">
                                    <span className="font-medium">{t('topbar.hours')}:</span> {data.working_hour}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Bottom Footer */}
            </div>
        </footer>
    )
}

export default MainFooter