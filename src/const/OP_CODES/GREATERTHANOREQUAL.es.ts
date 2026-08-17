import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_GREATERTHANOREQUAL as English } from "./GREATERTHANOREQUAL";

export const OP_GREATERTHANOREQUALEs: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Matemáticas",
  type: "Sacar y Poner",
  shortDescription:
    "Devuelve 1 si el elemento 1 es mayor o igual que el elemento 2; en caso contrario, 0.",
  longDescription:
    "OP_GREATERTHANOREQUAL realiza una comparación similar a OP_LESSTHANOREQUAL pero en sentido opuesto. Verifica si el penúltimo elemento es mayor o igual que el elemento superior, poniendo 1 (verdadero) en la pila si es así, y 0 (falso) en caso contrario. Este opcode se utiliza en scripts que requieren una comparación de tipo «mayor o igual».",
  visualProps: {
    ...English.visualProps,
    title: "Demostración del OP_Code",
    description:
      "Devuelve 1 si el elemento 1 es mayor o igual que el elemento 2; en caso contrario, 0.",
    steps: [
      "Sacar el elemento a",
      "Sacar el elemento b",
      "Verificar si b es mayor o igual que a",
      "Poner el resultado en la pila",
    ],
  },
};
