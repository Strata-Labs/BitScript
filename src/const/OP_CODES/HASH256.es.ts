import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_HASH256 as English } from "./HASH256";

export const OP_HASH256Es: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Criptografía",
  type: "Sacar y Poner",
  shortDescription:
    "Aplica dos veces el algoritmo SHA-256 al elemento superior de la pila.",
  longDescription:
    "La operación OP_HASH256 representa un doble hash específico con el algoritmo SHA-256. Toma una entrada, le aplica un primer hash con SHA-256 y luego vuelve a aplicar SHA-256 al resultado. Este doble hash es una característica del protocolo Bitcoin, utilizada especialmente para la creación de los hashes de bloque y los identificadores de transacción.",
  visualProps: {
    ...English.visualProps,
    title: "Demostración del OP_Code",
    description:
      "Aplica un doble hash al elemento superior de la pila con el algoritmo SHA256.",
    steps: [
      "Sacar el elemento superior",
      "Aplicar un primer hash SHA256",
      "Aplicar un segundo hash SHA256",
      "Poner el elemento doblemente hasheado en la pila",
    ],
  },
};
