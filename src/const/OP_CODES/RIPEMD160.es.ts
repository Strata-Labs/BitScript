import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_RIPEMD160 as English } from "./RIPEMD160";

export const OP_RIPEMD160Es: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Criptografía",
  type: "Sacar e Insertar",
  shortDescription:
    "La entrada se hashea con el algoritmo de hash RIPEMD160.",
  longDescription:
    "Publicado en 1996, RIPEMD160 — abreviatura de RIPE Message Digest — es una de las cinco variantes de los algoritmos de hash RIPEMD que produce un hash de 20 bytes (40 caracteres hexadecimales). Se incluye como op_code independiente, aunque OP_RIPEMD160 rara vez, o casi nunca, se utiliza directamente en los scripts habituales. Sin embargo, RIPEMD160 en sí se utiliza ampliamente a través de las operaciones más populares OP_HASH160 y OP_HASH256.",
  visualProps: {
    ...English.visualProps,
    title: "Demostración del OP_Code",
    description: "Hashea el elemento superior con el algoritmo RIPEMD160.",
    steps: [
      "Sacar el elemento superior",
      "Hashear con el algoritmo RIPEMD160",
      "Poner el elemento hasheado en la pila",
    ],
  },
};
