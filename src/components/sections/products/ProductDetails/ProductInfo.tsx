"use client";

import React, { useState } from "react";
import { ProductsType } from "@/types";
import { useTranslations } from "next-intl";
import Link from "next/link";

const ProductInfo = ({
  product,
  modal = false,
  setShowModal,
}: {
  product: ProductsType;
  modal?: boolean;
  setShowModal?: (value: React.SetStateAction<boolean>) => void;
}) => {
  const t = useTranslations();

  const [showFullDesc, setShowFullDesc] = useState(false);
  const descLimit = 600;
  const isLong = product.description && product.description.length > descLimit;
  const shortDesc = isLong
    ? product.description.slice(0, descLimit) + "..."
    : product.description;

  return (
    <div className={`max-w-2xl`}>
      <h1 className="md:text-4xl text-3xl font-title-500 text-slate-800 mb-2">
        {product.name}
      </h1>
      <div>
        <p
          className={`font-sans text-gray-500 mb-2 ${
            modal ? "line-clamp-4 md:line-clamp-none" : ""
          }`}
          dangerouslySetInnerHTML={{
            __html: showFullDesc ? product.description : shortDesc,
          }}
        ></p>
        <div className="flex justify-end mt-4 gap-3">
          {!showFullDesc && isLong && (
            <button
              className="bg-[#0f4c9f] text-white px-4 py-1.5 rounded-md flex items-center gap-2 text-sm transition-colors hover:bg-[#155ab6]"
              onClick={() => setShowFullDesc(true)}
            >
              Davamına bax
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          )}
          {showFullDesc && isLong && (
            <button
              className="bg-[#0f4c9f] text-white px-4 py-1.5 rounded-md flex items-center gap-2 text-sm transition-colors hover:bg-[#155ab6]"
              onClick={() => setShowFullDesc(false)}
            >
              Davamına bax 
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 15l-7-7-7 7"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
      <p className="text-xl text-[#7f7f7f]">
        {t("filters.brand")}:{" "}
        <Link
          href={`/products?brand_id=${product.brand_slug}`}
          className="text-lg text-[#3ab87d]"
          onClick={() => setShowModal && setShowModal(false)}
        >
          {product.brand}
        </Link>
      </p>
      <p className="text-xl text-[#7f7f7f]">
        {t("filters.category")}:{" "}
        <Link
          href={`/products?category_id=${product.category_slug}`}
          className="text-lg text-[#3ab87d]"
          onClick={() => setShowModal && setShowModal(false)}
        >
          {product.category}
        </Link>
      </p>
    </div>
  );
};

export default ProductInfo;