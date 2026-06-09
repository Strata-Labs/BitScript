import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_NUMEQUALVERIFY as English } from "./NUMEQUALVERIFY";

export const OP_NUMEQUALVERIFYEs: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Matemáticas",
  type: "Sacar y Poner",
  shortDescription:
    "Compara los dos elementos superiores para comprobar igualdad; falla si es falso.",
  longDescription:
    "OP_NUMEQUALVERIFY es similar a OP_NUMEQUAL pero con un paso de verificación adicional. Realiza la misma comprobación de igualdad numérica y luego ejecuta un OP_VERIFY, lo que significa que el script solo continúa si la comparación es verdadera. Este opcode se utiliza en los scripts en los que la verificación de igualdad es crucial para los pasos siguientes.",
  visualProps: {
    ...English.visualProps,
    title: "Demostración del OP_Code",
    description:
      "Compara los dos elementos superiores para comprobar igualdad; falla si es falso.",
    steps: [
      "Sacar de la pila el elemento a",
      "Sacar de la pila el elemento b",
      "Verificar si a es igual a b; en caso contrario, el script falla",
    ],
  },
};
