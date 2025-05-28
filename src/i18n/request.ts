import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

const locales = ['az', 'en', 'ru'];

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const localeFromCookie = cookieStore.get('NEXT_LOCALE')?.value;

  // Set default locale
  let locale = 'az';

  // If a cookie exists and it's a supported locale, use it
  if (localeFromCookie && locales.includes(localeFromCookie)) {
    locale = localeFromCookie;
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
