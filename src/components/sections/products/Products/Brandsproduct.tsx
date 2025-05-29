'use client';

import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import type { EmblaCarouselType } from 'embla-carousel';

import { getSpecialBrands } from '@/lib/api-client/products';
import ProductList from './ProductList';
import { ProductsType } from '@/types';
import styles from './TabProduct.module.css';

type CarouselNavButtonsProps = {
  emblaApi: EmblaCarouselType | undefined;
};

const CarouselNavButtons = ({ emblaApi }: CarouselNavButtonsProps) => {
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <>
      <button className={styles['embla__button--prev']} onClick={scrollPrev}>
        ‹
      </button>
      <button className={styles['embla__button--next']} onClick={scrollNext}>
        ›
      </button>
    </>
  );
};

const BrandsProduct = () => {
  const [brandProducts, setBrandProducts] = useState<ProductsType[]>([]);
  const [brands, setBrands] = useState<{ id: number; title: string }[]>([]);
  const [selectedBrandId, setSelectedBrandId] = useState<number | null>(null);
  const [itemsPerSlide, setItemsPerSlide] = useState(4);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, slidesToScroll: 1 },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  useEffect(() => {
    const updateItemsPerSlide = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setItemsPerSlide(1);
      } else {
        setItemsPerSlide(4);
      }
    };

    updateItemsPerSlide();
    window.addEventListener('resize', updateItemsPerSlide);
    return () => window.removeEventListener('resize', updateItemsPerSlide);
  }, []);

  useEffect(() => {
    const fetchBrandsAndProducts = async () => {
      const brandData = await getSpecialBrands();

      const formattedBrands = brandData
        .filter((brand) => brand.id !== undefined && brand.title !== undefined)
        .map((brand) => ({
          id: brand.id as number,
          title: brand.title as string,
        }));
      setBrands(formattedBrands);

      const allProducts = brandData.flatMap((brand) =>
        Array.isArray(brand.products)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ? brand.products.map((product: any) => ({
              ...product,
              brand_id: brand.id,
              brand: brand.title,
              brand_slug: brand.slug,
            }))
          : []
      );
      setBrandProducts(allProducts);

      if (formattedBrands.length > 0) {
        setSelectedBrandId(formattedBrands[0].id);
      }
    };
    fetchBrandsAndProducts();
  }, []);

  const filteredProducts = selectedBrandId
    ? brandProducts.filter((product) => product.brand_id === selectedBrandId)
    : [];

  const productGroups = [];
  for (let i = 0; i < filteredProducts.length; i += itemsPerSlide) {
    productGroups.push(filteredProducts.slice(i, i + itemsPerSlide));
  }

  return (
    <div>
      <div className=" flex gap-2 justify-start  ml-0 ">
        {brands.map((brand) => (
          <button
            key={brand.id}
            onClick={() => setSelectedBrandId(brand.id)}
            className={`cursor-pointer px-4 py-2 rounded transition ${
              selectedBrandId === brand.id
                ? 'bg-[#0f4c9f] text-white'
                : 'bg-gray-200 text-black'
            }`}
          >
            {brand.title}
          </button>
        ))}
      </div>

      <div className={styles.embla} ref={emblaRef}>
        <div className={styles['embla__container']}>
          {productGroups.length > 0 ? (
            productGroups.map((group, index) => (
              <div className={styles['embla__slide']} key={index}>
                <ProductList products={group} />
              </div>
            ))
          ) : (
            <div className="text-center py-8">Məhsul tapılmadı</div>
          )}
        </div>
      </div>
      {productGroups.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '24px' }}>
          <CarouselNavButtons emblaApi={emblaApi} />
        </div>
      )}
    </div>
  );
};

export default BrandsProduct;
