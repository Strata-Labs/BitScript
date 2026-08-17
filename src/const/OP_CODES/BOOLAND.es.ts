import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_BOOLAND as English } from "./BOOLAND";

export const OP_BOOLANDEs: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Matemáticas",
  type: "Sacar y empujar",
  shortDescription: "Y lógico de los dos elementos superiores de la pila.",
  longDescription:
    "OP_BOOLAND es una operación lógica que toma los dos elementos superiores de la pila y realiza un Y lógico. Si ambos elementos son distintos de cero, empuja 1 (verdadero); en caso contrario, empuja 0 (falso). Este opcode se utiliza en scripts que requieren una conjunción lógica entre dos condiciones.",
  visualProps: {
    ...English.visualProps,
    title: "Demostración del OP_Code",
    description: "Y lógico de los dos elementos superiores de la pila.",
    steps: [
      "Saca el elemento a",
      "Saca el elemento b",
      "Calcula el Y lógico de a y b",
      "Empuja el resultado",
    ],
  },
};
