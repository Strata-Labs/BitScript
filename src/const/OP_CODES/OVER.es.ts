import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_OVER as English } from "./OVER";

export const OP_OVEREs: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Pila",
  type: "Sacar e Insertar",
  shortDescription: "Copia el penúltimo elemento de la pila al tope.",
  longDescription:
    "El opcode OP_OVER duplica el penúltimo elemento de la pila y coloca la copia en el tope. Se utiliza con frecuencia en scripts que necesitan reutilizar un valor previo conservando el orden original, por ejemplo en scripts que realizan cálculos o comparaciones repetidas sobre un mismo elemento.",
  visualProps: {
    ...English.visualProps,
    title: "Demostración del OP_Code",
    description: "Copia el penúltimo elemento de la pila al tope.",
    steps: [
      "Sacar el elemento 1",
      "Sacar el elemento 2",
      "Poner el elemento 2 en la pila",
      "Poner el elemento 1 en la pila",
      "Poner el elemento 2 en la pila",
    ],
  },
};
