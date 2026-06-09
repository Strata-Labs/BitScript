import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_LESSTHANOREQUAL as English } from "./LESSTHANOREQUAL";

export const OP_LESSTHANOREQUALEs: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Matemáticas",
  type: "Sacar y Poner",
  shortDescription:
    "Devuelve 1 si el elemento 1 es menor o igual que el elemento 2; en caso contrario, 0.",
  longDescription:
    "OP_LESSTHANOREQUAL compara los dos elementos superiores de la pila y verifica si el penúltimo es menor o igual que el elemento superior. Pone 1 (verdadero) en la pila si se cumple esta condición, y 0 (falso) en caso contrario. Este opcode se utiliza en scripts que requieren una comparación de tipo «menor o igual».",
  visualProps: {
    ...English.visualProps,
    title: "Demostración del OP_Code",
    description:
      "Devuelve 1 si el elemento 1 es menor o igual que el elemento 2; en caso contrario, 0.",
    steps: [
      "Sacar el elemento a",
      "Sacar el elemento b",
      "Verificar si b es menor o igual que a",
      "Poner el resultado en la pila",
    ],
  },
};
