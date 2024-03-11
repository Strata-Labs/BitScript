import { classNames } from "@/utils";
import { CheckCircleIcon, CubeIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";

import { COMMANDS_SMART_GEN_NOUNS } from "./SmartGenHelper";

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
 [verb_action] (noun_amount)  (adjective) {noun} "extra params"
 */

enum COMMAND_QUERYS {}

enum COMMAND_STRUCTURE_TYPE {
  verb_action = "verb_action",
  noun_amount = "noun_amount",
  adjective = "adjective",
  noun = "noun",
  extra_params = "extra_params",
}
type COMMAND_PARTS = {
  text: string;
  type: COMMAND_STRUCTURE_TYPE;
};
const SmartGenCommands = () => {
  const [userInput, setUserInput] = useState("");

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
      console.log("userInput", userInput);
      handleSearchCurrentTrie();
    }, 300);

    debouncedSearch();
  }, [userInput]);

  const handleSearchCurrentTrie = () => {
    if (userInput === "") {
      setOptions([]);
      return;
    }

    const res = COMMANDS_SMART_GEN_NOUNS.find(userInput);
    console.log("res", res);
    setOptions(res);
  };

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  return (
    <div
      style={{
        minHeight: "92vh",
        paddingLeft: "240px",
      }}
      className=" flex h-full w-full flex-col gap-4 overflow-auto"
    >
      <div className="flex flex-col px-8 pt-9">
        <div className="flex flex-row">
          <p className=" text-[20px] font-semibold text-[#0C071D]  md:text-[32px]">
            Smart Gen Natural Language
          </p>
        </div>
      </div>
      <div className="flex w-full flex-col px-8">
        <div className="flex  w-full flex-col gap-4 rounded-full border-2 border-dark-orange">
          <div className="flex flex-row">
            <input
              onChange={handleUserInput}
              value={userInput}
              style={{
                outline: "none",
              }}
              placeholder="Try outlie-none generating a command by using common BTC terms & references to active wallets..."
              className="h-[50px] w-full rounded-full bg-transparent  px-8 text-lg text-black"
            />
          </div>
          <div className="flex w-full flex-col gap-4 px-4">
            <div className="flex border-spacing-1 flex-col border-t-dark-orange">
              {options.map((option, index) => {
                return (
                  <div>
                    <p className="text-lg font-light text-black">{option}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartGenCommands;
