import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_ONEADD as English } from "./1ADD";

export const OP_ONEADDEs: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Matemáticas",
  type: "Sacar y empujar",
  shortDescription: "Incrementa en 1 el elemento superior de la pila.",
  longDescription:
    "OP_1ADD es un opcode aritmético simple que añade 1 al elemento superior de la pila. Este opcode se utiliza típicamente en scripts que requieren incrementos o contadores, por ejemplo en estructuras de pseudo-bucle o cuando un valor debe ajustarse en una unidad.",
  visualProps: {
    ...English.visualProps,
    title: "Demostración del OP_Code",
    description: "Incrementa en 1 el elemento superior de la pila.",
    steps: [
      "Saca el elemento superior",
      "Añade 1 al elemento",
      "Empuja el elemento",
    ],
  },
};
