import VideoPage from '@/components/sections/video/video-page';
import { getVideos } from '@/lib/api-client/videos';
import { getMetaData } from '@/lib/api-client/metadata';
import { getTranslations } from 'next-intl/server';
import { MetaData } from '@/types';

export async function generateMetadata() {
  const metaData: MetaData[] = await getMetaData();
  const t = await getTranslations();

  const videoMeta = metaData.find((meta) => meta.title.toLowerCase() === 'video') || {
    meta_title: t('video.meta_title') || 'Videos - Platinium-17',
    meta_description: t('video.meta_description') || 'Watch videos showcasing our professional kitchen equipment at Platinium-17.',
    meta_keywords: t('video.meta_keywords') || 'videos, Platinium-17, kitchen equipment',
  };

  return {
    title: videoMeta.meta_title,
    description: videoMeta.meta_description,
    keywords: videoMeta.meta_keywords,
    openGraph: {
      title: videoMeta.meta_title,
      description: videoMeta.meta_description,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/video`,
      type: 'website',
    },
  };
}

export default async function Video() {
  const videos = await getVideos();

  return <VideoPage videos={videos} />;
}