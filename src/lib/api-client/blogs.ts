import { BlogType } from "@/types"
import {cookies} from 'next/headers'


export const getBlogs = async (): Promise<BlogType[]> => {

      const cookieStore= await cookies()
      const localeFromCookie = cookieStore.get('NEXT_LOCALE')?.value || 'az'; // fallback to 'az' if not set
    

    try {

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/blogs`, {
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





export const    getSingleBlog = async (slug:string): Promise<BlogType | undefined> => {
    
    const cookieStore= await cookies()
    const localeFromCookie = cookieStore.get('NEXT_LOCALE')?.value || 'az'; // fallback to 'az' if not set
  
    try {

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/blog/show/${slug}`, {
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