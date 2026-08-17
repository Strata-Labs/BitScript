import { SCRIPTS_PAGE_PROPS } from "@/comp/scripts/ScriptView";
import English from "./p2shMultiSig";

export const P2SHMSEs: SCRIPTS_PAGE_PROPS = {
  ...English,
  longHand: "Pago a hash de script (multifirma)",
  shortDescription:
    "Una salida P2SH con una condición de gasto de multifirma.",
  longDescription:
    "Un script Pay-to-Script-Hash (multifirma) es una salida P2SH que incluye una condición de multifirma en su redeemScript. Este ejemplo usa una configuración de 2 de 3, donde dos de las tres claves públicas indicadas deben aportar firmas válidas para gastar los fondos. Da más seguridad y flexibilidad al manejar fondos compartidos.",
  introduction: "BIP16 (P2SH), BIP11 (transacciones estándar M de N)",
  opCodeReview:
    "P2SH-Multisig combina la estructura de P2SH con OP_CHECKMULTISIG para crear una condición de gasto de multifirma. El redeemScript indica cuántas firmas se requieren y cuáles son las claves públicas, y usa OP_CHECKMULTISIG para la verificación.",
  inUse: "Sí",
  descriptionText: [
    "Pone OP_0 en la pila (por el bug de CHECKMULTISIG)",
    "Pone <signature1> en la pila",
    "Pone <signature2> en la pila",
    "Pone <redeemScript> en la pila",
    "Ejecuta OP_HASH160 sobre redeemScript",
    "Ejecuta OP_EQUAL",
    "Ejecuta OP_CHECKMULTISIG",
  ],
};
