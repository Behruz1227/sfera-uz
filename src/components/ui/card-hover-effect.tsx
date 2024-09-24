"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { bgColor, bgColorBody, TitleTextColor } from "../Colors";
import { useRouter } from "next/navigation";
import ModuleStore from "@/context/state-management/moduleStore/moduleStore";
import { CardContainer } from "./3d-card";
export const HoverEffect = ({
  items,
  className,
  fallbackUrl,
}: {
  items: {
    title: string;
    description: string;
    link: string;
    imgSrc: string;
    module: number | null;
    id: string;
  }[];
  className?: string;
  fallbackUrl?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const router = useRouter();
  const { setCategoryId } = ModuleStore();

  const handleNavigation = (link: string, categoryid: string) => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push(fallbackUrl || link);
      setCategoryId(categoryid);
    } else {
      router.push("/auth/login");
    }
  };

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 w-full gap-5 py-10",
        className
      )}
    >
      {items && items.length > 0 &&
        items.map((item, idx) => (
          <div
            key={idx}
            className="relative group block p-2 h-full w-full "
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            // Call handleNavigation on click
          >
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className="absolute inset-0 h-full w-ful -z-10 bg-[#93b3ae] block rounded-3xl"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.15 },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, delay: 0.2 },
                  }}
                />
              )}
            </AnimatePresence>
            <CardContainer className="inter-var w-full h-full overflow-hidden z-30">
              <Card
                className="flex flex-col h-full justify-between gap-3"
                imgSrc={item.imgSrc}
              >
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
                <div className="flex items-center justify-between mt-4">
                  <p className={`text-[${bgColorBody}] text-sm font-semibold`}>
                    {item?.module ? item?.module : "0"} ta modul
                  </p>
                  <button
                    onClick={() => handleNavigation(item?.link, item.id)}
                    className="text-[20px] rounded text-white border px-6 pb-1 "
                  >
                    Kirish
                  </button>
                </div>
              </Card>
            </CardContainer>
          </div>
        ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
  imgSrc,
}: {
  className?: string;
  children: React.ReactNode;
  imgSrc: number | string;
}) => {
  return (
    <div
      className={cn(
        `rounded-2xl h-full w-full p-4 overflow-hidden bg-[${bgColor}] shadow-lg relative z-20`,
        className
      )}
    >
      <img
        src={
          imgSrc !== 0
            ? `${imgSrc}`
            : "https://img.freepik.com/free-vector/illustration-social-media-concept_53876-18139.jpg"
        }
        alt="Card Image"
        className="w-full h-40 object-cover rounded-lg"
      />
      <div className="relative text-2xl z-50 mt-4">
        <div className="p-4">
          <span className={`text-[${TitleTextColor}]`}>{children}</span>
        </div>
      </div>
    </div>
  );
};

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4
      className={cn(`text-[${bgColorBody}] font-bold tracking-wide`, className)}
    >
      {children}
    </h4>
  );
};

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-2 text-zinc-400 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      <span className="text-[#E9EFEC]">{children}</span>
    </p>
  );
};
