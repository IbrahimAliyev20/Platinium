"use client";

import type React from "react";
import { CategoryType } from "@/types";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Category = ({ category, setOpenFilter }: { category: CategoryType; setOpenFilter: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSubcategories = () => {
    setIsOpen(!isOpen);
  };

  const RenderCategory = ({ category, depth = 0 }: { category: CategoryType; depth?: number }) => {
    const hasSubcategories = category.categories && category.categories.length > 0;
    const [isSubOpen, setIsSubOpen] = useState(false);

    const toggleSubLevel = () => {
      setIsSubOpen(!isSubOpen);
    };

    return (
      <div className={` border-b border-gray-100 last:border-b-0 ${depth > 0 ? "ml-6" : ""}`}>
        <div
          className=" flex items-center justify-between py-3 cursor-pointer hover:bg-gray-50 rounded-lg px-2 transition-colors "
          onClick={depth === 0 ? toggleSubcategories : toggleSubLevel}
        >
          <div className="flex items-center space-x-3">
            <Image
              src={category.thumb_image && category.thumb_image !== "null" ? category.thumb_image : "/assets/placeholder"}
              alt="category image"
              width={30}
              height={30}
            />
            <Link
              href={`/products?category_id=${category.slug}`}
              className="text-gray-700 font-medium"
              onClick={() => setOpenFilter(false)}
            >
              {category.name}
            </Link>
          </div>
          {hasSubcategories && (
            <span className="text-gray-400">
              {depth === 0 ? (isOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />) : isSubOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
            </span>
          )}
        </div>

        {hasSubcategories && (depth === 0 ? isOpen : isSubOpen) && (
          <div className="ml-6 mt-2 space-y-2 pb-3">
            {category.categories.map((subCategory) => (
              <RenderCategory key={subCategory.id} category={subCategory} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return <RenderCategory category={category} depth={0} />;
};

export default Category;