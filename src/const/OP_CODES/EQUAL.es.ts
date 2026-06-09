import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_EQUAL as English } from "./EQUAL";

export const OP_EQUALEs: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Lógica",
  type: "Control de script",
  shortDescription:
    "Verifica la equivalencia de los elementos superiores y pone el resultado en la pila (0x00 o 0x01).",
  longDescription:
    "OP_EQUAL es un opcode lógico fundamental del lenguaje de script de Bitcoin. Compara los dos elementos superiores de la pila: los saca y luego los compara. Si son idénticos, OP_EQUAL pone verdadero (1) en la pila; en caso contrario, pone falso (0). Este opcode es esencial para distintos tipos de scripts, incluida la validación de transacciones estándar, donde se utiliza para confirmar que ciertos datos proporcionados (por ejemplo, un hash de clave pública) coinciden con los valores esperados.",
  visualProps: {
    ...English.visualProps,
    title: "Demostración del OP_Code",
    description:
      "Verifica la equivalencia de los elementos superiores y pone el resultado en la pila (0x00 o 0x01).",
    steps: [
      "Sacar el elemento superior",
      "Sacar el elemento superior",
      "Comparar los elementos",
      "Poner el resultado de la comparación en la pila (booleano)",
    ],
  },
};
