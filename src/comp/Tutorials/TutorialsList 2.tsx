import { useState } from "react";
import ListItem from "./ListContent";

const TutorialsList = () => {
  const [isBBOpen, setIsBBOpen] = useState(false);
  const [isNSOpen, setIsNSOpen] = useState(false);

  return (
    <div className="rounded-2xl bg-[#F0F0F0] p-5">
      {/* Step1 */}
      <div
        className="flex cursor-pointer flex-row items-center justify-between border-b p-3"
        onClick={() => setIsBBOpen(!isBBOpen)}
      >
        <div className="flex flex-row items-center">
          <svg
            width="14"
            height="23"
            viewBox="0 0 14 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={isBBOpen ? "rotate-90" : "rotate-0"}
          >
            <path
              d="M0.939325 3.06153C0.353681 2.47589 0.353395 1.52656 0.938472 0.940565C1.23149 0.645737 1.6171 0.499969 1.99958 0.499969C2.38244 0.499969 2.76772 0.645947 3.06169 0.941551C3.0619 0.941771 3.06212 0.941992 3.06234 0.942211L12.3945 10.2743C12.9804 10.8603 12.9804 11.8102 12.3945 12.3962L3.06114 21.7295C2.47522 22.3154 1.52525 22.3154 0.939325 21.7295C0.353396 21.1436 0.353396 20.1936 0.939325 19.6077L9.2124 11.3346L0.939325 3.06153Z"
              fill="#F79327"
              stroke="white"
            />
          </svg>
          <p className="ml-10 font-semibold">Bitcoin Basics</p>
        </div>
        <p className="text-[#687588]">12 Lessons</p>
      </div>
      {isBBOpen && (
        <>
          <div>
            <ListItem
              title={"Reviewing The Math"}
              description={
                "Ensuring Bitcoin works across any device means with many number system."
              }
              href={"video"}
              isLocked={true}
              itemType={"video"}
            />
            <ListItem
              title={"Base-2"}
              description={
                "Binary & how the Bit is the most basic unit of computing"
              }
              href={"article"}
              isLocked={false}
              itemType={"article"}
            />
            <ListItem
              title={"Base-16"}
              description={
                "Ensuring Bitcoin works across any device means with many number system."
              }
              href={"article"}
              isLocked={true}
              itemType={"article"}
            />
            <ListItem
              title={"Bytes vs Hex"}
              description={
                "Binary & how the Bit is the most basic unit of computing"
              }
              href={"article"}
              isLocked={true}
              itemType={"article"}
            />
            <ListItem
              title={"Numbers & Strings"}
              description={
                "Ensuring Bitcoin works across any device means with many number system."
              }
              href={"article"}
              isLocked={false}
              itemType={"article"}
            />
          </div>
        </>
      )}
      <div
        className="flex cursor-pointer flex-row items-center justify-between border-b p-3"
        onClick={() => setIsNSOpen(!isNSOpen)}
      >
        <div className="flex flex-row items-center">
          <svg
            width="14"
            height="23"
            viewBox="0 0 14 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={isNSOpen ? "rotate-90" : "rotate-0"}
          >
            <path
              d="M0.939325 3.06153C0.353681 2.47589 0.353395 1.52656 0.938472 0.940565C1.23149 0.645737 1.6171 0.499969 1.99958 0.499969C2.38244 0.499969 2.76772 0.645947 3.06169 0.941551C3.0619 0.941771 3.06212 0.941992 3.06234 0.942211L12.3945 10.2743C12.9804 10.8603 12.9804 11.8102 12.3945 12.3962L3.06114 21.7295C2.47522 22.3154 1.52525 22.3154 0.939325 21.7295C0.353396 21.1436 0.353396 20.1936 0.939325 19.6077L9.2124 11.3346L0.939325 3.06153Z"
              fill="#F79327"
              stroke="white"
            />
          </svg>
          <p className="ml-10 font-semibold">Number Systems</p>
        </div>
        <p className="text-[#687588]">9 Lessons</p>
      </div>
      {isNSOpen && (
        <>
          <ListItem
            title={"Reviewing The Math"}
            description={
              "Ensuring Bitcoin works across any device means with many number system."
            }
            href={""}
            isLocked={true}
            itemType={"video"}
          />
          <ListItem
            title={"Base-2"}
            description={
              "Binary & how the Bit is the most basic unit of computing"
            }
            href={""}
            isLocked={false}
            itemType={"article"}
          />
          <ListItem
            title={"Base-16"}
            description={
              "Ensuring Bitcoin works across any device means with many number system."
            }
            href={""}
            isLocked={true}
            itemType={"article"}
          />
          <ListItem
            title={"Bytes vs Hex"}
            description={
              "Binary & how the Bit is the most basic unit of computing"
            }
            href={""}
            isLocked={true}
            itemType={"article"}
          />
          <ListItem
            title={"Numbers & Strings"}
            description={
              "Ensuring Bitcoin works across any device means with many number system."
            }
            href={""}
            isLocked={false}
            itemType={"article"}
          />
        </>
      )}
    </div>
  );
};

export default TutorialsList;
