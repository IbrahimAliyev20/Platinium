'use client'
import React, { useEffect, useRef, useState } from 'react'
import TopBar from './TopBar'
import Navigation from './Navigation'
import Logo from '@/components/ui/logo'
import MenuIcon from '@mui/icons-material/Menu';
import MobileNavigation from './MobileNavigation'
import './style.css'
import { SettingsType } from '@/types'
import { useLocale } from 'next-intl'

const Header = () => {

    const [mobileMenu, setMobileMenu] = useState(false)
    const [settings, setSettings] = useState<SettingsType | null>(null)
    const headerElement = useRef<HTMLDivElement | null>(null)
    const locale=useLocale()


    useEffect(() => {

        const getSettings = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/settings`, {
                    headers: {
                        "Accept-Language": locale
                    },
                    next: { revalidate: 60 }
                })
                const json = await res.json()
                // console.log(json, 'json products')
                setSettings(json.data)
            }
            catch (err) {
                console.log(err)
            }
        }

        getSettings()

    }, [locale])


    useEffect(() => {

        const handleResize = () => {
            if (window.innerWidth > 768) {
                setMobileMenu(false)
            }
        }
        if (mobileMenu) {
            document.body.style.overflow = 'hidden'
        }
        else {
            document.body.style.overflow = ''
        }

        window.addEventListener('resize', handleResize)

        return () => {
            document.body.style.overflow = ''
            window.removeEventListener('resize', handleResize)
        }

    }, [mobileMenu])



    useEffect(() => {
        const handleScroll = () => {
            if (headerElement.current) {
                if (window.scrollY > 120 && headerElement.current) {
                    headerElement.current.classList.add("fixed-header")
                }
                else {
                    headerElement.current?.classList.remove("fixed-header")
                }
            }
        }
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])




    return (
        <div >
            <TopBar />
            <div
                ref={headerElement}
                className='header px-4 border-y-1 border-gray-200 md:mt-1 transition-all duration-500'
            >
                <div className='flex px-0 md:px-7 items-center py-3  justify-between max-w-[1500px] mx-auto'>
                    {settings && <Logo settings={settings} />}
                    <div className='md:block hidden'>
                        <Navigation />
                    </div>
                    <div
                        onClick={() => setMobileMenu(!mobileMenu)}
                        className='md:hidden block cursor-pointer'
                    >
                        <MenuIcon className='text-gray-500 md:hidden block' fontSize='large' />
                    </div>
                    {mobileMenu && (
                        <div
                            className='fixed top-0 left-0 w-full h-screen bg-black opacity-40 bg-opacity-50 z-40'
                            onClick={() => setMobileMenu(false)}
                        />
                    )}
                    <div
                        className={`${mobileMenu ? 'block' : 'hidden'
                            } fixed top-0 left-0 w-[300px] h-screen bg-white z-50 transition-all duration-300 ease-in-out`}
                    >
                        <div className='flex items-center justify-between p-4 border-gray-200'>
                            <MobileNavigation setMobileMenu={setMobileMenu} />
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default Header