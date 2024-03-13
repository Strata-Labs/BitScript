import { classNames } from "@/utils";
import {
  CheckCircleIcon,
  CubeIcon,
  PlusCircleIcon,
} from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";

import { COMMANDS_SMART_GEN_NOUNS, TRIE_HELPER } from "./SmartGenHelper";
import { trpc } from "@/utils/trpc";

/* 

how are we going to stucture this chat items
i was thinking that it could follow 
[action] (params for action) {entity that the action will be applied to} "extra params"


ex 
[send] (10 btc) {to alice}
[generate] (10) {blocks}
[generate] (2) {wallets} "extra params"

  so the way i'm thinking about this is that the first word will be the verb/action
  we'll start with 
  [
    generate
    send
    import 
  ]


  if its' generate then we can switch the text search to be a specific gnerate type ex

  generate wallet
  generate block
  genreate transaction


  - if the user inputs a numer then we know we can kinda of slim down the search of optiosn because it'll be sending x amount of something 
  generate 5 blocks
  generate 
*/

// so lets create all the generate options
/* 
  x = number
  y = type of transaction


  generate (a) wallet
  generate x block
  genreate y transaction

  
  [verb] (number) {noun} "extra params"
*/

enum NOUNS {}

enum VERBS {
  generate = "generate",
  send = "send",
}

const generateOptions = {};

const verbs = {
  generate: {
    wallet: "wallet",
    block: "block",
    transaction: "transaction",
  },
  send: {
    btc: "btc",
  },
};

enum ADJECTIVES {
  generate = "generate",
  generate_number = "generate_number",
  send = "send",
}

/*
 [verb_action] (noun_amount) (adjective) {noun} "extra params"
 */

enum COMMAND_QUERYS {}

enum NOUN_AMOUNT_TYPE {
  singular = "singular",
  plural = "plural",
}

enum COMMAND_STRUCTURE_TYPE {
  verb_action = "verb_action",
  noun_amount = "noun_amount",
  adjective = "adjective",
  noun = "noun",
  extra_params = "extra_params",
}

enum COMMAND_STRUCTURE_COLORS {
  verb_action = "verb_action",
  noun_amount = "noun_amount",
  adjective = "adjective",
  noun = "noun",
  extra_params = "extra_params",
}

type COMMAND_PARTS = {
  text: string;
  type: COMMAND_STRUCTURE_TYPE;
  color: string;
  background: string;
  nounAmountType?: NOUN_AMOUNT_TYPE;
};

const SmartGenCommands = () => {
  const [userInput, setUserInput] = useState("");
  const [userDisplayInput, setUserDisplayInput] = useState("");

  const [userCommandSections, setUserCommandSections] = useState<
    COMMAND_PARTS[]
  >([]);

  /* 
    [verb_action] (noun_amount) (adjective) {noun} "extra params"
  */
  // helps us keep track what section of the command we're in
  const [currentSection, setCurrentSection] = useState<COMMAND_STRUCTURE_TYPE>(
    COMMAND_STRUCTURE_TYPE.verb_action
  );

  const [options, setOptions] = useState<string[]>([]);

  // create a useEffect that debounces whenever the userinput changes so we can check the right trie for words

  const debounce = (func: Function, wait: number) => {
    let timeout: NodeJS.Timeout;
    return function executedFunction(...args: any) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  useEffect(() => {
    const debouncedSearch = debounce(() => {
      handleSearchCurrentTrie();
    }, 300);

    debouncedSearch();
  }, [userInput]);

  //const handleSelectTrieToSearchFrom
  const handleSearchCurrentTrie = () => {
    if (userInput === "") {
      setOptions([]);
      return;
    }
    let finderFunc = null;

    if (currentSection === COMMAND_STRUCTURE_TYPE.verb_action) {
      finderFunc = COMMANDS_SMART_GEN_NOUNS;
      const res = finderFunc.find(userDisplayInput);
      console.log("res", res);
      if (res.length === 1 && res[0] === userDisplayInput) {
        setUserCommandSections([
          {
            text: res[0],
            type: COMMAND_STRUCTURE_TYPE.verb_action,
            color: "orange",
            background: "black",
          },
        ]);
        setCurrentSection(COMMAND_STRUCTURE_TYPE.noun_amount);
        setUserDisplayInput("");

        return;
      } else {
        // if no options are filtered just show all the option
      }
    }
    if (currentSection === COMMAND_STRUCTURE_TYPE.noun_amount) {
      // what do we show here?
      // show both options for singular and plural
      // how many words or grouping of characters are there
      // if there is only 1 word then we can assume that the user is typing a number or a or an
      //console.log("userDisplayInput", userDisplayInput);
      const trimmedUserDisplayInput = userDisplayInput.trimStart();

      const splitDisplayInput = trimmedUserDisplayInput.split(" ");

      const checkText = splitDisplayInput[0];

      //console.log("splitDisplayInput", splitDisplayInput);
      const firstLevel = userCommandSections[0].text;

      const isNumber = !isNaN(parseInt(checkText));

      const isSingular = checkText === "a" || checkText === "an";

      const singular = TRIE_HELPER[firstLevel][NOUN_AMOUNT_TYPE.singular];
      const plural = TRIE_HELPER[firstLevel][NOUN_AMOUNT_TYPE.plural];

      // console.log("checkText", checkText);
      // console.log("isNumber", isNumber);
      // console.log("isPlural", isPlural);

      if (checkText === "" || checkText == undefined) {
        const singularRes = singular.find("");
        const singularTextHelper = singularRes.map((res: string) => {
          return "a " + res;
        });

        const pluralRes = plural.find("");
        const pluralTextHelper = pluralRes.map((res: string) => {
          return "(n) " + res;
        });
        setOptions([...pluralTextHelper, ...singularTextHelper]);
      } else if (isNumber) {
        const pluralRes = plural.find("");
        const pluralTextHelper = pluralRes.map((res: string) => {
          return userDisplayInput + " " + res;
        });
        setOptions([...pluralTextHelper]);

        if (splitDisplayInput.length > 1) {
          setUserCommandSections([
            ...userCommandSections,
            {
              text: checkText,
              type: COMMAND_STRUCTURE_TYPE.noun_amount,
              color: "blue",
              background: "black",
              nounAmountType: NOUN_AMOUNT_TYPE.plural,
            },
          ]);
          setUserDisplayInput("");
          setCurrentSection(COMMAND_STRUCTURE_TYPE.adjective);
          setOptions([...pluralRes]);
        }
      } else if (isSingular) {
        const singularRes = singular.find("");
        const singularTextHelper = singularRes.map((res: string) => {
          return userDisplayInput + " " + res;
        });

        setOptions([...singularTextHelper]);

        if (splitDisplayInput.length > 1) {
          setUserCommandSections([
            ...userCommandSections,
            {
              text: checkText,
              type: COMMAND_STRUCTURE_TYPE.noun_amount,
              color: "blue",
              background: "black",
              nounAmountType: NOUN_AMOUNT_TYPE.singular,
            },
          ]);
          setUserDisplayInput("");
          setCurrentSection(COMMAND_STRUCTURE_TYPE.adjective);
          setOptions([...singularRes]);
        }
      }
      return;
    }

    if (currentSection === COMMAND_STRUCTURE_TYPE.adjective) {
      // get path from the COMMAND_PARTS
      console.log("userCommandSections", userCommandSections);
      const firstLevel = userCommandSections[0].text;
      console.log("firstLevel", firstLevel);
      const secondLevel = userCommandSections[1].nounAmountType?.toString();
      console.log("secondLevel", secondLevel);

      if (secondLevel === undefined) {
        throw new Error("secondLevel is null");
      }

      finderFunc = TRIE_HELPER[firstLevel][secondLevel];
      console.log("finderFunc", finderFunc);

      // check if the userDisplayInput is identical to the only option
      const res = finderFunc.find(userDisplayInput.trim());
      console.log("found check res", res);
      if (res.length === 1 && res[0] === userDisplayInput.trim()) {
        setUserCommandSections([
          ...userCommandSections,
          {
            text: res[0],
            type: COMMAND_STRUCTURE_TYPE.adjective,
            color: "white",
            background: "black",
          },
        ]);

        setUserDisplayInput("");
        setCurrentSection(COMMAND_STRUCTURE_TYPE.noun);
        setOptions([""]);
        return;
      }
    }

    if (currentSection === COMMAND_STRUCTURE_TYPE.noun) {
      // setToNoun
      setOptions([""]);
      return;
    }
    if (finderFunc === null) {
      throw new Error("finderFunc is null");
    }

    // how will i know what to search from
    console.log("userDisplayInput", userDisplayInput);
    const res = finderFunc.find(userDisplayInput.trim());
    console.log("top leve res", res);

    if (res.length === 0) {
      // if no options are filtered just show all the option so the user knows whats valid
      const allOptions = finderFunc.find("");
      setOptions(allOptions);
    } else {
      console.log("finderFunc res", res);
      setOptions(res);
    }
  };

  // we got a bit fancy with deletion because it the UX for deleting was getting buggy
  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // check if the change was a delection or an addition
    const userTextInput = e.target.value;

    setUserInput(userTextInput);

    const pastTextLength = userInput.length;
    const currentTextLength = e.target.value.length;

    // okay so new idea:
    /* 
      the command started with "generate 5 blocks"
      the user deletes ks from "blocks"

      * that means i need to check which word is no longer valid from creating the string of words form past commands
      * i think compare if this string is valid within the recent changes
      * the farther down i go the more i need ot return the status of items
    */
    if (pastTextLength > currentTextLength) {
      // create the string of words that the user has typed so far from our saved command
      // const totalTextSoFar = userCommandSections.reduce(
      //   (acc, section, index) => {
      //     if (index === 0) {
      //       return section.text;
      //     }
      //     return acc + " " + section.text;
      //   },
      //   ""
      // );

      // console.log("totalTextSoFar", totalTextSoFar);

      // now i have to filter out any of the text that don't make it up, i
      /* 
        i need the string at each level of the command
      */
      // create a loop that goes from the highest index of the userCommandSections to the lowest

      // copy of what has been pushed as still in the string
      const arrCommandSections: COMMAND_PARTS[] = [];

      // if nothing changes we stay in our section
      let section = currentSection;

      //console.log("userTextInput", userTextInput);

      // idea is that we check if the text is still in the string

      for (let i = userCommandSections.length; i !== 0; i--) {
        const currentCommand = userCommandSections[i - 1];

        const commandAsOfThisStep = userCommandSections.slice(0, i);
        //console.log("commandAsOfThisStep", commandAsOfThisStep);

        const totalTextSoFar = commandAsOfThisStep
          .reduce((acc, section, index) => {
            if (index === 0) {
              return section.text;
            }
            return acc + " " + section.text;
          }, "")
          .trim();

        //console.log("totalTextSoFar", totalTextSoFar);

        const indexOfRes = userTextInput.trim().indexOf(totalTextSoFar.trim());

        //console.log("indexOfRes", indexOfRes);

        if (indexOfRes < 0) {
          //console.log("did not pass should remove", currentCommand);
          // didn't find the string
          // add the section id so we can revert back to it
          section = currentCommand.type;
        } else {
          //console.log("currentCommand", currentCommand);

          // found teh string
          // add item to arrCommandSections
          arrCommandSections.push(currentCommand as any);
        }
        //const commandAsOfThisStep =
      }

      //console.log("section", section);

      // know something was deleted

      // set section
      setCurrentSection(section);
      // set userCommandSections
      // need to flip cause why not throw in more steps
      const sections = [...arrCommandSections].reverse();
      setUserCommandSections(sections);
    }

    const totalTextSoFar = userCommandSections.reduce((acc, section, index) => {
      if (index === 0) {
        return section.text;
      }
      return acc + " " + section.text;
    }, "");

    //setUserInput(userTextInput);

    if (currentSection === COMMAND_STRUCTURE_TYPE.verb_action) {
      setUserDisplayInput(userTextInput);
      return;
    }

    //console.log("totalTextSoFar", totalTextSoFar);

    const indexOfRes = userTextInput.trim().indexOf(totalTextSoFar.trim());

    console.log("indexOfRes", indexOfRes);
    // slice string starting at the index of the last space
    const userText = userTextInput.slice(
      indexOfRes + totalTextSoFar.length,
      userTextInput.length
    );

    console.log("userText", userText);
    setUserDisplayInput(userText);
  };

  const handleSelectFromOptions = (option: string) => {
    // need to handle the switch from current section
    // based on the selection a new trie should be selected to show the options for that
    if (currentSection === COMMAND_STRUCTURE_TYPE.verb_action) {
      // we are at the start of the command selection can only be one of 3 options (import, generate, send)
      // we know that the user selected 1 of 3 options
      setUserCommandSections([
        {
          text: option,
          type: COMMAND_STRUCTURE_TYPE.verb_action,
          color: "orange",
          background: "black",
        },
      ]);
      setCurrentSection(COMMAND_STRUCTURE_TYPE.noun_amount);

      // if the user selects whatever we need to autocomplete the rest of the word for them

      setUserInput(option);
      setUserDisplayInput("");
    }

    if (currentSection === COMMAND_STRUCTURE_TYPE.noun_amount) {
      // we are at the start of the command selection can only be one of 3 options (import, generate, send)
      // we know that the user selected 1 of 3 options
    }

    if (currentSection === COMMAND_STRUCTURE_TYPE.adjective) {
      setUserCommandSections([
        ...userCommandSections,
        {
          text: option,
          type: COMMAND_STRUCTURE_TYPE.adjective,
          color: "white",
          background: "black",
        },
      ]);

      // remove the last word from the user input
      const userInputArr = userInput.split(" ");
      userInputArr.pop();
      const _userINput = userInputArr.join(" ");

      setUserInput(`${_userINput} ${option}`);

      setUserDisplayInput("");
      setOptions([""]);
      setCurrentSection(COMMAND_STRUCTURE_TYPE.noun);
      // clear options
    }
  };

  const handleDisplayOptions = () => {
    // the first key is the only key that is a bit weird
    // based on the section we're at we have custom view for how we're showing this
    //if ()
  };

  //console.log("options", options);
  console.log("currentsection", currentSection);
  console.log("userdisplayinput", userDisplayInput);
  console.log("userinput", userInput);
  console.log("usercommandsections", userCommandSections);
  console.log("options", options);

  const mineSomeBlocks = trpc.mineSomeBlocks.useMutation();

  const handleClickMineSomeBlocks = async () => {
    try {
      const res = await mineSomeBlocks.mutate({
        numBlocks: 101,
        walletName: "faucet",
      });
      console.log("res", res);
    } catch (err) {
      console.log("err", err);
    }
  };
  return (
    <div
      style={{
        minHeight: "90vh",
        paddingLeft: "240px",
      }}
      className=" flex  w-full flex-col justify-between  gap-4 overflow-auto"
    >
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2 px-8 pt-9">
          <div className="flex flex-row">
            <p
              onClick={() => handleClickMineSomeBlocks()}
              className=" text-[20px] font-semibold text-[#0C071D]  md:text-[32px]"
            >
              Smart Gen Natural Language
            </p>
          </div>
        </div>
        <div className={classNames("flex w-full flex-col px-4  py-4")}>
          <div
            className={classNames(
              "flex w-full flex-col  border-2 border-dark-orange px-8 py-4 transition-all",
              options.length > 0 ? "rounded-[50px]" : "rounded-full"
            )}
          >
            <div className={classNames("flex w-full flex-col  py-2 ")}>
              <div className="flex flex-row">
                <input
                  onChange={handleUserInput}
                  value={userInput}
                  type="text"
                  placeholder="Try outlie-none generating a command by using common BTC terms & references to active wallets..."
                  className=" focus:shadow-outline h-[50px] w-full appearance-none bg-transparent  px-4 text-lg text-black focus:outline-none"
                />
              </div>
              {options.length !== 0 && (
                <div className=" w-full  px-4">
                  <div className="h-1 w-full rounded-full bg-dark-orange" />
                </div>
              )}
            </div>
            <div className="flex flex-row  ">
              <div className="flex w-full flex-col gap-4  px-4">
                <div className="flex  flex-col gap-4 ">
                  {options.map((option, index) => {
                    return (
                      <div
                        className="jusitfy-start flex flex-row items-center gap-1"
                        onClick={() => handleSelectFromOptions(option)}
                      >
                        {userCommandSections.map((section, index) => {
                          return (
                            <p
                              style={{
                                color: section.color,
                                background: section.background,
                              }}
                              className="rounded-md p-4 text-lg font-light "
                            >
                              {section.text}
                            </p>
                          );
                        })}
                        <p className="text-lg font-light text-black">
                          {currentSection === COMMAND_STRUCTURE_TYPE.verb_action
                            ? option
                            : option}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-4">
        {userCommandSections.length >= 3 ? (
          <button
            className={classNames(
              "flex h-[72px] w-full items-center justify-between rounded-full pl-6  ",
              "cursor-pointer bg-[#0C071D] "
            )}
          >
            <p className="gradient-text mr-5 text-[20px] font-bold tracking-wider  md:mr-10">
              Add New Command
            </p>
            <CheckCircleIcon className="mr-5 h-10 w-10 text-dark-orange" />
          </button>
        ) : (
          <button
            disabled={true}
            className={classNames(
              "flex h-[72px] w-full items-center  justify-between rounded-full pl-6  ",
              "cursor-pointer bg-[#0C071D] "
            )}
          >
            <p className=" mr-5 text-[20px] font-bold tracking-wider  md:mr-10">
              Generating SmartGen Command...
            </p>
          </button>
        )}
      </div>
    </div>
  );
};

export default SmartGenCommands;
