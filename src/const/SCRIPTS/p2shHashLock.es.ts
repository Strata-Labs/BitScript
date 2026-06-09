import { SCRIPTS_PAGE_PROPS } from "@/comp/scripts/ScriptView";
import English from "./p2shHashLock";

export const P2SHHLEs: SCRIPTS_PAGE_PROPS = {
  ...English,
  longHand: "Pago a hash de script (HashLock)",
  shortDescription:
    "Una salida P2SH con una condición de hashlock para el gasto",
  longDescription:
    "Un script Pay-to-Script-Hash (HashLock) es una salida P2SH que incluye una condición basada en un hash dentro de su redeemScript. Los fondos solo pueden gastarse proporcionando un valor secreto cuyo hash coincida con un hash predefinido. Esta construcción se utiliza habitualmente en los atomic swaps y en otros protocolos criptográficos.",
  opCodeReview:
    "P2SH-HashLock combina la estructura P2SH con un paso de verificación de hash. El redeemScript aplica el hash al secreto proporcionado, lo compara con un hash predefinido y, a continuación, verifica una firma.",
  inUse: "Sí",
  descriptionText: [
    "Pone <signature> en la pila",
    "Pone <secret> en la pila",
    "Pone <redeemScript> en la pila",
    "Ejecuta OP_HASH160 sobre redeemScript",
    "Ejecuta OP_EQUAL",
    "Ejecuta OP_HASH160 sobre el secreto",
    "Ejecuta OP_EQUAL",
    "Pone <publicKey> en la pila",
    "Ejecuta OP_CHECKSIG",
  ],
};
