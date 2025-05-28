import BrandCards from '@/components/sections/vendor/BrandCards';
import PageHeader from '@/components/shared/pageHeader';
import { getTranslations } from 'next-intl/server';
import { getMetaData } from '@/lib/api-client/metadata';
import { MetaData } from '@/types';

export async function generateMetadata() {
  const metaData: MetaData[] = await getMetaData();
  const t = await getTranslations();

  const vendorsMeta = metaData.find((meta) => meta.title.toLowerCase() === 'brands') || {
    meta_title: t('vendors.meta_title') || 'Brands - Platinium-17',
    meta_description: t('vendors.meta_description') || 'Discover our trusted brands for professional kitchen equipment at Platinium-17.',
    meta_keywords: t('vendors.meta_keywords') || 'brands, Platinium-17, kitchen equipment',
  };

  return {
    title: vendorsMeta.meta_title,
    description: vendorsMeta.meta_description,
    keywords: vendorsMeta.meta_keywords,
    openGraph: {
      title: vendorsMeta.meta_title,
      description: vendorsMeta.meta_description,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/vendors`,
      type: 'website',
    },
  };
}

const Vendors = async () => {
  const t = await getTranslations();
 
  return (
    <div>
      <PageHeader title={t('menu_titles.brands')} link={t('menu_titles.brands')} />
      <div className="md:py-16 py-8">
        <BrandCards />
      </div>
    </div>
  );
};

export default Vendors;