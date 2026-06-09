import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import English from "./CHECKMULTISIG";

export const OP_CHECKMULTISIGEs: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Criptografía",
  type: "Sacar y empujar",
  shortDescription:
    "Verifica varias firmas frente a varias claves públicas.",
  longDescription:
    "Como extensión de CheckSig, CheckMultiSig permite transacciones multifirma; como su nombre sugiere, este sigop es la base de las wallets multifirma. El opcode opera en modo m-de-n, donde «m» es el número mínimo de firmas correctas necesarias para la validación y «n» es el número de claves públicas proporcionadas. Si m firmas entre las n claves públicas son correctas, devuelve verdadero (1); en caso contrario, devuelve falso (0). Se permite un máximo de 20 (n) claves públicas para este opcode.",
  visualProps: {
    ...English.visualProps,
    title: "Demostración del OP_Code",
    description:
      "Verifica varias firmas frente a varias claves públicas.",
    steps: [
      "Saca el elemento superior (número de claves: n)",
      "Saca los siguientes n elementos",
      "Saca el elemento superior (número de firmas: m)",
      "Saca los siguientes m elementos",
      "Verifica n firmas entre m",
      "Empuja el resultado de la verificación (0 o 1)",
    ],
  },
};
