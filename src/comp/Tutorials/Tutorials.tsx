import Link from "next/link";
import { BitcoinBasics } from "@/utils/TUTORIALS";

import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import {
  UserHistory,
  menuOpen,
  moduleAndChapterAtom,
  moduleStructureAtom,
  paymentAtom,
  percentageLessons,
  smallestLessonHrefAtom,
  smallestLessonIdAtom,
  smallestLessonTitleAtom,
  smallestLessonTypeAtom,
  totalChaptersAtom,
  totalModulesAtom,
  tutorialBuyModal,
  userHistoryAtom,
  userLessons,
} from "../atom";
import { trpc } from "@/utils/trpc";
import BuyingOptionsTutorials from "./BuyingOptionsTutorials";
import TutorialsList from "./TutorialsList";
import ListItem from "./ListContent";
import BuyingOptions from "../Profile/BuyingOptions";

type LessonData = {
  id: number;
  createdAt: Date;
  userId: number;
  completed: boolean;
  lessonId: number;
};

const Tutorials = () => {
  const [selectedView, setSelectedView] = useState("roadmap");
  const [payment, setPayment] = useAtom(paymentAtom);
  const [showBuyingOptions, setShowBuyingOptions] = useAtom(tutorialBuyModal);
  const [userLessonsArray, setUserLessonsArray] = useAtom(userLessons);
  const [completionPercentage, setCompletionPercentage] =
    useAtom(percentageLessons);
  const [moduleStructure, setModuleStructure] = useAtom(moduleStructureAtom);
  const [smallestLessonTitle, setSmallestLessonTitle] = useAtom(
    smallestLessonTitleAtom
  );
  const [smallestLessonHref, setSmallestLessonHref] = useAtom(
    smallestLessonHrefAtom
  );
  const [smallestLessonType, setSmallestLessonType] = useAtom(
    smallestLessonTypeAtom
  );
  const [smallestLessonId, setSmallestLessonId] = useAtom(smallestLessonIdAtom);
  const [moduleAndChapter, setModuleAndChapter] = useAtom(moduleAndChapterAtom);
  const [totalModules, setTotalModules] = useAtom(totalModulesAtom);
  const [totalChapters, setTotalChapters] = useAtom(totalChaptersAtom);

  // console.log("MODULE AND CHAPTER", moduleAndChapter);
  // console.log("Module Structure", moduleStructure);

  // console.log("smallest lesson title", smallestLessonTitle);

  const [userHistory, setUserHistory] = useAtom(userHistoryAtom);
  const createLessonEvent = trpc.createLessonEvent.useMutation();
  const [isMenuOpen] = useAtom(menuOpen);

  type ModuleAccumulator = {
    [key: string]: {
      module: string;
      sections: number;
      lessons: number;
      lessonTitles: string[];
    };
  };

  // Create a new array that aggregates the sections and lessons by module
  const aggregatedModules = Object.values(
    moduleStructure.reduce(
      (acc: ModuleAccumulator, { module, section, lessons, lessonTitles }) => {
        // If the module doesn't exist in the accumulator, add it
        if (!acc[module]) {
          acc[module] = { module, sections: 0, lessons: 0, lessonTitles: [] };
        }
        // Increment the section count for this module
        acc[module].sections += 1;
        // Add the number of lessons from this section to the total lesson count for the module
        acc[module].lessons += lessons;
        // Concatenate the lesson titles for this section to the existing lesson titles array
        acc[module].lessonTitles =
          acc[module].lessonTitles.concat(lessonTitles);
        return acc;
      },
      {}
    )
  );

  trpc.fetchUserHistory.useQuery(undefined, {
    refetchOnMount: true,
    onSuccess: (data) => {
      if (data !== undefined) {
        const filteredData = data.filter((d) => {
          return {
            id: d.id,
            createdAt: new Date(d.createdAt),
            userId: d.userId,
            metadata: d.metadata,
          } as UserHistory;
        });
        setUserHistory(filteredData as any);
      }
    },
  });

  const handleStartLessonClick = (lessonId: number) => {
    // Only proceed if payment.hasAccess is true
    if (payment && payment.hasAccess) {
      createLessonEvent.mutate({
        lessonId: lessonId,
      });
      console.log("Lesson Event", createLessonEvent);
    } else {
      console.log("Won't update any records");
    }
  };

  if (isMenuOpen === true) {
    return null;
  }

  return (
    <div className="mb-10 ml-10 mr-10 mt-10 md:ml-[260px]">
      {showBuyingOptions && <BuyingOptions />}

      <div className="flex flex-col text-black">
        <p className="font-extralight">Tutorials</p>

        {payment?.hasAccess === true ? (
          <div className="mt-5 flex w-full flex-col lg:flex-row">
            <button className="flex w-full flex-col items-start justify-center rounded-2xl bg-[#0C071D] px-10 py-7 lg:flex-row lg:justify-between">
              <div className="flex w-full flex-col items-center justify-center lg:items-start">
                <p className="gradient-text text-[30px] font-semibold lg:text-[38px]">
                  Welcome back
                </p>
                <p className="mt-2 text-[12px] text-white lg:text-left lg:text-[16px]">
                  Keep up the great work! Learning is key to unlocking endless
                  possibilites
                </p>
              </div>
              <div className="flex w-full flex-col items-center lg:items-end">
                <div className="mt-2 flex flex-row items-center justify-center lg:mt-0">
                  <div className="relative h-[8px] w-[202px] rounded-full bg-[#393939]">
                    <div
                      className="h-[8px] rounded-full bg-[#5DDE44]"
                      style={{ width: `${completionPercentage}%` }}
                    ></div>
                  </div>
                  <p className="hidden text-[10px] text-[#393939] lg:ml-3 lg:flex lg:text-[16px]">
                    {completionPercentage}% Complete
                  </p>
                  <p className="ml-3 flex text-[14px] text-[#393939] lg:hidden lg:text-[16px]">
                    {completionPercentage}%
                  </p>
                </div>
              </div>
            </button>
            <Link
              className=" mt-5 flex flex-col rounded-2xl bg-white px-10 py-7 text-[#687588] lg:ml-5 lg:mt-0 lg:w-[500px]"
              href={smallestLessonHref}
              onClick={() => handleStartLessonClick(smallestLessonId)}
            >
              <div className="flex w-full flex-row justify-between">
                <div className="flex flex-col items-start">
                  <div className="flex flex-row text-[12px]">
                    <p className="font-extralight">
                      Module{" "}
                      {moduleAndChapter.module === "Legacy Transaction" ? (
                        <span className="font-semibold">1</span>
                      ) : moduleAndChapter.module === "Witness Transaction" ? (
                        <span className="font-semibold">2</span>
                      ) : moduleAndChapter.module === "Taproot Transaction" ? (
                        <span className="font-semibold">3</span>
                      ) : (
                        <span className="font-semibold">unknown</span>
                      )}
                    </p>
                    <p className="ml-1 font-extralight">
                      | Chapter{" "}
                      <span className="font-semibold">
                        {moduleAndChapter.chapter}
                      </span>
                    </p>
                  </div>

                  <p className="text-[12px] text-black lg:text-[16px]">
                    {smallestLessonTitle}
                  </p>
                </div>
                {smallestLessonType === "video" ? (
                  <div className="flex h-[40px] w-[40px] flex-row items-center justify-center rounded-2xl bg-[#F0F0F0] lg:h-[40px] lg:w-[280px]">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.625 2.25H6.375C3.715 2.25 2.25 3.715 2.25 6.375V17.625C2.25 20.285 3.715 21.75 6.375 21.75H17.625C20.285 21.75 21.75 20.285 21.75 17.625V6.375C21.75 3.715 20.285 2.25 17.625 2.25ZM20.25 6.375V8.25H15.75V3.75H17.625C19.465 3.75 20.25 4.535 20.25 6.375ZM9.75 8.25V3.75H14.25V8.25H9.75ZM6.375 3.75H8.25V8.25H3.75V6.375C3.75 4.535 4.535 3.75 6.375 3.75ZM17.625 20.25H6.375C4.535 20.25 3.75 19.465 3.75 17.625V9.75H20.25V17.625C20.25 19.465 19.465 20.25 17.625 20.25ZM14.973 13.115L11.825 11.188C11.303 10.868 10.647 10.856 10.114 11.155C9.57301 11.458 9.25098 12.008 9.25098 12.627V16.373C9.25098 16.992 9.57301 17.542 10.114 17.845C10.371 17.989 10.656 18.061 10.941 18.061C11.248 18.061 11.554 17.978 11.825 17.812L14.972 15.886C15.459 15.588 15.75 15.07 15.75 14.5C15.75 13.93 15.459 13.412 14.973 13.115ZM14.189 14.606L11.041 16.533C10.959 16.582 10.891 16.5611 10.847 16.5371C10.803 16.5121 10.75 16.464 10.75 16.373V12.627C10.75 12.537 10.803 12.4879 10.847 12.4629C10.871 12.4489 10.904 12.437 10.942 12.437C10.972 12.437 11.006 12.445 11.042 12.467L14.1899 14.394C14.1899 14.394 14.19 14.394 14.191 14.394C14.23 14.418 14.251 14.454 14.251 14.499C14.251 14.544 14.229 14.582 14.189 14.606Z"
                        fill="#6C5E70"
                      />
                    </svg>
                    <p className="ml-2 hidden text-[#6C5E70] lg:flex">Video</p>
                  </div>
                ) : (
                  <div className="flex h-[40px] w-[40px] flex-row items-center justify-center rounded-2xl bg-[#F0F0F0] lg:h-[40px] lg:w-[280px]">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.75 12C13.75 12.414 13.414 12.75 13 12.75H7C6.586 12.75 6.25 12.414 6.25 12C6.25 11.586 6.586 11.25 7 11.25H13C13.414 11.25 13.75 11.586 13.75 12ZM7 8.75H10C10.414 8.75 10.75 8.414 10.75 8C10.75 7.586 10.414 7.25 10 7.25H7C6.586 7.25 6.25 7.586 6.25 8C6.25 8.414 6.586 8.75 7 8.75ZM13 15.25H7C6.586 15.25 6.25 15.586 6.25 16C6.25 16.414 6.586 16.75 7 16.75H13C13.414 16.75 13.75 16.414 13.75 16C13.75 15.586 13.414 15.25 13 15.25ZM21.75 11.5V19C21.75 20.517 20.517 21.75 19 21.75H6C3.582 21.75 2.25 20.418 2.25 18V6C2.25 3.582 3.582 2.25 6 2.25H14C16.418 2.25 17.75 3.582 17.75 6V9.25H19.5C20.74 9.25 21.75 10.259 21.75 11.5ZM16.551 20.25C16.359 19.875 16.25 19.45 16.25 19V6C16.25 4.423 15.577 3.75 14 3.75H6C4.423 3.75 3.75 4.423 3.75 6V18C3.75 19.577 4.423 20.25 6 20.25H16.551ZM20.25 11.5C20.25 11.086 19.913 10.75 19.5 10.75H17.75V19C17.75 19.689 18.311 20.25 19 20.25C19.689 20.25 20.25 19.689 20.25 19V11.5Z"
                        fill="#6C5E70"
                      />
                    </svg>
                    <p className="ml-2 hidden text-[#6C5E70] lg:flex">
                      Article
                    </p>
                  </div>
                )}
              </div>
              <div className="mt-10 flex w-full flex-row items-center justify-between text-[12px]  lg:text-[16px]">
                {smallestLessonId === 0 ? (
                  <p>100% Completed</p>
                ) : (
                  <>
                    <p>0% Completed</p>
                    <p className="flex text-[#F79327]">
                      Next Lesson
                      <svg
                        width="14"
                        height="23"
                        viewBox="0 0 14 23"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-3 h-[15px] lg:h-[23px]"
                      >
                        <path
                          d="M0.939325 3.06153C0.353681 2.47589 0.353395 1.52656 0.938472 0.940565C1.23149 0.645737 1.6171 0.499969 1.99958 0.499969C2.38244 0.499969 2.76772 0.645947 3.06169 0.941551C3.0619 0.941771 3.06212 0.941992 3.06234 0.942211L12.3945 10.2743C12.9804 10.8603 12.9804 11.8102 12.3945 12.3962L3.06114 21.7295C2.47522 22.3154 1.52525 22.3154 0.939325 21.7295C0.353396 21.1436 0.353396 20.1936 0.939325 19.6077L9.2124 11.3346L0.939325 3.06153Z"
                          fill="#F79327"
                        />
                      </svg>
                    </p>
                  </>
                )}
              </div>
            </Link>
          </div>
        ) : (
          <>
            <p className="mt-10 font-light">
              The learning journey never ends, especially when it comes to
              Bitcoin. This is where our continuously updated educational
              roadmap exists. You can follow along the suggested track or skip
              around to unlocked lessons{" "}
              <span className="font-semibold text-[#F79327]">below!</span>
            </p>
            <Link
              className="mt-5 flex flex-col items-center justify-between rounded-2xl bg-[#0C071D] px-10 py-7 lg:flex-row"
              href={"/profile"}
            >
              <p className="gradient-text text-[30px] font-semibold lg:text-[38px]">
                Speed Up Your Journey
              </p>
              <div className="mt-3 flex flex-row items-center justify-center rounded-xl bg-[#FFFFFF] px-5 py-3 lg:mt-0">
                <p className="mr-5">Unlock All Lessons</p>
                <svg
                  width="14"
                  height="23"
                  viewBox="0 0 14 23"
                  fill="black"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0.939325 3.06153C0.353681 2.47589 0.353395 1.52656 0.938472 0.940565C1.23149 0.645737 1.6171 0.499969 1.99958 0.499969C2.38244 0.499969 2.76772 0.645947 3.06169 0.941551C3.0619 0.941771 3.06212 0.941992 3.06234 0.942211L12.3945 10.2743C12.9804 10.8603 12.9804 11.8102 12.3945 12.3962L3.06114 21.7295C2.47522 22.3154 1.52525 22.3154 0.939325 21.7295C0.353396 21.1436 0.353396 20.1936 0.939325 19.6077L9.2124 11.3346L0.939325 3.06153Z" />
                </svg>
              </div>
            </Link>
          </>
        )}

        <div className="mt-10 flex flex-row items-center justify-between rounded-2xl bg-white px-4 py-3">
          <p className="text-[10px] font-semibold lg:text-[16px]">
            Organize Tutorials By
          </p>
          <div className="flex flex-row">
            <button
              className={`flex w-[100px] items-center justify-center rounded-full py-2 md:w-[140px] ${
                selectedView === "roadmap"
                  ? "bg-black text-white"
                  : "bg-transparent text-[#6C5E70] opacity-50"
              }`}
              onClick={() => setSelectedView("roadmap")}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                className={`${
                  selectedView === "roadmap" ? "fill-white" : "fill-[#6C5E70]"
                }`}
              >
                <path d="M17.7668 4.20858L12.7668 2.54192H12.7084C12.6696 2.53802 12.6305 2.53802 12.5918 2.54192H12.4001H12.2918H12.2334L7.50008 4.16692L2.76675 2.54192C2.64143 2.50059 2.50809 2.48962 2.3777 2.5099C2.24731 2.53019 2.1236 2.58114 2.01675 2.65858C1.90905 2.73526 1.82114 2.83647 1.76028 2.95384C1.69942 3.07121 1.66736 3.20137 1.66675 3.33358V15.0002C1.6663 15.175 1.72077 15.3454 1.82245 15.4874C1.92414 15.6295 2.0679 15.736 2.23342 15.7919L7.23342 17.4586C7.40129 17.5133 7.58221 17.5133 7.75008 17.4586L12.5001 15.8752L17.2334 17.5002C17.3219 17.5123 17.4116 17.5123 17.5001 17.5002C17.6743 17.5027 17.8444 17.447 17.9834 17.3419C18.0911 17.2652 18.179 17.164 18.2399 17.0467C18.3007 16.9293 18.3328 16.7991 18.3334 16.6669V5.00025C18.3339 4.82555 18.2794 4.65512 18.1777 4.51306C18.076 4.371 17.9323 4.26449 17.7668 4.20858ZM6.66675 15.5086L3.33342 14.4002V4.49192L6.66675 5.60025V15.5086ZM11.6668 14.4002L8.33342 15.5086V5.60025L11.6668 4.49192V14.4002ZM16.6668 15.5086L13.3334 14.4002V4.49192L16.6668 5.60025V15.5086Z" />
              </svg>

              <p className="ml-2 text-[10px] md:text-[16px]">Roadmap</p>
            </button>
            <button
              className={`flex w-[100px] items-center justify-center rounded-full py-2 md:w-[140px] ${
                selectedView === "list"
                  ? "bg-black text-white"
                  : "bg-transparent text-[#6C5E70] opacity-50"
              }`}
              onClick={() => setSelectedView("list")}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className={`${
                  selectedView === "list" ? "fill-white" : "fill-[#6C5E70]"
                }`}
              >
                <path d="M18.5 10.75H5.5C4.091 10.75 3.25 9.909 3.25 8.5V5.5C3.25 4.091 4.091 3.25 5.5 3.25H18.5C19.909 3.25 20.75 4.091 20.75 5.5V8.5C20.75 9.909 19.909 10.75 18.5 10.75ZM5.5 4.75C4.911 4.75 4.75 4.911 4.75 5.5V8.5C4.75 9.089 4.911 9.25 5.5 9.25H18.5C19.089 9.25 19.25 9.089 19.25 8.5V5.5C19.25 4.911 19.089 4.75 18.5 4.75H5.5ZM18.5 20.75H5.5C4.091 20.75 3.25 19.909 3.25 18.5V15.5C3.25 14.091 4.091 13.25 5.5 13.25H18.5C19.909 13.25 20.75 14.091 20.75 15.5V18.5C20.75 19.909 19.909 20.75 18.5 20.75ZM5.5 14.75C4.911 14.75 4.75 14.911 4.75 15.5V18.5C4.75 19.089 4.911 19.25 5.5 19.25H18.5C19.089 19.25 19.25 19.089 19.25 18.5V15.5C19.25 14.911 19.089 14.75 18.5 14.75H5.5Z" />
              </svg>

              <p className="ml-2 text-[10px] md:text-[16px]">List</p>
            </button>
          </div>
        </div>
        {selectedView === "roadmap" &&
          aggregatedModules.map((moduleInfo) => (
            <div key={moduleInfo.module} className="mt-10">
              <div className="flex flex-row items-center justify-between  text-[12px] text-[#6C5E70] md:text-[16px]">
                <p className="font-semibold">{moduleInfo.module}</p>
                <p>
                  <span className="font-bold">{moduleInfo.sections}</span>{" "}
                  sections |{" "}
                  <span className="font-bold">{moduleInfo.lessons}</span>{" "}
                  lessons
                </p>
              </div>
              <TutorialsList module={moduleInfo.module} />
            </div>
          ))}
        {selectedView === "list" &&
          aggregatedModules.map((moduleInfo) =>
            moduleInfo.lessonTitles.map((lessonTitle, index) => {
              // Find the corresponding item in the BitcoinBasics array based on lessonTitle
              const bitcoinBasicInfo = BitcoinBasics.find(
                (bitcoinInfo) => bitcoinInfo.title === lessonTitle
              );

              return (
                <div key={index}>
                  <ListItem
                    title={lessonTitle}
                    description={bitcoinBasicInfo?.description || ""}
                    href={bitcoinBasicInfo?.href || ""}
                    isLocked={bitcoinBasicInfo?.isLocked || false}
                    itemType={bitcoinBasicInfo?.itemType || ""}
                    lesson={bitcoinBasicInfo?.lesson || 0}
                  />
                </div>
              );
            })
          )}
      </div>
    </div>
  );
};

export default Tutorials;
