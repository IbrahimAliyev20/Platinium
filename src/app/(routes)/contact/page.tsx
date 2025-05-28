import FormSection from '@/components/sections/contact/FormSection';
import LocationMap from '@/components/sections/contact/LocationMap';
import { getContact } from '@/lib/api-client/contact';
import { getMetaData } from '@/lib/api-client/metadata';
import { MetaData } from '@/types';

export async function generateMetadata() {
    
  const metaData: MetaData[] = await getMetaData();

  const contactMeta = metaData.find((meta) => meta.title.toLowerCase() === 'contact') || {
    meta_title: 'Contact - Platinium-17',
    meta_description: 'Get in touch with Platinium-17 for professional kitchen equipment inquiries.',
    meta_keywords: 'contact, Platinium-17, kitchen equipment',
  };

  return {
    title: contactMeta.meta_title,
    description: contactMeta.meta_description,
    keywords: contactMeta.meta_keywords,
    openGraph: {
      title: contactMeta.meta_title,
      description: contactMeta.meta_description,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/contact`,
      type: 'website',
    },
  };
}

const Contact = async () => {
  const contact = await getContact();


  return (
    <div className='container mx-auto'>
      <FormSection contact={contact} />
      <LocationMap map={contact.map} />
    </div>
  );
};

export default Contact;