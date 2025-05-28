'use client'
import { ProductsType } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import { IoEyeOutline, IoClose } from "react-icons/io5"
import ProductSlider from '../ProductDetails/ProductSlider'
import ProductInfo from '../ProductDetails/ProductInfo'
import { useTranslations } from 'next-intl'

const Product = ({ product }: { product: ProductsType }) => {
    const [showModal, setShowModal] = useState(false)
    const t = useTranslations();
    const modalRef = useRef<HTMLDivElement | null>(null)

    const openModal = () => setShowModal(true)
    const closeModal = () => setShowModal(false)

    useEffect(() => {
        document.body.style.overflow = showModal ? 'hidden' : ''
    }, [showModal])

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setShowModal(false)
            }
        }

        if (showModal) {
            document.addEventListener('keydown', handleEsc)
        }

        return () => {
            document.removeEventListener('keydown', handleEsc)
        }
    }, [showModal])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setShowModal(false)
            }
        }

        if (showModal) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [showModal])

    const ModalContent = () => (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
            <div ref={modalRef} className="relative bg-white max-w-5xl w-full max-h-[90vh] min-h-[75vh] p-6 rounded-lg shadow-lg overflow-y-auto">
                <button
                    onClick={closeModal}
                    className="absolute cursor-pointer top-3 z-40 right-3 text-gray-500 hover:text-black transition-colors"
                >
                    <IoClose size={24} />
                </button>

                <div className='flex flex-col md:flex-row items-start gap-6 h-full'>
                    <div className='w-full md:w-1/2 h-[400px] md:h-auto'>
                        <ProductSlider images={product.images} image={product.image} isModal={true}  />
                    </div>
                    <div className='w-full md:w-1/2 flex flex-col'>
                        <ProductInfo product={product} modal={showModal} setShowModal={setShowModal} />
                        <div className="mt-auto cursor-pointer">
                            <Link href={`/products/${product.slug}`} className="inline-block mt-3 sm:text-md text-sm">
                                <button className="w-full py-2 px-4 whitespace-nowrap bg-blue-100 text-[#082854] hover:bg-[#1f4b9c] hover:text-white rounded-lg transition-colors duration-200 flex items-center justify-center cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="sm:h-5 sm:w-5 h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    {t('buttons.viewDetails')}
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <>
            {showModal && createPortal(<ModalContent />, document.body)}

            <div className="bg-white rounded shadow-sm border h-[370px] border-gray-100 overflow-hidden">
                <div className="p-4 flex flex-col h-full">
                    <div className="relative w-full h-48 mb-4 flex items-center justify-center  rounded-xl group overflow-hidden">
                        <Image
                            src={product.thumb_image && product.thumb_image !== 'null' ? product.thumb_image : '/assets/placeholder.png'}
                            alt="product"
                            fill
                            className="object-contain transition-transform duration-300 ease-in-out group-hover:scale-110"
                            priority
                        />

                        <div
                            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/70 z-20 cursor-pointer"
                            onClick={openModal}
                        >
                            <IoEyeOutline size={26} className="text-gray-800" />
                        </div>
                    </div>

                    <div className="flex flex-col flex-grow">
                        <Link href={`/products?category_id=${product.slug}`} className="text-gray-400 text-[12px] mb-1">{product.category}</Link>
                        <Link href={`/products/${product.slug}`} className="text-gray-800 font-medium md:text-[14px] text-md mb-1 leading-tight line-clamp-2">
                            {product.name}
                        </Link>
                        <p className="text-gray-500 text-sm mb-4">
                            {t('filters.by')} <Link href={`/products?brand_id=${product.brand_slug}`} className='text-[#082854]'>{product.brand}</Link>
                        </p>

                        <div className="mt-auto cursor-pointer">
                            <Link href={`/products/${product.slug}`} className="block sm:text-md text-sm">
                                <button className="md:w-[100%] w-full py-2 px-4 whitespace-nowrap bg-blue-100 text-[#082854] hover:bg-[#1f4b9c] hover:text-white rounded-sm transition-colors duration-200 flex items-center justify-center cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="sm:h-5 sm:w-5 h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    {t('buttons.viewDetails')}
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Product