import { useState, Fragment, useEffect, useMemo, useRef } from "react";

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
      //     console.log("ed", ed);

      //     const model = ed.getModel();
      //     if (model) {
      //       const value = model.getValue();

      //       // find the type of this value
      //       // could be a decimal number, a string or a binary number
      //       // if it's a decimal number we need to convert it to hex
      //       // if it's a string we need to convert it to hex
      //       // if it's a binary number we need to convert it to hex

      //       console.log("value", value);

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
            const hexValue = autoConvertToHex(lineValue);

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
          //console.log(`Converting ${marker} to hex.`);
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
        console.log("remove el", el);
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

    console.log("lines", lines);

    lines.forEach((line: string, index: number) => {
      // ensure we dont' keep adding the text to a line that already has it
      const tempLine = line;

      const commentCheck = line.includes("(0x");
      //console.log("commentCheck", commentCheck);

      const opCheck = line.includes("OP");

      const number = tempLine.replace(/[^0-9]/g, "");
      const numberTest = Number(number);
      const hexTest = tempLine.startsWith("0x");

      const stringCheck = tempLine.startsWith("'") && tempLine.endsWith("'");
      const otherStringCheck =
        tempLine.startsWith('"') && tempLine.endsWith('"');

      const emptyLineTest = tempLine === "";

      const isNotHexOrOpHelper = () => {
        // if the line is anything beside hex or op return true
        if (emptyLineTest) {
          return false;
        } else if (
          numberTest ||
          hexTest ||
          opCheck ||
          stringCheck ||
          otherStringCheck
        ) {
          return true;
        } else if (commentCheck) {
          return true;
        } else if (opCheck) {
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

        //console.log("decorator", decorator);

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

    handleUserInput(cleanSingleStringLine);
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
    // Subscribe to editor changes
    const subscription = editorRef.current.onDidChangeModelContent(() => {
      console.log("did this run after edit");

      debouncedLintContent();
      debouncedLintDecorator();
      debounceCoreLibUpdate();
    });
  };

  if (editorRef.current) editorRef.current.setScrollPosition({ scrollTop: 0 });

  const onChangeEditor = (value: string | undefined, ev: any) => {
    if (value) {
      //console.log("value", value);
    }
  };

  return (
    <div className="flex-1  rounded-l-3xl bg-dark-purple">
      <div className="flex flex-row items-center justify-between p-4 px-6">
        <h2 className="text-lg text-white">Script Sandbox</h2>
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-lg bg-accent-dark-purple px-6 py-3 text-sm font-semibold  text-white shadow-sm   ">
              {ScriptVersionInfo[selectedScriptVersion].title}
              <ChevronDownIcon
                className="-mr-1 ml-5 h-5 w-5 text-white"
                aria-hidden="true"
              />
            </Menu.Button>
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
                    <Menu.Item>
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
          onChange={onChangeEditor}
          height={"calc(100vh - 100px)"}
        />
      )}
    </div>
  );
};
export default SandboxEditorInput;
