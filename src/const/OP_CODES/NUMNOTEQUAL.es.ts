import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_NUMNOTEQUAL as English } from "./NUMNOTEQUAL";

export const OP_NUMNOTEQUALEs: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Matemáticas",
  type: "Sacar y Poner",
  shortDescription:
    "Compara los dos elementos superiores de la pila para comprobar desigualdad.",
  longDescription:
    "Inverso de OP_NUMEQUAL, OP_NUMNOTEQUAL verifica si los dos elementos superiores de la pila son numéricamente distintos. Pone en la pila 1 (verdadero) si son distintos, y 0 (falso) si son iguales. Este opcode se utiliza en las condiciones donde la desigualdad es un factor clave de la lógica del script.",
  visualProps: {
    ...English.visualProps,
    title: "Demostración del OP_Code",
    description:
      "Compara los dos elementos superiores de la pila para comprobar desigualdad.",
    steps: [
      "Sacar de la pila el elemento a",
      "Sacar de la pila el elemento b",
      "Verificar si a es distinto de b",
      "Poner el resultado en la pila",
    ],
  },
};
