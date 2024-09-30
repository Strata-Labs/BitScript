import { trpc } from "@/utils/trpc";
import { useAtom } from "jotai";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  menuOpen,
  paymentAtom,
  showLoginModalAtom,
  userLessons,
  userSignedIn,
} from "../atom";
import { BitcoinBasics } from "@/utils/TUTORIALS";
import { useRouter } from "next/router";
import CustomHead from "@/comp/CustomHead";
import React from "react";
import { classNames } from "@/utils";

type Paragraph = {
  type: "paragraph";
  content: string;
  customClass?: string;
  variant?: ParagraphVariant;
};

type Image = {
  type: "image";
  src: string;
  alt: string;
};
type Title = {
  type: "title";
  content: string;
  variant?: TitleVariant;
  customClass?: string;
};
type MainTitle = {
  type: "main title";
  content: string;
};
type Subtitle = {
  type: "subtitle";
  content: string;
};
type List = {
  type: "list";
  content: (
    | NumberedItem
    | Paragraph
    | HashedItem
    | SecondaryNumberedItem
    | Image
  )[];
};

type Table = {
  type: "table";
  headers: string[];
  rows: string[][];
};

type NumberedItem = {
  type: "numbered-item";
  content: string;
};

type ListParagraph = {
  type: "paragraph";
  content: string;
};

type HashedItem = {
  type: "hashed-item";
  content: string;
};

type SecondaryNumberedItem = {
  type: "secondary-numbered-item";
  content: string;
};

type ListImage = {
  type: "image";
  src: string;
  alt: string;
};

export type ArticleViewProps = {
  module: string;
  section: string;
  title: string;
  description: string;
  published: string;
  lesson: number;
  href: string;
  shortHandTitle: string;
  isLocked: boolean;
  itemType: string;

  googleLinkBigScreen: string;
  googleLinkSmallScreen: string;
  content: (Paragraph | Image | Title | MainTitle | Subtitle | List | Table)[];
};

type ParagraphVariant = "default" | "large" | "small";
type TitleVariant = "default" | "large" | "small";
type ImageVariant = "default" | "fullWidth" | "thumbnail";

interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
  content: string;
  variant?: ParagraphVariant;
}

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  content: string;
  variant?: TitleVariant;
}

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  variant?: ImageVariant;
}

// Define variant styles
const paragraphVariants = {
  default: "mb-3 text-sm md:mb-5 md:text-[16px]",
  large: "mb-4 text-lg md:mb-6 md:text-xl",
  small: "mb-2 text-xs md:mb-3 md:text-sm",
};
const titleVariants = {
  default: "text-sm  md:text-[16px]",
  large: " text-lg  md:text-xl",
  small: "text-xs md:text-sm",
};

const imageVariants = {
  default: "mb-3 w-[1000px] md:mb-5",
  fullWidth: "mb-3 w-full md:mb-5",
  thumbnail: "mb-3 w-[200px] md:mb-5",
};

// const applyFormatting = (text: string) => {
//   return text
//     .replace(/\(bold\)(.*?)\(bold\)/g, "<strong style='font-weight: bold; color: #0C071D;'>$1</strong>")
//     .replace(/\(italics\)(.*?)\(italics\)/g, "<em>$1</em>")
//     .replace(
//       /\(link(.*?)\)(.*?)\(link\)/g,
//       '<a href="/$1" target="_blank" style="color: blue; text-decoration: underline;">$2</a>'
//     )
//     .replace(
//       /\(linkpage(http.*?)\)(.*?)\(linkpage\)/g,
//       '<a href="$1" target="_blank" style="color: blue; text-decoration: underline;">$2</a>'
//     );
// };

const applyFormatting = (text: string) => {
  return text
    .replace(
      /\(bold\)(.*?)\(bold\)/g,
      "<strong style='font-weight: bold; color: #0C071D;'>$1</strong>"
    )
    .replace(/\(italics\)(.*?)\(italics\)/g, "<em>$1</em>")
    .replace(
      /\(link(.*?)\)(.*?)\(link\)/g,
      '<a href="/$1" target="_blank" style="color: blue; text-decoration: underline;">$2</a>'
    )
    .replace(/\(linkpage.*?\(linkpage\)/g, (match) => {
      const result = parseInput(match);
      if (result) {
        return `<a href="${result.url}" target="_blank" style="color: blue; text-decoration: underline;">${result.textContent}</a>`;
      }
      return match;
    })
    .replace(/\(underline\)(.*?)\(underline\)/g, "<u>$1</u>");
};

// TODO: this should be simplified further if possible find a way to use regex to acheive this
const parseInput = (input: string) => {
  // Regex to extract content between (linkpage) tags; doing all this because having a parentesis in the url breaks the link
  const linkpageRegex =
    /\(linkpage(https?:\/\/[^\s]+)\)\s*(.*?)\s*\(linkpage\)/;
  const match = linkpageRegex.exec(input);

  if (!match) {
    return;
  }

  const url = match[1];
  const textContent = match[2].trim();

  // Extract the content inside parentheses from the textContent
  const result: string[] = [];
  let i = 0;
  let openParenCount = 0;
  let start = -1;

  while (i < textContent.length) {
    if (textContent[i] === "(") {
      if (openParenCount === 0) {
        start = i + 1;
      }
      openParenCount++;
    } else if (textContent[i] === ")") {
      openParenCount--;
      if (openParenCount === 0 && start !== -1) {
        result.push(textContent.slice(start, i));
        start = -1;
      }
    }
    i++;
  }

  const parseResult = {
    textContent,
    linkpage: result[0] || "",
    url,
  };

  return parseResult;
};

const Paragraph = React.forwardRef<HTMLParagraphElement, ParagraphProps>(
  ({ className, variant = "default", content, ...props }, ref) => {
    const formattedContent = applyFormatting(content);
    return (
      <p
        className={classNames(paragraphVariants[variant], className)}
        ref={ref}
        dangerouslySetInnerHTML={{ __html: formattedContent }}
        {...props}
      />
    );
  }
);

const Title = React.forwardRef<HTMLHeadingElement, TitleProps>(
  ({ className, variant = "default", content, ...props }, ref) => {
    const formattedContent = applyFormatting(content);
    return (
      <h2
        className={classNames(titleVariants[variant], className)}
        ref={ref}
        dangerouslySetInnerHTML={{ __html: formattedContent }}
        {...props}
      />
    );
  }
);

const ArticleView = (props: ArticleViewProps) => {
  // there is currently no way to get all the completed lessons for a module
  const [isMenuOpen] = useAtom(menuOpen);
  const [payment] = useAtom(paymentAtom);
  const [userLessonsArray, setUserLessonsArray] = useAtom(userLessons);
  const [lessonCompletion, setLessonCompletion] = useState(0);
  const [currentLessonId, setCurrentLessonId] = useState(1);
  const [isCompletingLesson, setIsCompletingLesson] = useState(false);
  const [isUserSignedIn, setIsUserSignedIn] = useAtom(userSignedIn);

  const completeLessonEvent = trpc.completeLessonEvent.useMutation();
  const fetchUserLessons = trpc.fetchUserLessons.useQuery(undefined, {
    refetchOnMount: false,
    enabled: isUserSignedIn,

    onSuccess: (data) => {
      console.log("USER SIGNED IN", isUserSignedIn);
      console.log("RAW DATA", data);
      if (data !== undefined) {
        const filteredData = data.map((lesson) => {
          return {
            id: lesson.id,
            createdAt: new Date(lesson.createdAt),
            userId: lesson.userId,
            completed: lesson.completed,
            lessonId: lesson.lessonId,
          };
        });
        setUserLessonsArray(filteredData);
        console.log("User Lessons", filteredData);
      }
    },
  });

  const moduleLessons = useMemo(
    () => BitcoinBasics.filter((lesson) => lesson.module === props.module),
    [props.module]
  );

  const currentLesson = useMemo(
    () => moduleLessons.find((lesson) => lesson.lesson === currentLessonId),
    [moduleLessons, currentLessonId]
  );

  const isLessonCompleted = useMemo(
    () =>
      userLessonsArray.some(
        (lesson) => lesson.lessonId === currentLessonId && lesson.completed
      ),
    [userLessonsArray, currentLessonId]
  );

  console.log("is lesson completed? ", isLessonCompleted);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const fullURL = window.location.href;
      const decodedURL = decodeURIComponent(fullURL);
      const titleFromURL = decodedURL.substring(
        decodedURL.lastIndexOf("/") + 1
      );

      const lesson = moduleLessons.find((lesson) => {
        const lessonTitle =
          lesson.shortHandTitle.split("/lessons/").pop() || "";
        return (
          titleFromURL === lessonTitle ||
          titleFromURL.includes(lesson.title.replace(/\?/g, ""))
        );
      });

      if (lesson) {
        setCurrentLessonId(lesson.lesson);
      }
    }
  }, [moduleLessons]);

  useEffect(() => {
    const completedModuleLessons = moduleLessons.filter((moduleLesson) =>
      userLessonsArray.some(
        (userLesson) =>
          userLesson.lessonId === moduleLesson.lesson && userLesson.completed
      )
    ).length;

    console.log("this is the userLessonsArray: ", userLessonsArray);
    console.log("this is the completedModuleLessons: ", completedModuleLessons);

    const completionPercentage =
      moduleLessons.length > 0
        ? (completedModuleLessons / moduleLessons.length) * 100
        : 0;

    console.log("this is the completionPercentage: ", completionPercentage);

    setLessonCompletion(completionPercentage);
  }, [userLessonsArray, moduleLessons]);

  const handleCompleteLessonClick = async () => {
    if (payment?.hasAccess) {
      setIsCompletingLesson(true);
      try {
        await completeLessonEvent.mutateAsync({ lessonId: currentLessonId });
        setUserLessonsArray((prevLessons) =>
          prevLessons.map((lesson) =>
            lesson.lessonId === currentLessonId
              ? { ...lesson, completed: true }
              : lesson
          )
        );
      } catch (error) {
        console.error("Failed to complete lesson:", error);
      } finally {
        setIsCompletingLesson(false);
      }
    } else {
      console.log("Won't update any records");
    }
  };

  if (isMenuOpen === true) {
    return null;
  }

  if (payment?.hasAccess !== true && currentLesson?.isLocked === true) {
    return (
      <div className="mx-10 mt-[50px] text-[20px] text-black md:ml-[260px] md:text-[40px]">
        You don't have access to view this lesson, please login or signup
      </div>
    );
  }

  if (currentLesson) {
    return (
      <div className="mb-10 ml-10 mr-10 mt-10 md:ml-[260px]">
        <CustomHead
          meta={{ title: props.title, description: props.description }}
        />
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

              <p className="ml-5 text-[22px] font-semibold">
                {currentLesson.title}
              </p>
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
                    ? ""
                    : "cursor-not-allowed opacity-[20%]"
                }`}
                disabled={payment?.hasAccess !== true || isCompletingLesson}
                onClick={() => handleCompleteLessonClick()}
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
                  <p className="text-[22px] text-black">
                    {currentLesson.module}
                  </p>
                  <p>{moduleLessons.length} Lessons</p>
                </div>
                <p className="mt-1">{lessonCompletion.toFixed(0)}% Completed</p>
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
                      <p className="ml-3 w-[250px] overflow-hidden text-ellipsis whitespace-nowrap  font-bold">
                        {lesson.title}
                      </p>
                    </div>
                    <div className="flex flex-row items-center">
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
            <div className="flex h-full w-full flex-col items-start justify-start overflow-y-auto rounded-2xl bg-white p-5 text-left text-black">
              {props.content.map((item, index) => {
                if (item.type === "paragraph") {
                  return (
                    <Paragraph
                      key={index}
                      content={item.content}
                      className={item.customClass}
                      variant={item.variant as ParagraphVariant}
                    />
                  );
                } else if (item.type === "image") {
                  return (
                    <div className="flex w-full flex-col items-center justify-center">
                      <img
                        key={index}
                        src={item.src}
                        alt={item.alt}
                        className="mb-3 w-[1000px] md:mb-5"
                      />
                    </div>
                  );
                } else if (item.type === "list") {
                  return (
                    <ul
                      key={index}
                      className="mb-3 flex w-full list-inside flex-col text-sm md:mb-5 md:text-[16px]"
                    >
                      {item.content.map((listItem, i) => {
                        if (listItem.type === "numbered-item") {
                          return (
                            <li
                              key={i}
                              dangerouslySetInnerHTML={{
                                __html: applyFormatting(listItem.content),
                              }}
                              className="ml-3"
                            />
                          );
                        } else if (
                          listItem.type === "secondary-numbered-item"
                        ) {
                          return (
                            <li
                              key={i}
                              className="ml-9"
                              dangerouslySetInnerHTML={{
                                __html: applyFormatting(listItem.content),
                              }}
                            />
                          );
                        } else if (listItem.type === "hashed-item") {
                          return (
                            <li
                              key={i}
                              className="ml-3"
                              dangerouslySetInnerHTML={{
                                __html: applyFormatting(listItem.content),
                              }}
                            />
                          );
                        } else if (listItem.type === "paragraph") {
                          const formattedContent = applyFormatting(
                            listItem.content
                          );
                          return (
                            <li
                              key={i}
                              className="my-3 ml-6 text-sm md:my-5 md:text-[16px]"
                              dangerouslySetInnerHTML={{
                                __html: `<p>${formattedContent}</p>`,
                              }}
                            />
                          );
                        } else if (listItem.type === "image") {
                          return (
                            <li
                              key={i}
                              className=""
                              dangerouslySetInnerHTML={{
                                __html: `<div class="flex w-full flex-col items-center justify-center"><img src="${listItem.src}" alt="${listItem.alt}" class="mb-3 w-[1000px] md:mb-5" /></div>`,
                              }}
                            />
                          );
                        }
                        return null;
                      })}
                    </ul>
                  );
                } else if (item.type === "main title") {
                  const formattedContent = applyFormatting(item.content);
                  return (
                    <h2
                      key={index}
                      className="mb-3 text-lg font-bold md:mb-5 md:text-2xl"
                      dangerouslySetInnerHTML={{ __html: formattedContent }}
                    />
                  );
                } else if (item.type === "title") {
                  return (
                    <Title
                      content={item.content}
                      variant={item.variant as TitleVariant}
                      className={item.customClass}
                    />
                  );
                } else if (item.type === "subtitle") {
                  const formattedContent = applyFormatting(item.content);
                  return (
                    <h3
                      key={index}
                      className="-mt-4 mb-3 text-[16px] text-gray-500  md:mb-4 md:text-lg"
                      dangerouslySetInnerHTML={{ __html: formattedContent }}
                    />
                  );
                } else if (item.type === "table") {
                  const formattedHeader = item.headers.map((header) => {
                    return applyFormatting(header);
                  });
                  const formattedRows = item.rows.map((row) => {
                    return row.map((cell) => {
                      return applyFormatting(cell);
                    });
                  });

                  return (
                    <table
                      key={index}
                      className="mb-3 w-full border-collapse overflow-x-auto border border-gray-300 md:mb-5"
                    >
                      <thead>
                        <tr>
                          {formattedHeader.map((header, i) => (
                            <th
                              key={i}
                              className="border border-gray-500 p-2 text-sm font-bold md:text-base"
                              dangerouslySetInnerHTML={{ __html: header }}
                            />
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {formattedRows.map((row, i) => (
                          <tr key={i}>
                            {row.map((cell, j) => (
                              <td
                                key={j}
                                className="border border-gray-500 p-2 text-sm md:text-base"
                                dangerouslySetInnerHTML={{ __html: cell }}
                              />
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    // </div>
                  );
                }
                return null; // Default case for unknown item types
              })}
            </div>

            <div
              className={`mt-10 hidden w-[300px] flex-col rounded-2xl bg-[#F0F0F0] p-5 text-[#6C5E70] lg:ml-10 lg:mt-0 lg:flex ${
                payment?.hasAccess === true ? "" : "blur-[3px]"
              }`}
            >
              <div className="flex flex-row items-start justify-between">
                <div className="flex flex-col">
                  <p className="text-[16px] text-black">
                    {currentLesson.module}
                  </p>
                  <p>{moduleLessons.length} Lessons</p>
                  <p className="">{lessonCompletion.toFixed(0)}% Completed</p>
                </div>
              </div>
              <div className="mt-5 w-full border-b"></div>
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
                      <p className="ml-3 w-[120px] overflow-hidden text-ellipsis whitespace-nowrap text-[12px] font-bold">
                        {lesson.title}
                      </p>
                    </div>
                    <div className="flex flex-row items-center">
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
