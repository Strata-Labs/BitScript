import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_ADD as English } from "./ADD";

export const OP_ADDEs: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Matemáticas",
  type: "Sacar y empujar",
  shortDescription:
    "Suma los dos elementos superiores de la pila y empuja el resultado.",
  longDescription:
    "Operación aritmética común presente en cualquier lenguaje de programación, OP_ADD funciona exactamente como cabe esperar. Requiere como mínimo dos entradas; de lo contrario falla. Aunque resulta práctico, ninguno de los scripts habituales utiliza op_add en sus transacciones.",
  visualProps: {
    ...English.visualProps,
    title: "Demostración del OP_Code",
    description:
      "Suma los dos elementos superiores de la pila y empuja el resultado.",
    steps: [
      "Saca el elemento superior",
      "Saca el elemento superior",
      "Suma los dos elementos para crear uno nuevo",
      "Empuja el nuevo elemento",
    ],
  },
};
