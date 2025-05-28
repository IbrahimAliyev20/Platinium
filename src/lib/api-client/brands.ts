import { BrandsType } from "@/types"
import {cookies} from 'next/headers'


export const getBrands = async (): Promise<BrandsType[]> => {

    const cookieStore= await cookies()
      const localeFromCookie = cookieStore.get('NEXT_LOCALE')?.value || 'az'; // fallback to 'az' if not set
    

    try {

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/brands`, {
            headers: {
                "Accept-Language": localeFromCookie
            },
            cache: 'no-store'
        }
        )
        const json = await res.json()
        return json.data
    }
    catch (err) {
        console.log(err)
        return []
    }

}