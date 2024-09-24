'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import Hero from '@/components/Hero/Hero-slide';
import Images from '@/assets/ImgSend';
import Navbar from '@/components/Navbar';
import HeaderTitles from '@/components/Text/HeadText';
import { Card } from '@/components/Cards/Card';
import { bgColorBody } from '@/components/Colors';
import ContactUs from '@/components/Contact/Contact';
import Footer from '@/components/Footer/Footer';
import { useGet } from '@/context/globalFunctions/useGetOption';
import { getCategory } from '@/context/api/api';
import { Config } from '@/context/api/token';

const slideData = [
  {
    title: 'SFETA IT PLATFORM',
    description: `Siz bu platforma orqali bepul kop malumotlar urganishingiz mumkin
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur ratione quod magnam nostrum deleniti? Porro reiciendis, vitae dolorem corrupti perferendis reprehenderit consequuntur odio dolor assumenda repellendus vel molestias officia obcaecati.
    `,
    image: Images.LogonoWord
  },
  {
    title: 'SFETA IT PLATFORM',
    description: `Siz bu platforma orqali bepul kop malumotlar urganishingiz mumkin
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur ratione quod magnam nostrum deleniti? Porro reiciendis, vitae dolorem corrupti perferendis reprehenderit consequuntur odio dolor assumenda repellendus vel molestias officia obcaecati.
    `,
    image: Images.LogonoWord
  },
];



export default function Home() {
  const { data, getData, loading, error } = useGet(getCategory, Config);
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    getData();
  }, []);

  return (
    <div
      style={{ backgroundColor: bgColorBody }}
      className={`w-full bg-[${bgColorBody}] dark:bg-black relative min-h-screen overflow-y-auto bg-[${bgColorBody}] dark:bg-dot-white/[0.2] bg-dot-black/[0.3]`}
    >
      <title>Sfera uz | Dasturlash kurslari</title>
      <Navbar />
      <div className='container my-0'>
        <QueryClientProvider client={queryClient}>
          <Hero slides={slideData} />
        </QueryClientProvider>
        <div>
          <HeaderTitles text='Kursla' size='text-5xl' />

          {loading ? (
            <div className="flex justify-center items-center my-8 text-[#16423C]">
              <div className="spinner-border  animate-spin inline-block w-8 h-8 border-4 rounded-full "></div>
              {/* <p className="ml-2 text-lg"></p> */}
            </div>
          ) : (
            <Card projects={data} />
          )}

          {error && (
            <p className="text-red-500 text-center">Ma&apos;lumotlarni yuklashda xatolik yuz berdi!</p>
          )}

          <HeaderTitles text='Contact us' />
          <ContactUs  />
        </div>
      </div>
      <Footer />
    </div>
  );
}

