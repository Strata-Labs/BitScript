import React, { useState } from "react";
import ListItem from "./ListContent";

import { BitcoinBasics } from "@/utils/TUTORIALS";

import { trpc } from "@/utils/trpc";

import { useAtom } from "jotai";
import { paymentAtom } from "../atom";

type TutorialsListProps = {
  module: string;
};

type LessonType = {
  module: string;
  section: string;
  title: string;
  description: string;
  href: string;
  isLocked: boolean;
  itemType: string;
  lesson: number;
  shortHandTitle: string;
};

type SectionLessonsAccumulator = {
  [section: string]: LessonType[];
};

const TutorialsList: React.FC<TutorialsListProps> = ({ module }) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [payment] = useAtom(paymentAtom);

  // Filter the BitcoinBasics array to only include lessons from the given module
  const filteredLessons = BitcoinBasics.filter(
    (lesson: LessonType) => lesson.module === module
  );

  // Group lessons by section
  const sections = filteredLessons.reduce(
    (acc: SectionLessonsAccumulator, lesson: LessonType) => {
      const { section } = lesson;
      if (!acc[section]) {
        acc[section] = [];
      }
      acc[section].push(lesson);
      return acc;
    },
    {}
  );

  // Function to toggle the open state of a section
  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="rounded-2xl bg-[#F0F0F0] p-2 md:p-5">
      {Object.entries(sections).map(([section, lessons], index, array) => (
        <React.Fragment key={section}>
          <div
            className={`flex cursor-pointer flex-row items-center justify-between ${
              index === array.length - 1 ? "" : "border-b"
            } p-3`}
            onClick={() => toggleSection(section)}
          >
            <div className="flex flex-row items-center text-[12px] md:text-[16px]">
              <svg
                width="14"
                height="23"
                viewBox="0 0 14 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`h-[15px] md:h-[23px] ${
                  openSections[section] ? "rotate-90" : "rotate-0"
                }`}
              >
                <path
                  d="M0.939325 3.06153C0.353681 2.47589 0.353395 1.52656 0.938472 0.940565C1.23149 0.645737 1.6171 0.499969 1.99958 0.499969C2.38244 0.499969 2.76772 0.645947 3.06169 0.941551C3.0619 0.941771 3.06212 0.941992 3.06234 0.942211L12.3945 10.2743C12.9804 10.8603 12.9804 11.8102 12.3945 12.3962L3.06114 21.7295C2.47522 22.3154 1.52525 22.3154 0.939325 21.7295C0.353396 21.1436 0.353396 20.1936 0.939325 19.6077L9.2124 11.3346L0.939325 3.06153Z"
                  fill="#F79327"
                />
              </svg>
              <p className="ml-3">{section}</p>
            </div>
            <p className="text-[12px] text-[#687588] md:text-[16px]">
              {lessons.length} Lessons
            </p>
          </div>
          {openSections[section] && (
            <div>
              {lessons.map((item, index) => (
                <ListItem
                  key={item.title}
                  title={item.title}
                  description={item.description}
                  href={item.shortHandTitle}
                  isLocked={!payment?.hasAccess && item.isLocked}
                  itemType={item.itemType}
                  lesson={item.lesson}
                />
              ))}
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default TutorialsList;
