'use client'

import React from 'react'
import { FiFacebook } from "react-icons/fi";
import { FaTwitter, FaInstagram } from "react-icons/fa";
import { usePathname } from 'next/navigation';

const NewsDetailFooter = ({ tags }: { tags: string[] | undefined }) => {
  const pathname = usePathname();
  const fullUrl = typeof window !== 'undefined' 
    ? `${process.env.NEXT_PUBLIC_SITE_URL}${pathname}` 
    : '';

    console.log(fullUrl)

  return (
    <div className='flex items-center justify-between'>
      <div className='flex items-center md:gap-5 gap-3 text-white'>
        {tags?.map((tag, index) => (
          <div key={index} className='bg-[#0f4c9f] md:py-3 md:px-3 py-2 px-2 rounded-md'>{tag}</div>
        ))}
      </div>
      <div className='flex items-center'>
        <span className='text-gray-400'>Share This:</span>
        <div className='flex items-center gap-2 ml-4'>
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`} target="_blank" rel="noopener noreferrer">
            <FiFacebook color='gray' />
          </a>
          <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}`} target="_blank" rel="noopener noreferrer">
            <FaTwitter color='gray' />
          </a>
          <a href={`https://www.instagram.com/`} target="_blank" rel="noopener noreferrer">
            <FaInstagram color='gray' />
          </a>
        </div>
      </div>
    </div>
  )
}

export default NewsDetailFooter;
