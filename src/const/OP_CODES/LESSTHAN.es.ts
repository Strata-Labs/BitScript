import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_LESSTHAN as English } from "./LESSTHAN";

export const OP_LESSTHANEs: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Matemáticas",
  type: "Sacar y Poner",
  shortDescription:
    "Devuelve 0x01 si el elemento 1 es estrictamente menor que el elemento 2; en caso contrario, 0x00.",
  longDescription:
    "OP_LESSTHAN compara los dos elementos superiores de la pila y verifica si el penúltimo es estrictamente menor que el elemento superior. Si es así, pone 1 (verdadero) en la pila; en caso contrario, pone 0 (falso). Este opcode se utiliza en scripts que requieren una comparación de tipo «estrictamente menor» entre valores numéricos.",
  visualProps: {
    ...English.visualProps,
    title: "Demostración del OP_Code",
    description:
      "Devuelve 0x01 si el elemento 1 es estrictamente menor que el elemento 2; en caso contrario, 0x00.",
    steps: [
      "Sacar el elemento a",
      "Sacar el elemento b",
      "Verificar si b es estrictamente menor que a",
      "Poner el resultado en la pila",
    ],
  },
};
