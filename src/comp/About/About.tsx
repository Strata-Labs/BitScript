import FormAbout from "./Form";
import LogoWBg from "./LogoWBg";
import PfpTeam from "./PfpTeam";

const About = () => {
  return (
    <div className="ml-10 mr-10 mt-5 flex flex-col text-black md:ml-[260px]">
      {/* About Bitscript */}
      <div className="flex flex-col items-center justify-between xl:flex-row">
        {/* Text */}
        <div className="flex flex-col xl:mr-[200px]">
          <p className="text-3xl font-medium">About BitScript</p>
          <p className="mt-5 font-extralight">
            Our NorthStar is to scale the programming layer of Bitcoin by
            introducing & supporting developers to the ecosystem through
            educational on-boarding & technical support.
          </p>
          <p className="mt-5 font-extralight">
            We do this by shipping intuitive, powerful, & flexible Bitcoin
            development tools that together make up a Bitcoin Development
            Environment.
          </p>
          <p className="mt-5 font-extralight">
            The first of these is a transaction deserializer that’s in MVP now. 
          </p>
        </div>
        <div className="mt-10 flex xl:mt-0">
          <LogoWBg />
        </div>
      </div>
      {/* Who Are We */}
      <div className="mt-20 flex flex-col items-center justify-between xl:flex-row">
        <div className="hidden xl:flex">
          <PfpTeam />
        </div>
        {/* Text */}
        <div className="flex flex-col xl:ml-[600px]">
          <p className="text-right text-3xl font-medium">Who Are We</p>
          <p className="mt-5 text-right font-extralight">
            We’re a tiny but fiery team with more than a decade in software
            engineering & product development. We recently spent the majority of
            our time working within the Stacks community & slowly working our
            way to building on Bitcoin. Through this journey, we realized the
            significant gap in educational content & development tooling in the
            most important chain of them all.
          </p>
          <p className="mt-5 text-right font-extralight">
            Hover over any of the portraits to learn more about a teammate.
          </p>
        </div>
        <div className="mt-10 flex xl:hidden">
          <PfpTeam />
        </div>
      </div>
      {/* Contact Or Feedback */}
      <div className="mb-20 mt-20 flex flex-col items-center justify-between xl:flex-row">
        {/* Text */}
        <div className="flex flex-col xl:mr-[200px]">
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
            Follow us on Twitter or join our Discord community.
          </p>
        </div>
        <div className="mt-10 flex xl:mt-0">
          <FormAbout />
        </div>
      </div>
    </div>
  );
};

export default About;
