import { useTranslation } from "next-i18next";

const Sandbox = () => {
  const { t } = useTranslation("tools");

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-primary-gray ">
      <p className="text-md ml-0 text-black md:ml-[270px] md:text-lg lg:text-2xl xl:text-4xl">
        {t("workInProgress")}
      </p>
    </div>
  );
};

export default Sandbox;
