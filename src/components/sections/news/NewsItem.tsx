import { BlogType } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const NewsItem = ({ blog }: { blog: BlogType }) => {
    return (
        <Link href={`/news/${blog.slug}`}>
            <div className="bg-white rounded overflow-hidden border-[1px] border-gray-50 flex flex-col h-[420px]">
                <div className="relative w-full h-[250px] rounded-t-lg">
                    <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        className="object-cover"
                        style={{ objectFit: 'cover', borderRadius: '10px 10px 0 0' }}
                    />
                </div>
                <div className="p-4 px-5 flex flex-col flex-grow">
                    <h3 className="md:text-[24px] text-[20px] text-center font-title-500 text-[#0F172A] mb-2 line-clamp-2">
                        {blog.title}
                    </h3>
                    <p
                        className="text-[1rem] text-gray-600 mb-4 line-clamp-3 text-center flex-grow"
                        dangerouslySetInnerHTML={{ __html: blog.description }}
                    ></p>
                </div>
            </div>
        </Link>
    )
}

export default NewsItem