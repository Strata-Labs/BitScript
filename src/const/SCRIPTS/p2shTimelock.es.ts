import { SCRIPTS_PAGE_PROPS } from "@/comp/scripts/ScriptView";
import English from "./p2shTimelock";

export const P2SHTLEs: SCRIPTS_PAGE_PROPS = {
  ...English,
  longHand: "Pago a hash de script (Timelock)",
  shortDescription:
    "Una salida P2SH con una condición de timelock para el gasto",
  longDescription:
    "Un script Pay-to-Script-Hash (TimeLock) es una salida P2SH que incluye una condición temporal en su redeemScript. Utiliza el opcode OP_CHECKLOCKTIMEVERIFY (CLTV), también conocido como timelock absoluto, para imponer que una salida de transacción no gastada (UTXO) permanezca no gastable hasta una altura de bloque o timestamp determinados. El redeemScript en P2SH(Timelock) incluye esta condición temporal: los valores inferiores a 500.000.000 representan alturas de bloque y los valores superiores representan timestamps Unix.",
  opCodeReview:
    "P2SH-TimeLock combina la estructura P2SH con OP_CHECKLOCKTIMEVERIFY para crear una condición de gasto limitada en el tiempo. El redeemScript incluye el timelock, una clave pública y la verificación de la firma.",
  inUse: "Sí",
  descriptionText: [
    "Pone <signature> en la pila",
    "Pone <redeemScript> en la pila",
    "Ejecuta OP_HASH160 sobre redeemScript",
    "Ejecuta OP_EQUAL",
    "Si es verdadero, ejecuta redeemScript",
    "Ejecuta OP_CHECKLOCKTIMEVERIFY",
    "Pone <publicKey> en la pila",
    "Ejecuta OP_CHECKSIG",
  ],
};
