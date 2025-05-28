import NewsDetailFooter from '@/components/sections/news/NewsDetailFooter';
import { getSingleBlog } from '@/lib/api-client/blogs';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import React from 'react';

// TYPES
type NewsDetailsParams = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: NewsDetailsParams) {
  const resolvedParams = await params;
  const news = await getSingleBlog(resolvedParams.slug);

  return {
    title: news?.meta_title || news?.title,
    description: news?.meta_description || news?.description?.slice(0, 150),
    keywords: news?.meta_keywords || news?.title,
    openGraph: {
      title: news?.meta_title || news?.title,
      description: news?.meta_description || news?.description?.slice(0, 150),
      images: [
        {
          url: news?.image,
          alt: news?.title,
        },
      ],
    },
    twitter: {
      title: news?.meta_title || news?.title,
      description: news?.meta_description || news?.description?.slice(0, 150),
      images: [news?.image],
    },
  };
}

const NewsDetails = async ({ params }: NewsDetailsParams) => {
  const { slug } = await params;
  const news = await getSingleBlog(slug);
  const post_date = new Date(news?.created_at || Date.now());
  const current_date = new Date();
  const timeDifference = Math.floor((current_date.getTime() - post_date.getTime()) / (1000 * 60 * 60 * 24));
  const t = await getTranslations();

  return (
    <div className='lg:px-20 md:px-12 sm:8 pb-16 pt-12'>
      <div>
        <h1 className='md:text-3xl text-2xl font-title-500 lg:px-20 md:px-14 sm:px-6 text-[#253D47]'>{news?.title}</h1>
        <div className='lg:px-20 md:px-14 sm:px-6 py-6 flex items-center gap-2 text-gray-400'>
          <span>{timeDifference > 0 ? `${t('date.daysAgo', { count: timeDifference })}` : "Today"}</span>
        </div>
        <div style={{ width: "100%", height: "500px", position: "relative", borderRadius: "15px" }}>
          <Image
            src={news?.image || ''}
            alt='news'
            fill
            style={{ objectFit: "cover", borderRadius: "15px" }}
          />
        </div>
        <div
          className='lg:px-20 md:px-14 py-5 text-[#253D47] sm:px-6'
          dangerouslySetInnerHTML={{ __html: news?.description || '' }}
        />
      </div>

      <div className='text-[#253D47] lg:px-20 md:px-14 sm:px-6'>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-5 px-4">
          <div className='w-full aspect-[4/3] relative rounded-[15px] overflow-hidden'>
            <Image
              src={news?.image || '/assets/images/default-image.png'}
              alt="news"
              fill
              className="object-cover rounded-[15px]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>

      <div className='pt-20 lg:px-20 md:px-14 sm:px-6'>
        <NewsDetailFooter tags={news?.tags} />
      </div>
    </div>
  );
};

export default NewsDetails;
