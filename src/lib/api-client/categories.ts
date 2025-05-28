import { CategoryType } from "@/types"
import {cookies} from 'next/headers'


export async function getCategories(): Promise<CategoryType[]> {
    const cookieStore= await cookies()
    const localeFromCookie = cookieStore.get('NEXT_LOCALE')?.value || 'az'; // fallback to 'az' if not set
  
   
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/categories`, {
        headers: {
            "Accept-Language": localeFromCookie, 
        },
         cache: 'no-store'
    })
    const json = await res.json()
    // console.log(json, 'json categories')
    return json.data
}