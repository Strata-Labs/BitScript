import * as Monaco from "monaco-editor/esm/vs/editor/editor.api";

import {
  blue,
  darkOlive,
  fuchsia,
  lightBlue,
  lightOlive,
  lightSalmonPink,
  mistBlue,
  oak,
  red,
  salmon,
  subtleGray,
  vibrantYellow,
} from "./colors";

const options: Monaco.editor.IStandaloneThemeData = {
  base: "vs-dark",
  inherit: false,

  rules: [
    { token: "delimiter.evaluation", foreground: vibrantYellow },
    { token: "delimiter.push", foreground: subtleGray },
    { token: "opcode.crypto", foreground: lightSalmonPink },
    { token: "opcode.push-number", foreground: lightOlive },
    { token: "opcode.disabled", foreground: red },
    { token: "opcode.arithmetic", foreground: fuchsia },
    { token: "opcode.flow-control", foreground: salmon },
    { token: "opcode.blocking", foreground: oak },
    { token: "opcode.other", foreground: blue },
    { token: "identifier", foreground: lightBlue },
    { token: "literal.bigint", foreground: lightOlive },
    { token: "literal.hex", foreground: darkOlive },
    { token: "literal.binary", foreground: mistBlue },
    { token: "invalid", foreground: red },
    { token: "comment", foreground: "#6A9955" },
    { token: "", background: "#181B1E" },
    { token: "", foreground: "#ce9178" },
  ],
  colors: {
    "editor.foreground": "#FFFFFF",
    "editor.background": "#181B1E",
  },
};

export const editorOptions: Monaco.editor.IEditorConstructionOptions = {
  cursorBlinking: "smooth",
  dragAndDrop: true,
  fontSize: 14,
  lineHeight: 18,
  fontFamily: "'Fira Mono', monospace",
  scrollBeyondLastLine: false,
  contextmenu: false,
  folding: false,
  wrappingIndent: "same",
  minimap: { enabled: false },
  wordWrap: "on",
  scrollbar: {
    verticalScrollbarSize: 6,
    horizontalScrollbarSize: 6,
    alwaysConsumeMouseWheel: false,
    vertical: "hidden",
  },
};

export default options;
