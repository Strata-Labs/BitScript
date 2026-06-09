import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_INVERT as English } from "./INVERT";

export const OP_INVERTEs: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Aritmética",
  type: "Sacar y Poner",
  shortDescription:
    "Realiza una inversión bit a bit sobre el elemento superior de la pila.",
  longDescription:
    "OP_INVERT realiza una inversión bit a bit sobre el elemento superior de la pila. Saca el elemento, lo interpreta como un entero, realiza una inversión bit a bit sobre su representación binaria y pone el resultado en la pila. Esta operación se utiliza habitualmente en los scripts de Bitcoin para diversas operaciones criptográficas y aritméticas de manipulación bit a bit.",
  visualProps: {
    ...English.visualProps,
    title: "Demostración del OP_Code",
    description:
      "Realiza una inversión bit a bit sobre el elemento superior de la pila.",
    steps: [
      "Sacar el número que se va a invertir",
      "Realizar la inversión bit a bit",
      "Poner el resultado en la pila",
    ],
  },
};
