import { useRouter } from "next/router";

type ScirptExample = {
  title: string;
  type: string;
  content: string;
  tags: string[];
  link: string;
  id: number;
};

export const scriptExamples = [
  {
    title: "Adding Two Numbers",
    type: "",
    content: "OP_PUSH1 \n 1 \n OP_PUSH2 \n 1000 \n OP_ADD",
    tags: ["Math", "Basic"],
    link: "https://www.bitscript.app/sandbox?script_id=1",
    id: 1,
  },
  {
    title: "Depth, Dup, & Size",
    content: "OP_PUSH1 \n 1 \n OP_DEPTH \n OP_DUP \n OP_SIZE",
    type: "",
    tags: ["Stack", "Basic"],
    link: "https://www.bitscript.app/sandbox?script_id=2",
    id: 2,
  },
  {
    title: "Equal vs. EqualVerify",
    content:
      "OP_PUSH1 \n 2 \n OP_PUSH1 \n 1 \n OP_PUSH1 \n 1 \n OP_EQUAL \n OP_EQUALVERIFY",
    type: "",
    tags: ["Script", "Basic"],
    link: "https://www.bitscript.app/sandbox?script_id=3",
    id: 3,
  },
  {
    title: "Hashing Helloworld",
    content:
      "OP_PUSH1 \n Helloworld \n OP_HASH256 \n 364bedd239814071a9e0a50b50fcbde3f6896d8bc6cd4858618c5cece0d36d5e \n OP_EQUAL",
    type: "",
    tags: ["Hash", "Basic"],
    link: "https://www.bitscript.app/sandbox?script_id=11",
    id: 11,
  },
  {
    title: "Simple If/Else",
    content:
      "OP_PUSH1 \n helloworld \n OP_HASH256 \n 364bedd239814071a9e0a50b50fcbde3f6896d8bc6cd4858618c5cece0d36d5e \n OP_EQUAL \n OP_IF \n OP_PUSH1 \n I am true \n OP_ELSE \n OP_PUSH1 \n I am not true \n OP_ENDIF \n OP_PUSH1 \n helloworld again",
    type: "",
    tags: ["Script", "Basic"],
    link: "https://www.bitscript.app/sandbox?script_id=7",
    id: 7,
  },
  {
    title: "Storage(drop)",
    content: "OP_PUSH1 \n hello \n OP_PUSH1 \n world \n OP_DROP",
    type: "",
    tags: ["Stack", "Basic"],
    link: "https://www.bitscript.app/sandbox?script_id=8",
    id: 8,
  },
  {
    title: "Storage(OP_RETURN)",
    content: "OP_RETURN \n Hello world",
    type: "",
    tags: ["Stack", "Basic"],
    link: "https://www.bitscript.app/sandbox?script_id=10",
    id: 10,
  },
  {
    title: "Intro to OP_CAT",
    content: 'OP_PUSH1 \n "Hello" \n OP_PUSH1 \n "World" \n OP_CAT',
    type: "",
    tags: ["Stack", "Experimental"],
    link: "https://www.bitscript.app/sandbox?script_id=15",
    id: 15,
  },
  {
    title: "OP_CAT in the wild",
    content:
      "OP_PUSH1\n0x002065f91a53cb7120057db3d378bd0f7d944167d43a7dcbff15d6afc4823f1d3ed3\nOP_PUSH1\n0x1234\nOP_CAT\nOP_HASH160\nOP_DUP\nOP_PUSH1\n0x5d78d244ac2828a491da8cccf0fafc6ab3e53c83\nOP_EQUAL",
    type: "",
    tags: ["Stack", "Experimental"],
    link: "https://www.bitscript.app/sandbox?script_id=14",
    id: 14,
  },
  // {
  //   title: "OP_CAT in the wild pt2",
  //   content:
  //     'OP_PUSH1\n0x002065f91a53cb7120057db3d378bd0f7d944167d43a7dcbff15d6afc4823f1d3ed3\nOP_PUSH1\n0x1234\nOP_CAT\nOP_HASH160\nOP_DUP\nOP_PUSH1\n0x5d78d244ac2828a491da8cccf0fafc6ab3e53c83\nOP_EQUAL\nOP_IF\nOP_PUSH\n"Condition has been met"\nOP_ELSE\nOP_PUSH\n"Condition wasn\'t met"\nOP_ENDIF',
  //   type: "",
  //   tags: ["Stack", "Experimental"],
  //   link: "https://www.bitscript.app/sandbox?script_id=13",
  //   id: 13,
  // },
];

type ExampleProps = {
  setExamplesShowing: (examplesShowing: boolean) => void;
  handleCloseButtonClick: () => void;
  editorRef: React.MutableRefObject<any>;
};

const Example = ({
  setExamplesShowing,
  editorRef,
  handleCloseButtonClick,
}: ExampleProps) => {
  const router = useRouter();

  const handleClick = (script: ScirptExample) => {
    router.query.script_id = `${script.id}`;
    router.push(router);
    handleCloseButtonClick();
    // if (model) {
    //   model.setValue(script.content);
    //
    // }

    // redirect user to url
  };
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

      <div className="w-full h-full">
        <h3 className="mb-2 ml-[20px] mr-[20px] mt-5 text-center text-[18px] font-bold md:ml-[120px] md:mr-[120px] md:text-[28px]">
          Script Examples
        </h3>
        <p className="font-extralight flex justify-center ">select an option to continue</p>
        <div className="mt-5 h-[0.5px] w-full border-b border-[#F79327] "></div>
        <div className="h-[550px] w-full overflow-y-scroll ">
          {scriptExamples.map((i, index) => (
            <button
              key={index}
              onClick={() => handleClick(i)}
              className="mt-2 flex w-full flex-row items-center justify-between bg-[#0C071D] p-3 transition-all duration-500 ease-in-out hover:-translate-y-1"
            >
              <p className="font-semibold">
                {i.title} <span className="font-extralight">{i.type}</span>
              </p>{" "}
              <div className="flex flex-row items-center gap-4">
                {i.tags.map((i) => (
                  <p className="mr-2 rounded-full bg-[#231C33] px-4 py-2 text-[14px] font-extralight">
                    {i}
                  </p>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Example;
