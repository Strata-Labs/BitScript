import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_ONESUB as English } from "./1SUB";

export const OP_ONESUBEs: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Matemáticas",
  type: "Sacar y empujar",
  shortDescription: "Decrementa en 1 el elemento superior de la pila.",
  longDescription:
    "Contraparte de OP_1ADD, OP_1SUB resta 1 al elemento superior de la pila. Este opcode resulta útil en scripts que necesitan decrementar valores, por ejemplo en cuentas regresivas, bucles decrecientes o para ajustar un valor en una sola unidad hacia abajo.",
  visualProps: {
    ...English.visualProps,
    title: "Demostración del OP_Code",
    description: "Decrementa en 1 el elemento superior de la pila.",
    steps: [
      "Saca el elemento superior",
      "Resta 1 al elemento",
      "Empuja el elemento",
    ],
  },
};
