import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_RSHIFT as English } from "./RSHIFT";

export const OP_RSHIFTEs: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Aritmética",
  type: "Sacar e Insertar",
  shortDescription:
    "Realiza un desplazamiento a la derecha bit a bit sobre los dos elementos superiores de la pila.",
  longDescription:
    "OP_RSHIFT realiza un desplazamiento a la derecha bit a bit sobre los dos elementos superiores de la pila. Saca esos dos elementos, los interpreta como enteros, ejecuta el shift right y pone el resultado en la pila. La representación binaria del primer elemento se desplaza a la derecha tantos bits como indique el segundo elemento. OP_RSHIFT se utiliza habitualmente en los scripts de Bitcoin para la manipulación a nivel de bits.",
  visualProps: {
    ...English.visualProps,
    title: "Demostración del OP_Code",
    description:
      "Realiza un desplazamiento a la derecha bit a bit sobre los dos elementos superiores de la pila.",
    steps: [
      "Sacar los dos números de la pila",
      "Aplicar el desplazamiento a la derecha bit a bit sobre los dos números",
      "Poner el resultado en la pila",
    ],
  },
};
