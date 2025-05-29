import { CategoryType } from '@/types';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ServiceBanner = async ({ categories }: { categories: CategoryType[] }) => {
  const t = await getTranslations();

  return (
    <section className="py-8">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="sm:text-4xl text-3xl font-title-500 text-gray-800 md:mb-5 mb-3 text-left">
          {t('menu_titles.categories')}
        </h2>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="relative w-full h-auto rounded-md overflow-hidden shadow-md"
              style={{ backgroundColor: category.color }}
            >
              {/* Şəkil hissəsi */}
              <div className="relative w-full h-[180px] sm:h-[200px] lg:h-[220px] ">
                <Image
                  src={category.image}
                  alt={category.name || 'Category image'}
                  fill
                  className="object-contain object-center p-5"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority
                />
              </div>

              {/* Mətn və düymə hissəsi */}
              <div className="p-6 flex flex-col justify-between min-h-[120px]">
                <h3 className="text-xl font-title-500 text-gray-800 mb-3">
                  {category.name}
                </h3>
                <Link
                  href={`/products?category_id=${category.slug}`}
                  className="bg-[#0f4c9f] text-white px-4 py-2 rounded-md text-sm inline-flex items-center transition-colors duration-300 w-fit hover:bg-[#083a7d]"
                >
                  {t('buttons.viewProducts')}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceBanner;