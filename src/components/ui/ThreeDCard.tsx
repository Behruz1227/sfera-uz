"use client";

import React from "react";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";

export function ThreeDCardDemo({
  title,
  desc,
  imgSrc,
}: {
  title: string;
  desc: string;
  imgSrc: string;
}) {
  return (
    <CardContainer className="inter-var">
      {/* <AuroraBackground> */}
        <CardBody className="relative group/card bg-gradient-to-b from-[#7bc0a5] via-[#8cb2a2] to-[#98d4bd] flex flex-col justify-between dark:hover:shadow-2xl border-black/[0.1] w-auto h-full rounded-xl p-6 border  ">
          <CardItem
            translateZ="50"
            className="text-xl font-bold text-[#f5fbf8] dark:text-white"
          >
            {title}
          </CardItem>
          <CardItem
            as="p"
            translateZ="60"
            className="text-[#E9EFEC] text-sm max-w-sm mt-2 "
          >
            {desc}
          </CardItem>
          <CardItem translateZ="100" className="w-full mt-4">
            <img
              src={imgSrc}
              height="1000"
              width="1000"
              className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
              alt="thumbnail"
            />
          </CardItem>
        </CardBody>
      {/* </AuroraBackground> */}
    </CardContainer>
  );
}
