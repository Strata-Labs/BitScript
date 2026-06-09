import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_PICK as English } from "./OP_PICK";

export const OP_PICKEs: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Pila",
  type: "Sacar y Poner",
  shortDescription:
    "Duplica el n-ésimo elemento desde el tope de la pila y pone la copia en el tope.",
  longDescription:
    "OP_PICK es un opcode selectivo de manipulación de pila que duplica el n-ésimo elemento desde el tope de la pila y pone la copia en el tope. El índice n se toma del tope de la pila, comenzando en 1, donde 1 corresponde al elemento superior. Tras la duplicación, los elementos originales permanecen sin cambios en la pila.",
  visualProps: {
    ...English.visualProps,
    title: "Demostración del OP_Code",
    description:
      "Duplica el n-ésimo elemento desde el tope de la pila y pone la copia en el tope.",
    steps: [
      "Sacar de la pila todos los elementos",
      "Encontrar el valor del (n + 1)-ésimo elemento, donde n = 2",
      "Copiar el n-ésimo elemento de la pila",
      "Recuperar el n-ésimo elemento",
      "Volver a poner los elementos en la pila con el n-ésimo primero",
    ],
  },
};
