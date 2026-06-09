import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_MUL as English } from "./OP_MUL";

export const OP_MULEs: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Aritmética",
  type: "Sacar y Poner",
  shortDescription:
    "Realiza una multiplicación entre los dos elementos superiores de la pila.",
  longDescription:
    "OP_MUL realiza una multiplicación entre los dos elementos superiores de la pila. Saca de la pila estos dos elementos, los interpreta como enteros, efectúa la multiplicación y pone el resultado en la pila. Esta operación se utiliza habitualmente en los scripts de Bitcoin para diversas operaciones aritméticas.",
  visualProps: {
    ...English.visualProps,
    title: "Demostración del OP_Code",
    description:
      "Realiza una multiplicación entre los dos elementos superiores de la pila.",
    steps: [
      "Sacar de la pila los dos números",
      "Realizar una multiplicación entre los dos números",
      "Poner el resultado en la pila",
    ],
  },
};
