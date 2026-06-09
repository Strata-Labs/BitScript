import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_SUB as English } from "./SUB";

export const OP_SUBEs: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Matemáticas",
  type: "Sacar e Insertar",
  shortDescription:
    "Resta el elemento superior de la pila al segundo elemento.",
  longDescription:
    "OP_SUB realiza una resta entre los dos elementos superiores de la pila. Saca esos dos elementos, resta el elemento superior al segundo y pone el resultado en la pila. Este opcode es esencial en los scripts que implican cálculos aritméticos, en particular cuando es necesario calcular diferencias entre valores.",
  visualProps: {
    ...English.visualProps,
    title: "Demostración del OP_Code",
    description:
      "Resta el elemento superior de la pila al segundo elemento.",
    steps: [
      "Sacar el elemento a",
      "Sacar el elemento b",
      "Restar a a b",
      "Poner el resultado en la pila",
    ],
  },
};
