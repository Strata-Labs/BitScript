import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_MAX as English } from "./MAX";

export const OP_MAXEs: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Matemáticas",
  type: "Sacar y Poner",
  shortDescription:
    "Pone en la pila el mayor de los dos elementos superiores de la pila.",
  longDescription:
    "OP_MAX se utiliza en el lenguaje de script de Bitcoin para comparar dos valores numéricos de la pila. Cuando se ejecuta, saca de la pila los dos elementos superiores, que se esperan como valores numéricos, y evalúa cuál de los dos es mayor. El mayor de estos dos valores se pone de nuevo en la pila. Este opcode es esencial en los scripts donde se toman decisiones a partir de la comparación de valores numéricos, como en ciertos tipos de transacciones condicionales o scripts complejos con múltiples condiciones.",
  visualProps: {
    ...English.visualProps,
    title: "Demostración del OP_Code",
    description:
      "Pone en la pila el mayor de los dos elementos superiores de la pila.",
    steps: [
      "Sacar de la pila el elemento superior",
      "Sacar de la pila el siguiente elemento",
      "Poner en la pila el máximo de los dos elementos",
    ],
  },
};
