import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_NEGATE as English } from "./NEGATE";

export const OP_NEGATEEs: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Matemáticas",
  type: "Sacar y Poner",
  shortDescription: "Invierte el signo del elemento superior de la pila.",
  longDescription:
    "OP_NEGATE cambia el signo del elemento numérico del tope de la pila. Los números positivos se vuelven negativos y viceversa. Este opcode es particularmente útil en los scripts que requieren la inversión de valores, por ejemplo durante operaciones financieras que implican reembolsos o anulaciones.",
  visualProps: {
    ...English.visualProps,
    title: "Demostración del OP_Code",
    description: "Invierte el signo del elemento superior de la pila.",
    steps: [
      "Sacar de la pila el elemento superior",
      "Multiplicar el elemento por -1",
      "Poner el elemento en la pila",
    ],
  },
};
