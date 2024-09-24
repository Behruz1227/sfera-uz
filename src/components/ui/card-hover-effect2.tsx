"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { bgColor, TitleTextColor } from "../Colors";
import { MovingBorder } from "./movingBorder";

interface Item {
  title: string;
  description?: string;
  icon: React.ReactNode; // Ikon komponenti
}

interface HoverEffectProps {
  items: Item[];
  className?: string;
}

export const HoverEffect: React.FC<HoverEffectProps> = ({ items, className }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 gap-5 lg:grid-cols-4 w-full py-10",
        className
      )}
    >
      {items.map((item, idx) => (
        <div
          key={idx}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-[#93b3ae] block rounded-3xl"
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
          <Card
            desc={item.description || "0"}
            title={item.title}
            icon={item.icon}
          />
        </div>
      ))}
    </div>
  );
};

interface CardProps {
  className?: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ className, title, desc, icon }) => {
  return (
    <div className="relative p-[2px] overflow-hidden bg-transparent">
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        <MovingBorder rx="40%" ry="40%">
          <div
            className={cn(
              "h-80 w-80 opacity-[0.8] bg-[radial-gradient(#6A9C89_40%,transparent_60%)]"
            )}
          />
        </MovingBorder>
      </div>
      <div
        className={cn(
          `rounded-2xl h-full w-full antialiased p-4 overflow-hidden bg-[#fff] shadow-lg relative z-20`,
          className
        )}
      >
        <div className="relative text-2xl overflow-hidden z-50 mt-4">
          <span className={`text-[${TitleTextColor}] flex justify-between items-center gap-8 md:px-3`}>
            {icon} <CardDescription>{desc}</CardDescription>
          </span>
          <div className="p-3 flex justify-center">
            <CardTitle>{title}</CardTitle>
          </div>
        </div>
      </div>
    </div>
  );
};

interface CardTitleProps {
  className?: string;
  children: React.ReactNode;
}

export const CardTitle: React.FC<CardTitleProps> = ({ className, children }) => {
  return (
    <h4
      className={cn(
        `text-[${bgColor}] font-bold tracking-wide mt-4 me-5`,
        className
      )}
    >
      {children}
    </h4>
  );
};

interface CardDescriptionProps {
  className?: string;
  children: string | null;
}

export const CardDescription: React.FC<CardDescriptionProps> = ({ className, children }) => {
  return (
    <p
      className={cn(
        `text-[${bgColor}] text-[50px] font-semibold tracking-wide leading-relaxed`,
        className
      )}
    >
      {children}
      {children && children?.length > 2 && "+"}
    </p>
  );
};
