import { SCRIPTS_PAGE_PROPS } from "@/comp/scripts/ScriptView";
import English from "./p2pk";

// Spanish translation of P2PK.
//
// Pattern: spread the English script, then override the fields you've
// translated. Anything you don't override stays English — so you can ship
// a script translation in stages without breaking it.
//
// Keep `shortHand`, `linkPath`, `image`, `exampleLink`, `STACK_DATA`, and
// `codeBlocks` code values identical to the English version so URLs,
// assets, and the animation logic stay stable across locales.

export const P2PKEs: SCRIPTS_PAGE_PROPS = {
  ...English,
  longHand: "(pago a clave pública)",
  shortDescription:
    "El script más sencillo para una transferencia directa. Se necesitan tres op_codes en total.",
  longDescription:
    "Un script Pay-to-Public-Key (P2PK) es el tipo de script de transacción de Bitcoin más simple, que permite enviar bitcoins a una dirección de Bitcoin específica. El script bloquea los bitcoins directamente sobre una clave pública, exigiendo una firma de la clave privada correspondiente para poder gastarlos.",
  opCodeReview:
    "P2PK requiere tres (3) elementos de datos y cuatro (4) op_codes.",
  inUse: "Sí",
  descriptionText: [
    "Pone <signature> en la pila",
    "Pone <pubkey> en la pila",
    "Saca dos elementos (clave pública y firma) de la pila y verifica la firma ECDSA",
  ],
};
