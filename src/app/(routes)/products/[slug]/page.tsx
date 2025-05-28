import MobileProductSpecification from '@/components/sections/products/ProductDetails/MobileProductSpecification'
import ProductInfo from '@/components/sections/products/ProductDetails/ProductInfo'
import ProductSlider from '@/components/sections/products/ProductDetails/ProductSlider'
import ProductSpecifications from '@/components/sections/products/ProductDetails/ProductSpecification'
// import RelatedProductsSlider from '@/components/sections/products/ProductDetails/RelatedProductsSlider'
import Product from '@/components/sections/products/Products/Product'
import PageHeaderLinks from '@/components/shared/pageHeaderLinks'
import { getRelatedProducts, getSingleProduct } from '@/lib/api-client/products'
import { getTranslations } from 'next-intl/server'
import React from 'react'


type ProductProps = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ProductProps) {
  const { slug } =  await params

  const product = await getSingleProduct(slug);

  return {
    title: product?.meta_title || product?.name,
    description: product?.meta_description || product?.description?.slice(0, 150),
    keywords: product?.meta_keywords || product?.name,
    openGraph: {
      title: product?.meta_title || product?.name,
      description: product?.meta_description || product?.description?.slice(0, 150),
      images: [
        {
          url: product?.image,
          alt: product?.name,
        },
      ],
    },
    twitter: {
      title: product?.meta_title || product?.name,
      description: product?.meta_description || product?.description?.slice(0, 150),
      images: [product?.image],
    },
  };
}

const ProductDetails = async ({ params }: ProductProps) => {
    const t = await getTranslations();
    const { slug } = await params
    const product = await getSingleProduct(slug)
    const relatedProducts = await getRelatedProducts(slug)

    console.log(product, 'product')


    return (
        <div>
            <div className='lg:px-20 md:px-12 sm:px-6 px-0'>
                <PageHeaderLinks title={t('menu_titles.products')} link={product.category} />
            </div>
            <div className=' flex md:flex-row flex-col items-start gap-10 px-6 py-10'>
                <div className='md:w-2/5 w-full '>
                    <ProductSlider images={product.images} image={product.image} />
                </div>
                <div className='md:w-3/5 w-full'>
                    <ProductInfo product={product} />
                </div>
            </div>
            <div className='lg:px-20 md:px-12 sm:px-6 px-0'>
                <ProductSpecifications product={product} />
            </div>
            <div className=' lg:px-20 md:px-12 sm:px-6 px-0  py-10'>
                <h3 className='text-xl font-title-500  text-gray-800'>{t('products.related')}</h3>
                {/* {
                        relatedProducts
                            .map((product, index) => (
                                <Product key={index} product={product} />
                            ))
                    } */}


               <div className='lg:block hidden'>
   
                        <div className='lg:grid lg:grid-cols-5 hidden items-center gap-5 mt-5 justify-between'>
                            {
                                relatedProducts.slice(0,5)
                                    .map((product, index) => (
                                        <Product key={index} product={product} />
                                    ))
                            }
                        </div>
                

               </div>


                <div className='lg:hidden block top-0 left-0 product '>
                    <MobileProductSpecification relatedProducts={relatedProducts} />
                </div>
            </div>

        </div >
    )
}

export default ProductDetails