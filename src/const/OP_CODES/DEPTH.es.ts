import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_DEPTH as English } from "./DEPTH";

export const OP_DEPTHEs: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Pila",
  type: "Pila",
  shortDescription: "Pone la profundidad de la pila en la pila.",
  longDescription:
    "Al tratarse de un lenguaje basado en pila, siempre resulta útil capturar el estado actual de la pila. El opcode OP_DEPTH cuenta con precisión todos los elementos presentes en la pila (sin sacar ninguno) y pone ese valor en la pila (en hexadecimal). Aunque no se utiliza en los scripts más habituales, op_depth puede ser útil en un escenario multisig donde se necesita un conteo para verificar el número de firmas m-de-n.",
  visualProps: {
    ...English.visualProps,
    title: "Demostración del OP_Code",
    description: "Pone la profundidad de la pila en la pila.",
    steps: [
      "Contar los elementos presentes en la pila (cuántos elementos)",
      "Poner el resultado del conteo en la pila.",
    ],
  },
};
