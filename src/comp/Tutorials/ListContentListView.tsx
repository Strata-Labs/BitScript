import { trpc } from "@/utils/trpc";
import { useAtom } from "jotai";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { paymentAtom, userLessons } from "../atom";

type ListItemListViewProps = {
  title: string;
  description: string;
  href: string;
  isLocked: boolean;
  itemType: string;
  lesson: number;

  section: string;
  published: string;
};

function ListItemListView({
  title,
  description,
  href,
  isLocked,
  itemType,
  lesson,

  section,
  published,
}: ListItemListViewProps) {
  const [payment] = useAtom(paymentAtom);
  const [userLessonsArray] = useAtom(userLessons);
  const createLessonEvent = trpc.createLessonEvent.useMutation();

  // Check if the lesson is in the userLessonsArray
  const isLessonCompleted = userLessonsArray.some(
    (userLesson) => userLesson.lessonId === lesson && userLesson.completed
  );

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

  return (
    <Link
      className={`flex h-full w-full flex-row items-center justify-start border-b bg-white px-5 py-3 text-[10px] md:text-[12px] lg:text-[14px] ${
        isLocked ? "cursor-not-allowed" : ""
      }`}
      href={href}
      target="_blank"
      onClick={(e) => {
        if (isLocked) {
          e.preventDefault();
        } else {
          handleStartLessonClick(lesson);
        }
      }}
    >
      <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap font-bold">
        {title}
      </p>

      <p className="ml-3 hidden w-full overflow-hidden text-ellipsis  whitespace-nowrap font-extralight md:block ">
        {published}
      </p>

      <p className="ml-3 hidden w-full overflow-hidden text-ellipsis whitespace-nowrap font-extralight md:block ">
        {section}
      </p>

      <p className="ml-3 hidden w-full overflow-hidden text-ellipsis whitespace-nowrap font-extralight lg:block ">
        {description}
      </p>

      {/* End Section Icons and Checkmark */}
      <div className="ml-3 flex w-[250px] flex-row items-center justify-end md:w-[1200px]">
        {isLocked && !payment?.hasAccess && (
          <div className="mr-3 flex h-[35px] w-[35px] flex-row items-center justify-center rounded-2xl bg-[#F0F0F0] md:h-[40px] md:w-[40px] lg:h-[40px] lg:w-[70px]">
            <svg
              width="16"
              height="20"
              viewBox="0 0 16 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-[12px] md:h-[20px]"
            >
              <path
                d="M12.75 6.30396V5C12.75 2.381 10.619 0.25 8 0.25C5.381 0.25 3.25 2.381 3.25 5V6.30396C1.312 6.56096 0.25 7.846 0.25 10V16C0.25 18.418 1.582 19.75 4 19.75H12C14.418 19.75 15.75 18.418 15.75 16V10C15.75 7.847 14.688 6.56195 12.75 6.30396ZM8 1.75C9.792 1.75 11.25 3.208 11.25 5V6.25H4.75V5C4.75 3.208 6.208 1.75 8 1.75ZM14.25 16C14.25 17.577 13.577 18.25 12 18.25H4C2.423 18.25 1.75 17.577 1.75 16V10C1.75 8.423 2.423 7.75 4 7.75H12C13.577 7.75 14.25 8.423 14.25 10V16ZM9.27002 12C9.27002 12.412 9.058 12.7601 8.75 12.9871V15C8.75 15.414 8.414 15.75 8 15.75C7.586 15.75 7.25 15.414 7.25 15V12.9619C6.962 12.7329 6.76489 12.395 6.76489 12C6.76489 11.31 7.32001 10.75 8.01001 10.75H8.02002C8.71002 10.75 9.27002 11.31 9.27002 12Z"
                fill="#6C5E70"
              />
            </svg>
          </div>
        )}
        {itemType === "video" && (
          <div className="flex h-[35px] w-[35px] flex-row items-center justify-center rounded-2xl bg-[#F0F0F0] md:h-[40px] md:w-[40px] lg:h-[40px] lg:w-[70px]">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-[15px] md:h-[24px]"
            >
              <path
                d="M17.625 2.25H6.375C3.715 2.25 2.25 3.715 2.25 6.375V17.625C2.25 20.285 3.715 21.75 6.375 21.75H17.625C20.285 21.75 21.75 20.285 21.75 17.625V6.375C21.75 3.715 20.285 2.25 17.625 2.25ZM20.25 6.375V8.25H15.75V3.75H17.625C19.465 3.75 20.25 4.535 20.25 6.375ZM9.75 8.25V3.75H14.25V8.25H9.75ZM6.375 3.75H8.25V8.25H3.75V6.375C3.75 4.535 4.535 3.75 6.375 3.75ZM17.625 20.25H6.375C4.535 20.25 3.75 19.465 3.75 17.625V9.75H20.25V17.625C20.25 19.465 19.465 20.25 17.625 20.25ZM14.973 13.115L11.825 11.188C11.303 10.868 10.647 10.856 10.114 11.155C9.57301 11.458 9.25098 12.008 9.25098 12.627V16.373C9.25098 16.992 9.57301 17.542 10.114 17.845C10.371 17.989 10.656 18.061 10.941 18.061C11.248 18.061 11.554 17.978 11.825 17.812L14.972 15.886C15.459 15.588 15.75 15.07 15.75 14.5C15.75 13.93 15.459 13.412 14.973 13.115ZM14.189 14.606L11.041 16.533C10.959 16.582 10.891 16.5611 10.847 16.5371C10.803 16.5121 10.75 16.464 10.75 16.373V12.627C10.75 12.537 10.803 12.4879 10.847 12.4629C10.871 12.4489 10.904 12.437 10.942 12.437C10.972 12.437 11.006 12.445 11.042 12.467L14.1899 14.394C14.1899 14.394 14.19 14.394 14.191 14.394C14.23 14.418 14.251 14.454 14.251 14.499C14.251 14.544 14.229 14.582 14.189 14.606Z"
                fill="#6C5E70"
              />
            </svg>
          </div>
        )}
        {itemType === "article" && (
          <div className="flex h-[35px] w-[35px] flex-row items-center justify-center rounded-2xl bg-[#F0F0F0] md:h-[40px] md:w-[40px] lg:h-[40px] lg:w-[70px]">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-[15px] md:h-[24px]"
            >
              <path
                d="M13.75 12C13.75 12.414 13.414 12.75 13 12.75H7C6.586 12.75 6.25 12.414 6.25 12C6.25 11.586 6.586 11.25 7 11.25H13C13.414 11.25 13.75 11.586 13.75 12ZM7 8.75H10C10.414 8.75 10.75 8.414 10.75 8C10.75 7.586 10.414 7.25 10 7.25H7C6.586 7.25 6.25 7.586 6.25 8C6.25 8.414 6.586 8.75 7 8.75ZM13 15.25H7C6.586 15.25 6.25 15.586 6.25 16C6.25 16.414 6.586 16.75 7 16.75H13C13.414 16.75 13.75 16.414 13.75 16C13.75 15.586 13.414 15.25 13 15.25ZM21.75 11.5V19C21.75 20.517 20.517 21.75 19 21.75H6C3.582 21.75 2.25 20.418 2.25 18V6C2.25 3.582 3.582 2.25 6 2.25H14C16.418 2.25 17.75 3.582 17.75 6V9.25H19.5C20.74 9.25 21.75 10.259 21.75 11.5ZM16.551 20.25C16.359 19.875 16.25 19.45 16.25 19V6C16.25 4.423 15.577 3.75 14 3.75H6C4.423 3.75 3.75 4.423 3.75 6V18C3.75 19.577 4.423 20.25 6 20.25H16.551ZM20.25 11.5C20.25 11.086 19.913 10.75 19.5 10.75H17.75V19C17.75 19.689 18.311 20.25 19 20.25C19.689 20.25 20.25 19.689 20.25 19V11.5Z"
                fill="#6C5E70"
              />
            </svg>
          </div>
        )}

        {/* Cell 4 */}
        <div className="flex justify-end">
          {isLessonCompleted ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="ml-3 h-[15px] md:h-[20px]"
            >
              <path
                d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM14.03 8.20001L9.35999 12.86C9.21999 13.01 9.02999 13.08 8.82999 13.08C8.63999 13.08 8.44999 13.01 8.29999 12.86L5.97 10.53C5.68 10.24 5.68 9.75997 5.97 9.46997C6.26 9.17997 6.74 9.17997 7.03 9.46997L8.82999 11.27L12.97 7.14001C13.26 6.84001 13.74 6.84001 14.03 7.14001C14.32 7.43001 14.32 7.90001 14.03 8.20001Z"
                fill="#5BCE45"
              />
            </svg>
          ) : (
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="ml-3 h-[15px] opacity-50 md:h-[20px]"
            >
              <path
                d="M11 0.25C5.072 0.25 0.25 5.073 0.25 11C0.25 16.927 5.072 21.75 11 21.75C16.928 21.75 21.75 16.927 21.75 11C21.75 5.073 16.928 0.25 11 0.25ZM11 20.25C5.899 20.25 1.75 16.101 1.75 11C1.75 5.899 5.899 1.75 11 1.75C16.101 1.75 20.25 5.899 20.25 11C20.25 16.101 16.101 20.25 11 20.25ZM15.03 8.13599C15.323 8.42899 15.323 8.90402 15.03 9.19702L10.363 13.864C10.217 14.01 10.025 14.084 9.83301 14.084C9.64101 14.084 9.44901 14.011 9.30301 13.864L6.97 11.531C6.677 11.238 6.677 10.763 6.97 10.47C7.263 10.177 7.73801 10.177 8.03101 10.47L9.83401 12.273L13.97 8.13702C14.263 7.84402 14.737 7.84399 15.03 8.13599Z"
                fill="#6C5E70"
              />
            </svg>
          )}
        </div>
      </div>
    </Link>
  );
}

export default ListItemListView;
