import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_ROT as English } from "./OP_ROT";

export const OP_ROTEs: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Pila",
  type: "Sacar e Insertar",
  shortDescription:
    "Rota los tres elementos superiores de la pila.",
  longDescription:
    "OP_ROT es un opcode de manipulación de pila que rota el orden de los tres elementos superiores. Saca esos tres elementos de la pila y, a continuación, inserta el tercer elemento, seguido del primero y, por último, del segundo. Esta operación traslada el penúltimo elemento al tope de la pila, desplazando los otros dos hacia abajo. OP_ROT se utiliza habitualmente en los scripts de Bitcoin para reorganizar datos en la pila antes de ejecutar operaciones posteriores.",
  visualProps: {
    ...English.visualProps,
    title: "Demostración del OP_Code",
    description:
      "Rota los tres elementos superiores de la pila.",
    steps: [
      "Sacar los elementos de la pila",
      "Rotar los 3 elementos superiores de la pila",
      "Volver a poner los elementos en la pila",
    ],
  },
};
