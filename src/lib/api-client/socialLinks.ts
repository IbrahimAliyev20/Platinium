import { SocialLinksType } from "@/types"
import {cookies} from 'next/headers'


export async function getSocialLinks(): Promise<SocialLinksType[]> {
      const cookieStore= await cookies()
      const localeFromCookie = cookieStore.get('NEXT_LOCALE')?.value || 'az'; // fallback to 'az' if not set
    
      
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/sociallinks`, {
        headers: {
            "Accept-Language": localeFromCookie, 
        },
       cache: 'no-store'
    })
    const json = await res.json()
    // console.log(json, 'json products')
    return json.data
}



