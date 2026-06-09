import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_2SWAP as English } from "./2SWAP";

export const OP_2SWAPEs: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Criptografía",
  type: "Sacar y empujar",
  shortDescription:
    "Intercambia los dos pares de elementos superiores de la pila.",
  longDescription:
    "OP_2SWAP es un opcode de manipulación de pila que intercambia la posición de los dos pares de elementos superiores de la pila. Esta operación es útil cuando se requiere reorganizar los elementos de la pila para la correcta ejecución de las operaciones siguientes, especialmente en scripts complejos.",
  visualProps: {
    ...English.visualProps,
    title: "Demostración del OP_Code",
    description:
      "Intercambia la posición de los dos pares de elementos superiores de la pila.",
    steps: [
      "Saca el primer par de elementos",
      "Saca el segundo par de elementos",
      "Empuja el primer par sacado",
      "Empuja el segundo par sacado",
    ],
  },
};
