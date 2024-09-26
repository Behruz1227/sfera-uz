"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { PiStudentBold, PiCodeBold } from "react-icons/pi";
import { BiLogOut } from "react-icons/bi";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Images from "@/assets/ImgSend";
import { useRouter } from "next/navigation";

export default function SidebarDemo({
  children,
}: {
  children?: React.ReactNode;
}) {

  const route = useRouter()
 
  const links = [
    {
      label: "Bosh sahifa",
      href: "/student/dashboard",
      icon: (
        <RiDashboardHorizontalFill className="text-[#E9EFEC] dark:text-neutral-200 h-7 w-7 flex-shrink-0" />
      ),
    },
    {
      label: "Kurslar",
      href: "/student/courses",
      icon: (
        <PiCodeBold className="text-[#E9EFEC] dark:text-neutral-200 h-7 w-7 flex-shrink-0" />
      ),
    },
    {
      label: "Profil",
      href: "/student/profile",
      icon: (
        <PiStudentBold className="text-[#E9EFEC] dark:text-neutral-200 h-7 w-7 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      href: "/auth/login",
      icon: (
        <BiLogOut className="text-[#E9EFEC] dark:text-neutral-200 h-7 w-7 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-[#E9EFEC] overflow-hidden",
        "h-screen" // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {open ? <Logo /> : <LogoIcon />}
          {/* {open ? <LogoIcon /> : <LogoIcon />} */}
            <div className="mt-8 relative ms-2 overflow-hidden flex flex-col gap-2">
              {/* <Meteors number={50} /> */}

              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} onClick={() => {
                  if (link.label === "Logout") {
                    sessionStorage.clear()
                    route.push("/auth/login")
                  }
                }} />
              ))}
            </div>
          </div>
          {/* <div className="w-full relative flex ps-[6px] items-center">
           <Meteors number={50} />

              <SidebarLink
              link={{
              label: getMeeData?.firstName ? "" : "Student",
                href: "#",
                icon: (
                  <Image
                    src={Images.Avatar}
                    className="h-[40px] w-[40px] flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div> */}
        </SidebarBody>
      </Sidebar>
      {children}
    </div>
  );
}
export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        <Image
          src={Images.Logo}
          className="h-[48px] w-[100%] flex-shrink-0"
          alt="Avatar"
        />
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex items-center py-1 relative z-20"
    >
       <Image
          src={Images.LogoMini}
          className="h-[48px] w-[48px]"
          alt="Avatar"
        />
    </Link>
  );
};
