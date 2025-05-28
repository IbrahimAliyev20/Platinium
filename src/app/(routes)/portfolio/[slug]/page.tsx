
import PageHeaderLinks from '@/components/shared/pageHeaderLinks'
import React from 'react'
import Image from 'next/image'
import PortfolioDetailSlider from '@/components/sections/portfolio/PortfolioDetailSlider'
import { getSinglePortfolio } from '@/lib/api-client/portfolios';
import { getTranslations } from 'next-intl/server';



type PortfoliosProps = {
  params: Promise<{ slug: string }>;
};



export async function generateMetadata({ params }: PortfoliosProps) {
  const { slug } = await params

  const portfolio = await getSinglePortfolio(slug);

  return {
    title: portfolio?.meta_title || portfolio?.title,
    description: portfolio?.meta_description || portfolio?.description?.slice(0, 150),
    keywords: portfolio?.meta_keywords || portfolio?.title,
    openGraph: {
      title: portfolio?.meta_title || portfolio?.title,
      description: portfolio?.meta_description || portfolio?.description?.slice(0, 150),
      images: [
        {
          url: portfolio?.image,
          alt: portfolio?.title,
        },
      ],
    },
    twitter: {
      title: portfolio?.meta_title || portfolio?.title,
      description: portfolio?.meta_description || portfolio?.description?.slice(0, 150),
      images: [portfolio?.image],
    },
  };
}


const PortfolioDetails = async ({ params }: PortfoliosProps) => {

  const { slug } = await params
  const portfolio = await getSinglePortfolio(slug)
  const t = await getTranslations();





  return (
    <div>
      <PageHeaderLinks title={t('portfolio.title')} link={portfolio?.title} />
      <div className='py-16 '>
        <div>
          {/* <h2 className='text-[#0f4c9f] font-title-500 lg:px-20 md:px-14 sm:px-6'>Recipes</h2> */}
          <h1 className=' md:text-3xl text-2xl font-title-500 py-3 mb-5 lg:px-20 md:px-14  sm:px-6'>{portfolio?.title}</h1>
          <div style={{ width: "100%", height: "400px", position: "relative", borderRadius: "15px" }}>
            <Image
              src={portfolio?.image && portfolio?.image != 'null' ? portfolio.image : ""}
              alt='reciept'
              fill
              style={{ objectFit: "cover",  }}
            />
          </div>
          <div className=' lg:px-20 md:px-14  py-5  sm:px-6'
            dangerouslySetInnerHTML={{ __html: portfolio?.description || '' }}
          >

          </div>
        </div>
      </div>
      <div className='lg:px-20 md:px-14  py-5  sm:px-6'>
        {portfolio?.images && portfolio?.images?.length > 6 ? <PortfolioDetailSlider images={portfolio?.images} /> : (
          <div className='grid md:grid-cols-4 gap-5 sm:grid-cols-3 grid-cols-1'>
            {
              portfolio?.images.map((item, index) => (
                <div key={index} className='image-container relative md:w-full h-[200px]'>
                  <Image
                    fill
                    src={item.image && item.image != 'null' ? item.image : ""}
                    alt={`portfolio image`}
                    sizes='100vw'
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              ))
            }
          </div>
        )}
      </div>
    </div>
  )
}

export default PortfolioDetails