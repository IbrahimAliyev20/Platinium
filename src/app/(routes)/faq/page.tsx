import FaqSection from '@/components/sections/about/FaqSection';
import PageHeader from '@/components/shared/pageHeader';
import { getMetaData } from '@/lib/api-client/metadata';
import { getTranslations } from 'next-intl/server';
import { MetaData } from '@/types';

export async function generateMetadata() {
  const metaData: MetaData[] = await getMetaData();
  const t = await getTranslations();

  const faqMeta = metaData.find((meta) => meta.title.toLowerCase() === 'faq') || {
    meta_title: t('faq.meta_title') || 'FAQ - Platinium-17',
    meta_description: t('faq.meta_description') || 'Frequently Asked Questions about Platinium-17 and our professional kitchen equipment.',
    meta_keywords: t('faq.meta_keywords') || 'faq, Platinium-17, kitchen equipment',
  };

  return {
    title: faqMeta.meta_title,
    description: faqMeta.meta_description,
    keywords: faqMeta.meta_keywords,
    openGraph: {
      title: faqMeta.meta_title,
      description: faqMeta.meta_description,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/faq`,
      type: 'website',
    },
  };
}

const FAQ = async () => {
  const t = await getTranslations();


  return (
    <div>
      <PageHeader title={t('menu_titles.faq') || 'FAQ'} link={t('menu_titles.faq') || 'FAQ'} />
      <div className="md:py-16 py-10">
        <FaqSection />
      </div>
    </div>
  );
};

export default FAQ;