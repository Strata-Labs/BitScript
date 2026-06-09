import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_SWAP as English } from "./SWAP";

export const OP_SWAPEs: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Pila",
  type: "Sacar e Insertar",
  shortDescription: "Intercambia los dos elementos superiores de la pila.",
  longDescription:
    "OP_SWAP es un opcode sencillo de manipulación de pila que intercambia la posición de los dos elementos superiores. Esta operación es esencial en los scripts en los que el orden de los elementos debe modificarse para la correcta ejecución de las operaciones posteriores, por ejemplo en scripts complejos que realizan varias operaciones sobre una serie de elementos de la pila.",
  visualProps: {
    ...English.visualProps,
    title: "Demostración del OP_Code",
    description: "Intercambia los dos elementos superiores de la pila.",
    steps: [
      "Sacar el elemento 1",
      "Sacar el elemento 2",
      "Poner el elemento 2 en la pila",
      "Poner el elemento 1 en la pila",
    ],
  },
};
