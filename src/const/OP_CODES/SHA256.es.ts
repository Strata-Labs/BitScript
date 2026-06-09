import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_SHA256 as English } from "./SHA256";

export const OP_SHA256Es: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Criptografía",
  type: "Sacar e Insertar",
  shortDescription:
    "La entrada se hashea con el algoritmo de hash SHA256.",
  longDescription:
    "Publicado en 2001, SHA256 — abreviatura de Secure Hash Algorithm — es una de las seis variantes de los algoritmos SHA-2 que produce un hash de 32 bytes (64 caracteres hexadecimales). OP_SHA256 rara vez se utiliza por sí solo; normalmente se invoca a través de las operaciones más comunes OP_HASH160 y OP_HASH256 (presentes en scripts como P2PKH y P2SH).",
  visualProps: {
    ...English.visualProps,
    title: "Demostración del OP_Code",
    description: "Hashea el elemento superior con el algoritmo SHA256.",
    steps: [
      "Sacar el elemento superior",
      "Hashear con el algoritmo SHA256",
      "Poner el elemento hasheado en la pila",
    ],
  },
};
