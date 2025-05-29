"use client"

import type React from "react"
import Brand from "./Brand"
import { BrandsType } from "@/types"
import { useTranslations } from "next-intl"

const BrandList = ({brands}:{brands:BrandsType[]}) => {
    const t = useTranslations();
    return (
        <div className="bg-white rounded-2xl shadow-sm p-6 w-[270px]">
            <h2 className="text-2xl font-title-500 text-gray-800 mb-2">{t('menu_titles.brands')}</h2>
            <div className="h-1 w-12 bg-green-200 mb-6"></div>

            <div className="space-y-4 h-[400px] overflow-auto">
                {brands.map((brand) => (
                    <Brand key={brand.id}  brand={brand} />
                ))}
        </div>
        </div >
    )
}

export default BrandList













