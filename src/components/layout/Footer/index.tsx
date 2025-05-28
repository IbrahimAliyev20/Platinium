
import React from 'react'
import TopFooter from './TopFooter'
import MainFooter from './MainFooter'
import SubFooter from './SubFooter'
import { getSettings } from '@/lib/api-client/settings'
import { getSocialLinks } from '@/lib/api-client/socialLinks'
// import { usePathname } from 'next/navigation'
const Footer = async() => {

  // const params = usePathname()
  const settings = await getSettings()
  const socialLinks = await getSocialLinks()


  return (
    <div  >
      <TopFooter />
     
      <div className='bg-white'>
      <div className=' max-w-[1500px] mx-auto '>
       {settings &&  <MainFooter settings={settings} />}
      </div>

      <div className='max-w-[1500px] mx-auto px-4'>
        <SubFooter socialLinks={socialLinks} />
      </div>
      </div>
    </div>
  )
}

export default Footer