import { useState, Fragment, useEffect, useMemo, useRef } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { classNames } from "@/utils";
import * as Monaco from "monaco-editor/esm/vs/editor/editor.api";
import Editor, { useMonaco } from "@monaco-editor/react";

import options, { editorOptions } from "../../const/editor/theme";
import {
  lineCompile,
  languageConfigurations,
  tokenProviders,
  hoverProvider,
  languageSuggestions,
} from "../../const/editor/lang";

import { ScriptWiz, VM, VM_NETWORK, VM_NETWORK_VERSION } from "@script-wiz/lib";
import { Opcode } from "@script-wiz/lib/opcodes/model/Opcode";
import { ALL_OPS } from "@/corelibrary/op_code";

export const initialBitcoinEditorValue =
  "//" +
  "\n" +
  "// BitScript Sandbox" +
  "\n" +
  "// Bitcoin Scripts Tooling." +
  "\n" +
  "//" +
  "\n" +
  "\n" +
  "// # UnlockScript/ScriptSig" +
  "\n" +
  "<[signature]>" +
  "\n" +
  "<[pubKey]>" +
  "\n" +
  "\n" +
  "// # LockScript/ScriptPubKey" +
  "\n" +
  "OP_DUP" +
  "\n" +
  "OP_HASH160" +
  "\n" +
  "<[hash160[public-key]]>" +
  "\n" +
  "OP_EQUALVERIFY" +
  "\n" +
  "OP_CHECKSIG";

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
const SandboxEditor = ({ scriptWiz }: SandboxEditorProps) => {
  const failedLineNumber = undefined;

  const [lng] = useState("bitscriptLang");
  const monaco = useMonaco();

  const [selectedScriptVersion, setSelectedScriptVersion] =
    useState<ScriptVersion>(ScriptVersion.LEGACY);

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

  const editorRef = useRef<any>(null);

  const handleEditorDidMount = (editor: any, monaco: typeof Monaco) => {
    editorRef.current = editor;

    editor.setScrollPosition({ scrollTop: 0 });
    //scroolTopCallback(editor.getScrollTop());

    editorRef.current.onDidScrollChange((param: any) => {
      //scroolTopCallback(param.scrollTop);
    });
  };

  if (editorRef.current) editorRef.current.setScrollPosition({ scrollTop: 0 });

  const onChangeEditor = (
    value: string | undefined,
    ev: Monaco.editor.IModelContentChangedEvent
  ) => {
    if (value) {
      console.log("value", value);
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
          className="script-wiz-monaco-editor"
          onMount={handleEditorDidMount}
          value={initialBitcoinEditorValue}
          options={editorOptions}
          language={lng}
          theme={"bitscriptTheme"}
          onChange={onChangeEditor}
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
