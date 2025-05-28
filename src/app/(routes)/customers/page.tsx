import CustomerList from '@/components/sections/customers/CustomerList';
import PageHeader from '@/components/shared/pageHeader';
import { getClients } from '@/lib/api-client/clients';
import { getTranslations } from 'next-intl/server';
import { getMetaData } from '@/lib/api-client/metadata';
import { MetaData } from '@/types';

export async function generateMetadata() {
  const metaData: MetaData[] = await getMetaData();

  const clientMeta = metaData.find((meta) => meta.title.toLowerCase() === 'client') || {
    meta_title: 'Clients - Platinium-17',
    meta_description: 'Discover our valued clients at Platinium-17 for professional kitchen equipment.',
    meta_keywords: 'clients, Platinium-17, kitchen equipment',
  };

  return {
    title: clientMeta.meta_title,
    description: clientMeta.meta_description,
    keywords: clientMeta.meta_keywords,
    openGraph: {
      title: clientMeta.meta_title,
      description: clientMeta.meta_description,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/customers`,
      type: 'website',
    },
  };
}

const Customers = async () => {
  const clients = await getClients();
  const t = await getTranslations();

  return (
    <div>
      <PageHeader title={t('menu_titles.clients')} link={t('menu_titles.clients')} />
      <div className="md:py-16 py-10">
        <CustomerList clients={clients} />
      </div>
    </div>
  );
};

export default Customers;