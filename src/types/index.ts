

// START POSTS
export type PostType = {
    id: number,
    title: string,
    description: string,
    date: string,
    views: string,
    readTime: string,
    image: string,
}


export type optionsType = {
    loop: boolean,
    speed: number,
    align: string,
    draggable: boolean
}
// POSTS END





// START FAQ 

export type FAQType = {
    question: string
    answer: string
}

// FAQ END




// START VENDORS

export type Vendors = {
    title: string,
    link: string,
    subLink?: string
}
// END VENDORS



// START VENDORS
export type Store = {
    id: string
    name: string
    logo: string
    address: string
    city: string
    state: string
    zip: string
    country: string
    productCount: number
    slug: string
}

// END VENDORS



// START PORTFOLIO

export type Portfolio = {
    title: string,
    link: string | undefined
}
// END PORTFOLIO






// START CATEGORY

export type CategoryType = {
    id: number 
    name: string
    slug: string
    image: string
    thumb_image: string,
    categories: CategoryType[],
    color?: string
}


//END CATEGORY






// START CAMPAIGN

export type CampaignTypes = {
    title?: string
    discountPercentage?: number
    brandName?: string
    productText?: string
    backgroundColor?: string
    brandColor?: string
    href?: string
    className?: string
}

// END CAMPAIGN



// START FILTER
export type FilterOption = {
    value: string | number
    label: string
}

export type ProductFiltersProps = {
    defaultShow?: string | number
    defaultSort?: string
    onShowChange?: (value: string | number) => void
    onSortChange?: (value: string) => void
    className?: string
}

//END FILTER



// START PRODUCTS

export type ProductImage = {
    id: number
    src: string
    alt: string
}

export type ProductInfoCardProps = {
    tags: Array<{ name: string; link: string }>
    shelfLife: string
    stock: number
    className?: string
}

export type SpecificationItem = {
    label: string
    value: string | number | React.ReactNode
}


// END PRODUCTS






// START BANNER

export type BannerType = {
    image: string,
    thumb_image: string,
    title: string
}


// END BANNER





// START ABOUT

export type AboutType = {
    title: string,
    description: string,
    image: string,
    thumb_image: string
}


// END ABOUT



//START WHY US

export type WhyUs = {
    title: string,
    description: string
}

// END WHY US



//START WHY US

export type StatisticType = {
    title: string,
    number: string
}

// END WHY US




//START CLIENTS

export type ClientsType = {
    image: string,
    link: string,
    thumb_image: string
}

// END CLIENTS









//START BRANDS

export type BrandsType = {
    id: number,
    title: string,
    description: string,
    slug: string,
    image: string,
    thumb_image: string,
    meta_title?: string,
    meta_description?: string,
    meta_keywords?: string
}

// END BRANDS





//START BLOG

export type BlogType = {
    title: string,
    description: string,
    slug: string,
    image: string,
    thumb_image: string
    tags: string[],
    created_at: string,
    meta_title?: string,
    meta_description?: string,
    meta_keywords?: string
}

// END BLOG



//START BLOG

export type PortfolioImageType = {
    image: string,
    thumb_image: string
}

export type PortfolioType = {
    title: string,
    description: string,
    slug: string,
    image: string,
    thumb_image: string
    images: PortfolioImageType[],
    meta_title?: string,
    meta_description?: string,
    meta_keywords?: string
}

// END BLOG






//START FOOTER ATTRIBUTES


export type FooterAttrbiutes = {
    title: string,
    description: string,
    image: string,
}

// END FOOTER ATTRIBUTES




//START FOOTER ATTRIBUTES

export type ImagesType = {
    image: string,
    thumb_image: string
}

export type ProductAttributesType = {
    key: string,
    value: string
}

export type ProductsType = {
    name: string,
    description: string,
    slug: string,
    image: string,
    thumb_image: string
    category: string,
    brand: string,
    images: ImagesType[],
    attributes: ProductAttributesType[],
    brand_id?: number,
    category_id?: number,
    meta_title?:string,
    meta_description?:string,
    meta_keywords?:string,
    title?:string,
    id?:number
    brand_slug?: string,
    category_slug?: string,
}

// END FOOTER ATTRIBUTES





//START CONTACT


export type ContactType = {
    address: string,
    phone: string,
    email: string,
    working_hour: string,
    map: string,
    footer_text?: string

}

// END CONTACT



//START SOCIAL LINKS


export type SocialLinksType = {
    name: string,
    link: string,
    image: string,
    thumb_image: string

}

// END SOCIAL LINKS



//START SETTINGS


export type SettingsType = {

    image: string,
    favicon: string

}

// END SETTINGS



//START SETTINGS


export type MediaType = {

    image: string,
    favicon: string,
    thumb_image: string,
    video?: string,
    link?:string,
    
}

// END SETTINGS


export interface MetaData {
    title: string;
    meta_title: string;
    meta_description: string;
    meta_keywords: string;
  }