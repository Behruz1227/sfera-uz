"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RiArrowDropDownLine, RiDashboardHorizontalFill } from "react-icons/ri";
import { cn } from "@/lib/utils";
import { useLessonStore } from "@/context/state-management/lessonStore/lossonStore";
import ModuleStore from "@/context/state-management/moduleStore/moduleStore";
import { FaLock } from "react-icons/fa";
import { useGet } from "@/context/globalFunctions/useGetOption";
import { config } from "@/context/api/token";
import { get_question } from "@/context/api/api";

export interface ModuleSidebarProps {
  modules: { moduleId: number; name: string; categoryId: number }[];
  lessons: {
    moduleId: number | null;
    name: string | null;
    lessonId: number;
    description: string | null;
    videoLink: string | null;
    videoTime: number | null;
    userActive: boolean | null;
  }[];
}

const ModuleSidebar: React.FC<ModuleSidebarProps> = ({ modules, lessons }) => {
  const { setVedioLink } = ModuleStore();
  const { setSelectedLessonId, selectedLessonId, setquestionData } = useLessonStore();
  const { data, getData } = useGet(`${get_question}${selectedLessonId}`, config);
  const [activeModule, setActiveModule] = useState<number | null>(null);
  const [initialLoadDone, setInitialLoadDone] = useState<boolean>(false);

  useEffect(() => {
    // Handle initial load and set initial lesson
    if (!initialLoadDone && modules?.length > 0 && lessons?.length > 0) {
      const firstModule = modules[0];
      const firstModuleLessons = lessons.filter(
        (lesson) => lesson.moduleId === firstModule.moduleId
      );

      if (firstModuleLessons?.length > 0) {
        setActiveModule(firstModule.moduleId);
        setSelectedLessonId(firstModuleLessons[0].lessonId);
        setVedioLink(firstModuleLessons[0].videoLink);
        setInitialLoadDone(true);
      }
    }
  }, [lessons, modules, initialLoadDone, setSelectedLessonId, setVedioLink]);

  useEffect(() => {
    if (initialLoadDone || selectedLessonId) {
      getData();
    }
  }, [selectedLessonId, initialLoadDone]);

  useEffect(() => {
    setquestionData(data);
  }, [data]);

  // Handle module toggle
  const toggleAccordion = (moduleId: number) => {
    setActiveModule((prevModule) => (prevModule === moduleId ? null : moduleId));
  };

  // Handle lesson click
  const handleLessonClick = (lessonId: number, videoLink: string | null) => {
    setSelectedLessonId(lessonId);
    setVedioLink(videoLink);
  };

  return (
    <motion.div
      className={cn(
        "h-screen fixed top-0 right-0 px-4 py-4 hidden lg:flex md:flex-col bg-[#16423C] w-[300px] text-[#E9EFEC] shadow-lg"
      )}
      animate={{ width: "280px" }}
    >
      <div className="flex relative flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* <Meteors number={30} /> */}

        <div className="flex items-center mb-6">
          <RiDashboardHorizontalFill className="text-[#6A9C89] text-2xl" />
          <h1 className="text-xl ml-2 font-semibold">Modules</h1>
        </div>

        <div className="space-y-4">
          {modules?.map((module) => (
            <div key={module.moduleId}>
              <div
                className="flex justify-between items-center cursor-pointer px-4 py-2 rounded-md bg-[#6A9C89] hover:bg-[#54907F] transition"
                onClick={() => toggleAccordion(module.moduleId)}
              >
                <span className="font-medium text-lg">{module.name}</span>
                <RiArrowDropDownLine
                  className={`text-2xl transition-transform ${activeModule === module.moduleId ? "rotate-180" : ""
                    }`}
                />
              </div>

              <AnimatePresence>
                {activeModule === module.moduleId && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden bg-[#E9EFEC] text-[#16423C] rounded-md mt-2"
                  >
                    <ul className="p-4 space-y-2">
                      {lessons
                        ?.filter((lesson) => lesson.moduleId === module.moduleId)
                        .map((lesson, i) => (
                          <li key={i}
                            className={`text-base flex justify-between w-full items-center cursor-pointer transition ${lesson?.userActive
                                ? selectedLessonId === lesson.lessonId
                                  ? "text-[#16423C] font-bold"
                                  : "hover:text-[#6A9C89]"
                                : "text-[#B0B0B0] cursor-not-allowed"
                              }`}
                            onClick={() =>
                              lesson?.userActive
                                ? handleLessonClick(lesson.lessonId, lesson.videoLink)
                                : undefined
                            }
                          >
                            <span>{lesson.name || "No name"}</span>
                            {!lesson?.userActive && <FaLock />}
                          </li>
                        ))}
                      {lessons.every((lesson) => lesson.moduleId !== module.moduleId) && (
                        <li className="text-base cursor-pointer transition text-[#6A9C89] font-bold">
                          Darslik topilmadi
                        </li>
                      )}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ModuleSidebar;
