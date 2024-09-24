import { BackgroundBeamsWithCollision } from "../ui/background-beams-with-collision";
import { HoverEffect } from "../ui/card-hover-effect";

interface cardData {
    id: string,
    fileId :number | null,
    name: string | null,
    description: string | null,
    moduleCount: number | null
}

export function Card({ projects } : {projects: cardData[]}) {
    const CardsMap = projects?.map((item: cardData) => ({
        id: item?.id,
        imgSrc: item?.fileId && item?.fileId !== 0 ? `${File}${item?.fileId}` : "https://img.freepik.com/free-vector/illustration-social-media-concept_53876-18139.jpg",
        title: item.name ? item.name : "-" ,
        description: item?.description ? item?.description : "-",
        link: "/student/courses/module",
        module: item?.moduleCount ? item?.moduleCount : 0
      }));
    return (
        <BackgroundBeamsWithCollision>
            <div className="w-full mx-auto">
                <HoverEffect items={CardsMap ? CardsMap : []} />
            </div>
        </BackgroundBeamsWithCollision>
    );
}
