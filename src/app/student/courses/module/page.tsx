"use client";
import React, {useEffect, useState} from "react";
import SidebarDemo from "@/components/Sidebar/Sidebar";
import {useGet} from "@/context/globalFunctions/useGetOption";
import {useInitializeModuleStore} from "@/context/state-management/moduleStore/moduleStore";
import {SparklesCore} from "@/components/ui/sparkles";
import {bgColor, bgColorBody, BorderColor} from "@/components/Colors";
import ModuleSidebar from "@/components/Sidebar/moduleSidebar";
import VideoPlayer from "@/components/vedioJs/vedioJsProps";
import {Config} from "@/context/api/token";
import {get_lesson, get_module, post_question} from "@/context/api/api";
import {useLessonStore} from "@/context/state-management/lessonStore/lossonStore";
import {RadioGroup} from "@headlessui/react";
import {
    RiCheckboxBlankCircleLine,
    RiCheckboxCircleFill,
} from "react-icons/ri";
import {usePost} from "@/context/globalFunctions/usePostOption";
import Breadcrumbs from "@/components/breadcrumbs/breadcrumbs";
import toast from "react-hot-toast";
import useModuleStore from "@/context/state-management/moduleStore/moduleStore";

interface lessondata {
    moduleId: number | string | null,
    name: string | null,
    id: string | null,
    description: string | null,
    videoLink: string | null,
    videoTime: number | string | null,
    userActive: boolean | null,
    lessonId: number | string | null
}

interface moduledata {
    moduleId: number | string | null,
    name: string | null,
    lessonCount: number | string | null,
}

interface questiondata {
    id: number | null,
    name: string | null,
    optionDto: []
}

interface optiondata {
    id: number | string | null,
    answer: string | null,
}

const Module = () => {
    useInitializeModuleStore()
    const {CategoryId, VedioLink} = useModuleStore();
    const {
        questionData,
        setNextLessonId,
        nextLessonId,
        setCurrentLessonId,
        currentLessonId,
        result,
        setResult,
    } = useLessonStore();

    const {data, getData} = useGet(`${get_module}${CategoryId}`, Config());
    const {error: questionError, loading: postLoading, postData, response: questionResponse} = usePost(
        `${post_question}${currentLessonId}?nextLessonId=${nextLessonId}`,
        result,
        Config()
    );
    const {data: lessonData, getData: getLesson} = useGet(`${get_lesson}${CategoryId}`, Config());

    const [selectedAnswers, setSelectedAnswers] = useState<{
        [key: number]: number;
    }>({});

    useEffect(() => {
        getData();
        getLesson();
    }, []);

    useEffect(() => {
        if (questionResponse) {
            toast.success(questionResponse)
            getLesson();
        } else if (questionError) toast.error(questionError?.message)
    }, [questionError, questionResponse]);

    const modules = data?.map((item: moduledata) => ({
        moduleId: item?.moduleId,
        name: item?.name,
        lessonCount: item?.lessonCount,
    }));

    const lessons = lessonData?.map((item: lessondata) => ({
        moduleId: item?.moduleId,
        name: item?.name,
        lessonId: item?.id,
        description: item?.description,
        videoLink: item?.videoLink,
        videoTime: item?.videoTime,
        lessonActive: item?.userActive,
    }));

    // Handle answer selection
    const handleSelectAnswer = (questionId: number, optionId: number) => {
        setSelectedAnswers((prev) => ({...prev, [questionId]: optionId}));
    };

    // Testni yakunlash
    const handleFinishTest = async () => {
        try {
            // Step 1: Get the current lessonId from the questionData
            const currentLessonIdToSet =
                questionData?.length > 0 ? questionData[0].lessonId : null;
            setCurrentLessonId(currentLessonIdToSet);

            // Step 2: Find the current lesson index from the lessons array
            const currentLessonIndex = lessons?.findIndex(
                (lesson: lessondata) => lesson?.lessonId === currentLessonIdToSet
            );

            // Step 3: Get the next lessonId if it exists
            const nextLessonIdToSet =
                currentLessonIndex !== -1 && currentLessonIndex + 1 < lessons.length
                    ? lessons[currentLessonIndex + 1].lessonId
                    : null;
            setNextLessonId(nextLessonIdToSet);

            // Step 4: Collect selected answers for the result
            const finalResultData = Object.keys(selectedAnswers).map(
                (questionId) => ({
                    questionId: Number(questionId),
                    optionId: selectedAnswers[Number(questionId)],
                })
            );
            setResult(finalResultData);

            // console.log("Test yakunlandi, final result:", finalResult);

            // Step 5: Wait for setCurrentLessonId, setNextLessonId, and setResult to finish
            // Then call postData()
            await postData();

            // Step 6: Reset selected answers after finishing the test
            setSelectedAnswers({}); // This will clear the selected answers
        } catch (error) {
            // console.error("Error finishing the test:", error);
        }
    };

    console.log(lessons)
    return (
        <SidebarDemo>
            <title>Sfera uz | Modul</title>
            <div
                className={`relative w-full min-h-screen overflow-y-auto dark:bg-black bg-[${bgColorBody}] dark:bg-dot-white/[0.2] bg-dot-black/[0.3]`}
            >
                <div
                    className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-[${bgColorBody}] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
                <div className=" w-full lg:pe-[315px] my-10 p-2 md:px-10">
                    <Breadcrumbs text="Lesson" className=""/>
                </div>
                {data ? (
                    <div className="flex w-full justify-between">
                        <div className="flex flex-col w-full lg:mr-[277px] p-2 md:px-10">
                            {/* Video Player */}
                            <VideoPlayer
                                videoId={
                                    VedioLink
                                        ? "VedioLink"
                                        : "eMQGZHOcw2U"
                                }
                            />
                            <div className={`mt-4 p-4 bg-[${bgColor}] rounded-md`}>
                                {questionData?.length > 0 ? (
                                    <div>
                                        {questionData.map((question: questiondata) => (
                                            <div key={question?.id} className="mb-6">
                                                <h3 className="text-xl font-semibold text-[#16423C] mb-3">
                                                    {question?.name}
                                                </h3>
                                                <RadioGroup
                                                    value={selectedAnswers[question?.id ? question?.id : 0]}
                                                    onChange={(value: number) =>
                                                        handleSelectAnswer(question?.id ? question?.id : 0, value)
                                                    }
                                                    className="space-y-2"
                                                >
                                                    {question.optionDto.map((option: optiondata) => (
                                                        <RadioGroup.Option
                                                            key={option?.id}
                                                            value={option?.id}
                                                            className={({
                                                                            checked,
                                                                        }: {
                                                                checked: boolean;
                                                            }) =>
                                                                `flex items-center p-2 rounded-lg cursor-pointer bg-white shadow-md ${checked
                                                                    ? "border-2 border-[#6A9C89]"
                                                                    : "border border-gray-300"
                                                                }`
                                                            }
                                                        >
                                                            {({checked}: { checked: boolean }) => (
                                                                <>
                                                                    {checked ? (
                                                                        <RiCheckboxCircleFill
                                                                            className="text-[#6A9C89] text-2xl mr-2"/>
                                                                    ) : (
                                                                        <RiCheckboxBlankCircleLine
                                                                            className="text-[#6A9C89] text-2xl mr-2"/>
                                                                    )}
                                                                    <span className="text-lg text-[#16423C]">
                                    {option?.answer}
                                  </span>
                                                                </>
                                                            )}
                                                        </RadioGroup.Option>
                                                    ))}
                                                </RadioGroup>
                                            </div>
                                        ))}
                                        <div className="w-full flex justify-center ">
                                            <button
                                                onClick={handleFinishTest}
                                                className={` py-2 px-5 mt-4 bg-[${BorderColor}] text-[${bgColorBody}] font-semibold text-lg rounded-md hover:bg-[#54907F]`}
                                            >
                                                {postLoading ? "Loading.." : "Testni yakunlash"}
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-[#16423C]">No questions available.</p>
                                )}
                            </div>
                        </div>
                        <ModuleSidebar modules={modules} lessons={lessons}/>
                    </div>
                ) : (
                    <div
                        className="h-screen relative w-full flex flex-col items-center justify-center overflow-hidden rounded-md">
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
                        <h1 className="md:text-5xl text-3xl bg-transparent lg:text-6xl font-bold text-center text-[#000] relative z-20">
                            Modul topilmadi
                        </h1>
                    </div>
                )}
            </div>
        </SidebarDemo>
    );
};

export default Module;
