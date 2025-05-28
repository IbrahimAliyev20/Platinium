'use client'

import React, { useEffect, useState, useCallback, useMemo } from 'react'
import ProductList from './ProductList'
import { getLastProducts, getSelectedProducts } from '@/lib/api-client/products'
import { ProductsType } from '@/types'
import Link from 'next/link'
import { useTranslations } from 'next-intl'


const TabButton = React.memo(
  ({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) => (
    <button
      className={`cursor-pointer px-4 py-2 rounded transition ${
        active ? 'bg-[#0f4c9f] text-white' : 'bg-gray-200 text-black'
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  )
)
type Props = {
  firstbtntitle: string;
  lastbtntitle: string;
  more: string;
};

TabButton.displayName = 'TabButton'

const TabProduct = ({firstbtntitle, lastbtntitle,}: Props) => {
  const [tab, setTab] = useState<'last' | 'selected'>('last')
  const [products, setProducts] = useState<{
    last: ProductsType[]
    selected: ProductsType[]
  }>({ last: [], selected: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const [last, selected] = await Promise.all([getLastProducts(), getSelectedProducts()])
        setProducts({ last, selected })
      } catch {
        setError('Məhsullar yüklənərkən xəta baş verdi.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleTabChange = useCallback((newTab: 'last' | 'selected') => {
    setTab(newTab)
  }, [])

  const currentProducts = useMemo(() => products[tab].slice(0, 8), [products, tab])
    const t = useTranslations()
  

  if (loading) return <div className="text-center py-4">{t('gallery.loading')}</div>
  if (error) return <div className="text-center text-red-500 py-4">{error}</div>

  return (
    <div className="relative container mx-auto px-0 md:px-6">
      <div className="flex gap-2 mb-4 ml-4">
        <TabButton
          active={tab === 'last'}
          label={firstbtntitle}
          onClick={() => handleTabChange('last')}
        />
        <TabButton
          active={tab === 'selected'}
          label={lastbtntitle}
          onClick={() => handleTabChange('selected')}
        />
      </div>

      <ProductList products={currentProducts} />

      <div className="text-center mt-6">
        <Link
          href="/products"
          className='bg-[#0f4c9f] text-white px-6 py-3 rounded-md transition-colors duration-300 inline-flex items-center'
            >
              {t('shared.more')}
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5 ml-2'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z'
                  clipRule='evenodd'
                />
              </svg>
        </Link>
      </div>
    </div>
  )
}

export default TabProduct