import { scriptExamples } from "../SandboxPopUp";

type ExampleProps = {
  setExamplesShowing: (examplesShowing: boolean) => void;
};
const Example = ({ setExamplesShowing }: ExampleProps) => {
  return (
    <>
      <button
        className="absolute left-2 top-2 rounded-full bg-[#242034] p-2"
        onClick={() => setExamplesShowing(false)}
      >
        {" "}
        <svg
          width="21"
          height="20"
          viewBox="0 0 21 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ transform: "rotate(180deg)" }}
        >
          <path
            d="M7.99986 16.4583C8.15986 16.4583 8.31988 16.3975 8.44155 16.275L14.2749 10.4417C14.519 10.1975 14.519 9.80164 14.2749 9.55747L8.44155 3.72414C8.19738 3.47997 7.80152 3.47997 7.55735 3.72414C7.31319 3.96831 7.31319 4.36417 7.55735 4.60834L12.949 9.99998L7.55735 15.3916C7.31319 15.6358 7.31319 16.0317 7.55735 16.2758C7.67985 16.3975 7.83986 16.4583 7.99986 16.4583Z"
            fill="#fff"
          />
        </svg>
      </button>

      <h3 className="mb-2 ml-[20px] mr-[20px] mt-5 text-center text-[18px] font-bold md:ml-[120px] md:mr-[120px] md:text-[28px]">
        Script Examples
      </h3>
      <p className="font-extralight">select an option to continue</p>
      <div className="mt-5 h-[0.5px] w-full border-b border-[#F79327] "></div>
      {scriptExamples.map((i, index) => (
        <button className="mt-2 flex w-full flex-row items-center justify-between bg-[#0C071D] p-3 transition-all duration-500 ease-in-out hover:-translate-y-1">
          <p className="font-semibold">
            {i.title} <span className="font-extralight">{i.type}</span>
          </p>{" "}
          <div className="flex flex-row items-center">
            {" "}
            <p className="mr-2 rounded-full bg-[#231C33] px-4 py-2 text-[14px] font-extralight">
              {i.first}
            </p>{" "}
            {i.second === "" ? null : (
              <p className="mr-2 rounded-full bg-[#231C33] px-4 py-2 text-[14px] font-extralight">
                {i.second}
              </p>
            )}
            {i.third === "" ? null : (
              <p className="mr-2 rounded-full bg-[#231C33] px-4 py-2 text-[14px] font-extralight">
                {i.third}
              </p>
            )}
          </div>
        </button>
      ))}
    </>
  );
};

export default Example;
