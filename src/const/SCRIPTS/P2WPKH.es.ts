import { SCRIPTS_PAGE_PROPS } from "@/comp/scripts/ScriptView";
import English from "./P2WPKH";

export const P2WPKHEs: SCRIPTS_PAGE_PROPS = {
  ...English,
  longHand: "(pago a hash de clave pública del witness)",
  shortDescription:
    "El script SegWit estándar para transferencias directas y el tipo de transacción más común.",
  longDescription: [
    " Un script Pay-to-Witness-Public-Key-Hash (P2WPKH) es el script SegWit estándar para una transacción de transferencia directa. La lógica del witness script P2WPKH y del pubKeyScript de salida es exactamente la misma que la del ScriptSig de entrada y el pubKeyScript de salida en P2PKH. Sin embargo, existe una gran diferencia en los op_codes presentes explícitamente en la transacción cruda. Las carteras/clientes saben que, cuando se detecta una salida P2WPKH, deberán insertar los op_codes habituales de P2PKH; por tanto, un pubKeyScript P2WPKH solo necesita un único elemento específico: un hash de clave pública.",
  ],
  opCodeReview:
    "P2WPKH requiere los mismos tres (3) elementos de datos y cuatro (4) op_codes que P2PKH. Sin embargo, como se ve en el primer paso a continuación, el formato inicial del ScriptPubKey es distinto.",
  inUse: "Sí",
  descriptionText: [
    "Deserializa el witness para obtener la firma y la clave pública",
    "Pone la firma y la clave pública en la pila",
    "Duplica la clave pública",
    "Ejecuta la función HASH160 sobre la clave pública",
    "Pone el hash de la clave pública en la pila",
    "Ejecuta OP_EQUALVERIFY",
    "Ejecuta OP_CHECKSIG",
  ],
};
