import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_SIZE as English } from "./SIZE";

export const OP_SIZEEs: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Pila",
  type: "Insertar",
  shortDescription:
    "Pone el tamaño del elemento superior de la pila en la pila.",
  longDescription:
    "El opcode OP_SIZE evalúa el tamaño de los datos presentes en el elemento superior de la pila. Pone el tamaño (en bytes) de ese elemento en la pila, pero no retira el elemento original. Resulta especialmente útil en scripts que deben validar o trabajar con datos de tamaños específicos, por ejemplo en ciertos scripts de verificación o en contratos complejos que requieren entradas de una longitud o un formato determinados.",
  visualProps: {
    ...English.visualProps,
    title: "Demostración del OP_Code",
    description:
      "Pone el tamaño del elemento superior de la pila en la pila.",
    steps: [
      "Observar el elemento superior",
      "Calcular el tamaño del elemento",
      "Poner el tamaño del elemento en la pila",
    ],
  },
};
