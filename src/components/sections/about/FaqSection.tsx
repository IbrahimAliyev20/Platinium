"use client"

import { useEffect, useState } from "react"
import { Plus, Minus } from "lucide-react"
import { FAQType } from "@/types"
import { useLocale, useTranslations } from "next-intl"

const FaqSection = () => {
  const t = useTranslations();
  const [openIndex, setOpenIndex] = useState<number | null>(null)
 const locale = useLocale();
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index)
  }

  const [faqs, setFaqs] = useState<FAQType[] | []>([])

  useEffect(() => {

    const getFaqs = (async () => {

      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/faqs`, {
        headers: {
          "Accept-Language": locale
        },
        next: { revalidate: 60 }
      })
      const json = await res.json()
      setFaqs(json.data)
    })

    getFaqs()

  }, [locale])

  return (
    <section id='faq-section' className="max-w-3xl mx-auto sm:py-12 py-0 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-title-500 text-gray-900">{t('faq.title')}</h2>
        <p className="mt-4 text-lg text-gray-600">{t('faq.description')}.</p>
      </div>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className="border-b border-gray-200 pb-6 transition-all duration-300 ease-in-out"
          >
            <button
              className="flex justify-between items-center w-full text-left focus:outline-none group"
              onClick={() => toggleFAQ(index)}
            >
              <h3 className="text-lg font-medium text-gray-900 transition-colors duration-200 group-hover:text-gray-700">
                {faq.question}
              </h3>
              <span className="ml-6 flex-shrink-0 transition-transform duration-200">
                {openIndex === index ? (
                  <Minus className="h-5 w-5 text-gray-500 transform rotate-0" />
                ) : (
                  <Plus className="h-5 w-5 text-gray-500 transform group-hover:rotate-90" />
                )}
              </span>
            </button>
            <div 
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === index 
                  ? 'max-h-96 opacity-100 mt-4' 
                  : 'max-h-0 opacity-0 mt-0'
              }`}
            >
              <div className="pr-12">
                <p className="text-base text-gray-600">{faq.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default FaqSection