import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_CHECKSIGADD as English } from "./CHECK_SIG_ADD";

export const OP_CHECKSIGADDEs: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Criptografía",
  type: "Sacar y Poner",
  shortDescription:
    "Verifica una firma con una clave pública e incrementa el resultado en 1 si tiene éxito.",
  longDescription:
    "La operación OP_CHECKSIGADD verifica una firma frente a una clave pública e incrementa el resultado en 1 si tiene éxito. Sigue el funcionamiento de OP_CHECKSIG, que normalmente saca tres elementos de la pila: la firma, la clave pública y los datos originales. Si la verificación de la firma es exitosa, OP_CHECKSIGADD pone el resultado de verificación incrementado en la pila; en caso contrario, pone 0.",
  visualProps: {
    ...English.visualProps,
    title: "Demostración del OP_Code",
    description:
      "Verifica una firma con una clave pública e incrementa el resultado en 1 si tiene éxito.",
    steps: [
      "Sacar la clave pública",
      "Sacar la firma",
      "Aplicar OP_CHECKSIGADD",
      "Añadir el resultado al valor inicial",
      "Poner el resultado de verificación incrementado en la pila",
    ],
  },
};
