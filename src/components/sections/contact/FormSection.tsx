"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ContactType } from "@/types"
import { useTranslations } from "next-intl"



const FormSection = ({ contact }: { contact: ContactType | undefined }) => {

    type contactType = {
        phone: string
    }

    const [contactPhone, setContactPhone] = useState<contactType[]>([])

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        note: "",
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
    const t = useTranslations();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    useEffect(() => {

        const getNumbers = async () => {
            const contact = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/contact-phone`)
            const response = await contact.json()
            console.log(response, 'response')
            setContactPhone(response.data)
        }

        getNumbers()

    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // console.log(JSON.stringify(formData), 'formData')

        try {

            const sendData = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/contactform`,
                {
                    method: "POST",
                    body: JSON.stringify(formData)
                }
            )
            console.log(sendData, 'sendData')
            setSubmitStatus("success")
            setFormData({
                name: "",
                email: "",
                phone: "",
                subject: "",
                note: "",
            })
        } catch (error) {
            console.log(error)
            setSubmitStatus("error")
        } finally {
            setIsSubmitting(false)
            // Reset status after 3 seconds
            setTimeout(() => setSubmitStatus("idle"), 3000)
        }
    }

    return (
        <div className=" py-20">
            <div className="bg-white flex flex-col gap-4 items-start md:flex-row  rounded-lg overflow-hidden py-10 pr-10">
                <div className="w-full md:w-[70%] pl-10  ">
                    <div className="mb-8">
                        <h2 className="md:text-4xl text-3xl font-title-500 text-gray-800">{t('contact.title')}</h2>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-1 col-span-2">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder={t('contact.firstName')}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                                    required
                                />
                            </div>

                            <div className="md:col-span-1 col-span-2">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder={t('contact.email')}

                                    className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                                    required
                                />
                            </div>

                            <div className="md:col-span-1 col-span-2">
                                <input
                                    type="number"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder={t('contact.phone')}

                                    className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                                />
                            </div>

                            <div className="md:col-span-1 col-span-2">
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder={t('contact.subject')}

                                    className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                                />
                            </div>

                            <div className=" col-span-2">
                                <textarea
                                    name="note"
                                    value={formData.note}
                                    onChange={handleChange}
                                    placeholder={t('contact.message')}

                                    rows={6}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 resize-none"
                                    required
                                ></textarea>
                            </div>
                        </div>

                        <div className="mt-6">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="cursor-pointer px-4 py-2 rounded transition bg-[#0f4c9f] text-white"
                            >
                                {t('contact.sendButton')}
                            </button>

                            {submitStatus === "success" && (
                                <p className="mt-3 text-green-600">{t('contact.noteSent')}</p>
                            )}
                            {submitStatus === "error" && (
                                <p className="mt-3 text-red-600">{t('contact.noteError')}</p>
                            )}
                        </div>
                    </form>
                </div>
                <div className="w-full md:w-[30%] md:block hidden bg-gray-100">
                    <div className="h-[450px] relative rounded-lg ">
                        <Image
                            src="/assets/images/contact.png"
                            alt="Woman talking on phone with laptop"
                            fill
                            className="object-cover rounded-xl"
                            sizes="w-full"
                        />
                    </div>
                </div>
            </div>

            <div className=" px-6 md:px-10 py-16 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 items-start justify-between">
                <div>
                    <div className="text-2xl text-[#0f4c9f] font-title-500 mb-2">{t('contact.phone')}</div>
                    <div>
                        {contactPhone.map((contact, index) => (
                            <div key={index}>
                                {t('contact.phone')}: <a href={`tel:${contact.phone}`} target="_blank">{contact.phone}</a>
                            </div>
                        ))}


                    </div>
                </div>
                <div>
                    <div className="text-2xl text-[#0f4c9f] font-title-500 mb-2"> {t('topbar.email')}</div>
                    <div>

                        <a href="mailto:info@platinium.az">
                            {t('topbar.email')} <span>{contact?.email}</span>
                        </a>
                    </div>
                </div>
                <div>
                    <div className="text-2xl text-[#0f4c9f] font-title-500 mb-2">{t('topbar.addressLabel')}</div>
                    <div>
                        <div>
                            {contact?.address}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormSection
