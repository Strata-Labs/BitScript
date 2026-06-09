import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_TOALTSTACK as English } from "./TO_ALTSTACK";

export const OP_TOALTSTACKEs: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Pila",
  type: "Sacar e Insertar",
  shortDescription:
    "Mueve el elemento superior de la pila principal a la pila alternativa.",
  longDescription:
    "OP_TOALTSTACK transfiere el elemento superior de la pila principal a la pila alternativa. Este opcode resulta útil en los scripts que requieren almacenamiento temporal de elementos. Mediante el uso de la pila alternativa, el script puede gestionar y recuperar datos sin perturbar el flujo de operaciones en la pila principal.",
  visualProps: {
    ...English.visualProps,
    title: "Demostración del OP_Code",
    description:
      "Mueve el elemento superior de la pila principal a la pila alternativa.",
    steps: [
      "Sacar el elemento superior de la pila principal",
      "Poner el elemento en la pila alternativa",
    ],
  },
};
