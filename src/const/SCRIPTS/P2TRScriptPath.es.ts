import { SCRIPTS_PAGE_PROPS } from "@/comp/scripts/ScriptView";
import English from "./P2TRScriptPath";

export const P2TRSPEs: SCRIPTS_PAGE_PROPS = {
  ...English,
  longHand: "(pago a taproot - scriptpath)",
  shortDescription:
    "Una salida Taproot gastada por el camino de script, para una transacción compleja.",
  longDescription:
    "Un script Pay-to-TapRoot - ScriptPath es un scriptPubKey de salida P2TR que se desbloqueó por el camino de script. Las salidas P2TR tienen dos caminos: un keypath directo, que se desbloquea con una firma Schnorr, y un árbol de scripts (llamado scriptpath) que necesita muchos más datos para desbloquearse. Abajo hay un ejemplo de este último.",
  introduction: "BIP341",
  opCodeReview:
    "P2TR - ScriptPath requiere los mismos tres (3) datos y cuatro (4) op_codes que P2PKH. Sin embargo, como se ve en el primer paso de abajo, el formato inicial del ScriptPubKey es distinto.",
  inUse: "Sí",
  descriptionText: [
    "Aplica el hash al script y lo vuelve a poner en la cima de la pila",
    "Obtiene la clave de salida o clave taproot a partir de la prueba de Merkle y del hash del script",
    "Compara la clave de salida calculada a partir de la prueba de Merkle y del hash del script con la clave taproot",
    "Ejecuta la operación CheckSig",
  ],
};
