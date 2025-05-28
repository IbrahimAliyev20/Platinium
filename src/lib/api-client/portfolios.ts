import { PortfolioType } from "@/types"
import {cookies} from 'next/headers'


export const getPortfolios = async (): Promise<PortfolioType[]> => {

      const cookieStore= await cookies()
      const localeFromCookie = cookieStore.get('NEXT_LOCALE')?.value || 'az'; // fallback to 'az' if not set
    

    try {

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/portfolios`, {
            headers: {
                "Accept-Language": localeFromCookie, 
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





export const getSinglePortfolio = async (slug: string): Promise<PortfolioType | undefined> => {

    const cookieStore= await cookies()
    const localeFromCookie = cookieStore.get('NEXT_LOCALE')?.value || 'az'; // fallback to 'az' if not set
  


    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/portfolio/show/${slug}`, {
            headers: {
                "Accept-Language": localeFromCookie
            },
            next: { revalidate: 60 }
        }
        )
        const json = await res.json()
        return json.data
    }
    catch (err) {
        console.log(err)
    }

}