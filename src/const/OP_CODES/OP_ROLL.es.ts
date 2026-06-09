import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_ROLL as English } from "./OP_ROLL";

export const OP_ROLLEs: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Pila",
  type: "Sacar y Poner",
  shortDescription:
    "Mueve el n-ésimo elemento de la pila a la posición superior.",
  longDescription:
    "OP_ROLL es un opcode de manipulación de pila que mueve el n-ésimo elemento de la pila al tope. El índice «n» se toma del tope de la pila, comenzando en 1, donde 1 corresponde al elemento superior. Tras la operación, el orden original se conserva y el elemento desplazado se convierte en el nuevo elemento del tope.",
  visualProps: {
    ...English.visualProps,
    title: "Demostración del OP_Code",
    description: "Elimina el penúltimo elemento de la pila.",
    steps: [
      "Sacar de la pila el primer elemento",
      "Encontrar el valor del (n + 1)-ésimo elemento, donde n = 2",
      "Sacar de la pila hasta llegar al n-ésimo elemento",
      "Recuperar el n-ésimo elemento",
      "Volver a poner los elementos en la pila con el n-ésimo primero",
    ],
  },
};
