'use client'
import BrandList from '@/components/sections/products/Brands/BrandList'
import CategoryList from '@/components/sections/products/Category/CategoryList'
import PageHeader from '@/components/shared/pageHeader'
// import Campaign from '@/components/sections/products/Campaign'
import MobileProductsFilter from '@/components/sections/products/Products/MobileProductsFilter'
import { BrandsType, CategoryType, ProductsType } from '@/types'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { useEffect, useState } from 'react'
import './style.css'
import { useLocale, useTranslations } from 'next-intl'

// Dynamically import the Client Component
const FilteredProducts = dynamic(() => import('@/components/sections/products/Products/FilteredProducts'))

const Products = () => {
  const [openFilter, setOpenFilter] = useState<boolean>(false)
  const [categories, setCategories] = useState<CategoryType[]>([])
  const [brands, setBrands] = useState<BrandsType[]>([])
  // const [products, setProducts] = useState<ProductsType[]>([])
  const [filteredProducts, setFitleredProducts] = useState<ProductsType[]>([])
  const locale = useLocale(); // 🆕 Get the current language
  const t = useTranslations();


  useEffect(() => {
    // const getProducts = async () => {
    //   try {
    //     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/products`, {
    //       headers: { 'Accept-Language': 'en' },
    //       cache: 'no-store',
    //     })
    //     const json = await res.json()
    //     setProducts(json.data || [])
    //     console.log(products)
    //   } catch (error) {
    //     console.error('Error fetching products:', error)
    //     setProducts([])
    //   }
    // }

    const getCategories = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/categories`, {
          headers: { 'Accept-Language': locale },
          cache: 'no-store',
        })
        const json = await res.json()
        setCategories(json.data || []) // Fixed typo: setCategoreis -> setCategories
      } catch (error) {
        console.error('Error fetching categories:', error)
        setCategories([])
      }
    }

    const getBrands = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/brands`, {
          headers: { 'Accept-Language': locale },
          cache: 'no-store',
        })
        const json = await res.json()
        setBrands(json.data || [])
      } catch (error) {
        console.error('Error fetching brands:', error)
        setBrands([])
      }
    }

    // getProducts()
    getCategories()
    getBrands()
    console.log('effect')
    // console.log(filteredProducts, 'filteredProducts')
  }, [locale])

  useEffect(() => {
    if (openFilter) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [openFilter])

  return (
    <div>
      <PageHeader title={t('menu_titles.products')} link={t('menu_titles.products')} subLink={filteredProducts[0]?.category} />

      <div className="container mx-auto flex lg:flex-row flex-col items-start gap-10 py-16 px-6">
        <div className="lg:block hidden lg:w-1/5 w-full">
          <CategoryList categories={categories} />
          <div className='mt-4'>
            <BrandList brands={brands} />
          </div>
          {/* <Campaign /> */}
        </div>

        <div className="lg:w-4/5 w-full ">
          <div className="md:block hidden mb-5">
            {
              t('search.foundItems', { count: filteredProducts.length })
            }
          </div>


          <div
            className="lg:hidden block w-full text-center my-3 bg-[#0f4c9f] text-white py-3 rounded-md"
            onClick={() => setOpenFilter(!openFilter)}
          >
          {t('menu.allCategories')}
          </div>

          {openFilter && (
            <div className={openFilter ? 'activeFilter' : 'hidden'}>
              <MobileProductsFilter
                categories={categories}
                setOpenFilter={setOpenFilter}
                brands={brands}
              />
            </div>
          )}

          <Suspense fallback={<div>Loading products...</div>}>
            <FilteredProducts setFitleredProducts={setFitleredProducts} filteredProducts={filteredProducts} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default Products