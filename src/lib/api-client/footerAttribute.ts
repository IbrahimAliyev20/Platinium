import { FooterAttrbiutes } from "@/types"
import {cookies} from 'next/headers'


export async function getFooterAttribute(): Promise<FooterAttrbiutes[]> {
    const cookieStore= await cookies()
    const localeFromCookie = cookieStore.get('NEXT_LOCALE')?.value || 'az'; // fallback to 'az' if not set
  

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/attributes`, {
        headers: {
            "Accept-Language": localeFromCookie, 
        },
        cache: 'no-store'
    })
    const json = await res.json()
    // console.log(json, 'attributes faq')
    return json.data
}