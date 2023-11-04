import { useState, Fragment, useEffect, useMemo, useRef } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { classNames } from "@/utils";
import * as Monaco from "monaco-editor/esm/vs/editor/editor.api";

import Editor, { useMonaco } from "@monaco-editor/react";

// import { editor } from "monaco-editor/esm/vs/editor/editor.api";
//import { Position, Range, type editor } from "monaco-editor";
import options, { editorOptions } from "../../const/editor/theme";
import {
  lineCompile,
  languageConfigurations,
  tokenProviders,
  hoverProvider,
  languageSuggestions,
  createRange,
} from "../../const/editor/lang";

import { ScriptWiz, VM, VM_NETWORK, VM_NETWORK_VERSION } from "@script-wiz/lib";

import { ALL_OPS } from "@/corelibrary/op_code";

export const TEST_SCRIPT = "";

const Sandbox = () => {
  const [editorSplits, setEditorSplits] = useState<any>({
    direction: "row",
    first: "editor",
    second: "stack",

    splitPercentage: 50,
  });

  const [scriptWiz, setScriptWiz] = useState<ScriptWiz>();
  const [vm, setVm] = useState<VM>({
    network: VM_NETWORK.BTC,
    ver: VM_NETWORK_VERSION.SEGWIT,
  });

  useEffect(() => {
    const extension = {};

    const scriptWizInstance = new ScriptWiz(vm, extension);
    setScriptWiz(scriptWizInstance);
  }, [vm, vm.network, vm.ver]);

  if (scriptWiz === undefined) {
    return null;
  }

  const SANDBOX_VIEWS: { [viewId: string]: JSX.Element } = {
    editor: <SandboxEditor scriptWiz={scriptWiz} />,
    stack: <StackVisualizer />,
  };

  return (
    <div className="flex min-h-[92vh] flex-1 flex-row items-start justify-between gap-x-4  bg-primary-gray md:ml-[270px] ">
      <div className="flex min-h-[88vh] w-11/12 flex-row ">
        <SandboxEditor scriptWiz={scriptWiz} />
        {/* <div className="h-full min-h-[92vh] w-[1px] bg-[#4d495d]" />
        <StackVisualizer /> */}
      </div>
    </div>
  );
};

export default Sandbox;

enum ScriptVersion {
  "SEGWIT" = "SEGWIT",
  "TAPSCRIPT" = "TAPSCRIPT",
  "LEGACY" = "LEGACY",
}

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

type SandboxEditorProps = {
  scriptWiz: ScriptWiz;
};

function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: number | undefined;

  return function (...args: Parameters<T>): void {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = window.setTimeout(later, wait);
  };
}

const SandboxEditor = ({ scriptWiz }: SandboxEditorProps) => {
  const failedLineNumber = undefined;

  const [lng] = useState("bitscriptLang");
  const monaco = useMonaco();

  const [selectedScriptVersion, setSelectedScriptVersion] =
    useState<ScriptVersion>(ScriptVersion.LEGACY);

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

  const addLintingHexDecorators = () => {
    console.log("addLintingHexDecorators");
    const model = editorRef.current?.getModel();
    // ensure model is not undefined
    if (model === undefined) {
      return "model is undefined";
    }

    const lines = model.getLinesContent();
    console.log("lines", lines);

    let decorators: Monaco.editor.IModelDeltaDecoration[] = [];
    const decorationOptions = (
      message: string,
      line: number
    ): Monaco.editor.IModelDecorationOptions => ({
      className: `mycd-${line}`,
      glyphMarginClassName: "my-custom-decoration",
      afterContentClassName: `mcac-${line}`,
      // We use a generated class name to include the message content
    });

    lines.forEach((line: any, index: number) => {
      // ensure we dont' keep adding the text to a line that already has it
      const commentCheck = line.includes("(0x");
      console.log("commentCheck", commentCheck);

      const opCheck = line.includes("OP");
      if (!opCheck) {
        const tempLine = line;

        const number = tempLine.replace(/[^0-9]/g, "");
        console.log("number", number);
        const numberTest = Number(number);

        const hexNumber = numberTest.toString(16).padStart(2, "0");

        const decorator: Monaco.editor.IModelDeltaDecoration = {
          range: createRange(
            index + 1,
            line.length + 20,
            index + 1,
            line.length + 24
          ),
          options: decorationOptions(hexNumber, index + 1),
          // text: ` (0x${hexNumber})  \n `,
          // forceMoveMarkers: true,
          // className: 'my-custom-decoration',
          // afterContentClassName: 'my-custom-after-content',
        };

        console.log("decorator", decorator);

        //edits.push(edit);
        decorators.push(decorator);
      }
    });
    model.deltaDecorations([], decorators);
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
        //Replace 'yourKeyword' with your condition
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

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
    editor.setScrollPosition({ scrollTop: 0 });
    //scroolTopCallback(editor.getScrollTop());
    editorRef.current.onDidScrollChange((param: any) => {
      //scroolTopCallback(param.scrollTop);
    });

    const debouncedLintContent = debounce(addLintingComments, 500);
    const debouncedLintDecorator = debounce(addLintingHexDecorators, 500);
    // Subscribe to editor changes
    const subscription = editorRef.current.onDidChangeModelContent(() => {
      console.log("does this run");
      debouncedLintContent();
      debouncedLintDecorator();
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
          value={TEST_SCRIPT}
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

enum SpeedSettingEnum {
  "SLOW" = "SLOW",
  "NORMAL" = "NORMAL",
  "FAST" = "FAST",
}

type SpeedSettingType = {
  title: string;
};
type SpeedSettingDataType = {
  [key in SpeedSettingEnum]: SpeedSettingType;
};
const SpeedSettingData: SpeedSettingDataType = {
  [SpeedSettingEnum.FAST]: {
    title: "Fast",
  },
  [SpeedSettingEnum.NORMAL]: {
    title: "Normal",
  },
  [SpeedSettingEnum.SLOW]: {
    title: "Slow",
  },
};

const StackVisualizer = () => {
  const [selectedSpeedSetting, setSelectedSpeed] = useState<SpeedSettingEnum>(
    SpeedSettingEnum.NORMAL
  );
  return (
    <div className="flex-1  rounded-r-3xl bg-[#110b24]">
      <div className="flex flex-row items-center justify-between p-4 px-6">
        <h2 className="text-lg text-white">Stack Inspector Sandbox</h2>
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-lg bg-accent-dark-purple px-6 py-3 text-sm font-semibold  text-white shadow-sm   ">
              {SpeedSettingData[selectedSpeedSetting].title}
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
                {Object.keys(SpeedSettingData).map((scriptVersion) => {
                  const enumKey = scriptVersion as SpeedSettingEnum;
                  const data = SpeedSettingData[enumKey];

                  return (
                    <Menu.Item>
                      {({ active }) => (
                        <div
                          onClick={() => setSelectedSpeed(enumKey)}
                          className={classNames(
                            SpeedSettingData[selectedSpeedSetting].title ===
                              data.title
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700 hover:text-white",
                            "block cursor-pointer px-4 py-2 text-sm"
                          )}
                        >
                          {data.title}
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
    </div>
  );
};
