import { MetaData } from '@/types';
import {cookies} from 'next/headers'


export async function getMetaData(): Promise<MetaData[]> {
    const cookieStore= await cookies()
    const localeFromCookie = cookieStore.get('NEXT_LOCALE')?.value || 'az'; // fallback to 'az' if not set
  

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/metatags`, {
        headers: {
            "Accept-Language": localeFromCookie, 
        },
        cache: 'no-store'
    })
    const json = await res.json()
    
    return json.data
}