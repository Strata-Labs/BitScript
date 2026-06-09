import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_ZERONOTEQUAL as English } from "./0NOTEQUAL";

export const OP_ZERONOTEQUALEs: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Matemáticas",
  type: "Sacar y empujar",
  shortDescription:
    "Verifica si el elemento superior de la pila es distinto de 0.",
  longDescription:
    "OP_0NOTEQUAL verifica si el elemento superior de la pila es distinto de cero. Si el elemento es un valor no nulo, OP_0NOTEQUAL empuja 1 (verdadero) en la pila; en caso contrario, empuja 0 (falso). Este opcode es útil en condiciones donde es necesario comprobar la presencia o ausencia de un valor, sirviendo esencialmente como una verificación de no nulidad.",
  visualProps: {
    ...English.visualProps,
    title: "Demostración del OP_Code",
    description:
      "Verifica si el elemento superior de la pila es distinto de 0.",
    steps: [
      "Saca el elemento superior",
      "Verifica si el elemento es distinto de 0",
      "Empuja el resultado",
    ],
  },
};
