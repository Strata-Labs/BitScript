import { trpc } from "@/utils/trpc";
import { useAtom } from "jotai";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  menuOpen,
  paymentAtom,
  showLoginModalAtom,
  userLessons,
} from "../atom";
import { BitcoinBasics } from "@/utils/TUTORIALS";
import { useRouter } from "next/router";

export type ArticleViewProps = {
  module: string;
  section: string;
  title: string;
  description: string;

  lesson: number;
  href: string;
  isLocked: boolean;
  itemType: string;

  googleLinkBigScreen: string;
  googleLinkSmallScreen: string;
};
const ArticleView = (props: ArticleViewProps) => {
  const [isMenuOpen] = useAtom(menuOpen);

  const [showLogin, setShowLogin] = useAtom(showLoginModalAtom);
  const [payment, setPayment] = useAtom(paymentAtom);
  const [userLessonsArray, setUserLessonsArray] = useAtom(userLessons);
  const [lessonCompletion, setlessonCompletion] = useState(0);
  const [lessonTest, setLessonTest] = useState(1);
  const [googleLinkBigScreen, setGoogleLinkBigScreen] = useState("");
  const [googleLinkSmallScreen, setGoogleLinkSmallScreen] = useState("");
  const allLessons = [{ lessons: BitcoinBasics, source: "BitcoinBasics" }];
  const [isCompletingLesson, setIsCompletingLesson] = useState(false);
  const [currentPath, setCurrentPath] = useState("");
  const [iframeSrc, setIframeSrc] = useState("");
  console.log("Path", currentPath);
  console.log("Lesson Number Test", lessonTest);
  type LessonType = {
    title: string;
    lesson: number;
  };

  console.log("article displaying", iframeSrc);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = "(min-width: 768px)";
      const mql = window.matchMedia(mediaQuery);

      const handleResize = () => {
        setIframeSrc(mql.matches ? googleLinkBigScreen : googleLinkSmallScreen);
      };

      handleResize();

      mql.addEventListener("change", handleResize);

      return () => mql.removeEventListener("change", handleResize);
    }
  }, [googleLinkBigScreen, googleLinkSmallScreen]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  // Get the current module's lessons from the URL and filter out lessons from other modules
  const moduleLessons = BitcoinBasics.filter(
    (lesson) => lesson.module === props.module
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const fullURL = window.location.href;
      const decodedURL = decodeURIComponent(fullURL);
      const titleFromURL = decodedURL.substring(
        decodedURL.lastIndexOf("/") + 1
      );

      console.log("url title", titleFromURL);

      const lesson = moduleLessons.find((lesson) =>
        titleFromURL.includes(lesson.title.replace(/\?/g, ""))
      );

      if (lesson) {
        setLessonTest(lesson.lesson);
        setGoogleLinkBigScreen(lesson.googleLinkBigScreen);
        setGoogleLinkSmallScreen(lesson.googleLinkSmallScreen);
      }
    }
  }, [moduleLessons]);

  const completeLessonEvent = trpc.completeLessonEvent.useMutation();

  const handleCompleteLessonClick = (lessonId: number) => {
    if (payment && payment.hasAccess) {
      setIsCompletingLesson(true); // Set loading state to true when mutation starts
      completeLessonEvent.mutate(
        {
          lessonId: lessonId,
        },
        {
          onSuccess: () => {
            // Handle success
            console.log("Lesson completed successfully.");
            setIsCompletingLesson(false); // Reset loading state on success

            // Update userLessonsArray with the new completion status
            setUserLessonsArray((prevLessons) =>
              prevLessons.map((lesson) =>
                lesson.lessonId === lessonId
                  ? { ...lesson, completed: true }
                  : lesson
              )
            );
          },
          onError: () => {
            // Handle error
            console.log("Failed to complete lesson.");
            setIsCompletingLesson(false); // Reset loading state on error
          },
        }
      );
    } else {
      console.log("Won't update any records");
    }
  };

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
    const completedModuleLessons = moduleLessons.filter((moduleLesson) =>
      userLessonsArray.some(
        (userLesson) =>
          userLesson.lessonId === moduleLesson.lesson && userLesson.completed
      )
    ).length;

    const completionPercentage =
      moduleLessons.length > 0
        ? (completedModuleLessons / moduleLessons.length) * 100
        : 0;

    setlessonCompletion(completionPercentage);
  }, [userLessonsArray, moduleLessons]);

  const findLessonAndSource = (lessonNumber: number) => {
    for (const { lessons, source } of allLessons) {
      const lesson = lessons.find((l) => l.lesson === lessonNumber);
      if (lesson) return { lesson, source };
    }
    return { lesson: null, source: null };
  };

  const { lesson, source } = findLessonAndSource(lessonTest);

  if (lesson) {
    console.log("Title of lesson", lesson.title);
    console.log("Source array", source);
    console.log("lesson number", lesson.lesson);
  } else {
    console.log("Lesson not found");
  }

  if (isMenuOpen === true) {
    return null;
  }

  if (payment?.hasAccess !== true && lesson?.isLocked === true) {
    return (
      <div className="mx-10 mt-[50px] text-[20px] text-black md:ml-[260px] md:text-[40px]">
        You don't have access to view this lesson, please login or signup
      </div>
    );
  }

  if (lesson) {
    return (
      <div className="mb-10 ml-10 mr-10 mt-10 md:ml-[260px]">
        <div className="flex flex-col text-[#0C071D]">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center">
              <Link href="/lessons">
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

              <p className="ml-5 text-[22px] font-semibold">{lesson.title}</p>
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
                disabled={payment?.hasAccess !== true || isCompletingLesson}
                onClick={() => handleCompleteLessonClick(lessonTest)}
              >
                {isCompletingLesson ? (
                  <p className="mr-3 text-white">Completing</p>
                ) : (
                  <p className="mr-3 text-white">Press To Complete</p>
                )}
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

          <div className="mt-10 flex h-screen flex-col justify-between lg:flex-row">
            <div
              className={`mb-10 flex flex-col rounded-2xl bg-[#F0F0F0] p-5 text-[#6C5E70] lg:ml-10 lg:mt-0 lg:hidden ${
                payment?.hasAccess === true ? "" : "blur-[3px]"
              }`}
            >
              <div className="flex flex-row items-start justify-between">
                <div className="flex flex-col">
                  <p className="text-[22px] text-black">{lesson.module}</p>
                  <p>{moduleLessons.length} Lessons</p>
                </div>
                <p>{lessonCompletion.toFixed(0)}% Completed</p>
              </div>
              <div className="mt-5 w-[372px] border-b"></div>
              {moduleLessons.map((lesson, index) => {
                // Check if the current lesson is completed
                const isCompleted = userLessonsArray.some(
                  (userLesson) =>
                    userLesson.lessonId === lesson.lesson &&
                    userLesson.completed
                );

                const isNextLessonCompleted =
                  index < moduleLessons.length - 1 &&
                  userLessonsArray.some(
                    (userLesson) =>
                      userLesson.lessonId === moduleLessons[index + 1].lesson &&
                      userLesson.completed
                  );

                return (
                  <div
                    key={lesson.lesson}
                    className="mt-10 flex flex-row items-center justify-between"
                  >
                    <div className="flex flex-row">
                      <div className="relative">
                        <div
                          className={`h-[20px] w-[20px] rounded-full ${
                            isCompleted
                              ? "bg-[#F79327]"
                              : "border-2px border-[#DDDDDD] bg-white"
                          }`}
                        ></div>

                        {index < moduleLessons.length - 1 && (
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
            {/* Article */}
            <iframe
              src={iframeSrc}
              className={`flex h-[100%] w-[100%] items-center justify-center rounded-2xl bg-white text-center ${
                payment?.hasAccess === true ? "" : ""
              }`}
            ></iframe>

            <div
              className={`mt-10 hidden flex-col rounded-2xl bg-[#F0F0F0] p-5 text-[#6C5E70] lg:ml-10 lg:mt-0 lg:flex ${
                lesson.isLocked === true ? "blur-[3px]" : ""
              }`}
            >
              <div className="flex flex-row items-start justify-between">
                <div className="flex flex-col">
                  <p className="text-[22px] text-black">{lesson.module}</p>
                  <p>{moduleLessons.length} Lessons</p>
                </div>
                <p>{lessonCompletion.toFixed(0)}% Completed</p>
              </div>
              <div className="mt-5 w-[372px] border-b"></div>
              {moduleLessons.map((lesson, index) => {
                // Check if the current lesson is completed
                const isCompleted = userLessonsArray.some(
                  (userLesson) =>
                    userLesson.lessonId === lesson.lesson &&
                    userLesson.completed
                );

                const isNextLessonCompleted =
                  index < moduleLessons.length - 1 &&
                  userLessonsArray.some(
                    (userLesson) =>
                      userLesson.lessonId === moduleLessons[index + 1].lesson &&
                      userLesson.completed
                  );

                return (
                  <div
                    key={lesson.lesson}
                    className="mt-10 flex flex-row items-center justify-between"
                  >
                    <div className="flex flex-row">
                      <div className="relative">
                        <div
                          className={`h-[20px] w-[20px] rounded-full ${
                            isCompleted
                              ? "bg-[#F79327]"
                              : "border-2px border-[#DDDDDD] bg-white"
                          }`}
                        ></div>

                        {index < moduleLessons.length - 1 && (
                          <div
                            className={`absolute left-[50%] top-[20px] h-[60px] w-[2px] translate-x-[-50%] ${
                              isCompleted && isNextLessonCompleted
                                ? "bg-[#F79327]"
                                : "bg-[#DDDDDD]"
                            }`}
                          ></div>
                        )}
                      </div>
                      <p className="ml-3 w-[250px] font-bold">{lesson.title}</p>
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
};

export default ArticleView;
