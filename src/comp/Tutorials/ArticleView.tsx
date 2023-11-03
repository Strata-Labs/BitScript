import { trpc } from "@/utils/trpc";
import { useAtom } from "jotai";
import Link from "next/link";
import { useEffect, useState } from "react";
import { paymentAtom, showLoginModalAtom, userLessons } from "../atom";
import { BitcoinBasics } from "@/utils/TUTORIALS";

type ArticleProps = {
  module: string;
  title: string;
  description: string;
  href: string;
  isLocked: boolean;
  itemType: string;
  lesson: number;
  p1: string;
};

function ArticleView({
  title,
  description,
  href,
  isLocked,
  itemType,
  lesson,
  p1,
}: ArticleProps) {
  const [showLogin, setShowLogin] = useAtom(showLoginModalAtom);
  const [payment, setPayment] = useAtom(paymentAtom);
  const [userLessonsArray, setUserLessonsArray] = useAtom(userLessons);
  const [lessonCompletion, setlessonCompletion] = useState(0);

  const completeLessonEvent = trpc.completeLessonEvent.useMutation();

  const handleCompleteLessonClick = (lessonId: number) => {
    // Only proceed if payment.hasAccess is true
    if (payment && payment.hasAccess) {
      completeLessonEvent.mutate({
        lessonId: lessonId,
      });
      console.log("Lesson Event", completeLessonEvent);
    } else {
      console.log("Won't update any records");
    }
  };

  const lessonTest = 2;

  // Check if the lesson with lessonTest id is completed
  const isLessonCompleted = userLessonsArray.some(
    (lesson) => lesson.lessonId === lessonTest && lesson.completed
  );

  useEffect(() => {
    if (isLessonCompleted) {
      console.log(`Lesson with ID ${lessonTest} is completed.`);
    }
  }, [isLessonCompleted]);

  useEffect(() => {
    const completedLessons = BitcoinBasics.filter((basicLesson) =>
      userLessonsArray.some(
        (userLesson) =>
          userLesson.lessonId === basicLesson.lesson && userLesson.completed
      )
    ).length;

    const completionPercentage =
      (completedLessons / BitcoinBasics.length) * 100;

    setlessonCompletion(completionPercentage);
  }, [userLessonsArray]);

  return (
    <div className="mb-10 ml-10 mr-10 mt-10 md:ml-[260px]">
      <div className="flex flex-col text-[#0C071D]">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center">
            <Link href={"/tutorials"}>
              <svg
                width="21"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                transform="rotate(180)"
              >
                <path
                  d="M7.99986 16.4583C8.15986 16.4583 8.31988 16.3975 8.44155 16.275L14.2749 10.4417C14.519 10.1975 14.519 9.80164 14.2749 9.55747L8.44155 3.72414C8.19738 3.47997 7.80152 3.47997 7.55735 3.72414C7.31319 3.96831 7.31319 4.36417 7.55735 4.60834L12.949 9.99998L7.55735 15.3916C7.31319 15.6358 7.31319 16.0317 7.55735 16.2758C7.67985 16.3975 7.83986 16.4583 7.99986 16.4583Z"
                  fill="#F79327"
                  stroke="#F79327"
                />
              </svg>
            </Link>

            <p className="ml-5 text-[22px] font-semibold">{title}</p>
          </div>
          {isLessonCompleted ? (
            <div
              className={`mt flex flex-row items-center justify-center rounded-2xl bg-[#0C071D] p-3 ${
                payment?.hasAccess === true
                  ? ""
                  : "cursor-not-allowed opacity-[20%]"
              }`}
            >
              <p className="mr-3 text-white">Completed</p>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="ml-3"
              >
                <path
                  d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.03 10.2L11.36 14.86C11.22 15.01 11.03 15.08 10.83 15.08C10.64 15.08 10.45 15.01 10.3 14.86L7.97 12.53C7.68 12.24 7.68 11.76 7.97 11.47C8.26 11.18 8.74 11.18 9.03 11.47L10.83 13.27L14.97 9.14001C15.26 8.84001 15.74 8.84001 16.03 9.14001C16.32 9.43001 16.32 9.90001 16.03 10.2Z"
                  fill="#F79327"
                />
              </svg>
            </div>
          ) : (
            <button
              className={`mt flex flex-row items-center justify-center rounded-2xl bg-[#0C071D] p-3 ${
                payment?.hasAccess === true
                  ? "opacity-50"
                  : "cursor-not-allowed opacity-[20%]"
              }`}
              disabled={payment?.hasAccess !== true}
              onClick={() => handleCompleteLessonClick(lessonTest)}
            >
              <p className="mr-3 text-white">Press To Complete</p>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="ml-3"
              >
                <path
                  d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.03 10.2L11.36 14.86C11.22 15.01 11.03 15.08 10.83 15.08C10.64 15.08 10.45 15.01 10.3 14.86L7.97 12.53C7.68 12.24 7.68 11.76 7.97 11.47C8.26 11.18 8.74 11.18 9.03 11.47L10.83 13.27L14.97 9.14001C15.26 8.84001 15.74 8.84001 16.03 9.14001C16.32 9.43001 16.32 9.90001 16.03 10.2Z"
                  fill="#F79327"
                />
              </svg>
            </button>
          )}
        </div>
        <div className="mt-10 flex flex-row justify-between">
          <div className="flex flex-col rounded-2xl bg-white p-5">
            <p className="mt-10">
              Without a fundamental understanding of transactions, your grasp of
              Bitcoin as a developer is tenuous at best. Transaction formatting,
              whether reading or writing, is a non-negotiable skill set for any
              Bitcoin developer - this, however, doesn’t mean it is easy or
              simple. 
            </p>
            <p className="mt-10">
              Breaking down a transaction, specifically a SegWit transaction, is
              particularly tough because so few resources cover the topic
              end-to-end. There are phenomenal resources on dissecting a Legacy
              transaction, but almost nothing on SegWit & even fewer resources
              on TapRoot transactions.
            </p>{" "}
            <p className="mt-10">
              We believe the single best way to improve working knowledge is to
              make it actionable. So, today, you’re going to inspect a SegWit
              transaction in its raw hexadecimal form. By breaking it down
              byte-by-byte, you’ll cover all the details involved in reading or
              writing a SegWit transaction.{" "}
            </p>
            <p className="mt-10">
              First, an outline of *everything* included in a SegWit transaction
              & therefore everything we’ll cover throughout:
            </p>
            <div className="mx-2 mt-5">
              <img src="/SegWitFormatImage 3.png" alt="" />
            </div>
            <p className="mt-10">
              The table above looks intimidating, & the first few times it might
              feel challenging, but the tough part about understanding Bitcoin
              transactions is identifying & remembering minor details &
              exceptions.
            </p>
            <p className="mt-10">
              Following the table above, we’ll walk-through a mainnet
              transaction & map it to every field. Below is both the transaction
              ID & it’s corresponding raw hexadecimal transaction:
            </p>
            <div className="mx-2 mt-5">
              <img src="/DesEx.png" alt="" />
            </div>
            <p className="mt-10">
              Depending on whether you’re registered or whether you have
              freemium access, you can follow along in our deserialization tool
              by opening another window & clicking here. Before inspecting each
              individual component defined above, let’s first abstract the whole
              as much as we can. 
            </p>
            <p className="mt-10">
              At the highest level a valid Bitcoin transaction, not just a
              SegWit transaction, but any transaction, does exactly two things:
              it unlocks a balance of Bitcoin received & transfers its ownership
              to one or more public keys. 
            </p>
            <p className="mt-10">
              Now, both of these clauses are so abstract that while they’re
              useful, they’re technically inaccurate, so let’s get a bit more
              precise. Any transaction describes the flow of Bitcoin in two main
              steps:
            </p>
            <p className="mt-10">
              Fetches previously received Bitcoin & cryptographically proves
              ownership Transfers said ownership of Bitcoin by assigning it a
              new cryptographic lock The first step can be repeated many times
              in a single transaction if you need multiple previously-received
              Bitcoin to reach a balance - we call these Inputs.
            </p>
            <p className="mt-10">
              The second step can also be repeated many times in a single
              transaction if you need to send Bitcoin to multiple people,
              entities, etc - we call these Outputs. 
            </p>
          </div>
          <div
            className={`ml-10 flex flex-col rounded-2xl bg-[#F0F0F0] p-5 text-[#6C5E70] ${
              payment?.hasAccess === true ? "" : "blur-[3px]"
            }`}
          >
            <div className="flex flex-row items-start justify-between">
              <div className="flex flex-col">
                <p className="text-[22px] text-black">Bitcoin Basics</p>
                <p>{BitcoinBasics.length} Lessons</p>
              </div>
              <p>{lessonCompletion.toFixed(0)}% Completed</p>
            </div>
            <div className="mt-5 w-[372px] border-b"></div>
            {BitcoinBasics.map((lesson, index) => {
              // Check if the current lesson is completed
              const isCompleted = userLessonsArray.some(
                (userLesson) =>
                  userLesson.lessonId === lesson.lesson && userLesson.completed
              );

              const isNextLessonCompleted =
                index < BitcoinBasics.length - 1 &&
                userLessonsArray.some(
                  (userLesson) =>
                    userLesson.lessonId === BitcoinBasics[index + 1].lesson &&
                    userLesson.completed
                );

              return (
                <div
                  key={lesson.lesson} // Ensure key is unique and correctly assigned
                  className="mt-10 flex flex-row items-center justify-between"
                >
                  <div className="flex flex-row">
                    <div className="relative">
                      <div
                        className={`h-[20px] w-[20px] rounded-full ${
                          isCompleted
                            ? "bg-[#F79327]"
                            : "border-2px border-[#DDDDDD] bg-white" // Apply orange background if completed, otherwise border
                        }`}
                      ></div>

                      {index < BitcoinBasics.length - 1 && (
                        <div
                          className={`absolute left-[50%] top-[20px] h-[60px] w-[2px] translate-x-[-50%] ${
                            isCompleted && isNextLessonCompleted
                              ? "bg-[#F79327]"
                              : "bg-[#DDDDDD]"
                          }`}
                        ></div>
                      )}
                    </div>
                    <p className="ml-3 font-bold">{lesson.title}</p>
                  </div>
                  <div className="flex flex-row items-center">
                    <p className="mr-3 text-[10px]">
                      {lesson.itemType.charAt(0).toUpperCase() +
                        lesson.itemType.slice(1)}
                    </p>
                    <img
                      src={
                        lesson.itemType === "video"
                          ? "/video-play.svg"
                          : "/document.svg"
                      }
                      alt=""
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleView;
