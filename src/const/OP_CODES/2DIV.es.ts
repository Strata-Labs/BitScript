import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_2DIV as English } from "./2DIV";

export const OP_2DIVEs: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Aritmética",
  type: "Sacar y empujar",
  shortDescription: "Divide entre 2 el elemento superior de la pila.",
  longDescription:
    "OP_2DIV divide entre 2 el elemento superior de la pila. Saca dicho elemento, lo interpreta como un entero, lo divide entre 2 y empuja el resultado. Esta operación se utiliza comúnmente en scripts de Bitcoin para diversas operaciones aritméticas.",
  visualProps: {
    ...English.visualProps,
    title: "Demostración del OP_Code",
    description: "Divide entre 2 el elemento superior de la pila.",
    steps: [
      "Saca el número de la pila",
      "Divide el número entre 2",
      "Empuja el resultado",
    ],
  },
};
