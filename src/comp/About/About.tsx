import { trpc } from "@/utils/trpc";
import FormAbout from "./Form";
import LogoWBg from "./LogoWBg";
import PfpTeam from "./PfpTeam";
import Link from "next/link";
import { useAtom } from "jotai";
import { teamMemberAtom } from "../atom";

const About = () => {
  const createTeam = trpc.createTeam.useMutation();
  const createTeamUserLink = trpc.createTeamUserLink.useMutation();
  const sendEmailText = trpc.sendEmailText.useMutation();
  const [hoveredImage, setHoveredImage] = useAtom(teamMemberAtom);

  const handleClick = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };
  const renderTeamMemberInfo = () => {
    if (hoveredImage === "SetZeus") {
      return (
        <div className="h-[280px]">
          <p className="text-right text-3xl font-medium">SetZeus</p>
          <p className="mt-5 text-right font-extralight">
            Founder/CEO with a decade experience in scaling a dev agency. Most
            recently worked with TrustMachines & the Stacks ecosystem,
            programming the Clarity smart contracts for the sBTC bridge. My
            current contributions at the moment fall into Bitcoin development &
            product design.
          </p>
          <p className="mt-5 text-right font-extralight">
            Fun Fact: I researched & summarized the history of polymaths with a
            focus on their 20s (google "Young Polymaths series")
          </p>
          <p className="mt-5 text-right font-bold">@setzeus</p>
        </div>
      );
    } else if (hoveredImage === "SetBern") {
      return (
        <div className="h-[280px]">
          <p className="text-right text-3xl font-medium">SetBern</p>
          <p className="mt-5 text-right font-extralight">
            Since 2016 Iʼve run a development agency as a co-founder & lead
            React/Typescript/full-stack engineer. With a knack for starting
            projects and not finishing them I'm grateful for the ones that see
            the light of day against all odds. Currently building on Bitcoin &
            Stacks one block at time.
          </p>
          <p className="mt-5 text-right font-bold">@setbern_</p>
        </div>
      );
    } else if (hoveredImage === "SetPato") {
      return (
        <div className="h-[280px]">
          <p className="text-right text-3xl font-medium">SetPato</p>
          <p className="mt-5 text-right font-extralight">
            Joined the team in 2022, working as a Front-end engineer. Focused on
            building on Bitcoin and Stacks, always looking to develope and code.
            I always make sure to be the dummest guy in the room to keep
            learning and growing.
          </p>
          <p className="mt-5 text-right font-extralight">
            Fun Fact: I played for the Men's National Ice Hockey Team.
          </p>
          <p className="mt-5 text-right font-bold">@setpato</p>
        </div>
      );
    } else {
      return (
        <div className="h-[280px]">
          <p className="text-right text-3xl font-medium">Who Are We</p>
          <p className="mt-5 text-right font-extralight">
            We’re a tiny but fiery team with more than a decade in software
            engineering & product development. We recently spent the majority of
            our time working within the Stacks community & slowly working our
            way to building on Bitcoin. Through this journey, we realized the
            significant gap in educational content & development tooling in the
            most important chain of them all.
          </p>
          <p className="mt-5 text-right font-bold">
            Hover over any of the portraits to learn more about a teammate.
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
          <p onClick={() => handleClick()} className="text-3xl font-medium">
            About BitScript
          </p>
          <p className="mt-5 font-extralight">
            Our NorthStar is to scale the programming layer of Bitcoin by
            introducing & supporting developers to the ecosystem through
            educational on-boarding & technical support.
          </p>
          <p className="mt-5 font-extralight">
            We do this by shipping intuitive, powerful, & flexible Bitcoin
            development tools that together make up a{" "}
            <span className="font-bold">Bitcoin Development Environment.</span>
          </p>
          <p className="mt-5 font-extralight">
            The first of these is a transaction{" "}
            <Link href={"/transactions"} target="_blank" className=" underline">
              deserializer
            </Link>{" "}
            that’s in MVP now. 
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
          <p className=" text-3xl font-medium">Contact Or Feedback?</p>
          <p className="mt-5  font-extralight">
            Our goal is to grow alongside the community of developers leveraging
            our platform - this means we’re always happy to hear from you.
          </p>
          <p className="mt-5 font-extralight">
            We’re continuously adjusting our roadmap & would love to hear about
            what features fit your needs best. Whether you’re curious about a
            topic or immediately need a specific update / feature, we highly
            encourage you get in contact.
          </p>
          <p className="mt-5 font-extralight">
            Follow us on{" "}
            <Link
              href={"https://x.com/bitscriptapp?s=21&t=SxzJcUYs1owhWXY-jWdtsA"}
              target="_blank"
              className="font-bold underline"
            >
              X
            </Link>{" "}
            or join our Discord community.
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
