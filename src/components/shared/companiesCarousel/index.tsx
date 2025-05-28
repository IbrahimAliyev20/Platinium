
'use client'

import React, { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';

import './embla.css';
import Image from 'next/image';
import { ClientsType } from '@/types';
import Link from 'next/link';

const CompaniesCarousel = ({ direction }: { direction: string }) => {

    const [companies, setCompanies] = useState<ClientsType[] | []>([])

    const options = {
        loop: true,
        speed: 2,
        align: 'center' as const,
        draggable: true,
    };

    const autoScrollOptions = {
        playOnInit: true,
        speed: direction === 'right' ? -1.3 : 1.3,
        stopOnInteraction: false,
    };

    const [emblaRef, emblaApi] = useEmblaCarousel(options, [
        AutoScroll(autoScrollOptions),
    ]);

    useEffect(() => {

        const fetchCompanies = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/clients`)
                const json = await res.json()
                setCompanies(json.data)
            }
            catch (err) {
                console.log(err)
            }
        }
        fetchCompanies()

    }, [])

    useEffect(() => {
        const autoScroll = emblaApi?.plugins()?.autoScroll;
        if (!autoScroll) return;

        emblaApi
            .on('autoScroll:play', () => { })
            .on('autoScroll:stop', () => { })
            .on('reInit', () => { });
    }, [emblaApi]);

    return (
        <div className="embla" style={{ maxWidth: '2600px', margin: '0 auto' }}>
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                {companies.map((company, index) => (
                        <Link href={company.link} target='_blank' key={index}>
                            <div className="embla__slide" >
                            <div className="bg-white border border-gray-100 rounded-xl  w-36 h-24 flex items-center justify-center p-2">
                  <Image
                    src={company.image}
                    alt={`company-${index}`}
                    width={120}
                    height={60}
                    className="object-contain w-full h-[50px]"
                  />
                </div>
                            </div>
                        </Link>
                        
                    ))}
                </div>
            </div>
        </div>
    );
};



export default CompaniesCarousel