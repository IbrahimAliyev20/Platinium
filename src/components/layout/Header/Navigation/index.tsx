"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { CategoryType } from "@/types";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

const Navigation = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const t = useTranslations();
  const locale = useLocale();
  const [openCategoryId, setOpenCategoryId] = useState<number | null>(null);
  const [openSubCategoryId, setOpenSubCategoryId] = useState<number | null>(null);
  const [openSubSubCategoryId, setOpenSubSubCategoryId] = useState<number | null>(null);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/categories`, {
          headers: {
            "Accept-Language": locale,
          },
          next: { revalidate: 60 },
        });
        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }
        const json = await res.json();
        setCategories(json.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    getCategories();
  }, [locale]);

  const RenderCategory = ({ category }: { category: CategoryType; depth?: number }) => {
    const hasSubcategories = category.categories && category.categories.length > 0;
    const isOpen = openCategoryId === category.id;

    return (
      <div key={category.id}>
        <h4
          className="text-[#1d4a8a] font-title-500 py-3 bg-[#f3f3f3] px-2 mb-3 text-[15px] flex items-center justify-between cursor-pointer"
          onClick={() => {
            setOpenCategoryId(isOpen ? null : category.id);
            setOpenSubCategoryId(null);
          }}
        >
          <Link href={`/products?category_id=${category.id}`}>{category.name}</Link>
          {hasSubcategories && <ChevronRight className={`h-4 w-4 text-gray-500 transition-transform ${isOpen ? 'rotate-90' : ''}`} />}
        </h4>
        {hasSubcategories && isOpen && (
          <ul className="space-y-1">
            {category.categories.map((subCategory) => {
              const hasSubSub = subCategory.categories && subCategory.categories.length > 0;
              const isSubOpen = openSubCategoryId === subCategory.id;
              return (
                <li key={subCategory.id} className="pl-4">
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenSubCategoryId(isSubOpen ? null : subCategory.id);
                      setOpenSubSubCategoryId(null);
                    }}
                  >
                    <Link
                      href={`/products?category_id=${subCategory.id}`}
                      className="text-gray-700 hover:text-blue-600 text-[15px] transition-colors flex items-center"
                    >
                      {subCategory.name}
                    </Link>
                    {hasSubSub && <ChevronRight className={`h-4 w-4 text-gray-500 transition-transform ${isSubOpen ? 'rotate-90' : ''}`} />}
                  </div>
                  {hasSubSub && isSubOpen && (
                    <ul className="ml-6 space-y-1 mt-2">
                      {subCategory.categories.map((subSubCategory) => {
                        const isSubSubOpen = openSubSubCategoryId === subSubCategory.id;
                        return (
                          <li key={subSubCategory.id}>
                            <div
                              className="flex items-center justify-between cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenSubSubCategoryId(isSubSubOpen ? null : subSubCategory.id);
                              }}
                            >
                              <Link
                                href={`/products?category_id=${subSubCategory.slug}`}
                                className="text-gray-700 hover:text-blue-600 text-[14px] transition-colors"
                              >
                                {subSubCategory.name}
                              </Link>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  };

  return (
    <nav className="bg-white">
      <div className="container mx-auto">
        <ul className="flex items-center space-x-6 py-4">
          <li>
            <Link href="/" className="py-2 hover:text-blue-600 transition-colors font-title-500">
              {t("menu.home")}
            </Link>
          </li>

          <li className="relative group">
            <button className="py-2 cursor-pointer flex items-center hover:text-blue-600 transition-colors font-title-500">
              {t("menu.about")}
              <ChevronDown className="h-4 w-4 ml-1" />
            </button>
            <ul className="absolute hidden group-hover:block bg-white rounded-md shadow-lg w-48 z-30">
              <li className="font-title-500">
                <Link href="/about" className="block px-4 py-2 rounded-t-md hover:bg-gray-100 transition-colors font-title-500">
                  {t("menu.submenus.whoWeAre")}
                </Link>
              </li>
              <li>
                <Link href="/vendors" className="block px-4 py-2 hover:bg-gray-100 transition-colors font-title-500">
                  {t("menu.submenus.brands")}
                </Link>
              </li>
              <li>
                <Link href="/customers" className="block px-4 py-2 hover:bg-gray-100 transition-colors font-title-500">
                  {t("menu.submenus.partnerships")}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="block px-4 py-2 hover:bg-gray-100 transition-colors font-title-500">
                  {t("menu.submenus.faq")}
                </Link>
              </li>
            </ul>
          </li>

          <li className="relative group">
            <Link href="/products" type="button" className="py-2 flex items-center cursor-pointer hover:text-blue-600 transition-colors font-title-500">
              {t("menu.categories")}
              <ChevronDown className="h-4 w-4 ml-1" />
            </Link>
            <ul className="absolute hidden -right-[150px] group-hover:grid bg-white rounded-md shadow-lg lg:w-[850px] w-[600px] p-6 grid-cols-2 lg:grid-cols-2 gap-8 z-50 text-sm">
              {categories.length > 0 ? (
                categories.map((category) => (
                  <RenderCategory key={category.id} category={category} depth={0} />
                ))
              ) : (
                <li className="text-gray-500">No categories available</li>
              )}
            </ul>
          </li>

          <li>
            <Link href="/portfolio" className="py-2 hover:text-blue-600 transition-colors font-title-500">
              {t("menu.portfolio")}
            </Link>
          </li>

          <li>
            <Link href="/news" className="py-2 hover:text-blue-600 transition-colors font-title-500">
              {t("menu.news")}
            </Link>
          </li>

          <li className="relative group">
            <button className="py-2 cursor-pointer flex items-center hover:text-blue-600 transition-colors font-title-500">
              {t("menu.media")}
              <ChevronDown className="h-4 w-4 ml-1" />
            </button>
            <ul className="absolute hidden group-hover:block bg-white rounded-md shadow-lg w-48 z-30">
              <li>
                <Link href="/gallery" className="rounded-t-md block px-4 py-2 hover:bg-gray-100 transition-colors font-title-500">
                  {t("menu.submenus.photos")}
                </Link>
              </li>
              <li>
                <Link href="/video" className="block px-4 py-2 hover:bg-gray-100 transition-colors font-title-500">
                  {t("menu.submenus.videos")}
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <Link href="/contact" className="py-2 hover:text-blue-600 transition-colors font-title-500">
              {t("menu.contact")}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;