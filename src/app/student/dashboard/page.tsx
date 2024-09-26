"use client";
import React, { useEffect } from "react";
import SidebarDemo from "@/components/Sidebar/Sidebar";
import { useGet } from "@/context/globalFunctions/useGetOption";
import { HoverEffect } from "@/components/ui/card-hover-effect2";
import { FaCode, FaCodeBranch, FaUserGraduate } from "react-icons/fa";
import { bgColor, BorderColor } from "@/components/Colors";
import { get_news, get_stats } from "@/context/api/api";
import { Config } from "@/context/api/token";
import { ThreeDCardDemo } from "@/components/ui/ThreeDCard";
import Breadcrumbs from "@/components/breadcrumbs/breadcrumbs";
import { LuBookCopy } from "react-icons/lu";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

const Dashboard = () => {
  const { data, getData } = useGet(`${get_stats}`, Config());
  const { data: newsData, getData: getNewsData } = useGet(
    get_news,
    Config()
  );

  useEffect(() => {
    // getData();
    getNewsData();
  }, []);

  // Function to format numbers based on their length
  const formatNumber = (number: number) => {
    if (number === 0) return "0"; // If the number is undefined, return an empty string

    const numStr = number?.toString();
    const length = numStr?.length;

    if (length <= 3) {
      return numStr; // Less than or equal to 3 digits, return as is
    } else if (length > 3 && length <= 6) {
      return `${numStr.slice(0, -3)}k`; // More than 3 digits but less than or equal to 6, add 'k'
    } else if (length > 6) {
      return `${numStr.slice(0, -6)}mln`; // More than 6 digits, add 'mln'
    }
  };

  const CardsMap = [
    {
      icon: <FaUserGraduate className={`text-[${bgColor}]`} size={50} />,
      title: "O'quvchilar",
      description: formatNumber(data?.studentCount), // Apply formatting
    },
    {
      icon: <FaCode className={`text-[${bgColor}]`} size={50} />,
      title: "Kurslar",
      description: formatNumber(data?.categoryCount), // Apply formatting
    },
    {
      icon: <FaCodeBranch className={`text-[${bgColor}]`} size={50} />,
      title: "Modullar",
      description: formatNumber(data?.moduleCount), // Apply formatting
    },
    {
      icon: <LuBookCopy className={`text-[${bgColor}]`} size={50} />,
      title: "Darslar",
      description: formatNumber(data?.lessonCount), // Apply formatting
    },
  ];

  return (
    <SidebarDemo>
      <title>Sfera uz | Bosh sahifa</title>
      <div className="relative p-2 md:p-10 w-full min-h-screen overflow-y-auto dark:bg-black bg-[${bgColorBody}] dark:bg-dot-white/[0.2] bg-dot-black/[0.3]">
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-[${bgColorBody}] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <Breadcrumbs
          text="Dashboard"
          className=""
          textclassName="tracking-wider"
        />

        {/* <div className="relative z-10 flex flex-wrap justify-center gap-4">
          <HoverEffect items={CardsMap ? CardsMap : []} />
        </div> */}
        <div
          className={`flex justify-center items-center text-[${BorderColor}] pb-12`}
        >
          <div className="text-[50px] tracking-wider ">
            {newsData.length > 0 && <TextGenerateEffect words={'Xabarlar!'} />}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-y-10 gap-5">
          {newsData.length > 0 &&
            newsData.map((item: {content: string | null, title: string | null, id: string, fileId: number | null}) => (
              <ThreeDCardDemo
                desc={item?.content ? item?.content : ""}
                imgSrc={
                  item?.fileId
                    ? `http://142.93.106.195:8080/file/files/${item?.fileId}`
                    : "https://familytherapytrainingnetwork.org/wp-content/uploads/2018/02/news-2.jpg"
                }
                title={item.title ? item?.title : ""}
                key={item.id}
              />
            ))}
        </div>
      </div>
    </SidebarDemo>
  );
};

export default Dashboard;
