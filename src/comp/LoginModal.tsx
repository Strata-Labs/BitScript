import { classNames } from "@/utils";
import { trpc } from "@/utils/trpc";
import { AnimatePresence, motion } from "framer-motion";
import { useAtom, useAtomValue } from "jotai";
import { use, useEffect, useState } from "react";
import {
  userAtom,
  showLoginModalAtom,
  userTokenAtom,
  paymentAtom,
  forgotPasswordModal,
  userSignedIn,
  UserHistory,
  percentageLessons,
  userHistoryAtom,
  userLessons,
  smallestLessonTitleAtom,
  smallestLessonHrefAtom,
  smallestLessonTypeAtom,
  smallestLessonIdAtom,
  moduleAndChapterAtom,
  totalModulesAtom,
  totalChaptersAtom,
  moduleStructureAtom,
} from "./atom";
import { BitcoinBasics } from "@/utils/TUTORIALS";
import { ArticleViewProps } from "./Tutorials/ArticleView";

const LoginModal = () => {
  const [userLessonsArray, setUserLessonsArray] = useAtom(userLessons);
  const [completionPercentage, setCompletionPercentage] =
    useAtom(percentageLessons);
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
  const [moduleStructure, setModuleStructure] = useAtom(moduleStructureAtom);

  const [forgotPassword, setForgotPasswordModal] = useAtom(forgotPasswordModal);
  const [isUserSignedIn, setIsUserSignedIn] = useAtom(userSignedIn);

  const [showLogin, setShowLogin] = useAtom(showLoginModalAtom);
  const [user, setUser] = useAtom(userAtom);
  const [userTokenm, setUserToken] = useAtom(userTokenAtom);
  const [payment, setPayment] = useAtom(paymentAtom);

  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [emailBlur, setEmailBlur] = useState(false);

  const [password, setPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [passWordBlur, setPassWordBlur] = useState(false);

  const login = trpc.loginUser.useMutation();

  const fetchUserLessons = trpc.fetchUserLessons.useQuery(undefined, {
    refetchOnMount: true,
    onSuccess: (data) => {
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

  const handleInputChange = (value: string) => {
    const inputValue = value;

    setEmail(inputValue);

    // Validate the email format
    if (inputValue !== "") {
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
    }
  };

  const handlePasswordChange = (value: string) => {
    const inputValue = value;
    setPassword(inputValue);

    // Validate the password
    if (inputValue !== "") {
      setIsValidPassword(true);
    } else {
      setIsValidPassword(false);
    }
  };

  const handleLogin = async () => {
    try {
      const res = await login.mutateAsync({
        email: email,
        password: password,
      });

      if (res.user) {
        setUser(res.user as any);
        setUserToken(res.user.sessionToken);
        setIsUserSignedIn(true);
        fetchUserLessons.refetch();
      }

      if (res.payment) {
        setPayment(res.payment as any);
      }
      console.log("res", res);
    } catch (err) {
      console.log("err", err);
    }
  };

  const handleClickBeforeValid = () => {
    // turn all forms blur on to show error messages
    setEmailBlur(true);
    setPassWordBlur(true);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (isValidSubmit) {
      handleLogin();
    } else {
      handleClickBeforeValid();
    }
  };

  const isValidSubmit = isValidEmail && isValidPassword;

  useEffect(() => {
    // Helper function to get unique values from an array of objects based on a key
    const getUniqueByKey = (array: any[], key: string) => [
      ...new Set(array.map((item: { [x: string]: any }) => item[key])),
    ];

    // Helper function to construct the module and section structure with lesson counts
    const constructModuleStructure = (articles: ArticleViewProps[]) => {
      const modules = getUniqueByKey(articles, "module");
      return modules
        .map((module) => {
          const sections = getUniqueByKey(
            articles.filter(
              (article: { module: unknown }) => article.module === module
            ),
            "section"
          );
          return sections.map((section) => {
            const lessonsInSection = articles.filter(
              (article: { module: unknown; section: unknown }) =>
                article.module === module && article.section === section
            );
            const lessonTitles = lessonsInSection.map((lesson) => lesson.title);

            console.log("lesson title", lessonTitles);
            return {
              module,
              section,
              lessonTitles,
              lessons: lessonsInSection.length,
            };
          });
        })
        .flat();
    };

    // Constructing the module structure
    const moduleStructure = constructModuleStructure(BitcoinBasics);

    // Set the total number of modules and chapters
    setTotalModules(getUniqueByKey(BitcoinBasics, "module").length);
    setTotalChapters(
      moduleStructure.reduce((acc, curr) => acc + curr.lessons, 0)
    );
    console.log("TOTAL MODULES", totalModules);
    console.log("TOTAL CHAPTERS", totalChapters);

    const constructedModuleStructure = constructModuleStructure(BitcoinBasics);
    setModuleStructure(constructedModuleStructure);
    console.log("Module Structure: ", moduleStructure);

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
        (
          acc: ModuleAccumulator,
          { module, section, lessons, lessonTitles }
        ) => {
          // If the module doesn't exist in the accumulator, add it
          if (!acc[module]) {
            acc[module] = {
              module,
              sections: 0,
              lessons: 0,
              lessonTitles: [],
            };
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

    // Calculate and set the completion percentage
    const totalLessons = BitcoinBasics.length;
    const completedLessons = userLessonsArray.filter(
      (lesson) => lesson.completed
    ).length;
    const percentage =
      totalLessons > 0
        ? Math.round((completedLessons / totalLessons) * 100)
        : 0;
    setCompletionPercentage(percentage);
    console.log("Completion Percentage: ", percentage);

    // Instead of finding the smallest completed lesson index, find the last completed lesson index.
    const lastCompletedLessonIndex = BitcoinBasics.reduce(
      (acc, lesson, index) => {
        const isCompleted = userLessonsArray.some(
          (userLesson) =>
            userLesson.lessonId === lesson.lesson && userLesson.completed
        );
        return isCompleted ? index : acc;
      },
      -1
    );

    console.log("LAST COMPLETED LESSON INDEX:", lastCompletedLessonIndex);

    // Helper function to get an array of completed lesson IDs
    const completedLessonIds = userLessonsArray
      .filter((lesson) => lesson.completed)
      .map((lesson) => lesson.lessonId);

    // Find the next uncompleted lesson ID
    let nextUncompletedLessonId: number = 0;
    // Iterate through aggregatedModules to find the next uncompleted lesson
    aggregatedModules.some((module) => {
      const nextLesson = module.lessonTitles.find((title) => {
        // Find the lesson in BitcoinBasics by title to get its ID
        const lesson = BitcoinBasics.find((lesson) => lesson.title === title);
        // Check if the lesson ID is not in the completedLessonIds array
        return lesson && !completedLessonIds.includes(lesson.lesson);
      });

      // If a lesson is found, update nextUncompletedLessonId
      if (nextLesson) {
        const foundLesson = BitcoinBasics.find(
          (lesson) => lesson.title === nextLesson
        );
        if (foundLesson) {
          nextUncompletedLessonId = foundLesson.lesson; // This will always be a string since it's an ID
        }
      }

      // Return true to stop iterating if nextUncompletedLessonId is found, false otherwise
      return !!nextUncompletedLessonId;
    });

    // If we have a lesson ID, find the corresponding lesson in BitcoinBasics
    let nextUncompletedLessonTitle: string = "";
    if (nextUncompletedLessonId) {
      const nextUncompletedLesson = BitcoinBasics.find(
        (lesson) => lesson.lesson === nextUncompletedLessonId
      );
      if (nextUncompletedLesson) {
        nextUncompletedLessonTitle = nextUncompletedLesson.title;
      }
    }

    console.log("NEXT UNCOMPLETED LESSON TITLE:", nextUncompletedLessonTitle);

    // Find the lesson object in BitcoinBasics that matches the next uncompleted lesson title
    const nextLesson = BitcoinBasics.find(
      (lesson) => lesson.title === nextUncompletedLessonTitle
    );

    if (nextLesson) {
      // Set the smallest lesson details
      setSmallestLessonTitle(nextLesson.title);
      setSmallestLessonHref(nextLesson.href);
      setSmallestLessonType(nextLesson.itemType);
      setSmallestLessonId(nextLesson.lesson);

      console.log("Smallest Lesson Title: ", nextLesson.title);
      console.log("Smallest Lesson Href: ", nextLesson.href);
      console.log("Smallest Lesson Type: ", nextLesson.itemType);
      console.log("Smallest Lesson ID: ", nextLesson.lesson);

      // Initialize variables to store the current module and chapter
      let currentModule = null;
      let chapter = 0;

      // Iterate over the aggregatedModules to find the module and chapter
      for (const module of aggregatedModules) {
        // Check if the current lesson title matches the nextLesson title
        const lessonIndex = module.lessonTitles.indexOf(nextLesson.title);
        if (lessonIndex !== -1) {
          currentModule = module.module;
          // Calculate the chapter based on the position of the lesson title
          chapter = lessonIndex + 1; // Add 1 to match the 1-based index
          break;
        }
      }

      // Check if we found a valid currentModule, otherwise use a fallback
      if (currentModule) {
        setModuleAndChapter({
          module: currentModule,
          chapter: chapter,
        });
        console.log("CURRENT MODULE", currentModule);
        console.log("CURRENT CHAPTER", chapter);
      } else {
        // Fallback case if no current module is found
        setModuleAndChapter({ module: "Witness Transaction", chapter: 1 });
      }
      console.log("MODULE AND CHAPTER", moduleAndChapter);
    }
  }, [
    BitcoinBasics,
    userLessonsArray,
    setTotalModules,
    setTotalChapters,
    setCompletionPercentage,
    setSmallestLessonTitle,
    setSmallestLessonHref,
    setSmallestLessonType,
    setSmallestLessonId,
    setModuleAndChapter,
  ]);

  return (
    <>
      <AnimatePresence>
        {showLogin && user === null && (
          <motion.div
            initial={{ x: "100vw", opacity: 0 }}
            animate={{ x: "0", opacity: 1 }}
            onClick={() => setShowLogin(false)}
            className="absolute bottom-0 right-0 top-0 z-50  ml-[250px] mt-24 grid h-screen w-screen  place-items-center overflow-y-scroll bg-slate-100/10 backdrop-blur md:w-[77%] lg:w-[81%] xl:w-[84.5%] 2xl:w-[85.5%]"
          >
            <motion.div
              initial={{ scale: 0, rotate: "0deg" }}
              animate={{ scale: 1, rotate: "0deg" }}
              exit={{ scale: 0, rotate: "0deg" }}
              onClick={(e) => e.stopPropagation()}
              className=" relative flex h-max max-h-[620px] cursor-default flex-col items-center rounded-[20px]  bg-white p-8 px-10  text-[#0C071D] shadow-xl md:w-[95%]  lg:w-[80%] xl:w-[65%] 2xl:w-[570px]"
            >
              <div className="flex flex-col items-center">
                <h3 className="mb-2  text-left text-lg font-bold md:text-xl">
                  Login
                </h3>
                {login.error && (
                  <p className="text-center text-xs text-accent-orange">
                    {login.error.message}
                  </p>
                )}
              </div>
              <form
                onSubmit={handleSubmit}
                className="mt-5 flex w-full flex-col gap-4"
                autoComplete="off"
              >
                <div className="mt-3 flex w-full flex-col md:mt-0">
                  <p className="font-extralight">Email</p>
                  {
                    // If the email is not valid, show the error message
                    !isValidEmail && emailBlur && (
                      <p className="mt-1 text-[12px] text-[#F79327]">
                        Please enter a valid email address
                      </p>
                    )
                  }
                  <input
                    type="text"
                    placeholder="Email"
                    className="border-gray mt-2 rounded-full border p-4"
                    value={email}
                    onChange={(e) => handleInputChange(e.target.value)}
                    onBlur={() => setEmailBlur(true)}
                  />
                  <div className="mt-4 h-[1px] w-full bg-dark-orange" />
                </div>
                <div className="flex w-full flex-col ">
                  <p className="font-extralight">Password</p>
                  {
                    // If the email is not valid, show the error message
                    !isValidPassword && passWordBlur && (
                      <p className="mt-1 text-[12px] text-[#F79327]">
                        Please enter a valid password
                      </p>
                    )
                  }
                  <input
                    type="password"
                    placeholder="Password"
                    className="border-gray mt-2 rounded-full border p-4"
                    value={password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    onBlur={() => setPassWordBlur(true)}
                  />
                </div>
                <p
                  onClick={() => {
                    setForgotPasswordModal(true);
                    setShowLogin(false);
                  }}
                  className="cursor-pointer self-center text-dark-orange underline"
                >
                  Forgot Password?{" "}
                </p>
                <button
                  type="submit"
                  className={classNames(
                    "mt-6 flex w-full  flex-col items-center justify-center rounded-lg transition-all ",
                    isValidSubmit
                      ? "cursor-pointer bg-dark-orange shadow-md hover:shadow-lg"
                      : "bg-accent-orange"
                  )}
                >
                  <h3 className="  py-4 text-left text-xl  text-white ">
                    Let's Get Started
                  </h3>
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LoginModal;
