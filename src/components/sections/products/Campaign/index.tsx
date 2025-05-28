"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"



const Campaign: React.FC = () => {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <Link
            href='#'
            className={`block`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className={`bg-[#3c5f95] h-[400px] flex items-center justify-center rounded-2xl  text-center transition-all duration-300 ${isHovered ? "shadow-lg transform -translate-y-1" : "shadow-md"}`}
            >
                <div className="space-y-2">
                    <p className="text-[#adadad] text-lg">Təklif</p>
                    <div className="space-y-1">
                        <p className="text-[#253d4e] text-2xl font-medium">15 % endirim on</p>
                        <p className="text-gray-200 text-xl">
                             <span className={`text-[#3ab77d] font-medium`}>Hamilton Beach</span>
                        </p>
                        <p className="text-[#253d4e] text-xl">Məhsullarında</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default Campaign
