'use client';

import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
import { setCookie } from 'nookies';
import './style.css';
import { ContactType } from '@/types';
import { useTranslations, useLocale } from 'next-intl'; // 🆕 import useLocale!

const TopBar = () => {
  // const router = useRouter();
  const [contact, setContact] = useState<ContactType>();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("")

  const t = useTranslations();
  const locale = useLocale(); // 🆕 Get the current language


  useEffect(() => {
    const getContact = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/contact`, {
        headers: {
          "Accept-Language": locale // 🆕 Dynamic!
        },
        next: { revalidate: 60 }
      });
      const json = await res.json();
      setContact(json.data);
    };

    getContact();
    setCurrentLang(locale.toUpperCase())
  }, [locale]); // 🆕 Add [locale] dependency so it refetches when language changes

  const changeLanguage = (newLocale: string) => {
    setCookie(null, 'NEXT_LOCALE', newLocale, {
      path: '/',
    });
    window.location.reload(); // Refresh to apply new language
    setDropdownOpen(false)
  };

  return (
    <div className="flex justify-between items-center md:mt-2">
      {/* Left Column */}
      <div className="w-full md:block hidden px-4 md:text-gray-500 font-title-500 text-sm text-white">
        {t('topbar.addressLabel')}: {contact?.address}
      </div>

      {/* Right Column */}
      <div className="w-full md:px-4">
        <div>
          <ul className="flex flex-wrap gap-4 md:justify-end justify-center md:bg-transparent bg-[#0f4c9f] md:py-0 py-2">
            <li className="md:text-gray-500 font-title-500 text-[12px] text-white">
              {t('topbar.needHelp')} <a href='tel:+994708884582' className="md:text-[#0f4c9f] text-white">{contact?.phone}</a>
            </li>

            <li className="relative md:text-gray-500 font-title-500 text-sm  cursor-pointer">
              <span
                className="language-dropdown-active flex items-center md:text-black text-white hover:text-blue-500"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                🌐 {currentLang}
                <i className="fi-rs-angle-small-down ml-1"></i>
              </span>

              {dropdownOpen && (
                <ul className="language-dropdown absolute bg-white shadow-md w-[150px] rounded-md mt-1 right-0 z-50">
                  <li>
                    <button
                      className="flex items-center px-4 py-2 hover:bg-gray-100 w-full text-left"
                      onClick={() => changeLanguage('az')}
                    >
                      AZ
                    </button>
                  </li>
                  <li>
                    <button
                      className="flex items-center px-4 py-2 hover:bg-gray-100 w-full text-left"
                      onClick={() => changeLanguage('en')}
                    >
                      EN
                    </button>
                  </li>
                  <li>
                    <button
                      className="flex items-center px-4 py-2 hover:bg-gray-100 w-full text-left"
                      onClick={() => changeLanguage('ru')}
                    >
                      RU
                    </button>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
