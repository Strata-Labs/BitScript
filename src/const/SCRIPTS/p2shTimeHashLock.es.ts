import { SCRIPTS_PAGE_PROPS } from "@/comp/scripts/ScriptView";
import English from "./p2shTimeHashLock";

export const P2SHTHLEs: SCRIPTS_PAGE_PROPS = {
  ...English,
  longHand: "Pago a hash de script (TimeHashLock)",
  shortDescription:
    "Una salida P2SH con condiciones de gasto basadas en tiempo y en hash.",
  longDescription:
    "Un script Pay-to-Script-Hash (TimeHashLock) es una salida P2SH que incluye en su redeemScript condiciones basadas en tiempo y en hash. Este script permite dos caminos de gasto: uno que se puede usar de inmediato si se conoce un secreto (hashlock) y otro que solo se puede usar cuando pasó cierto tiempo (timelock). Es un tipo de script habitual en los atomic swaps y en otros protocolos complejos.",
  introduction: "BIP16 (P2SH), BIP65 (CLTV)",
  opCodeReview:
    "P2SH-TimeHashLock combina la estructura de P2SH con OP_CHECKLOCKTIMEVERIFY y con un paso de verificación de hash. El redeemScript usa OP_IF/OP_ELSE para ofrecer dos caminos de gasto, uno con hashlock y otro con timelock.",
  inUse: "Sí",
  descriptionText: [
    "Pone <signature> en la pila",
    "Pone <1 o 0> en la pila (para OP_IF)",
    "Si es 1, pone <secret> en la pila",
    "Pone <redeemScript> en la pila",
    "Ejecuta OP_HASH160 sobre redeemScript",
    "Ejecuta OP_EQUAL",
    "Camino de hashlock, es decir si hay un 1: ejecuta OP_HASH160 sobre el secreto",
    "Camino de hashlock: pone <hashOfSecret> y ejecuta OP_EQUAL",
    "Pone <publicKey> en la pila",
    "Ejecuta OP_CHECKSIG",
    "Camino de timelock, es decir si hay un 0: ejecuta OP_HASH160 sobre redeemScript",
    "Ejecuta OP_EQUAL",
    "Si es verdadero, ejecuta redeemScript",
    "Ejecuta OP_CHECKLOCKTIMEVERIFY",
    "Pone <publicKey> en la pila",
    "Ejecuta OP_CHECKSIG",
    "Pone <timelock> y ejecuta OP_CHECKLOCKTIMEVERIFY",
  ],
};
