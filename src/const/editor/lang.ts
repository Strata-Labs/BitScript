import * as Monaco from "monaco-editor/esm/vs/editor/editor.api";
import { Opcode } from "./ops";
import WizData from "@script-wiz/wiz-data";

import { languageBTC } from "./btc";
import { OP_Code } from "@/corelibrary/op_code";

export const lineCompile = (input: string): WizData => {
  // HEX DATA INPUT
  if (input.startsWith("0x")) {
    const newInput = input.substr(2, input.length);
    return WizData.fromHex(newInput);
  }

  if (
    (input.startsWith('"') && input.endsWith('"')) ||
    (input.startsWith("'") && input.endsWith("'"))
  ) {
    const formattedInput = input.substr(1, input.length - 2);
    return WizData.fromText(formattedInput);
  }

  // NUMBER INPUT
  if (!isNaN(input as any)) {
    return WizData.fromNumber(Number(input));
  }
  // eslint-disable-next-line no-throw-literal
  throw "Compile Final Input Error: it is not a valid final input string!";
};

export const languageConfigurations = (
  monaco: typeof Monaco.languages
): Monaco.languages.LanguageConfiguration => {
  return {
    autoClosingPairs: [
      { open: "<", close: ">" },
      { open: "$(", close: ")" },
      { open: '"', close: '"', notIn: ["string"] },
      { open: "'", close: "'", notIn: ["string", "comment"] },
      { open: "/**", close: " */", notIn: ["string"] },
      { open: "OP_IF", close: " OP_ENDIF", notIn: ["string", "comment"] },
      {
        open: "OP_NOTIF",
        close: " OP_ENDIF",
        notIn: ["string", "comment"],
      },
    ],
    brackets: [
      ["<", ">"],
      ["$(", ")"],
    ],

    comments: {
      lineComment: "//",
      blockComment: ["/*", "*/"],
    },
    onEnterRules: [
      {
        // e.g. /** | */
        beforeText: /^\s*\/\*\*(?!\/)([^*]|\*(?!\/))*$/,
        afterText: /^\s*\*\/$/,
        action: {
          indentAction: monaco.IndentAction.IndentOutdent,
          appendText: " * ",
        },
      },
      {
        // e.g. /** ...|
        beforeText: /^\s*\/\*\*(?!\/)([^*]|\*(?!\/))*$/,
        action: {
          indentAction: monaco.IndentAction.None,
          appendText: " * ",
        },
      },
      {
        // e.g.  * ...|
        beforeText: /^(\t|[ ])*[ ]\*([ ]([^*]|\*(?!\/))*)?$/,
        afterText: /^(\s*(\/\*\*|\*)).*/,
        action: {
          indentAction: monaco.IndentAction.None,
          appendText: "* ",
        },
      },
      {
        // e.g.  */|
        beforeText: /^(\t|[ ])*[ ]\*\/\s*$/,
        action: {
          indentAction: monaco.IndentAction.None,
          removeText: 1,
        },
      },
      {
        // e.g.  *-----*/|
        beforeText: /^(\t|[ ])*[ ]\*[^/]*\*\/\s*$/,
        action: {
          indentAction: monaco.IndentAction.None,
          removeText: 1,
        },
      },
    ],
  };
};

export const tokenProviders: Monaco.languages.IMonarchLanguage = {
  bigint: /-?\d+(_+\d+)*/,
  brackets: [
    { open: "$(", close: ")", token: "delimiter.evaluation" },
    { open: "<", close: ">", token: "delimiter.push" },
  ],
  binary: /[01]+(?:[01_]*[01]+)*/,
  hex: /[0-9a-fA-F]_*(?:_*[0-9a-fA-F]_*[0-9a-fA-F]_*)*[0-9a-fA-F]/,
  flowControlOpcodes: languageBTC.flowControlOpcodes,
  arithmeticOpcodes: languageBTC.arithmeticOpcodes,
  blockingOpcodes: languageBTC.blockingOpcodes,
  cryptoOpcodes: languageBTC.cryptoOpcodes,
  pushNumberOpcodes: languageBTC.pushNumberOpcodes,
  disabledOpcodes: [...languageBTC.disabledOpcodes, ...languageBTC.nopOpcodes],
  otherOpcodes: languageBTC.otherOpcodes,
  tokenizer: {
    root: [
      [
        /[a-zA-Z_][.a-zA-Z0-9_-]+/,
        {
          cases: {
            "@flowControlOpcodes": "opcode.flow-control",
            "@arithmeticOpcodes": "opcode.arithmetic",
            "@blockingOpcodes": "opcode.blocking",
            "@cryptoOpcodes": "opcode.crypto",
            "@pushNumberOpcodes": "opcode.push-number",
            "@disabledOpcodes": "opcode.disabled",
            "@otherOpcodes": "opcode.other",
            "@default": "identifier",
          },
        },
      ],
      [/0x(@hex)/, "literal.hex"], // HexLiteral
      [/(@bigint)/, "literal.bigint"], // BigIntLiteral
      { include: "@whitespace" },
      [/[<>)]|\$\(/, "@brackets"],
      [/"/, "string", "@string_double"], // UTF8Literal
      [/'/, "string", "@string_single"], // UTF8Literal
    ],
    whitespace: [
      [/[ \t\r\n]+/, ""],
      [/\/\*/, "comment", "@comment"],
      [/\/\/.*$/, "comment"],
    ],
    comment: [
      [/[^/*]+/, "comment"],
      [/\*\//, "comment", "@pop"],
      [/[/*]/, "comment"],
      [/[(*]/, "comment"],
    ],
    string_double: [
      [/[^"$]+/, "string"],
      [/"/, "string", "@pop"],
    ],
    string_single: [
      [/[^'$]+/, "string"],
      [/'/, "string", "@pop"],
    ],
  },
};

export const hoverProvider = (
  opcodesDatas: OP_Code[],
  failedLineNumber?: number
): Monaco.languages.HoverProvider => {
  const hoverProvider: Monaco.languages.HoverProvider = {
    provideHover: function (
      model: Monaco.editor.ITextModel,
      position: Monaco.Position,
      token: Monaco.CancellationToken
    ) {
      const modelValue = model.getValue(); // all lines

      const query = model.getWordAtPosition(position); //["word",positions]

      const queryWord = query?.word || "";

      const currentModel = opcodesDatas.find((opc) => opc.name === queryWord);

      const columns = model.getWordUntilPosition(position);
      const range: Monaco.IRange = {
        startColumn: columns.startColumn,
        endColumn: columns.endColumn,
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
      };

      if (currentModel !== undefined) {
        const contents = [
          {
            value: `[${currentModel.name}](/OPS/${currentModel.name})`,
            isTrusted: true,
          },
          { value: currentModel.description || "" },
          { value: "compiled:" + currentModel.hex },
        ];
        console.log("HOVER CONTENTS", contents);

        return {
          range,
          contents: contents,
        };
      }

      let lines = modelValue.split("\n");
      lines = lines.map((line) => line.trim());
      lines = lines.map((line) => line.replaceAll("\r", ""));
      lines = lines.map((line) => line.replaceAll("\t", ""));

      const currentLineValue = lines[position.lineNumber - 1];

      let compiledValue: string = "";

      try {
        if (
          currentLineValue.startsWith("<") &&
          currentLineValue.endsWith(">")
        ) {
          const finalInput = currentLineValue.substr(
            1,
            currentLineValue.length - 2
          );
          compiledValue = "0x" + lineCompile(finalInput).hex;
        } else {
          compiledValue = "0x" + lineCompile(currentLineValue).hex;
        }
      } catch (error: any) {
        compiledValue = `Unknown identifier '${currentLineValue}'.`;
      }

      if (failedLineNumber && failedLineNumber < position.lineNumber) {
        return { range, contents: [{ value: "" }] };
      }

      return {
        range,
        contents: [{ value: "Compiled : " + compiledValue }],
      };
    },
  };

  return hoverProvider;
};

export const languageSuggestions = (
  monaco: typeof Monaco.languages,
  model: Monaco.editor.ITextModel,
  position: Monaco.Position,
  opcodesDatas: OP_Code[]
): Monaco.languages.CompletionItem[] => {
  // const query = model.getWordAtPosition(position);
  const columns = model.getWordUntilPosition(position);

  const range: Monaco.IRange = {
    startColumn: columns.startColumn,
    endColumn: columns.endColumn,
    startLineNumber: position.lineNumber,
    endLineNumber: position.lineNumber,
  };

  return opcodesDatas.map((opc) => ({
    label: opc.name,
    insertText: opc.name,
    kind: monaco.CompletionItemKind.Function,
    range,
    documentation: opc.description,
    detail: opc.description,
  }));
};

export interface IRange {
  startLineNumber: number;
  startColumn: number;
  endLineNumber: number;
  endColumn: number;
}

// Function to create a range-like object
export function createRange(
  startLineNumber: number,
  startColumn: number,
  endLineNumber: number,
  endColumn: number
): IRange {
  return {
    startLineNumber,
    startColumn,
    endLineNumber,
    endColumn,
  };
}
