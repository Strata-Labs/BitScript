import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_MIN as English } from "./MIN";

export const OP_MINEs: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Matemáticas",
  type: "Sacar y Poner",
  shortDescription:
    "Pone en la pila el menor de los dos elementos superiores de la pila.",
  longDescription:
    "OP_MIN cumple una función similar a OP_MAX pero de manera inversa. Evalúa los dos valores numéricos del tope de la pila, los saca para compararlos y luego pone en la pila el menor de los dos. Esta operación es particularmente útil en los scripts que deben determinar umbrales mínimos, por ejemplo para imponer un monto mínimo de pago o cualquier otra lógica condicional basada en valores numéricos.",
  visualProps: {
    ...English.visualProps,
    title: "Demostración del OP_Code",
    description:
      "Pone en la pila el menor de los dos elementos superiores de la pila.",
    steps: [
      "Sacar de la pila el elemento superior",
      "Sacar de la pila el siguiente elemento",
      "Poner en la pila el mínimo de los dos elementos",
    ],
  },
};
