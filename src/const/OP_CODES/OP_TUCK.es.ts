import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_TUCK as English } from "./OP_TUCK";

export const OP_TUCKEs: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Pila",
  type: "Sacar e Insertar",
  shortDescription:
    "Duplica el elemento superior de la pila e inserta la copia debajo del penúltimo elemento.",
  longDescription:
    "OP_TUCK es un opcode de manipulación de pila que duplica el elemento superior e inserta la copia debajo del penúltimo elemento. En esencia, coloca una copia del elemento superior bajo el segundo elemento, conservando los elementos originales del tope y del penúltimo lugar. OP_TUCK se utiliza con frecuencia en los scripts de Bitcoin para la manipulación de la pila, permitiendo duplicar y reorganizar ciertos elementos sin alterar su orden original.",
  visualProps: {
    ...English.visualProps,
    title: "Demostración del OP_Code",
    description:
      "Duplica el elemento superior de la pila e inserta la copia debajo del penúltimo elemento.",
    steps: [
      "Sacar los dos elementos superiores de la pila",
      "Duplicar el elemento superior de la pila",
      "Volver a poner los elementos reorganizados en la pila",
    ],
  },
};
