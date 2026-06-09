import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_DIV as English } from "./OP_DIV";

export const OP_DIVEs: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Aritmética",
  type: "Sacar y Poner",
  shortDescription:
    "Realiza una división entre los dos elementos superiores de la pila.",
  longDescription:
    "OP_DIV realiza una división entre los dos elementos superiores de la pila. Saca de la pila estos dos elementos, los interpreta como enteros, efectúa la división y pone el resultado en la pila. Esta operación se utiliza habitualmente en los scripts de Bitcoin para diversas operaciones aritméticas.",
  visualProps: {
    ...English.visualProps,
    title: "Demostración del OP_Code",
    description:
      "Realiza una división entre los dos elementos superiores de la pila.",
    steps: [
      "Sacar de la pila los dos números",
      "Realizar una división entre los dos números",
      "Poner el resultado en la pila",
    ],
  },
};
