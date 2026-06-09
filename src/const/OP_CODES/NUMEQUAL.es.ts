import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_NUMEQUAL as English } from "./NUMEQUAL";

export const OP_NUMEQUALEs: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Matemáticas",
  type: "Sacar y Poner",
  shortDescription:
    "Compara los dos elementos superiores de la pila para comprobar igualdad.",
  longDescription:
    "OP_NUMEQUAL compara numéricamente los dos elementos superiores de la pila. Si son iguales, pone en la pila 1 (verdadero); en caso contrario, pone 0 (falso). Este opcode es indispensable en los scripts que requieren una verificación de igualdad entre valores numéricos.",
  visualProps: {
    ...English.visualProps,
    title: "Demostración del OP_Code",
    description:
      "Compara los dos elementos superiores de la pila para comprobar igualdad.",
    steps: [
      "Sacar de la pila el elemento a",
      "Sacar de la pila el elemento b",
      "Verificar si a es igual a b",
      "Poner el resultado en la pila",
    ],
  },
};
