"use client";

import React, { useEffect } from "react";
import SidebarDemo from "@/components/Sidebar/Sidebar";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { useGet } from "@/context/globalFunctions/useGetOption";
import { File, get_category } from "@/context/api/api";
import { Config } from "@/context/api/token";
import { bgColorBody } from "@/components/Colors";
import { SparklesCore } from "@/components/ui/sparkles";
import Breadcrumbs from "@/components/breadcrumbs/breadcrumbs";

interface coursedata {
  moduleId: number | string | null,
    name: string | null,
    id: string | null,
    description:string | null,
    moduleCount: number | null,
    fileId: number | null,
    
}

const Courses = () => {
  const { data, getData } = useGet(get_category, Config());

  useEffect(() => {
    getData();
  }, []);

  const CardsMap = data?.map((item: coursedata) => ({
    id: item.id,
    imgSrc: item?.fileId && item?.fileId !== 0 ? `${File}${item?.fileId}` : "https://img.freepik.com/free-vector/illustration-social-media-concept_53876-18139.jpg",
    title: item.name,
    description: item.description,
    link: "/student/courses/module",
    module: item?.moduleCount ? item?.moduleCount : 0
  }));

  return (
    <SidebarDemo>
      <title>Sfera uz | Kurslar</title>
      <div className={`relative ${CardsMap && CardsMap.length > 0 ? "p-2 md:p-10 overflow-y-auto" : "p-2 md:p-10 overflow-hidden"} w-full min-h-screen  dark:bg-black bg-[${bgColorBody}] dark:bg-dot-white/[0.2] bg-dot-black/[0.3]`}>
      <Breadcrumbs
          text="Kurslar"
          className=""
          textclassName="tracking-wider"
        />
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-[${bgColorBody}] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

        {CardsMap && CardsMap.length >  0 ? (
          <div className="relative z-10 flex flex-wrap justify-center gap-4 mb-10">
            <HoverEffect items={CardsMap} />
          </div>
        ) : (
          <div className={` w-full h-full flex flex-col items-center justify-center overflow-hidden`}>
            <div className="w-full absolute inset-0 h-screen">
              <SparklesCore
                id="tsparticlesfullpage"
                background="transparent"
                minSize={0.6}
                maxSize={1.4}
                particleDensity={100}
                className="w-full h-full"
                particleColor="#000"
              />
            </div>
            <h1 className={` text-xl bg-transparent font-bold text-center text-[#000] relative z-20`}>
              Kurslar topilmadi☹
            </h1>
          </div>
        )}
      </div>
    </SidebarDemo>
  );
};

export default Courses;
