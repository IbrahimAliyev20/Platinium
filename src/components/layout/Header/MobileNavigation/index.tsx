'use client'
import React, { useEffect, useState } from "react";
import Link from "next/link";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Image from "next/image";
import { CategoryType, SettingsType } from "@/types";
import { useLocale, useTranslations } from "next-intl"


interface MobileNavigationProps {
  setMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ setMobileMenu }) => {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isMediaOpen, setIsMediaOpen] = useState(false);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [openSubcategories, setOpenSubcategories] = useState<{ [key: number]: boolean }>({});
  const [settings, setSettings] = useState<SettingsType >()
  const locale=useLocale()

    const t=useTranslations()
  

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


    const getSettings = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/settings`, {
        headers: {
          "Accept-Language": locale
        },
        next: { revalidate: 60 }
      })
      const json = await res.json()
      setSettings(json.data)
    }

    getSettings()
    getCategories();
  }, [locale]);

  const toggleSubcategory = (categoryId: number) => {
    setOpenSubcategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const RenderCategory = ({ category, depth = 0}: { category: CategoryType; depth?: number }) => {
    const hasSubcategories = category.categories && category.categories.length > 0;
    const isSubcategoryOpen = openSubcategories[category.id];

    return (
      <li key={category.id} className="relative">
        <div className="flex items-center w-full">
          
            <Link
              href={`/products?category_id=${category.slug}`}
              className={` block px-4 py-2 hover:bg-gray-100 transition-colors w-full ${depth > 0 ? "pl-6" : ""
                }`}
              onClick={() => setMobileMenu(false)}
            >
              {category.name}
            </Link>
          {hasSubcategories && (
            <button
              onClick={() => toggleSubcategory(category.id)}
              className="p-2"
            >
              {isSubcategoryOpen ? (
                <ExpandLessIcon className="h-4 w-4 text-gray-500" />
              ) : (
                <ExpandMoreIcon className="h-4 w-4 text-gray-500" />
              )}
            </button>
          )}
        </div>

        {hasSubcategories && (
          <ul
            className={`overflow-y-scroll ml-4 mt-0 rounded-md shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${isSubcategoryOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              } ${depth > 0 ? "border-l border-gray-100" : ""}`}
          >
            {category.categories.map((subCategory) => (
              <RenderCategory
                key={subCategory.id}
                category={subCategory}
                depth={depth + 1}
              />
            ))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <div className="fixed w-[300px] inset-0 bg-white bg-opacity-95 z-50 flex flex-col p-5">
      <div className="flex justify-between">
        <div style={{ width: "120px", height: "70px", position: "relative", objectFit: "cover" }}>
          <Image src={`${settings?.favicon || '/assets/images/logo.png'}`} alt="logo" fill />
        </div>
        <button onClick={() => setMobileMenu(false)} className="text-[#1e2939]">
          <CloseIcon fontSize="large" />
        </button>
      </div>

      <ul className="flex flex-col gap-5 mt-5 text-[#1e2939] z-50">
        <li>
          <Link
            href="/"
            className="block py-2 text-lg font-medium transition-colors"
            onClick={() => setMobileMenu(false)}
          >
            {t('menu.home')}
          </Link>
        </li>

        <li className="relative">
          <button
            className="flex items-center py-2 text-lg font-medium transition-colors w-full text-left"
            onClick={() => setIsAboutOpen(!isAboutOpen)}
          >
              {t('menu.about')}
            {isAboutOpen ? <ExpandLessIcon className="ml-2" /> : <ExpandMoreIcon className="ml-2" />}
          </button>
          <ul
            className={`ml-4 mt-2 rounded-md shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${isAboutOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
          >
            <li>
              <Link
                href="/about"
                className="block px-4 py-2 text-sm hover:bg-gray-300 transition-colors"
                onClick={() => setMobileMenu(false)}
              >
               {t('menu.submenus.whoWeAre')}
              </Link>
            </li>
            <li>
              <Link
                href="/vendors"
                className="block px-4 py-2 text-sm hover:bg-gray-300 transition-colors"
                onClick={() => setMobileMenu(false)}
              >
                {t('menu.submenus.brands')}
              </Link>
            </li>
            <li>
              <Link
                href="/customers"
                className="block px-4 py-2 text-sm hover:bg-gray-300 transition-colors"
                onClick={() => setMobileMenu(false)}
              >
                    {t('menu.submenus.partnerships')}
              </Link>
            </li>
            <li>
              <Link
                href="/faq"
                className="block px-4 py-2 text-sm transition-colors"
                onClick={() => setMobileMenu(false)}
              >
                 {t('menu.submenus.faq')}
              </Link>
            </li>
          </ul>
        </li>

        <li className="relative">
          <button
            className="flex items-center py-2 text-lg font-medium transition-colors w-full text-left"
            onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
          >
          {t('menu.categories')}
            {isCategoriesOpen ? <ExpandLessIcon className="ml-2" /> : <ExpandMoreIcon className="ml-2" />}
          </button>
          <ul
            className={`ml-4 mt-2 rounded-md shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${isCategoriesOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
          >
            {categories.length > 0 ? (
              categories.map((category) => <RenderCategory key={category.id} category={category} />)
            ) : (
              <li className="px-4 py-2 text-gray-500">No categories available</li>
            )}
          </ul>
        </li>

        <li>
          <Link
            href="/portfolio"
            className="block py-2 text-lg font-medium transition-colors"
            onClick={() => setMobileMenu(false)}
          >
             {t('menu.portfolio')}
          </Link>
        </li>

        <li>
          <Link
            href="/news"
            className="block py-2 text-lg font-medium transition-colors"
            onClick={() => setMobileMenu(false)}
          >
            {t('menu.news')}
          </Link>
        </li>

        <li className="relative">
          <button
            className="flex items-center py-2 text-lg font-medium transition-colors w-full text-left"
            onClick={() => setIsMediaOpen(!isMediaOpen)}
          >
            {t('menu.media')}
            {isMediaOpen ? <ExpandLessIcon className="ml-2" /> : <ExpandMoreIcon className="ml-2" />}
          </button>
          <ul
            className={`ml-4 mt-2 rounded-md shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${isMediaOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
          >
            <li>
              <Link
                href="/gallery"
                className="block px-4 py-2 text-sm hover:bg-gray-300 transition-colors"
                onClick={() => setMobileMenu(false)}
              >
                {t('menu.submenus.photos')}

              </Link>
            </li>
            <li>
              <Link
                href="/video"
                className="block px-4 py-2 text-sm hover:bg-gray-300 transition-colors"
                onClick={() => setMobileMenu(false)}
              >
               {t('menu.submenus.videos')}
              </Link>
            </li>
          </ul>
        </li>

        <li>
          <Link
            href="/contact"
            className="block py-2 text-lg font-medium transition-colors"
            onClick={() => setMobileMenu(false)}
          >
          {t('menu.contact')}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default MobileNavigation;