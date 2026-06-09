import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_OR as English } from "./OP_OR";

export const OP_OREs: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Aritmética",
  type: "Sacar y Poner",
  shortDescription:
    "Realiza un OR bit a bit entre los dos elementos superiores de la pila.",
  longDescription:
    "OP_OR realiza un OR bit a bit entre los dos elementos superiores de la pila. Saca de la pila estos dos elementos, los interpreta como enteros, efectúa un OR bit a bit sobre su representación binaria y pone el resultado en la pila. Esta operación se utiliza habitualmente en los scripts de Bitcoin para diversas operaciones criptográficas y aritméticas que implican manipulación bit a bit.",
  visualProps: {
    ...English.visualProps,
    title: "Demostración del OP_Code",
    description:
      "Realiza un OR bit a bit entre los dos elementos superiores de la pila.",
    steps: [
      "Sacar de la pila los dos números",
      "Realizar un OR bit a bit sobre los dos números",
      "Poner el resultado en la pila",
    ],
  },
};
