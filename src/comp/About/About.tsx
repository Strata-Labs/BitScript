import { trpc } from "@/utils/trpc";
import FormAbout from "./Form";
import LogoWBg from "./LogoWBg";
import PfpTeam from "./PfpTeam";
import Link from "next/link";

import { useAtom } from "jotai";
import { teamMemberAtom } from "../atom";
import { Trans, useTranslation } from "next-i18next";

const About = () => {
  const { t } = useTranslation("about");
  const createTeam = trpc.createTeam.useMutation();
  const createTeamUserLink = trpc.createTeamUserLink.useMutation();
  const sendEmailText = trpc.sendEmailText.useMutation();
  const [hoveredImage, setHoveredImage] = useAtom(teamMemberAtom);

  const renderTeamMemberInfo = () => {
    if (hoveredImage === "SetZeus") {
      return (
        <div className="h-[280px]">
          <p className="text-right text-3xl font-medium">SetZeus</p>
          <p className="mt-5 text-right font-extralight">
            {t("setzeus_bio")}
          </p>
          <p className="mt-5 text-right font-extralight">
            {t("setzeus_fun_fact")}
          </p>
          <p className="mt-5 text-right font-bold">@setzeus</p>
        </div>
      );
    } else if (hoveredImage === "SetBern") {
      return (
        <div className="h-[280px]">
          <p className="text-right text-3xl font-medium">SetBern</p>
          <p className="mt-5 text-right font-extralight">
            {t("setbern_bio")}
          </p>
          <p className="mt-5 text-right font-bold">@setbern_</p>
        </div>
      );
    } else if (hoveredImage === "SetPato") {
      return (
        <div className="h-[280px]">
          <p className="text-right text-3xl font-medium">SetPato</p>
          <p className="mt-5 text-right font-extralight">
            {t("setpato_bio")}
          </p>
          <p className="mt-5 text-right font-extralight">
            {t("setpato_fun_fact")}
          </p>
          <p className="mt-5 text-right font-bold">@setpato</p>
        </div>
      );
    } else {
      return (
        <div className="h-[280px]">
          <p className="text-right text-3xl font-medium">{t("who_are_we_title")}</p>
          <p className="mt-5 text-right font-extralight">
            {t("who_are_we_body")}
          </p>
          <p className="mt-5 text-right font-bold">
            {t("who_are_we_hint")}
          </p>
        </div>
      );
    }
  };
  return (
    <div className="ml-10 mr-10 mt-10 flex flex-col text-black md:ml-[260px]">
      {/* About Bitscript */}
      <div className="flex flex-col items-center justify-between xl:flex-row">
        {/* Text */}
        <div className="flex flex-col xl:w-full">
          <p className="text-3xl font-medium">{t("about_title")}</p>
          <p className="mt-5 font-extralight">{t("about_p1")}</p>
          <p className="mt-5 font-extralight">
            <Trans
              i18nKey="about_p2"
              ns="about"
              components={{ bold: <span className="font-bold" /> }}
            />
          </p>
          <p className="mt-5 font-extralight">
            <Trans
              i18nKey="about_p3"
              ns="about"
              components={{
                deserializer: (
                  <Link
                    href={"/transactions"}
                    target="_blank"
                    className=" underline"
                  />
                ),
              }}
            />
          </p>
        </div>
        <div className="mt-10 flex xl:mt-0">
          <img src="Logo-with-bg.png" alt="Logo" className="ml-10 w-[700px]" />
        </div>
      </div>
      {/* Who Are We */}
      <div className="mt-10 flex flex-col items-center justify-between xl:flex-row">
        <div className="hidden xl:flex">
          <PfpTeam />
        </div>

        {/* Text Team */}
        <div className="flex flex-col xl:w-[500px]">
          {" "}
          {renderTeamMemberInfo()}
        </div>
        <div className="mt-10 flex xl:hidden">
          <PfpTeam />
        </div>
      </div>
      {/* Contact Or Feedback */}
      <div className="mb-20 mt-10 flex flex-col items-center justify-between xl:flex-row">
        {/* Text */}
        <div className="flex flex-col xl:w-[1000px]">
          <p className=" text-3xl font-medium">{t("contact_title")}</p>
          <p className="mt-5  font-extralight">{t("contact_p1")}</p>
          <p className="mt-5 font-extralight">{t("contact_p2")}</p>
          <p className="mt-5 font-extralight">
            <Trans
              i18nKey="contact_p3"
              ns="about"
              components={{
                x: (
                  <Link
                    href={
                      "https://x.com/bitscriptapp?s=21&t=SxzJcUYs1owhWXY-jWdtsA"
                    }
                    target="_blank"
                    className="font-bold underline"
                  />
                ),
              }}
            />
          </p>
        </div>
        <div className="ml-10 mt-10 flex w-full lg:w-auto xl:mt-0">
          <FormAbout />
        </div>
      </div>
    </div>
  );
};

export default About;
