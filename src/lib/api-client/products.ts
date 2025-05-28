'use server'


import { ProductsType } from "@/types"
import {cookies} from 'next/headers'


export async function getProducts(): Promise<ProductsType[]> {
    const cookieStore= await cookies()
    const localeFromCookie = cookieStore.get('NEXT_LOCALE')?.value || 'az'; // fallback to 'az' if not set

    
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/products`, {
        headers: {
            "Accept-Language": localeFromCookie,
        },
 cache: 'no-store'
    })
    const json = await res.json()
    // console.log(json, 'json products')
    return json.data
}



export async function getLastProducts(): Promise<ProductsType[]> {
    const cookieStore= await cookies()
    const localeFromCookie = cookieStore.get('NEXT_LOCALE')?.value || 'az'; // fallback to 'az' if not set

    
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/products-last`, {
        headers: {
            "Accept-Language": localeFromCookie,
        },
 cache: 'no-store'
    })
    const json = await res.json()
    return json.data
}




export async function getSelectedProducts(): Promise<ProductsType[]> {
    const cookieStore= await cookies()
    const localeFromCookie = cookieStore.get('NEXT_LOCALE')?.value || 'az'; // fallback to 'az' if not set

    
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/products-selected`, {
        headers: {
            "Accept-Language": localeFromCookie,
        },
 cache: 'no-store'
    })
    const json = await res.json()
    return json.data
}




export async function getBrendProducts(): Promise<ProductsType[]> {
    const cookieStore= await cookies()
    const localeFromCookie = cookieStore.get('NEXT_LOCALE')?.value || 'az'; // fallback to 'az' if not set

    
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/products/2`, {
        headers: {
            "Accept-Language": localeFromCookie,
        },
 cache: 'no-store'
    })
    const json = await res.json()
    return json.data
}

export async function getSpecialBrands(): Promise<ProductsType[]> {
    const cookieStore= await cookies()
    const localeFromCookie = cookieStore.get('NEXT_LOCALE')?.value || 'az'; 

    
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/special-brands`, {
        headers: {
            "Accept-Language": localeFromCookie,
        },
 cache: 'no-store'
    })
    const json = await res.json()
    return json.data
}






export async function getSingleProduct(slug: string): Promise<ProductsType> {
    const cookieStore= await cookies()
    const localeFromCookie = cookieStore.get('NEXT_LOCALE')?.value || 'az'; // fallback to 'az' if not set

    
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/products/show/${slug}`, {
        headers: {
            "Accept-Language": localeFromCookie,
        },
        cache: 'no-store'
    })
    const json = await res.json()
    // console.log(json, 'json products')
    return json.data.data
}




export async function getRelatedProducts(slug: string): Promise<ProductsType[]> {
   
    const cookieStore= await cookies()
    const localeFromCookie = cookieStore.get('NEXT_LOCALE')?.value || 'az'; // fallback to 'az' if not set

    
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/products/show/${slug}`, {
        headers: {
            "Accept-Language": localeFromCookie,
        },
        next: { revalidate: 60 }
    })
    const json = await res.json()
    // console.log(json, 'json products')
    return json.data.related_product
}









