import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_NOT as English } from "./NOT";

export const OP_NOTEs: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Matemáticas",
  type: "Sacar y Poner",
  shortDescription: "NOT lógico del elemento superior de la pila.",
  longDescription:
    "OP_NOT invierte el valor booleano del elemento superior de la pila. Si el elemento es distinto de cero, OP_NOT lo reemplaza por 0 (falso); si vale 0, lo reemplaza por 1 (verdadero). Este opcode se utiliza con frecuencia en los scripts que requieren una negación lógica, por ejemplo para invertir condiciones o alternar indicadores booleanos.",
  visualProps: {
    ...English.visualProps,
    title: "Demostración del OP_Code",
    description: "NOT lógico del elemento superior de la pila.",
    steps: [
      "Sacar de la pila el elemento superior",
      "Calcular el NOT lógico del elemento",
      "Poner el elemento en la pila",
    ],
  },
};
