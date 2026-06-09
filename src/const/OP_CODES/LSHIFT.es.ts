import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_LSHIFT as English } from "./LSHIFT";

export const OP_LSHIFTEs: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Aritmética",
  type: "Sacar y Poner",
  shortDescription:
    "Realiza un desplazamiento a la izquierda bit a bit sobre los dos elementos superiores de la pila.",
  longDescription:
    "OP_LSHIFT realiza un desplazamiento a la izquierda bit a bit sobre los dos elementos superiores de la pila. Saca esos dos elementos, los interpreta como enteros, realiza el desplazamiento a la izquierda y luego pone el resultado en la pila. La representación binaria del primer elemento se desplaza hacia la izquierda el número de bits indicado por el segundo elemento. OP_LSHIFT se utiliza habitualmente en los scripts de Bitcoin para la manipulación bit a bit.",
  visualProps: {
    ...English.visualProps,
    title: "Demostración del OP_Code",
    description:
      "Realiza un desplazamiento a la izquierda bit a bit sobre los dos elementos superiores de la pila.",
    steps: [
      "Sacar los dos números de la pila",
      "Realizar un desplazamiento a la izquierda bit a bit sobre los dos números",
      "Poner el resultado en la pila",
    ],
  },
};
