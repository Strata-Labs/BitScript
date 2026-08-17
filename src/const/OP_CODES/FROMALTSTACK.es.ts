import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_FROMALTSTACK as English } from "./FROMALTSTACK";

export const OP_FROMALTSTACKEs: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Pila",
  type: "Sacar y Poner",
  shortDescription:
    "Mueve el elemento superior de la pila alternativa a la pila principal.",
  longDescription:
    "OP_FROMALTSTACK transfiere el elemento superior de la pila alternativa a la pila principal. Este opcode es útil en scripts que requieren un almacenamiento temporal de elementos. Al utilizar la pila alternativa, el script puede gestionar y recuperar datos sin alterar el flujo de operaciones en la pila principal.",
  visualProps: {
    ...English.visualProps,
    title: "Demostración del OP_Code",
    description:
      "Mueve el elemento superior de la pila alternativa a la pila principal.",
    steps: [
      "Sacar el elemento superior de la pila alternativa",
      "Poner el elemento en la pila principal",
    ],
  },
};
