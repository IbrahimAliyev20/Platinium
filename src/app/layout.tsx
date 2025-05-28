import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';
import Script from 'next/script';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";
import { MetaData } from '@/types';
import { getMetaData } from '@/lib/api-client/metadata';

export async function generateMetadata() {
  const locale = await getLocale();
  const metaData: MetaData[] = await getMetaData();

  const defaultMeta = metaData.find((meta) => meta.title.toLowerCase() === 'home') || {
    meta_title: 'Platinium-17 | Peşəkar Mətbəx Avadanlıqları',
    meta_description: 'Platinium-17 | Peşəkar Mətbəx Avadanlıqları',
    meta_keywords: 'Platinium-17, Mətbəx Avadanlıqları',
  };

  return {
    title: defaultMeta.meta_title,
    description: defaultMeta.meta_description,
    keywords: defaultMeta.meta_keywords,
    openGraph: {
      title: defaultMeta.meta_title,
      description: defaultMeta.meta_description,
      url: process.env.NEXT_PUBLIC_BASE_URL,
      locale,
      type: 'website',
    },
  };
}

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body
        className="font-gilroy antialiased bg-[#0a4e9f14]/40"
        suppressHydrationWarning
      >
        <Script
          strategy="afterInteractive"
          src="https://embed.tawk.to/682d78104f8d3219091ce7e9/1iropq0q6"
          charSet="UTF-8"
          crossOrigin="anonymous"
        />

        <NextIntlClientProvider locale={locale}>
          <div>
            <Header />
            <div className="w-full mx-auto">
              {children}
            </div>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
