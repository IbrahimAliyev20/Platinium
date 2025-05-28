"use client"

import { ProductsType } from "@/types"
import type React from "react"



const ProductSpecifications = ({product}:{product:ProductsType}) => {
  return (
    <div className={`border border-gray-200 rounded-lg overflow-hidden `}>
      <div className="divide-y divide-gray-200">
        {product.attributes.map((atrributes, index) => (
          <div key={index} className="flex flex-row py-4 px-6 gap-3 hover:bg-gray-50 transition-colors">
            <div className="sm:w-1/3 font-medium text-gray-600 mb-1 sm:mb-0 whitespace-nowrap">{atrributes.key}</div>
            <div className="sm:w-2/3 text-gray-800">{atrributes.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductSpecifications
