import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_BOOLOR as English } from "./BOOLOR";

export const OP_BOOLOREs: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Matemáticas",
  type: "Sacar y empujar",
  shortDescription: "O lógico de los dos elementos superiores de la pila.",
  longDescription:
    "De forma similar a OP_BOOLAND, OP_BOOLOR realiza un O lógico sobre los dos elementos superiores de la pila. Si al menos uno de los elementos es distinto de cero, OP_BOOLOR empuja 1 (verdadero); si ambos valen 0, empuja 0 (falso). Este opcode es útil en scripts que requieren una disyunción lógica, donde basta con que una de las condiciones sea verdadera.",
  visualProps: {
    ...English.visualProps,
    title: "Demostración del OP_Code",
    description: "O lógico de los dos elementos superiores de la pila.",
    steps: [
      "Saca el elemento a",
      "Saca el elemento b",
      "Calcula el O lógico de a y b",
      "Empuja el resultado",
    ],
  },
};
