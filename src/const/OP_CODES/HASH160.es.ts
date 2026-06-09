import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_HASH160 as English } from "./HASH160";

export const OP_HASH160Es: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Criptografía",
  type: "Sacar y Poner",
  shortDescription:
    "Aplica un hash al elemento superior de la pila usando los algoritmos SHA-256 y luego RIPEMD-160.",
  longDescription:
    "¿Ya has utilizado P2PKH o P2SH? Entonces has invocado directamente OP_HASH160, una de las operaciones criptográficas de Bitcoin más habituales. Como su nombre indica, es un algoritmo de hash; pero, a diferencia de lo que sugiere el nombre, en realidad se trata de dos algoritmos de hash independientes aplicados de forma secuencial, que producen un hash de 20 bytes (40 caracteres hexadecimales). OP_HASH160 aplica primero al elemento un hash con SHA256 y luego con RIPEMD160.",
  visualProps: {
    ...English.visualProps,
    title: "Demostración del OP_Code",
    description:
      "Aplica un hash al elemento superior de la pila usando los algoritmos SHA-256 y luego RIPEMD-160.",
    steps: [
      "Sacar el elemento superior",
      "Aplicar Hash160 (sha256 y luego ripemd160)",
      "Poner el resultado en la pila",
    ],
  },
};
