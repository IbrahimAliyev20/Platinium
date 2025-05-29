import PortfolioList from '@/components/sections/portfolio/PortfolioList';
import PageHeader from '@/components/shared/pageHeader';
import { getTranslations } from 'next-intl/server';
import { getMetaData } from '@/lib/api-client/metadata';
import { MetaData } from '@/types';

export async function generateMetadata() {
  const metaData: MetaData[] = await getMetaData();
  const t = await getTranslations();

  const portfolioMeta = metaData.find((meta) => meta.title.toLowerCase() === 'portfolio') || {
    meta_title: t('portfolio.meta_title') || 'Portfolio - Platinium-17',
    meta_description: t('portfolio.meta_description') || 'Explore our portfolio of professional kitchen equipment projects at Platinium-17.',
    meta_keywords: t('portfolio.meta_keywords') || 'portfolio, Platinium-17, kitchen equipment',
  };

  return {
    title: portfolioMeta.meta_title,
    description: portfolioMeta.meta_description,
    keywords: portfolioMeta.meta_keywords,
    openGraph: {
      title: portfolioMeta.meta_title,
      description: portfolioMeta.meta_description,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/portfolio`,
      type: 'website',
    },
  };
}

const Portfolio = async () => {
  const t = await getTranslations();

  return (
    <div>
      <PageHeader title={t('portfolio.title')} link={t('portfolio.breadcrumb')} />
      <div className="container mx-auto py-16 px-6">
        <PortfolioList />
      </div>
    </div>
  );
};

export default Portfolio;