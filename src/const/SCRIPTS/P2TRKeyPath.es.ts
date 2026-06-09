import { SCRIPTS_PAGE_PROPS } from "@/comp/scripts/ScriptView";
import English from "./P2TRKeyPath";

export const P2TRKPEs: SCRIPTS_PAGE_PROPS = {
  ...English,
  longHand: "(pago a Taproot — key path)",
  shortDescription:
    "Una salida Taproot gastada mediante el key path para una transferencia simple y directa (presumiblemente)",
  longDescription:
    "Un script Pay-to-Taproot - KeyPath es un scriptPubKey de salida P2TR desbloqueado mediante el key path. Las salidas P2TR ofrecen tanto un key path directo, desbloqueable con una firma Schnorr, como un árbol de scripts (llamado script path) que requiere muchos más datos para ser desbloqueado. A continuación, un ejemplo del primer caso.",
  opCodeReview:
    "P2TR - KeyPath solo requiere dos (2) elementos de datos y cuatro (4) op_codes, al igual que P2PKH. Sin embargo, como se ve en el primer paso a continuación, el formato inicial del ScriptPubKey es distinto.",
  inUse: "Sí",
  descriptionText: [
    "Deserializa el lock script para obtener la clave Taproot",
    "Ejecuta OP_CHECKSIG",
  ],
};
