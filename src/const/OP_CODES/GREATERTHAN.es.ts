import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_GREATERTHAN as English } from "./GREATERTHAN";

export const OP_GREATERTHANEs: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Matemáticas",
  type: "Sacar y Poner",
  shortDescription:
    "Devuelve 0x01 si el elemento 1 es estrictamente mayor que el elemento 2; en caso contrario, 0x00.",
  longDescription:
    "Opuesto a OP_LESSTHAN, OP_GREATERTHAN verifica si el penúltimo elemento de la pila es estrictamente mayor que el elemento superior. Pone 1 (verdadero) en la pila si es así, y 0 (falso) en caso contrario. Este opcode es esencial en scripts que requieren comparaciones de tipo «estrictamente mayor».",
  visualProps: {
    ...English.visualProps,
    title: "Demostración del OP_Code",
    description:
      "Devuelve 0x01 si el elemento 1 es estrictamente mayor que el elemento 2; en caso contrario, 0x00.",
    steps: [
      "Sacar el elemento a",
      "Sacar el elemento b",
      "Verificar si b es estrictamente mayor que a",
      "Poner el resultado en la pila",
    ],
  },
};
