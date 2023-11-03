import Link from "next/link";

import { useState } from "react";
import { useAtom } from "jotai";
import {
  UserHistory,
  paymentAtom,
  tutorialBuyModal,
  userHistoryAtom,
} from "../atom";
import { trpc } from "@/utils/trpc";
import BuyingOptionsTutorials from "./BuyingOptionsTutorials";
import TutorialsList from "./TutorialsList";

const Tutorials = () => {
  const [selectedView, setSelectedView] = useState("roadmap");
  const [payment, setPayment] = useAtom(paymentAtom);
  const [showBuyingOptions, setShowBuyingOptions] = useAtom(tutorialBuyModal);
  console.log("show", showBuyingOptions);

  const [userHistory, setUserHistory] = useAtom(userHistoryAtom);

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

  return (
    <div className="mb-10 ml-10 mr-10 mt-10 md:ml-[260px]">
      {showBuyingOptions && <BuyingOptionsTutorials />}

      <div className="flex flex-col text-black">
        <p className="font-extralight">Tutorials</p>

        {payment?.hasAccess === true ? (
          <div className="mt-5 flex w-full flex-col lg:flex-row">
            <button className="flex w-full flex-col items-start justify-between rounded-2xl bg-[#0C071D] px-10 py-7 lg:flex-row">
              <div className="flex flex-col items-start">
                <p className="gradient-text text-[30px] font-semibold lg:text-[38px]">
                  Welcome back
                </p>
                <p className="mt-2 text-left text-white">
                  Keep up the great work! Learning is key to unlocking endless
                  possibilites
                </p>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex flex-row items-center">
                  <div className="h-[8px] w-[202px] rounded-full bg-[#393939]"></div>
                  <p className="ml-3 text-[#393939]">1% Complete</p>
                </div>

                <p className="mt-10 flex text-[#F79327]">
                  Start With Prerequisite
                  <svg
                    width="14"
                    height="23"
                    viewBox="0 0 14 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-3"
                  >
                    <path
                      d="M0.939325 3.06153C0.353681 2.47589 0.353395 1.52656 0.938472 0.940565C1.23149 0.645737 1.6171 0.499969 1.99958 0.499969C2.38244 0.499969 2.76772 0.645947 3.06169 0.941551C3.0619 0.941771 3.06212 0.941992 3.06234 0.942211L12.3945 10.2743C12.9804 10.8603 12.9804 11.8102 12.3945 12.3962L3.06114 21.7295C2.47522 22.3154 1.52525 22.3154 0.939325 21.7295C0.353396 21.1436 0.353396 20.1936 0.939325 19.6077L9.2124 11.3346L0.939325 3.06153Z"
                      fill="#F79327"
                    />
                  </svg>
                </p>
              </div>
            </button>
            <button className=" mt-5 flex flex-col rounded-2xl bg-white px-10 py-7 text-[#687588] lg:ml-5 lg:mt-0 lg:w-[500px]">
              <div className="flex w-full flex-row justify-between">
                <div className="flex flex-col items-start">
                  <div className="flex flex-row text-[12px]">
                    <p className="font-extralight">
                      Module <span className="font-semibold">1</span>
                    </p>
                    <p className="ml-1 font-extralight">
                      | Chapter <span className="font-semibold">1</span>
                    </p>
                  </div>
                  <p className="text-black">Base-2</p>
                </div>
                <div className="flex flex-row items-center justify-center rounded-2xl bg-[#F0F0F0] p-3 ">
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
              </div>
              <div className="mt-5 flex w-full flex-row items-center justify-between">
                <p>0% Completed</p>
                <p className="flex text-[#F79327]">
                  Next Lesson
                  <svg
                    width="14"
                    height="23"
                    viewBox="0 0 14 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-3"
                  >
                    <path
                      d="M0.939325 3.06153C0.353681 2.47589 0.353395 1.52656 0.938472 0.940565C1.23149 0.645737 1.6171 0.499969 1.99958 0.499969C2.38244 0.499969 2.76772 0.645947 3.06169 0.941551C3.0619 0.941771 3.06212 0.941992 3.06234 0.942211L12.3945 10.2743C12.9804 10.8603 12.9804 11.8102 12.3945 12.3962L3.06114 21.7295C2.47522 22.3154 1.52525 22.3154 0.939325 21.7295C0.353396 21.1436 0.353396 20.1936 0.939325 19.6077L9.2124 11.3346L0.939325 3.06153Z"
                      fill="#F79327"
                    />
                  </svg>
                </p>
              </div>
            </button>
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
            <button
              className="mt-5 flex flex-col items-center justify-between rounded-2xl bg-[#0C071D] px-10 py-7 lg:flex-row"
              onClick={() => setShowBuyingOptions(true)}
            >
              <p className="gradient-text text-[30px] font-semibold lg:text-[38px]">
                Speed Up Your Journey
              </p>
              <div className="flex flex-row items-center justify-center rounded-xl bg-[#FFFFFF] px-5 py-3">
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
            </button>
          </>
        )}

        <div className="mt-10 flex flex-row items-center justify-between rounded-2xl bg-white px-4 py-3">
          <p className="font-semibold">Organize Tutorials By</p>
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
        <div className="mt-10 flex flex-row items-center justify-between text-[#6C5E70]">
          <p className="font-semibold ">Prerequisite</p>
          <p>
            <span className="font-bold">6</span> sections |{" "}
            <span className="font-bold">65</span> lessons
          </p>
        </div>
        <TutorialsList />
      </div>
    </div>
  );
};

export default Tutorials;
