"use client"

import type React from "react"
import Category from "./Category"
import { CategoryType } from "@/types"
import { useTranslations } from "next-intl"

const CategoryList = ({ categories }: { categories: CategoryType[] }) => {
    const t = useTranslations();

    return (
        <div className="bg-white rounded-2xl shadow-sm p-6 max-w-sm">
            <h2 className="text-2xl font-title-500 text-gray-800 mb-2">{t('menu_titles.categories')}</h2>
            <div className="h-1 w-12 bg-green-200 mb-6"></div>

            <div className="space-y-4">
                {categories.map((category) => (
                    <Category key={category.id} category={category} setOpenFilter={() => {}} />
                ))}
            </div>
        </div >
    )
}

export default CategoryList













