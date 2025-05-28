import { MediaType } from "@/types"
import { cookies } from 'next/headers'

export async function getPhotos(page: number = 1): Promise<{ data: MediaType[], nextUrl: string | null }> {
  const cookieStore = await cookies()
  const localeFromCookie = cookieStore.get('NEXT_LOCALE')?.value || 'az'

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/photos?page=${page}`, {
      headers: {
        "Accept-Language": localeFromCookie,
      },
      cache: 'no-store'
    })
    if (!res.ok) {
      console.error("Failed to fetch photos:", res.statusText)
      return { data: [], nextUrl: null }
    }
    const json = await res.json()
    return {
      data: json.data || [],
      nextUrl: json.links?.next || null
    }
  } catch (error) {
    console.error("Error fetching photos:", error)
    return { data: [], nextUrl: null }
  }
}