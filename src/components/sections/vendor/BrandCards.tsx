import Image from "next/image";
import { getBrands } from "@/lib/api-client/brands";
import { ArrowRightIcon } from "lucide-react";
import ToggleDescription from "./ToggleDescription";
import Link from "next/link";
import { BrandsType } from "@/types";
import { getTranslations } from "next-intl/server";

const BrandCards = async () => {
  const brands = await getBrands();
  const t = await getTranslations()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-3 grid-cols-1 lg:grid-cols-4 gap-6">
        {brands.map((brand: BrandsType, index: number) => {
          const { title, image, description, slug } = brand;

          return (
            <div
              key={index}
              className="bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="pt-6 pl-6 pr-6 pb-3 flex flex-col justify-between h-full">
                {/* Logo */}
                <div className="mb-4 h-[100px] relative">
                  <Image
                    src={image && image !== "null" ? image : "/assets/placeholder"}
                    alt={`${title} image`}
                    width={180}
                    height={48}
                    className="object-contain w-full h-full"
                  />
                </div>

                {/* Title + Description */}
                <div className="flex flex-col items-start justify-between mb-2">
                  <h3 className="text-lg font-medium text-gray-900">{title}</h3>
                  <ToggleDescription text={description} />

                  <Link
                    href={`/products?brand_id=${slug}`}
                    className="flex items-center bg-[#0f4c9f] text-white py-1 px-4 text-[15px] font-title-500 rounded-[5px] mt-3"
                  >
                    {t('buttons.viewProducts')} <ArrowRightIcon className="w-3 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BrandCards;
