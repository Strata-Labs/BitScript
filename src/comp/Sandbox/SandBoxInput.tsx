/* 
  v scary file bware - berny
*/

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
import { useAtom } from "jotai";

import {
  UserSandboxScript,
  paymentAtom,
  sandBoxPopUpOpen,
  sandboxScriptsAtom,
  accountTierAtom,
} from "../atom";

import {
  DecoratorTracker,
  KeyCode,
  LineToStep,
  SandboxEditorProps,
  ScriptVersion,
  ScriptVersionInfo,
  autoConvertToHex,
} from "./util";
import { ScriptData } from "@/corelibrary/scriptdata";
import { PaymentStatus } from "@prisma/client";
import SaveScript from "./PopUp/SaveScript";
import SandBoxPopUp from "./SandboxPopUp";
import router, { useRouter } from "next/router";
import { set } from "zod";

const nonHexDecorationIdentifier = "non-hex-decoration";

const lineStoStepIdentifier = "line-to-step";
const SandboxEditorInput = ({
  currentScript,
  editorValue,
  handleUserInput,
  currentStep,
  isPlaying,
  totalSteps,
  onUpdateScript,
  setEditorMounted,
  scriptMountedId,
  setScriptMountedId,
}: SandboxEditorProps) => {
  /*
   * State, Hooks, Atom & Ref Definitions
   *
   */

  const editorRef = useRef<Monaco.editor.IStandaloneCodeEditor | null>(null);

  // atoms
  const [isSandBoxPopUpOpen, setIsSandBoxPopUpOpen] = useAtom(sandBoxPopUpOpen);
  const [payment, setPayment] = useAtom(paymentAtom);
  const [accountTier, setAccountTier] = useAtom(accountTierAtom);

  // temp const for error handling
  const failedLineNumber = undefined;

  //lib hook
  const monaco = useMonaco();

  //state hooks

  // language &  theme for monaco
  const [lng] = useState("bitscriptLang");
  const [theme] = useState("bitscriptTheme");

  // track what version of the script we're using
  const [selectedScriptVersion, setSelectedScriptVersion] =
    useState<ScriptVersion>(ScriptVersion.LEGACY);

  // helper for decorator tracking
  const [decoratorTracker, setDecoratorTracking] = useState<DecoratorTracker[]>(
    []
  );
  // helper for underline tracking for hex conversion
  const [suggestUnderline, setSuggestUnderline] = useState<DecoratorTracker[]>(
    []
  );

  const [stepToLine, setStepToLine] = useState<LineToStep[]>([]);

  // helper for tracking what line a step is on
  const [lineToStep, setLineToStep] = useState<DecoratorTracker[]>([]);

  // state to show the saved model
  const [isSaveModalVisible, setIsSaveModalVisible] = useState<boolean>(false);

  const [editorDecs, setEditorDecs] = useState<string[]>([]);

  /*
   * UseEffects
   *
   */

  /*
  useEffect(() => {
    const model = editorRef.current?.getModel();

    if (!model) {
      return;
    }

    const formattedEditorValue = editorValue.split(" ").join("\n");
    model.setValue(formattedEditorValue);
  }, [editorValue]);
      \*/
  // effect that controls when a new line should be highlighted since the SV is running
  useEffect(() => {
    if (isPlaying && totalSteps > 1) {
      handleNewStep();
    }
  }, [currentStep, isPlaying, totalSteps, lineToStep, stepToLine]);

  useEffect(() => {
    if (
      editorValue !== "" &&
      currentScript.id !== -1 &&
      scriptMountedId !== currentScript.id
    ) {
      const model = editorRef.current?.getModel();
      if (model) {
        model.setValue(editorValue);
        setScriptMountedId(currentScript.id);
      }
    }
  }, [editorValue, currentScript, scriptMountedId]);
  // takes care of the monaco editor setup (language, actions, )
  useEffect(() => {
    let disposeLanguageConfiguration = () => {};
    let disposeMonarchTokensProvider = () => {};
    let disposeHoverProvider = () => {};
    let disposeCompletionItemProvider = () => {};

    // language define
    if (monaco !== null) {
      monaco.languages.register({ id: lng });

      // Register the action to convert line item to hex
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

      // Register the command to convert line item to hex
      monaco.editor.registerCommand(
        "convert-to-hex",
        function (accessor, marker) {
          const model = editorRef.current?.getModel();

          if (model) {
            // get the value of the line
            const lineValue = model.getLineContent(marker.startLineNumber);

            // convert to hex
            const hexValue = autoConvertToHex(lineValue);

            //update the editor
            /*
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
            */
          }
        }
      );

      // Define a new theme that contains only rules that match this language
      monaco.editor.defineTheme(theme, options);

      // Register a tokens provider for the language
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

      // Register a hover provider for the language
      const { dispose: disposeRegisterHoverProvider } =
        monaco.languages.registerHoverProvider(
          lng,
          hoverProvider(ALL_OPS, failedLineNumber)
        );
      disposeHoverProvider = disposeRegisterHoverProvider;

      // Register a completion item provider for the new language
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
        disposeLanguageConfiguration();
        disposeMonarchTokensProvider();
        disposeHoverProvider();
        disposeCompletionItemProvider();
      }
    };
  }, [monaco, failedLineNumber, lng]);

  useEffect(() => {
    // loop through the decorate tracking to add the data to the at
    //console.log(" when is this running");

    decoratorTracker.forEach((d, i) => {
      // get the element that this is associated with
      const element = document.getElementsByClassName(`hex-value-${d.line}`);

      if (element.length > 0) {
        //console.log("element", element);
        const el = element[0] as any;

        el.style.marginLeft = "16px";
        el.innerHTML = `(${d.data})`;
      }
    });
  }, [decoratorTracker]);

  useEffect(() => {
    // loop through the decorate tracking to add the data to the at
    suggestUnderline.forEach((d, i) => {
      // get the element that this is associated with
      const element = document.getElementsByClassName(
        `${nonHexDecorationIdentifier}-${d.line}`
      );

      if (element.length > 0) {
        const el = element[0];

        el.setAttribute("text-decoration", "underline");
        el.setAttribute("text-decoration-color", "yellow");
        el.setAttribute("text-decoration-style", "wavy");
        //el.innerHTML = d.data;
      }
    });
  }, [suggestUnderline]);

  // temp function that handle changing step this will be updated to use the SV
  const handleNewStep = () => {
    if (currentStep == 0) return;

    const reduceHack = lineToStep.reduce((acc, item, i) => {
      if (i === 0) {
        return `.${lineStoStepIdentifier}-${item.line}`;
      } else if (lineToStep.length - 1 === item.line) {
        return `${acc}, .${lineStoStepIdentifier}-${item.line}`;
      } else {
        return `${acc}, .${lineStoStepIdentifier}-${item.line}`;
      }
    }, "");

    console.log("reduceHack", reduceHack);
    const updateStyleEls = document.querySelectorAll(`${reduceHack}`);

    //console.log("elements found to remove", updateStyleEls);

    updateStyleEls.forEach((d, i) => {
      //console.log("elements found that can be removed", d);
      const el = d as any;

      el.classList.remove("currentLineStep");
    });

    const line = currentStep + 1;

    const elements = document.querySelectorAll(
      `span .${lineStoStepIdentifier}-${line}`
    );

    console.log("line to step elements", elements);

    if (elements.length > 0) {
      const el = elements[0] as any;

      console.log("el", el);
      //el.style.color = "#F79327";
      el.classList.add("currentLineStep");
      //el.style.color("yellow");
    } else {
      console.log("no elements found that have our lien number");
    }

    /*
    stepToLine.forEach((s) => {
      if (s.line === line) {
        console.log("should change line to step color", s.line);
       
      } else {
        console.log("should turn back the line to auto", s.line);
        const elements = document.querySelectorAll(
          `span .${lineStoStepIdentifier}-${s.line}`
        );

        // find   the element that is a span

        //map through all fo these instnace and turn the text color auto

        if (elements.length > 0) {
          console.log("length of item that should be changed to auto");
          elements.forEach((d, i) => {
            console.log("elements", elements);
            const el = d as any;

            console.log("el", el);
            el.style.color = "auto";
          });

          //el.style.color("yellow");
        }
      }
    });
    */
  };

  const addAutoConvertSuggestionUnderline = () => {};

  /* 
    we're going to split the whole process into steps
    - delete all decorators if there is any
    - loop through each line and check if there should be a decorator & add it to the editor
    - 
  */

  const deletePreviousDecorators = () => {
    const model = editorRef.current?.getModel();

    if (model === undefined || model === null) {
      return "model is undefined";
    }

    const clearExistingDecs = model.deltaDecorations(editorDecs, []);
    const clearExistingDecs2 = model.deltaDecorations([], []);

    decoratorTracker.forEach((d) => {
      const elements = document.getElementsByClassName(`hex-value-${d.line}`);

      if (elements.length > 0) {
        // delete each element from the dom in elements
        // no delete all of the elements found in elements
        for (const el of elements) {
          document.removeChild(el);
          //el.remove();
        }
      }
    });

    decoratorTracker.forEach((d) => {
      const elements = document.getElementsByClassName(`hex-value-${d.line}`);

      console.log("should be empty since we delted", elements);
    });
    // add underline removal of decs
    setEditorDecs([]);
  };

  const addLineHexValueDecorator = () => {
    // asset the editor is mounted
    const model = editorRef.current?.getModel();
    // ensure model is not undefined
    if (model === null) {
      return "model is undefined";
    }
    if (model === undefined) {
      return "model is undefined";
    }

    // keep local track of our decorators
    const hexCommentDecorator: Monaco.editor.IModelDeltaDecoration[] = [];
    const hexDecsHelper: DecoratorTracker[] = [];

    const underlineDecsHelper: DecoratorTracker[] = [];
    const underlineDecorator: Monaco.editor.IModelDeltaDecoration[] = [];
    const underlineModelMarkers: Monaco.editor.IMarkerData[] = [];

    const lineToStepHelper: DecoratorTracker[] = [];
    const lineToStepDecorator: Monaco.editor.IModelDeltaDecoration[] = [];

    // helper function that creates the decoration options
    const createHexCommentDecorationOption = (
      line: number,
      hexValue: string
    ): Monaco.editor.IModelDecorationOptions => ({
      //inlineClassName: `hex-value-${line}`,
      isWholeLine: false,
      className: `hex-value-${line} `,

      afterContentClassName: `hex-value-${line}`,
    });

    const underlineDecoratorOptions = (
      line: number
    ): Monaco.editor.IModelDecorationOptions => ({
      className: `${nonHexDecorationIdentifier}-${line}`,
    });

    const lineToStepDecorationOptions = (line: number) => ({
      inlineClassName: `${lineStoStepIdentifier}-${line}`,
      isWholeLine: true,
    });
    // get all the lines
    const lines = model.getLinesContent();

    // determine if this line should have a hex comment decorator
    lines.forEach((line: string, index: number) => {
      // comment check
      const commentCheck = line.includes("//");
      // op check
      const opCheck = line.includes("OP");

      // number check
      const tempLine = line;
      const number = tempLine.replace(/[^0-9]/g, "");
      const numberTest = Number(number);

      // string check  const stringCheck = line.startsWith("'") && line.endsWith("'");
      const doubleQouteStringCheck = line.startsWith('"') && line.endsWith('"');
      const singleQoutesStringCheck =
        line.startsWith("'") && line.endsWith("'");

      // helper func to determine if we should add a hex decorator
      const shouldAddHexDecorator = () => {
        if (opCheck) {
          return false;
        }
        if (commentCheck) {
          return false;
        }
        if (numberTest || doubleQouteStringCheck || singleQoutesStringCheck) {
          return true;
        }

        return false;
      };

      // helper func to determien if we should add a hex decorator
      const shouldAddHexDecoratorTest = shouldAddHexDecorator();

      if (shouldAddHexDecoratorTest) {
        // convert the line to hex
        const hexValue = autoConvertToHex(line);

        const hexCommentDecoration: Monaco.editor.IModelDeltaDecoration = {
          range: createRange(
            index + 1,
            line.length + 400,
            index + 1,
            line.length + 400 + hexValue.length
          ),
          options: createHexCommentDecorationOption(index + 1, hexValue),
        };

        // check if this line already has a hex decorator

        const el = document.getElementsByClassName(`hex-value-${index + 1}`);
        if (el.length === 0) {
          hexCommentDecorator.push(hexCommentDecoration);
        }

        hexDecsHelper.push({ line: index + 1, data: hexValue });

        // add hex line suggest decorator

        const underLineDecoratorTrackingItem: DecoratorTracker = {
          line: index + 1,
          data: `  (0x${hexValue})`,
        };

        const underlineDecoration: Monaco.editor.IModelDeltaDecoration = {
          range: createRange(index + 1, 0, index + 1, line.length),
          options: underlineDecoratorOptions(index + 1),
        };

        const underlineModelMarkerObj = {
          startLineNumber: index + 1,
          startColumn: 0,
          endLineNumber: index + 1,
          endColumn: tempLine.length + 1,
          message: "This is not a valid hex value. Click to convert.",
          severity: 4,
        };

        underlineModelMarkers.push(underlineModelMarkerObj);

        underlineDecorator.push(underlineDecoration);
        underlineDecsHelper.push(underLineDecoratorTrackingItem);

        const lineToStepDecoration: Monaco.editor.IModelDeltaDecoration = {
          range: createRange(index + 1, 0, index + 1, line.length),
          options: lineToStepDecorationOptions(index + 1),
        };

        const elLineCheck = document.getElementsByClassName(
          `${lineStoStepIdentifier}-${index + 1}`
        );

        console.log("elLineCheck", elLineCheck);
        if (elLineCheck.length === 0) {
          lineToStepDecorator.push(lineToStepDecoration);
        }

        const lineToStepDecorationItem: DecoratorTracker = {
          line: index + 1,
          data: `line test`,
        };
        lineToStepHelper.push(lineToStepDecorationItem);
      } else if (opCheck) {
        // get only the text from the line
        const op = line.split(" ")[0];

        // find the op from the list of ops we have
        const opData = ALL_OPS.find((o) => o.name === op);

        if (opData) {
          const hexCommentDecoration: Monaco.editor.IModelDeltaDecoration = {
            range: createRange(
              index + 1,
              line.length + 400,
              index + 1,
              line.length + 400 + opData.hex.length
            ),
            options: createHexCommentDecorationOption(index + 1, opData.hex),
          };
          const el = document.getElementsByClassName(`hex-value-${index + 1}`);
          if (el.length === 0) {
            hexCommentDecorator.push(hexCommentDecoration);
          }

          hexDecsHelper.push({ line: index + 1, data: opData.hex });

          const lineToStepDecoration: Monaco.editor.IModelDeltaDecoration = {
            range: createRange(index + 1, 0, index + 1, line.length),
            options: lineToStepDecorationOptions(index + 1),
          };

          const elLineCheck = document.getElementsByClassName(
            `${lineStoStepIdentifier}-${index + 1}`
          );

          console.log("elLineCheck", elLineCheck);
          if (elLineCheck.length === 0) {
            lineToStepDecorator.push(lineToStepDecoration);
          }

          const lineToStepDecorationItem: DecoratorTracker = {
            line: index + 1,
            data: `line test`,
          };
          lineToStepHelper.push(lineToStepDecorationItem);
        }
      }

      const updatedModelDec = model.deltaDecorations(editorDecs, [
        ...hexCommentDecorator,
        ...underlineDecorator,
        ...lineToStepDecorator,
      ]);

      setEditorDecs(updatedModelDec);
      setDecoratorTracking(hexDecsHelper);
      setSuggestUnderline(underlineDecsHelper);
      setLineToStep(lineToStepHelper);

      if (monaco) {
        monaco.editor.setModelMarkers(model, lng, underlineModelMarkers);
      }
    });

    // okay i think we'll set the decorators than in the next item we do we'll add the data attribute
  };

  const formatText = useCallback((text: string) => {
    // Regular expression to match a line for comments if the line has // in it then keep it as is
    const commentRegex = /^\s*\/\//;

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
          const commentMatches = line.match(commentRegex);
          console.log("matches", matches);
          console.log("commentmatches", commentMatches);

          // If the line has a comment, return it as is
          if (commentMatches) {
            return line;
          }

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
    if (model === null) {
      return "model is undefined";
    }
    const fullModelRange = model.getFullModelRange();

    const text = model.getValueInRange(fullModelRange);

    // Split the text by spaces and join by newlines

    // Format the text
    const formattedText = formatText(text);

    // Check if the new text is different from the old one
    if (formattedText !== text) {
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
      //console.log("no multi line items");
    }
  };

  const addOpPush = () => {
    const model = editorRef.current?.getModel();

    if (model === undefined || model === null) {
      return "model is undefined";
    }

    const lines = model.getLinesContent();

    let edits: Monaco.editor.IIdentifiedSingleEditOperation[] = [];

    lines.forEach((line: string, index: number) => {
      // if the line has a comment we can skip it

      // ensure line does not inclue OP
      const opCheck = line.includes("OP");

      // check what data type this is
      // for the time being we're going to assume it's a number in decimal format

      // ensure the line has a number in it

      const tempLine: string = line;

      const number = tempLine.replace(/[^0-9]/g, "");
      const numberTest = Number(number);

      const stringCheck = line.startsWith("'") && line.endsWith("'");
      const otherStringCheck = line.startsWith('"') && line.endsWith('"');

      // ensure line is not a comment
      // check if the first non empty character is a //
      const commentCheck = line.includes("//");

      console.log("commentCheck", commentCheck);

      const shouldAddOpPush = () => {
        if (opCheck) {
          return false;
        }
        if (commentCheck) {
          return false;
        }
        if (numberTest || stringCheck || otherStringCheck) {
          return true;
        }

        return false;
      };

      const shouldAddOpPushTest = shouldAddOpPush();
      if (shouldAddOpPushTest) {
        console.log("line", line);
        //const position = new Position(index + 1, line.length + 1);

        // get the number from the line

        // convert the number to hex

        // need to check that the line before has a OP_PUSH(x)
        // if it does we can add it
        //console.log("line", line);
        const hexLine = autoConvertToHex(line);
        const scriptData = ScriptData.fromHex(hexLine);
        //console.log("scriptData", scriptData._dataBytes);

        const dataBytesLenth = Object.keys(scriptData._dataBytes).length;

        const previousLine = index !== 0 ? lines[index - 1] : "";

        // check if previous line does not have OP_[number]
        const otherOpCheck = previousLine;

        const thingCHeck = otherOpCheck.split("OP_");

        //console.log("thingCHeck", thingCHeck);
        let otherCheckFinal = true;
        if (thingCHeck.length > 1) {
          // check if the first item in the array is a number
          const numberCheck = thingCHeck[1].split(" ")[0];
          const numberCheck2 = numberCheck.replace(/[^0-9]/g, "");
          const numberCheck3 = Number(numberCheck2);
          if (numberCheck3) {
            otherCheckFinal = false;
          }
        }
        if (!previousLine.includes("OP_PUSH") && otherCheckFinal) {
          const editOp: Monaco.editor.IIdentifiedSingleEditOperation = {
            range: createRange(index + 1, 0, index + 1, 0),
            text: `OP_PUSH${dataBytesLenth}\n`,
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

    if (model === undefined || model === null) {
      return "model is undefined";
    }

    const lines = model.getLinesContent();

    const _linesToStep: LineToStep[] = [];
    let step = 0;

    // we need to get a single string with each data separated by a space
    const cleanSingleStringLine = lines.reduce(
      (acc: string, line: string, i: number) => {
        //console.log("line", line);

        // ensure line is not a comment
        const commentCheck = line.includes("//");

        if (line === "") return acc;
        if (!commentCheck) {
          if (i === 0) {
            return line;
          } else {
            _linesToStep.push({ line: i + 1, step: step });
            step += 1;

            return acc + " " + line;
          }
        } else {
          return acc;
        }
      },
      ""
    );

    setStepToLine(_linesToStep);

    // ensure cleanSingleStringLine is not undefined and that is an array with a length greater than 0

    if (
      cleanSingleStringLine !== undefined &&
      cleanSingleStringLine !== "" &&
      cleanSingleStringLine.length !== 0
    ) {
      //console.log("cleanSingleStringLine", cleanSingleStringLine);
      const cleanthing = cleanSingleStringLine
        .split(" ")
        .filter((c: string) => c !== "");
      //console.log("cleanthing", cleanthing);

      const formatedText = cleanthing.join(" ");

      //console.log("formatedText", formatedText);
      handleUserInput(formatedText);
    }
  };

  const handleEditorDidMount = (
    editor: Monaco.editor.IStandaloneCodeEditor
  ) => {
    editorRef.current = editor;
    editor.setScrollPosition({ scrollTop: 0 });

    const debounceCoreLibUpdate = debounce(handleUpdateCoreLib, 500);
    //const debouncedLintContent = debounce(addOpPush, 500);
    //const debouncedLintDecorator = debounce(addLintingHexDecorators, 500);
    const debouncEensureNoMultiDataOnSingleLine = debounce(
      ensureNoMultiDataOnSingleLine,
      500
    );

    const debounceAddAutoConvertSuggestionUnderline = debounce(
      addAutoConvertSuggestionUnderline,
      500
    );
    const debounceAddLineHexValueDecorator = debounce(
      addLineHexValueDecorator,
      500
    );
    editor.onKeyDown((event: any) => {
      if (event.keyCode === KeyCode.Enter) {
        console.log("how many time does this run");
        //lintCurrentText(editor);

        ensureNoMultiDataOnSingleLine();
        addOpPush();
        //addLintingHexDecorators();
        handleUpdateCoreLib();
        deletePreviousDecorators();
        addLineHexValueDecorator();
      }
    });

    editor.onMouseDown((e: any) => {
      console.log("MOUSE DOWN IS RUNNING");

      let element = e.target.element || e.target;
      while (element && element.tagName !== "A") {
        element = element.parentNode;
      }

      if (element && element.tagName === "A") {
        const href =
          element.getAttribute("href") || element.getAttribute("data-href");

        if (href) {
          window.open(href, "_blank");
        }
      } else {
        console.log("Click was not on an anchor tag.");
      }
    });

    // Subscribe to editor changes
    const subscription = editorRef.current.onDidChangeModelContent(() => {
      //debouncEensureNoMultiDataOnSingleLine();
      //debouncedLintContent();
      //debouncedLintDecorator();
      debounceCoreLibUpdate();
      //debounceAddAutoConvertSuggestionUnderline();
      //debounceAddLineHexValueDecorator();
    });

    setEditorMounted(true);

    if (editorValue !== "") {
      const model = editorRef.current?.getModel();
      if (model) {
        model.setValue(editorValue);
      }
      console.log("editorValue", editorValue);
    }
  };

  const handleSaveClick = () => {
    setIsSaveModalVisible(true);
  };

  const handleScriptSaved = (script: UserSandboxScript) => {
    setIsSaveModalVisible(false);
    onUpdateScript(script);

    router.push(`/sandbox?script_id=${script.id}`);
  };

  const handleScriptSelected = (script: UserSandboxScript) => {
    router.push(`/sandbox?script_id=${script.id}`);

    console.log("handleScriptSelected script", script);

    const model = editorRef.current?.getModel();

    if (model) {
      model.setValue(script.content);
    }
  };

  if (editorRef.current) editorRef.current.setScrollPosition({ scrollTop: 0 });

  return (
    <>
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
                    !payment?.hasAccess ||
                    payment.accountTier !== "ADVANCED_ALICE"
                      ? "cursor-not-allowed bg-[#201B31] blur-[1px]"
                      : "bg-[#201B31]"
                  }`}
                  disabled={
                    !payment?.hasAccess ||
                    payment.accountTier !== "ADVANCED_ALICE"
                  }
                  onClick={() => handleSaveClick()}
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
                  <p className="ml-2 text-[12px] font-extralight text-white">
                    Save
                  </p>
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
                  <p className="ml-2 text-[12px] font-extralight text-white">
                    New
                  </p>
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
                  {Object.keys(ScriptVersionInfo).map(
                    (scriptVersion, index) => {
                      const enumKey = scriptVersion as ScriptVersion;
                      const scriptVersionData = ScriptVersionInfo[enumKey];

                      return (
                        <Menu.Item key={scriptVersionData.title}>
                          {({ active }) => (
                            <div
                              onClick={() => setSelectedScriptVersion(enumKey)}
                              className={classNames(
                                ScriptVersionInfo[selectedScriptVersion]
                                  .title === scriptVersionData.title
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
                    }
                  )}
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
            theme={theme}
            height={"calc(100vh - 20vh)"}
          />
        )}
      </div>

      {isSandBoxPopUpOpen && (
        <SandBoxPopUp
          editorRef={editorRef}
          onSelectScript={handleScriptSelected}
        />
      )}

      {isSaveModalVisible && (
        <SaveScript
          scriptContent={editorValue}
          sandboxScript={currentScript}
          onClose={() => setIsSaveModalVisible(false)}
          onSave={handleScriptSaved}
          editorRef={editorRef}
        />
      )}
    </>
  );
};
export default SandboxEditorInput;
