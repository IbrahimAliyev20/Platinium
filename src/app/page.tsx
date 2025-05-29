import AboutBanner from '@/components/sections/about/AboutBanner';
import VisionBanner from '@/components/sections/about/VisionBanner';
import Brands from '@/components/sections/home/Brands';
import ServiceBanner from '@/components/sections/home/ServiceBanner';
import NewsItems from '@/components/sections/news/NewsItems';
import HomeBanner from '@/components/shared/banner';
import CompaniesCarousel from '@/components/shared/companiesCarousel';
import StatsSection from '@/components/shared/StatsSection/StatsSection';
import { getBrands } from '@/lib/api-client/brands';
import { getHomeCategories } from '@/lib/api-client/home-categoires';
import { getStatistic } from '@/lib/api-client/statistic';
import Link from 'next/link';
import React from 'react';
import { getTranslations } from 'next-intl/server';
import TabProduct from '@/components/sections/products/Products/TabProduct';
import Brandsproduct from '@/components/sections/products/Products/Brandsproduct';

const Home = async () => {
  const t = await getTranslations();
  const categories = await getHomeCategories();
  const statistics = await getStatistic();
  const brands = await getBrands();

  return (
    <>
      <div>
        <HomeBanner />

          <div className='container mx-auto px-2 py-0 pt-10 md:pt-16'>
            <h2 className="sm:text-4xl text-3xl font-title-500 text-gray-900 mb-10 sm:ml-6 md:ml-0">{t('menu_titles.brands')}</h2>
            </div>
          <Brands brands={brands}  />
        
        <div className=' bg-white py-6 md:py-16'>
          <AboutBanner>
            <Link
              href='/about'
              className='bg-[#0f4c9f] text-white px-6 py-3 rounded-md transition-colors duration-300 inline-flex items-center'
            >
              {t('shared.more')}
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5 ml-2'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z'
                  clipRule='evenodd'
                />
              </svg>
            </Link>
          </AboutBanner>
        </div>
        <div className='py-6 md:py-16'>
          <StatsSection statistics={statistics} />
        </div>

        <div className='py-6 md:py-16'>
          <VisionBanner />
        </div>

        <div className='container mx-auto px-4 md:px-1 py-0 pt-10 md:py-6'>
          <h2 className='sm:text-4xl text-3xl font-title-500 text-gray-800 sm:mb-5 mb-3 text-left mx-auto md:px-6'>
            {t('menu_titles.clients')}
          </h2>
          <p className='mt-2 text-gray-600 sm:mb-5 mb-3 text-left mx-auto md:px-6'>{t('menu_titles.ourJourney')}</p>
        </div>
          <section className='w-full left-0 overflow-x-hidden'>
            <div className='  mb-20 md:mb-10'>
              <CompaniesCarousel direction='left' />
              <div className='mt-4'>
                <CompaniesCarousel direction='right' />
              </div>
            </div>
          </section>


        <div className='py-6 md:py-20'>
          <ServiceBanner categories={categories} />
        </div>

        <div className='container mx-auto px-0 md:px-1 py-8 md:py-16'>
          <h2 className='sm:text-4xl text-3xl font-title-500 text-gray-800 sm:mb-5 mb-3 text-left ml-4 mx-auto px-0 md:px-6'>
            {t('menu_titles.products')}
          </h2>
          <TabProduct 
            firstbtntitle={t('tabproduct.firstbtntitle')}
            lastbtntitle={t('tabproduct.lastbtntitle')}
            more = {t('shared.more')}
          />
        </div>

        <div className='container mx-auto px-4 md:px-6 py-8 md:py-16'>
          <h2 className='sm:text-4xl text-3xl font-title-500 text-gray-800 sm:mb-5 mb-3 text-left ml-0 md:ml-4 mx-auto px-0 md:px-6'>
            {t('menu_titles.specialbrands')}
          </h2>
          <Brandsproduct />
        </div>
      
        <div className='py-10'>
          <NewsItems />
        </div>
      </div>
    </>
  );
};

export default Home;