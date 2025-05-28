"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, Grid, ArrowUpDown } from "lucide-react"
import { showOptions, sortOptions } from "@/constants/filter"
import { ProductFiltersProps } from "@/types"

const ProductFilters = ({
  onShowChange,
  onSortChange,
}: ProductFiltersProps) => {

  const [showValue, setShowValue] = useState<string | number>(50)
  const [sortValue, setSortValue] = useState<string>('featured')
  const [showDropdownOpen, setShowDropdownOpen] = useState(false)
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false)

  const showDropdownRef = useRef<HTMLDivElement>(null)
  const sortDropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showDropdownRef.current && !showDropdownRef.current.contains(event.target as Node)) {
        setShowDropdownOpen(false)
      }
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target as Node)) {
        setSortDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleShowChange = (value: string | number) => {
    setShowValue(value)
    setShowDropdownOpen(false)
    if (onShowChange) {
      onShowChange(value)
    }
  }

  const handleSortChange = (value: string) => {
    setSortValue(value)
    setSortDropdownOpen(false)
    if (onSortChange) {
      onSortChange(value)
    }
  }

  return (
    <div className={`flex flex-col sm:flex-row gap-3 `}>

      <div className="flex items-center justify-between w-full">
        <div className="md:block hidden ">We found <span className="text-[#0f4c9f]">29</span> items for you</div>

        <div className="flex items-center gap-4">
          <div className="relative" ref={showDropdownRef}>
            <button
              className="flex items-center justify-between w-full sm:w-60 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
              onClick={() => setShowDropdownOpen(!showDropdownOpen)}
              aria-haspopup="listbox"
              aria-expanded={showDropdownOpen}
            >
              <div className="flex items-center gap-2">
                <Grid className="h-5 w-5 text-gray-400" />
                <span>Show: {showValue}</span>
              </div>
              <ChevronDown
                className={`h-4 w-4 text-gray-500 transition-transform ${showDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Show Dropdown */}
            {showDropdownOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                <ul className="py-1 max-h-60 overflow-auto" role="listbox">
                  {showOptions.map((option) => (
                    <li
                      key={option.value.toString()}
                      className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${showValue === option.value ? "bg-gray-50 text-gray-900 font-medium" : "text-gray-700"
                        }`}
                      onClick={() => handleShowChange(option.value)}
                      role="option"
                      aria-selected={showValue === option.value}
                    >
                      {option.label}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sort Filter */}
          <div className="relative" ref={sortDropdownRef}>
            <button
              className="flex items-center justify-between w-full sm:w-60 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
              onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
              aria-haspopup="listbox"
              aria-expanded={sortDropdownOpen}
            >
              <div className="flex items-center gap-2">
                <ArrowUpDown className="h-5 w-5 text-gray-400" />
                <span>Sort by: {sortOptions.find((option) => option.value === sortValue)?.label}</span>
              </div>
              <ChevronDown
                className={`h-4 w-4 text-gray-500 transition-transform ${sortDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Sort Dropdown */}
            {sortDropdownOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                <ul className="py-1 max-h-60 overflow-auto" role="listbox">
                  {sortOptions.map((option) => (
                    <li
                      key={option.value}
                      className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${sortValue === option.value ? "bg-gray-50 text-gray-900 font-medium" : "text-gray-700"
                        }`}
                      onClick={() => handleSortChange(option.value)}
                      role="option"
                      aria-selected={sortValue === option.value}
                    >
                      {option.label}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  )
}

export default ProductFilters
