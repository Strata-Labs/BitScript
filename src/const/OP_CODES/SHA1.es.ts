import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_SHA1 as English } from "./SHA1";

export const OP_SHA1Es: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Criptografía",
  type: "Sacar e Insertar",
  shortDescription:
    "Aplica la función de hash SHA-1 sobre el elemento superior de la pila.",
  longDescription:
    "SHA1, o Secure Hash Algorithm 1, es una función de hash criptográfica que produce un hash de 160 bits (20 bytes), comúnmente representado como un número hexadecimal de 40 dígitos. A pesar de su gran presencia en distintos sistemas, su uso en Bitcoin ha disminuido debido a vulnerabilidades. El opcode OP_SHA1 permite calcular directamente el hash SHA-1 de un dato, pero su uso está desaconsejado en los protocolos modernos de Bitcoin en favor de algoritmos más seguros.",
  visualProps: {
    ...English.visualProps,
    title: "Demostración del OP_Code",
    description:
      "Aplica la función de hash SHA-1 sobre el elemento superior de la pila.",
    steps: [
      "Sacar el elemento superior",
      "Aplicar el hash SHA1",
      "Poner en la pila el elemento con hash",
    ],
  },
};
