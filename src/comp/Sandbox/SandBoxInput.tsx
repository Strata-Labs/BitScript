import {
  useState,
  Fragment,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";

import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { classNames, debounce } from "@/utils";

import * as Monaco from "monaco-editor/esm/vs/editor/editor.api";

import Editor, { useMonaco } from "@monaco-editor/react";

import options, { editorOptions } from "../../const/editor/theme";
import {
  lineCompile,
  languageConfigurations,
  tokenProviders,
  hoverProvider,
  languageSuggestions,
  createRange,
} from "../../const/editor/lang";

import { ALL_OPS } from "@/corelibrary/op_code";
import { ScriptWiz } from "@script-wiz/lib";
import { useAtom } from "jotai";
import { paymentAtom, sandBoxPopUpOpen } from "../atom";

type SandboxEditorProps = {
  scriptWiz: ScriptWiz;
  handleUserInput: (input: string) => void;
};

enum ScriptVersion {
  "SEGWIT" = "SEGWIT",
  "TAPSCRIPT" = "TAPSCRIPT",
  "LEGACY" = "LEGACY",
}

type DecoratorTracker = {
  line: number;
  data: string;
};

type ScriptVersionInfoData = {
  title: string;
};

type ScriptVersionInfo = {
  [key in ScriptVersion]: ScriptVersionInfoData;
};

const ScriptVersionInfo: ScriptVersionInfo = {
  [ScriptVersion.LEGACY]: {
    title: "Legacy",
  },
  [ScriptVersion.TAPSCRIPT]: {
    title: "Tapscript",
  },
  [ScriptVersion.SEGWIT]: {
    title: "Segwit",
  },
};

const autoConvertToHex = (value: string) => {
  // check if the value is a decimal number
  const number = value.replace(/[^0-9]/g, "");
  const numberTest = Number(number);
  if (numberTest) {
    const hexNumber = numberTest.toString(16).padStart(2, "0");
    return `0x${hexNumber}`;
  }

  // check if the value is a string
  if (value.startsWith("'") && value.endsWith("'")) {
    const string = value.replace(/'/g, "");
    const hexString = Buffer.from(string).toString("hex");
    return `0x${hexString}`;
  }

  if (value.startsWith('"') && value.endsWith('"')) {
    const string = value.replace(/'/g, "");
    const hexString = Buffer.from(string).toString("hex");
    return `0x${hexString}`;
  }

  // check if the value is a binary number
  if (value.startsWith("0b")) {
    const binary = value.replace(/[^0-9]/g, "");
    const hexBinary = Number(binary).toString(16).padStart(2, "0");
    return `0x${hexBinary}`;
  }

  return value;
};

const SandboxEditorInput = ({
  scriptWiz,
  handleUserInput,
}: SandboxEditorProps) => {
  const failedLineNumber = undefined;

  const [lng] = useState("bitscriptLang");
  const monaco = useMonaco();

  const [selectedScriptVersion, setSelectedScriptVersion] =
    useState<ScriptVersion>(ScriptVersion.LEGACY);

  const [decoratorTracker, setDecoratorTracking] = useState<DecoratorTracker[]>(
    []
  );

  const [suggestUnderline, setSuggestUnderline] = useState<DecoratorTracker[]>(
    []
  );

  const [isSandBoxPopUpOpen, setIsSandBoxPopUpOpen] = useAtom(sandBoxPopUpOpen);

  const [payment, setPayment] = useAtom(paymentAtom);

  //const [userScriptData, setUser]
  const editorRef = useRef<any>(null);

  if (scriptWiz === undefined) {
    return null;
  }

  useEffect(() => {
    let disposeLanguageConfiguration = () => {};
    let disposeMonarchTokensProvider = () => {};
    let disposeHoverProvider = () => {};
    let disposeCompletionItemProvider = () => {};

    // language define
    if (monaco !== null) {
      monaco.languages.register({ id: lng });

      // monaco.editor.addEditorAction({
      //   id: "convert-to-hex",
      //   label: "Convert to Hex",
      //   run: (ed) => {

      //     const model = ed.getModel();
      //     if (model) {
      //       const value = model.getValue();

      //       // find the type of this value
      //       // could be a decimal number, a string or a binary number
      //       // if it's a decimal number we need to convert it to hex
      //       // if it's a string we need to convert it to hex
      //       // if it's a binary number we need to convert it to hex

      //       const hexValue = autoConvertToHex(value); // Implement this function based on your needs
      //       model.setValue(hexValue);
      //     }

      //     //return hexValue
      //   },
      // });

      monaco.languages.registerCodeActionProvider(lng, {
        provideCodeActions: function (model, range, context, token) {
          const actions = context.markers.map((marker) => ({
            title: "Convert to hex",
            diagnostics: [marker],
            kind: "quickfix",
            command: {
              id: "convert-to-hex",
              title: "Convert to hex",
              arguments: [marker],
            },
          }));

          return { actions: actions, dispose: () => {} };
        },
      });

      monaco.editor.registerCommand(
        "convert-to-hex",
        function (accessor, marker) {
          // Implement the conversion logic here

          const model = editorRef.current?.getModel();

          if (model) {
            const lineValue = model.getLineContent(marker.startLineNumber);
            console.log("lineValue", lineValue);

            const hexValue = autoConvertToHex(lineValue);

            console.log("hexValue", hexValue);

            // const underlineDecorator: Monaco.editor.IModelDeltaDecoration = {
            //   range: createRange(
            //     marker.startLineNumber,
            //     0,
            //     marker.startLineNumber,
            //     hexValue.length
            //   ),
            //   options: {
            //     className: "",
            //   },
            // };

            //model.deltaDecorations([], [underlineDecorator]);
            model.pushEditOperations(
              [],
              [
                {
                  range: createRange(
                    marker.startLineNumber,
                    0,
                    marker.startLineNumber,
                    hexValue.length
                  ),
                  text: hexValue,
                  forceMoveMarkers: true,
                },
              ]
            );
          }
        }
      );

      // Define a new theme that contains only rules that match this language
      monaco.editor.defineTheme("bitscriptTheme", options);

      const { dispose: disposeSetLanguageConfiguration } =
        monaco.languages.setLanguageConfiguration(
          lng,
          languageConfigurations(monaco.languages)
        );
      disposeLanguageConfiguration = disposeSetLanguageConfiguration;

      // Register a tokens provider for the language
      const { dispose: disposeSetMonarchTokensProvider } =
        monaco.languages.setMonarchTokensProvider(lng, tokenProviders);
      disposeMonarchTokensProvider = disposeSetMonarchTokensProvider;

      const { dispose: disposeRegisterHoverProvider } =
        monaco.languages.registerHoverProvider(
          lng,
          hoverProvider(ALL_OPS, failedLineNumber)
        );
      disposeHoverProvider = disposeRegisterHoverProvider;

      const { dispose: disposeRegisterCompletionItemProvider } =
        monaco.languages.registerCompletionItemProvider(lng, {
          provideCompletionItems: (model: any, position: any) => {
            const suggestions = languageSuggestions(
              monaco.languages,
              model,
              position,
              ALL_OPS
            );
            return { suggestions: suggestions };
          },
        });
      disposeCompletionItemProvider = disposeRegisterCompletionItemProvider;
    }

    return () => {
      if (monaco !== undefined) {
        // monaco.editor.getModels().forEach((model) => model.dispose());

        disposeLanguageConfiguration();
        disposeMonarchTokensProvider();
        disposeHoverProvider();
        disposeCompletionItemProvider();
      }
    };
  }, [monaco, failedLineNumber, lng]);

  useEffect(() => {
    // loop through the decorate tracking to add the data to the at
    decoratorTracker.forEach((d, i) => {
      // get the element that this is associated with
      const element = document.getElementsByClassName(`mcac-${d.line}`);

      if (element.length > 0) {
        const el = element[0];

        el.setAttribute("data-message", d.data);
        el.innerHTML = d.data;
      }
    });
  }, [decoratorTracker]);

  useEffect(() => {
    // loop through the decorate tracking to add the data to the at
    suggestUnderline.forEach((d, i) => {
      // get the element that this is associated with
      const element = document.getElementsByClassName(
        `non-hex-decoration-${d.line}`
      );

      if (element.length > 0) {
        const el = element[0];

        el.setAttribute("text-decoration", "underline");
        el.setAttribute("text-decoration-color", "yellow");
        el.setAttribute("text-decoration-style", "wavy");
        //el.innerHTML = d.data;
      }
    });
  }, [decoratorTracker]);

  const addLintingHexDecorators = () => {
    const model = editorRef.current?.getModel();
    // ensure model is not undefined
    if (model === undefined) {
      return "model is undefined";
    }
    if (monaco === null) {
      return "monaco is null";
    }

    monaco.editor.setModelMarkers(model, lng, []);

    const lines = model.getLinesContent();

    var elements = document.querySelectorAll(".non-hex-decoration");

    if (elements.length > 0) {
      // Iterate over the NodeList and remove the class
      elements.forEach(function (el) {
        el.classList.remove("non-hex-decoration");
      });
    }

    let decorators: Monaco.editor.IModelDeltaDecoration[] = [];
    let decTracking: DecoratorTracker[] = [];
    let underlineTracking: DecoratorTracker[] = [];

    const decorationOptions = (
      message: string,
      line: number
    ): Monaco.editor.IModelDecorationOptions => ({
      className: `mycd-${line} mycd`,

      afterContentClassName: `mcac-${line} mcac`,
      // We use a generated class name to include the message content
    });

    const underlineDecoratorOptions = (
      line: number
    ): Monaco.editor.IModelDecorationOptions => ({
      className: `non-hex-decoration-${line}`,

      //isWholeLine: true,
    });

    model.deltaDecorations([], []);

    lines.forEach((line: string, index: number) => {
      // ensure we dont' keep adding the text to a line that already has it

      // ensure
      const commentCheck = line.includes("//");

      const opCheck = line.includes("OP");

      // dup value of line for manipulation
      const tempLine = line;
      const number = tempLine.replace(/[^0-9]/g, "");
      const numberTest = Number(number);
      const hexTest = line.startsWith("0x");

      const stringCheck = line.startsWith("'") && line.endsWith("'");
      const otherStringCheck = line.startsWith('"') && line.endsWith('"');

      const emptyLineTest = line === "";

      const isNotHexOrOpHelper = () => {
        // if the line is anything beside hex or op return true
        if (emptyLineTest || hexTest || opCheck || commentCheck) {
          return false;
        } else if (numberTest || stringCheck || otherStringCheck) {
          return true;
        } else {
          return false;
        }
      };
      const isNotHexOrOpTest = isNotHexOrOpHelper();

      console.log("tempLine", tempLine);
      console.log("isNotHexOrOpHelper", isNotHexOrOpTest);

      let hexValue = "";

      if (isNotHexOrOpTest) {
        // if number
        if (numberTest) {
          hexValue = numberTest.toString(16).padStart(2, "0");
          // if string
        } else if (stringCheck || otherStringCheck) {
          const string = tempLine.replace(/'/g, "").replace(/"/g, "");
          const hexString = Buffer.from(string).toString("hex");
          hexValue = hexString;
          // if binary
        }
        //else if
        const number = tempLine.replace(/[^0-9]/g, "");
        //console.log("number", number);

        const decorator: Monaco.editor.IModelDeltaDecoration = {
          range: createRange(
            index + 1,
            line.length + 20,
            index + 1,
            line.length + 24
          ),
          options: decorationOptions(`  (0x${hexValue})`, index + 1),
        };

        const decoratorTrackingItem: DecoratorTracker = {
          line: index + 1,
          data: `  (0x${hexValue})`,
        };

        const underlineDecorator: Monaco.editor.IModelDeltaDecoration = {
          range: createRange(index + 1, 0, index + 1, line.length),
          options: underlineDecoratorOptions(index + 1),
        };

        if (monaco) {
          monaco.editor.setModelMarkers(model, lng, [
            {
              startLineNumber: index + 1,
              startColumn: 0,
              endLineNumber: index + 1,
              endColumn: tempLine.length + 1,
              message: "This is not a valid hex value. Click to convert.",
              severity: monaco.MarkerSeverity.Warning,
            },
          ]);
        }

        const underlineDecoratorTrackingItem: DecoratorTracker = {
          line: index + 1,
          data: "",
        };

        decorators.push(decorator);
        decorators.push(underlineDecorator);

        decTracking.push(decoratorTrackingItem);
      } else if (opCheck) {
        // if the line has an op add a decorator to it

        // get only the text from the line
        const op = line.split(" ")[0];

        // find the op from the list of ops we have
        const opData = ALL_OPS.find((o) => o.name === op);

        if (opData) {
          const decorator: Monaco.editor.IModelDeltaDecoration = {
            range: createRange(
              index + 1,
              line.length + 20,
              index + 1,
              line.length + 24
            ),
            options: decorationOptions(`  (${opData.hex})`, index + 1),
          };
          const decoratorTrackingItem: DecoratorTracker = {
            line: index + 1,
            data: `  (${opData.hex})`,
          };

          decorators.push(decorator);
          decTracking.push(decoratorTrackingItem);
        }
      }
    });

    model.deltaDecorations([], decorators);
    setDecoratorTracking(decTracking);
    setSuggestUnderline(underlineTracking);
  };

  const formatText = useCallback((text: string) => {
    // Regular expression to match words, quoted text, and non-empty lines
    const regex = /"[^"]*"|'[^']*'|\S+/g;

    // regex to test for group of words without single or double around them
    const regex2 = /(?<!['"])\b[^\s]+\b(?!['"])/g;

    // Split the text into lines and process each line
    return text
      .split("\n")
      .map((line) => {
        // Check if the line is not just whitespace
        if (!/^\s*$/.test(line)) {
          const matches = line.match(regex);
          const matches2 = line.match(regex2);

          console.log("matches", matches);
          console.log("matches2", matches2);

          return matches ? matches.join("\n") : "";
        }
        // Return the line as is if it's only whitespace
        return line;
      })
      .join("\n");
  }, []);
  const ensureNoMultiDataOnSingleLine = () => {
    const model = editorRef.current?.getModel();
    if (model === undefined) {
      return "model is undefined";
    }

    console.log("model", model);

    const fullModelRange = model.getFullModelRange();

    const text = model.getValueInRange(fullModelRange);

    // Split the text by spaces and join by newlines

    // Format the text
    const formattedText = formatText(text);

    // Check if the new text is different from the old one
    if (formattedText !== text) {
      console.log("was a missmatch need to update the lines");
      // We prevent infinite loop by removing the listener before changing the model

      // Push the edit operation, replace the entire model value
      model.pushEditOperations(
        [],
        [
          {
            range: fullModelRange,
            text: formattedText,
          },
        ],
        () => null
      );
      // Restore the listener
    } else {
      console.log("no multi line items");
    }
  };

  const addLintingComments = () => {
    const model = editorRef.current?.getModel();

    if (model === undefined) {
      return "model is undefined";
    }

    const lines = model.getLinesContent();

    let edits: Monaco.editor.IIdentifiedSingleEditOperation[] = [];

    lines.forEach((line: any, index: number) => {
      // if the line has a comment we can skip it

      // ensure line does not inclue OP
      const opCheck = line.includes("OP");

      // check what data type this is
      // for the time being we're going to assume it's a number in decimal format

      // ensure the line has a number in it

      const tempLine = line;

      const number = tempLine.replace(/[^0-9]/g, "");
      const numberTest = Number(number);

      if (!opCheck && numberTest) {
        //const position = new Position(index + 1, line.length + 1);

        // get the number from the line

        // convert the number to hex

        // need to check that the line before has a OP_PUSH(x)
        // if it does we can add it
        const previousLine = index !== 0 ? lines[index - 1] : "";
        if (!previousLine.includes("OP_PUSH")) {
          const editOp: Monaco.editor.IIdentifiedSingleEditOperation = {
            range: createRange(index + 1, 0, index + 1, 0),
            text: `OP_PUSH1\n`,
            forceMoveMarkers: true,
          };

          edits.push(editOp);
        }
      }
    });
    model.pushEditOperations([], edits, () => null);
  };

  const handleUpdateCoreLib = () => {
    const model = editorRef.current?.getModel();

    if (model === undefined) {
      return "model is undefined";
    }

    const lines = model.getLinesContent();

    const cleanSingleStringLine = lines.reduce(
      (acc: string, line: string, i: number) => {
        // ensure line is not a comment
        const commentCheck = line.includes("//");

        if (line === "") return acc;
        if (!commentCheck) {
          if (i === 0) {
            return line;
          } else {
            return acc + " " + line;
          }
        }
      },
      ""
    );

    console.log("cleanSingleStringLine", cleanSingleStringLine);

    if (cleanSingleStringLine) {
      handleUserInput(cleanSingleStringLine);
    }
  };

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
    editor.setScrollPosition({ scrollTop: 0 });
    //scroolTopCallback(editor.getScrollTop());
    editorRef.current.onDidScrollChange((param: any) => {
      //scroolTopCallback(param.scrollTop);
    });

    const debounceCoreLibUpdate = debounce(handleUpdateCoreLib, 500);
    const debouncedLintContent = debounce(addLintingComments, 500);
    const debouncedLintDecorator = debounce(addLintingHexDecorators, 500);
    const debouncEensureNoMultiDataOnSingleLine = debounce(
      ensureNoMultiDataOnSingleLine,
      500
    );

    // Subscribe to editor changes
    const subscription = editorRef.current.onDidChangeModelContent(() => {
      debouncEensureNoMultiDataOnSingleLine();
      debouncedLintContent();
      debouncedLintDecorator();
      debounceCoreLibUpdate();
    });
  };

  if (editorRef.current) editorRef.current.setScrollPosition({ scrollTop: 0 });

  return (
    <div className="flex-1  rounded-l-3xl bg-dark-purple">
      <div className="flex h-[76px] flex-row items-center justify-between p-4 px-6">
        <h2 className="text-lg text-white">Script Sandbox</h2>
        <Menu as="div" className="relative inline-block text-left">
          <div>
            {/* <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-lg bg-accent-dark-purple px-6 py-3 text-sm font-semibold  text-white shadow-sm   ">
              {ScriptVersionInfo[selectedScriptVersion].title}
              <ChevronDownIcon
                className="-mr-1 ml-5 h-5 w-5 text-white"
                aria-hidden="true"
              />
            </Menu.Button> */}
            <div className="flex flex-row">
              <button
                className={`flex flex-row items-center rounded-xl px-4 py-2 ${
                  !payment?.hasAccess
                    ? "cursor-not-allowed bg-[#201B31] blur-[1px]"
                    : "bg-[#201B31]"
                }`}
                disabled={!payment?.hasAccess}
              >
                {" "}
                <svg
                  width="12"
                  height="16"
                  viewBox="0 0 12 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.79826 0H2.39953C1.76314 0 1.15281 0.252806 0.70281 0.702804C0.252813 1.1528 6.30508e-06 1.76313 6.30508e-06 2.39952V15.197C-0.000553238 15.3379 0.0361389 15.4765 0.106368 15.5987C0.176596 15.7209 0.277868 15.8224 0.399927 15.8928C0.521518 15.963 0.659446 16 0.799847 16C0.940249 16 1.07818 15.963 1.19977 15.8928L5.59889 13.3493L9.99802 15.8928C10.1199 15.9619 10.2578 15.9978 10.3979 15.9968C10.5381 15.9978 10.676 15.9619 10.7979 15.8928C10.9199 15.8224 11.0212 15.7209 11.0914 15.5987C11.1616 15.4765 11.1983 15.3379 11.1978 15.197V2.39952C11.1978 1.76313 10.945 1.1528 10.495 0.702804C10.045 0.252806 9.43465 0 8.79826 0ZM9.5981 13.8133L5.99881 11.7337C5.87722 11.6635 5.7393 11.6265 5.59889 11.6265C5.45849 11.6265 5.32056 11.6635 5.19897 11.7337L1.59969 13.8133V2.39952C1.59969 2.18739 1.68396 1.98395 1.83396 1.83395C1.98396 1.68395 2.1874 1.59968 2.39953 1.59968H8.79826C9.01039 1.59968 9.21383 1.68395 9.36383 1.83395C9.51383 1.98395 9.5981 2.18739 9.5981 2.39952V13.8133Z"
                    fill="#6C5E70"
                  />
                </svg>
                <p className="ml-2 text-[12px] font-extralight">Save</p>
              </button>
              <button
                className="ml-4 flex flex-row items-center rounded-xl bg-[#201B31] px-4 py-2"
                onClick={() => setIsSandBoxPopUpOpen(true)}
              >
                {" "}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.4958 7.95636C9.94286 7.9568 9.49453 7.50847 9.49497 6.95557L9.49963 1.09536C9.49963 0.890104 9.41809 0.693252 9.27295 0.548113C9.12781 0.402973 8.93096 0.321435 8.7257 0.321435C8.52044 0.321435 8.32359 0.402973 8.17845 0.548113C8.03331 0.693252 7.95177 0.890103 7.95177 1.09536L7.95643 6.95557C7.95687 7.50847 7.50854 7.9568 6.95563 7.95636L1.09543 7.9517C0.890171 7.9517 0.693319 8.03324 0.54818 8.17838C0.40304 8.32352 0.321501 8.52037 0.321501 8.72563C0.321501 8.93089 0.40304 9.12774 0.54818 9.27288C0.693319 9.41802 0.89017 9.49956 1.09543 9.49956L6.95563 9.4949C7.50854 9.49447 7.95686 9.94279 7.95643 10.4957L7.95177 16.3559C7.95135 16.4577 7.97109 16.5585 8.00983 16.6526C8.04858 16.7466 8.10557 16.8321 8.17752 16.9041C8.24947 16.976 8.33495 17.033 8.42904 17.0718C8.52312 17.1105 8.62395 17.1302 8.7257 17.1298C8.82745 17.1302 8.92827 17.1105 9.02236 17.0718C9.11645 17.033 9.20193 16.976 9.27388 16.9041C9.34583 16.8321 9.40282 16.7466 9.44156 16.6526C9.48031 16.5585 9.50004 16.4577 9.49962 16.3559L9.49497 10.4957C9.49453 9.94279 9.94286 9.49446 10.4958 9.4949L16.356 9.49956C16.4577 9.49997 16.5585 9.48024 16.6526 9.4415C16.7467 9.40275 16.8322 9.34576 16.9041 9.27381C16.9761 9.20186 17.0331 9.11638 17.0718 9.02229C17.1106 8.92821 17.1303 8.82738 17.1299 8.72563C17.1303 8.62388 17.1106 8.52305 17.0718 8.42897C17.0331 8.33488 16.9761 8.2494 16.9041 8.17745C16.8322 8.1055 16.7467 8.04851 16.6526 8.00976C16.5585 7.97102 16.4577 7.95129 16.356 7.9517L10.4958 7.95636Z"
                    fill="#6C5E70"
                  />
                </svg>
                <p className="ml-2 text-[12px] font-extralight">New</p>
              </button>
            </div>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="ring-1focus:outline-none absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-accent-dark-purple shadow-lg">
              <div className="py-1">
                {Object.keys(ScriptVersionInfo).map((scriptVersion) => {
                  const enumKey = scriptVersion as ScriptVersion;
                  const scriptVersionData = ScriptVersionInfo[enumKey];

                  return (
                    <Menu.Item key={scriptVersionData.title}>
                      {({ active }) => (
                        <div
                          onClick={() => setSelectedScriptVersion(enumKey)}
                          className={classNames(
                            ScriptVersionInfo[selectedScriptVersion].title ===
                              scriptVersionData.title
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700 hover:text-white",
                            "block cursor-pointer px-4 py-2 text-sm"
                          )}
                        >
                          {scriptVersionData.title}
                        </div>
                      )}
                    </Menu.Item>
                  );
                })}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      <div className="h-[1px] w-full bg-[#4d495d]" />
      {monaco != null && (
        <Editor
          onMount={handleEditorDidMount}
          options={editorOptions}
          language={lng}
          theme={"bitscriptTheme"}
          height={"calc(100vh - 20vh)"}
        />
      )}
    </div>
  );
};
export default SandboxEditorInput;
