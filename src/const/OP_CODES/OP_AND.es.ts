import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_AND as English } from "./OP_AND";

export const OP_ANDEs: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Aritmética",
  type: "Sacar y Poner",
  shortDescription:
    "Realiza un AND bit a bit entre los dos elementos superiores de la pila.",
  longDescription:
    "OP_AND realiza un AND bit a bit entre los dos elementos superiores de la pila. Saca de la pila estos dos elementos, los interpreta como enteros, efectúa un AND bit a bit sobre su representación binaria y pone el resultado en la pila. Esta operación se utiliza habitualmente en los scripts de Bitcoin para diversas operaciones criptográficas y aritméticas que implican manipulación bit a bit.",
  visualProps: {
    ...English.visualProps,
    title: "Demostración del OP_Code",
    description:
      "Realiza un AND bit a bit entre los dos elementos superiores de la pila.",
    steps: [
      "Sacar de la pila los dos números",
      "Realizar un AND bit a bit sobre los dos números",
      "Poner el resultado en la pila",
    ],
  },
};
