import AboutBanner from '@/components/sections/about/AboutBanner';
import FaqSection from '@/components/sections/about/FaqSection';
import VisionBanner from '@/components/sections/about/VisionBanner';
import CompaniesCarousel from '@/components/shared/companiesCarousel';
import StatsSection from '@/components/shared/StatsSection/StatsSection';
import { getStatistic } from '@/lib/api-client/statistic';
import { getTranslations } from 'next-intl/server';
import { getMetaData } from '@/lib/api-client/metadata';
import { MetaData } from '@/types';

export async function generateMetadata() {
  const metaData: MetaData[] = await getMetaData();

  const aboutMeta = metaData.find((meta) => meta.title.toLowerCase() === 'about') || {
    meta_title: 'About - Platinium-17',
    meta_description: 'Learn more about Platinium-17 and our professional kitchen equipment services.',
    meta_keywords: 'about, Platinium-17, kitchen equipment',
  };

  return {
    title: aboutMeta.meta_title,
    description: aboutMeta.meta_description,
    keywords: aboutMeta.meta_keywords,
    openGraph: {
      title: aboutMeta.meta_title,
      description: aboutMeta.meta_description,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/about`,
      type: 'website',
    },
  };
}

const About = async () => {
  const statistics = await getStatistic();
  const t = await getTranslations();


  return (
    <div>
      <div className="sm:py-12 py-6 md:py-14">
        <AboutBanner />
      </div>
      <div className="md:py-10 py-2">
        <VisionBanner />
      </div>
      <div className="pt-16">
        <StatsSection statistics={statistics} />
      </div>
      <div className="pb-[400px] mb-2">
        <section id="companies-section" className="py-15 w-full absolute left-0">
          <div className="mb-7 sm:ml-6 pl-7 md:pl-30">
            <h2 className="sm:text-4xl text-3xl font-title-500 text-gray-900">{t('menu_titles.clients')}</h2>
            <p className="mt-2 text-gray-600">{t('menu_titles.ourJourney')}</p>
          </div>
          <div className="w-full mx-auto">
            <CompaniesCarousel direction="left" />
            <div className="mt-1">
              <CompaniesCarousel direction="right" />
            </div>
          </div>
        </section>
      </div>
      <FaqSection />
    </div>
  );
};

export default About;