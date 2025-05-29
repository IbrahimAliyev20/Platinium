import Link from "next/link";
import NewsItem from "./NewsItem";
import { getBlogs } from "@/lib/api-client/blogs";
import { getTranslations } from "next-intl/server";


export default async function NewsItems() {
    const t = await getTranslations();

    const blogs=await getBlogs()

    return (
        <section className="container  px-6 py-0 md:py-12 mx-auto">
            <h2 className="text-3xl  md:text-4xl md:ml-0  sm:ml-6 font-title-500 text-[#0F172A] mb-8">
               {t('menu_titles.newsUpdates')}
            </h2>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {blogs.slice(0,3).map((blog,index) => (
                   <NewsItem key={index} blog={blog}/>
                ))}
            </div>

            <div className="mt-8 text-center">
                <Link href='/news'  className='bg-[#0f4c9f] text-white px-6 py-3 rounded-md transition-colors duration-300 inline-flex items-center'
            >
              {t('shared.more')}
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5 ml-2'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z'
                  clipRule='evenodd'
                />
              </svg>
                </Link>
            </div>
        </section>
    );
}
