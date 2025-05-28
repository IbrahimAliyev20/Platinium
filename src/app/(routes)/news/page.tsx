import NewsItem from '@/components/sections/news/NewsItem';
import PageHeader from '@/components/shared/pageHeader';
import { getBlogs } from '@/lib/api-client/blogs';
import { getTranslations } from 'next-intl/server';
import { getMetaData } from '@/lib/api-client/metadata';
import { MetaData } from '@/types';

export async function generateMetadata() {
  const metaData: MetaData[] = await getMetaData();
  const t = await getTranslations();

  const newsMeta = metaData.find((meta) => meta.title.toLowerCase() === 'blogs') || {
    meta_title: t('news.meta_title') || 'News - Platinium-17',
    meta_description: t('news.meta_description') || 'Read the latest news and updates about Platinium-17 and professional kitchen equipment.',
    meta_keywords: t('news.meta_keywords') || 'news, blogs, Platinium-17, kitchen equipment',
  };

  return {
    title: newsMeta.meta_title,
    description: newsMeta.meta_description,
    keywords: newsMeta.meta_keywords,
    openGraph: {
      title: newsMeta.meta_title,
      description: newsMeta.meta_description,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/news`,
      type: 'website',
    },
  };
}

const News = async () => {
  const news = await getBlogs();
  const t = await getTranslations();


  return (
    <div>
      <PageHeader title={t('news.title')} link={t('news.breadcrumb')} />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 py-16">
        {news.map((blog, index) => (
          <NewsItem key={index} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default News;