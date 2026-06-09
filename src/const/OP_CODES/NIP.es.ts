import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_NIP as English } from "./NIP";

export const OP_NIPEs: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Pila",
  type: "Sacar y Poner",
  shortDescription: "Elimina el penúltimo elemento de la pila.",
  longDescription:
    "OP_NIP es un opcode selectivo de manipulación de pila que elimina el penúltimo elemento de la pila, dejando intacto el elemento superior. Resulta útil cuando un script debe descartar un cálculo intermedio o un valor que ya no es necesario para las operaciones siguientes, lo que simplifica la ejecución del script.",
  visualProps: {
    ...English.visualProps,
    title: "Demostración del OP_Code",
    description: "Elimina el penúltimo elemento de la pila.",
    steps: [
      "Sacar de la pila el elemento 1",
      "Sacar de la pila el elemento 2",
      "Poner en la pila el elemento 1",
    ],
  },
};
