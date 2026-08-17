import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_DUP as English } from "./DUP";

// Spanish translation of OP_DUP.
//
// Pattern: spread the English opcode, then override the fields you've
// translated. Anything you don't override stays English — so you can ship
// an opcode translation in stages without breaking it.
//
// Keep `name`, `opCode`, `hex`, `linkPath`, `tileImage`, `generalType`,
// `inputNum`, `returnNum`, and `visualProps.stackSteps`/`failureSteps`
// identical to the English version so URLs, assets, and the animation logic
// stay stable across locales.

export const OP_DUPEs: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Pila",
  type: "Poner",
  shortDescription:
    "Duplica el elemento superior de la pila y pone la copia en la pila.",
  longDescription:
    "OP_DUP es una operación de pila habitual que permite duplicar el elemento superior de la pila. Dup, abreviatura de «duplicate» (duplicar), se utiliza generalmente cuando se debe procesar más de una vez (a menudo para verificación) un elemento ya presente en la pila. En P2PKH, por ejemplo, sirve para duplicar una clave pública que se usa dos veces: primero en OP_EQUALVERIFY y luego en OP_CHECKSIG.",
  visualProps: {
    ...English.visualProps,
    title: "Demostración del OP_Code",
    description: "Duplica el elemento superior de la pila",
    steps: [
      "Obtener el valor (sin sacar) del elemento superior de la pila",
      "Duplicar el elemento (en binario)",
      "Poner el elemento duplicado en la pila",
    ],
  },
};
