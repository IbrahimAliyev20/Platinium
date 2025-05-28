import React from 'react'
import Link from 'next/link'
import { IoCloseSharp } from "react-icons/io5";
import { BrandsType, CategoryType } from '@/types';
import Image from 'next/image';
import Category from '../Category/Category';
import { useTranslations } from 'next-intl';


const MobileProductsFilter =  ({ categories, brands, setOpenFilter }: { categories: CategoryType[], brands: BrandsType[], setOpenFilter: React.Dispatch<React.SetStateAction<boolean>> }) => {

  const t =  useTranslations();

  return (
    <div className="fixed inset-0 w-full h-full bg-white bg-opacity-95 z-50 p-5">
      <div
        className="fixed bg-white w-8 h-8 rounded-full flex items-center justify-center right-5 top-5 text-2xl cursor-pointer shadow-md"
        onClick={() => setOpenFilter(false)}
      >
        <IoCloseSharp />
      </div>

      {/* Scrollable Content */}
      <div className="h-[calc(100vh-80px)] mt-12 overflow-y-auto">
        <div className="space-y-4">
          <h3 className="text-xl font-title-500">{t('menu_titles.categories')}</h3>

          {categories.map((category) => (
            <Category key={category.id} category={category} setOpenFilter={setOpenFilter} />
          ))}


        </div>

        <div className="space-y-4 mt-5">
          <h3 className="text-xl font-title-500">{t('menu_titles.brands')}</h3>

          {brands.map((brand) => (
            <Link
              key={brand.id}

              href={`/products?brand_id=${brand.slug}`}
              className="flex items-center justify-between group hover:bg-gray-50 rounded-lg transition-colors p-2"
              onClick={() => setOpenFilter(false)}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 relative ">
                  <Image
                    src={brand.image}
                    alt='category image'
                    fill
                    className='object-contain'
                  />
                </div>
                <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                  {brand.title}
                </span>
              </div>
              {/* <div className="bg-green-100 text-green-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium">
                {category.count}
              </div> */}
            </Link>
          ))}


        </div>
      </div>
    </div>
  )
}

export default MobileProductsFilter