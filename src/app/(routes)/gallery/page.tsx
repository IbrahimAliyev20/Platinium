import GalleryPage from '@/components/sections/gallery/gallery-page';
import { getPhotos } from '@/lib/api-client/gallery';
import { getMetaData } from '@/lib/api-client/metadata';
import { getTranslations } from 'next-intl/server';
import { MetaData } from '@/types';

export async function generateMetadata() {
  const metaData: MetaData[] = await getMetaData();
  const t = await getTranslations();

  const galleryMeta = metaData.find((meta) => meta.title.toLowerCase() === 'photo') || {
    meta_title: t('gallery.meta_title') || 'Gallery - Platinium-17',
    meta_description: t('gallery.meta_description') || 'Explore our gallery of professional kitchen equipment at Platinium-17.',
    meta_keywords: t('gallery.meta_keywords') || 'gallery, Platinium-17, kitchen equipment',
  };

  return {
    title: galleryMeta.meta_title,
    description: galleryMeta.meta_description,
    keywords: galleryMeta.meta_keywords,
    openGraph: {
      title: galleryMeta.meta_title,
      description: galleryMeta.meta_description,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/gallery`,
      type: 'website',
    },
  };
}

export default async function Gallery() {
  const { data: photos, nextUrl } = await getPhotos(1);

  return <GalleryPage initialPhotos={photos} initialNextUrl={nextUrl} />;
}