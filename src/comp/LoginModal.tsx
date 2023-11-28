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
  createLoginModal,
} from "./atom";
import { BitcoinBasics } from "@/utils/TUTORIALS";
import { ArticleViewProps } from "./Tutorials/ArticleView";
import Link from "next/link";

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
  const [isCreateLoginModalOpen, setIsCreateLoginModalOpen] =
    useAtom(createLoginModal);

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
        setUserToken(res.user.sessionToken ?? null);
        setIsUserSignedIn(true);
        fetchUserLessons.refetch();
      }

      if (res.payment) {
        setPayment(res.payment as any);
      }
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
    const getUniqueByKey = (array: any[], key: string) => [
      ...new Set(array.map((item: { [x: string]: any }) => item[key])),
    ];

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

    const moduleStructure = constructModuleStructure(BitcoinBasics);

    setTotalModules(getUniqueByKey(BitcoinBasics, "module").length);
    setTotalChapters(
      moduleStructure.reduce((acc, curr) => acc + curr.lessons, 0)
    );

    const constructedModuleStructure = constructModuleStructure(BitcoinBasics);
    setModuleStructure(constructedModuleStructure);

    type ModuleAccumulator = {
      [key: string]: {
        module: string;
        sections: number;
        lessons: number;
        lessonTitles: string[];
      };
    };

    const aggregatedModules = Object.values(
      moduleStructure.reduce(
        (
          acc: ModuleAccumulator,
          { module, section, lessons, lessonTitles }
        ) => {
          if (!acc[module]) {
            acc[module] = {
              module,
              sections: 0,
              lessons: 0,
              lessonTitles: [],
            };
          }

          acc[module].sections += 1;

          acc[module].lessons += lessons;

          acc[module].lessonTitles =
            acc[module].lessonTitles.concat(lessonTitles);
          return acc;
        },
        {}
      )
    );

    const totalLessons = BitcoinBasics.length;
    const completedLessons = userLessonsArray.filter(
      (lesson) => lesson.completed
    ).length;
    const percentage =
      totalLessons > 0
        ? Math.round((completedLessons / totalLessons) * 100)
        : 0;
    setCompletionPercentage(percentage);

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

    const completedLessonIds = userLessonsArray
      .filter((lesson) => lesson.completed)
      .map((lesson) => lesson.lessonId);

    let nextUncompletedLessonId: number = 0;

    aggregatedModules.some((module) => {
      const nextLesson = module.lessonTitles.find((title) => {
        const lesson = BitcoinBasics.find((lesson) => lesson.title === title);

        return lesson && !completedLessonIds.includes(lesson.lesson);
      });

      if (nextLesson) {
        const foundLesson = BitcoinBasics.find(
          (lesson) => lesson.title === nextLesson
        );
        if (foundLesson) {
          nextUncompletedLessonId = foundLesson.lesson;
        }
      }

      return !!nextUncompletedLessonId;
    });

    let nextUncompletedLessonTitle: string = "";
    if (nextUncompletedLessonId) {
      const nextUncompletedLesson = BitcoinBasics.find(
        (lesson) => lesson.lesson === nextUncompletedLessonId
      );
      if (nextUncompletedLesson) {
        nextUncompletedLessonTitle = nextUncompletedLesson.title;
      }
    }

    const nextLesson = BitcoinBasics.find(
      (lesson) => lesson.title === nextUncompletedLessonTitle
    );

    if (nextLesson) {
      setSmallestLessonTitle(nextLesson.title);
      setSmallestLessonHref(nextLesson.href);
      setSmallestLessonType(nextLesson.itemType);
      setSmallestLessonId(nextLesson.lesson);

      let currentModule = null;
      let chapter = 0;

      for (const module of aggregatedModules) {
        const lessonIndex = module.lessonTitles.indexOf(nextLesson.title);
        if (lessonIndex !== -1) {
          currentModule = module.module;

          chapter = lessonIndex + 1;
          break;
        }
      }

      if (currentModule) {
        setModuleAndChapter({
          module: currentModule,
          chapter: chapter,
        });
      } else {
        setModuleAndChapter({ module: "Witness Transaction", chapter: 1 });
      }
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
            initial={{ x: "0", opacity: 0 }}
            animate={{ x: "0", opacity: 1 }}
            onClick={() => setShowLogin(false)}
            className="fixed inset-0 z-50 grid cursor-pointer place-items-center overflow-y-scroll bg-slate-100/10 backdrop-blur"
          >
            <motion.div
              initial={{ scale: 0, rotate: "0deg" }}
              animate={{ scale: 1, rotate: "0deg" }}
              exit={{ scale: 0, rotate: "0deg" }}
              onClick={(e) => e.stopPropagation()}
              className="relative m-auto flex h-max max-h-[620px] w-[300px]  cursor-default flex-col items-center rounded-[20px] bg-white p-8 px-10 text-[#0C071D] shadow-xl   md:w-[600px]"
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
              <Link
                onClick={() => {
                  setShowLogin(false);
                }}
                className="mt-5 cursor-pointer self-center text-dark-orange underline"
                href={"/profile"}
              >
                Create Account{" "}
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LoginModal;
