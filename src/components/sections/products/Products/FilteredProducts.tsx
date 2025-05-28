// components/FilteredProducts.tsx
'use client'
import { Dispatch, SetStateAction } from 'react';
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import ProductList from '@/components/sections/products/Products/ProductList'
import { ProductsType } from '@/types'
import { useLocale } from 'next-intl';

interface FilteredProductsProps {
  setFitleredProducts: Dispatch<SetStateAction<ProductsType[]>>;
  filteredProducts: ProductsType[];
}

const FilteredProducts = ({ setFitleredProducts, filteredProducts }: FilteredProductsProps) => {
  const searchParams = useSearchParams();
  const locale = useLocale(); 

  useEffect(() => {
    const getFilteredProducts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/products/filter?${searchParams}`,
          {
            headers: {
              'Accept-Language': locale,
            },
            cache: 'no-store', 
          }
        );
        const json = await res.json();
        setFitleredProducts(json.data || []);
      } catch (error) {
        console.error('Error fetching filtered products:', error);
      }
    };

    getFilteredProducts();
  }, [searchParams, locale, setFitleredProducts]);

  return <ProductList products={filteredProducts} />;
};

export default FilteredProducts;