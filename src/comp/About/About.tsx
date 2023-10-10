import { useAtom, useAtomValue } from "jotai";
import FormAbout from "./Form";
import LogoWBg from "./LogoWBg";
import PfpTeam from "./PfpTeam";
import { hoveredImageMember } from "../atom";
import Link from "next/link";

const About = () => {
  const [hoveredImage] = useAtom(hoveredImageMember);
  return (
    <div className="flex flex-col md:ml-[240px]">
      {/* About Bitscript */}
      <div className="flex flex-col items-center justify-between bg-white xl:h-[350px] xl:flex-row">
        {/* Text */}
        <div className="m-10 flex flex-col xl:mr-[200px]">
          <p className="text-3xl font-medium text-black">About BitScript</p>
          <p className="mt-5 font-extralight text-black">
            Our NorthStar is to scale the programming layer of Bitcoin by
            introducing & supporting developers to the ecosystem through
            educational on-boarding & technical support.
          </p>
          <p className="mt-5 font-extralight text-black">
            We do this by shipping intuitive, powerful, & flexible Bitcoin
            development tools that together make up a{" "}
            <span className="font-bold">Bitcoin Development Environment. </span>
          </p>
          <p className="mt-5 font-extralight text-black">
            The first of these is a transaction{" "}
            <Link href={"/transactions"} className="underline" target="_blank">
              {" "}
              deserializer
            </Link>{" "}
            that’s in MVP now. 
          </p>
        </div>
        <div className="mb-5 ml-10 mr-10 mt-10 flex xl:mt-0">
          <LogoWBg />
        </div>
      </div>
      {/* Who Are We */}
      <div className="flex flex-col items-center justify-between md:h-[600px] xl:ml-10 xl:h-[350px] xl:flex-row">
        <div className="hidden xl:flex">
          <PfpTeam />
        </div>
        {/* Conditional Render Text */}

        <div className="mr-10 flex flex-col xl:ml-[600px]">
          {hoveredImage === "SetZeus" ? (
            <>
              <p className="mt-5 text-right text-3xl font-medium text-black">
                SetZeus
              </p>
              <p className="mt-5 text-right font-semibold text-black">
                Jesus Najera | @setzeus | jesus@stratalabs.xyz
              </p>
              <p className="mt-5 text-right font-extralight text-black">
                Biography
              </p>
              <p className="mt-5 text-right font-extralight text-black">
                Fun Fact
              </p>
            </>
          ) : hoveredImage === "SetBern" ? (
            <>
              <p className="mt-5 text-right text-3xl font-medium text-black">
                SetBern
              </p>
              <p className="mt-5 text-right font-semibold text-black">
                Bernardo Garcia | @setbern_ | bern@stratalabs.xyz
              </p>
              <p className="mt-5 text-right font-extralight text-black">
                Biography
              </p>
              <p className="mt-5 text-right font-extralight text-black">
                Fun Fact
              </p>
            </>
          ) : hoveredImage === "SetPato" ? (
            <>
              <p className="mt-5 text-right text-3xl font-medium text-black">
                SetPato
              </p>
              <p className="mt-5 text-right font-semibold text-black">
                Carlos Gómez | @setpato | pato@stratalabs.xyz
              </p>
              <p className="mt-5 text-right font-extralight text-black">
                An adept cybersecurity professional, SetPato is deeply
                entrenched in the innovative realm of Stacks Blockchain,
                specializing in Clarity code for SmartContracts. With
                proficiency in front-end development, harnessing the power of
                React, to create dynamic digital solutions. SePato's passion for
                secure and efficient tech makes him a pivotal asset in the
                rapidly evolving world of blockchain and web development.
              </p>
              <p className="mt-5 text-right font-extralight text-black">
                SetPato played Professional Soccer and was part of the Mexico's
                Ice Hockey National Team
              </p>
            </>
          ) : (
            <>
              <p className="mt-5 text-right text-3xl font-medium text-black">
                Who Are We
              </p>
              <p className="mt-5 text-right font-extralight text-black">
                We’re a tiny but fiery team with more than a decade in software
                engineering & product development. We recently spent the
                majority of our time working within the Stacks community &
                slowly working our way to building on Bitcoin. Through this
                journey, we realized the significant gap in educational content
                & development tooling in the most important chain of them all.
              </p>
              <p className="mt-5 text-right font-bold text-black">
                Hover over any of the portraits to learn more about a teammate.
              </p>
            </>
          )}
        </div>
        <div className="ml-10 mr-10 flex xl:hidden">
          <PfpTeam />
        </div>
      </div>
      {/* Contact Or Feedback */}
      <div className="mt-10 flex flex-col items-center justify-between bg-white xl:h-[500px] xl:flex-row">
        {/* Text */}
        <div className="mb-10 ml-10 mr-10 mt-5 flex flex-col xl:mr-[200px]">
          <p className=" text-3xl font-medium text-black">
            Contact Or Feedback?
          </p>
          <p className="mt-5  font-extralight text-black">
            Our goal is to grow alongside the community of developers leveraging
            our platform - this means we’re always happy to hear from you.
          </p>
          <p className="mt-5 font-extralight text-black">
            We’re continuously adjusting our roadmap & would love to hear about
            what features fit your needs best. Whether you’re curious about a
            topic or immediately need a specific update / feature, we highly
            encourage you get in contact.
          </p>
          <p className="mt-5 font-extralight text-black">
            Follow us on{" "}
            <Link
              href={"https://twitter.com/bitscriptapp"}
              className="underline"
              target="_blank"
            >
              Twitter
            </Link>{" "}
            or join our Discord community.
          </p>
        </div>
        <div className="mb-10 mt-10 flex xl:mr-10 xl:mt-0">
          <FormAbout />
        </div>
      </div>
    </div>
  );
};

export default About;
