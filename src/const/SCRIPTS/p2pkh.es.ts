import { SCRIPTS_PAGE_PROPS } from "@/comp/scripts/ScriptView";
import { P2PKH as English } from "./p2pkh";

export const P2PKHEs: SCRIPTS_PAGE_PROPS = {
  ...English,
  longHand: "(pago a hash de clave pública)",
  shortDescription:
    "Fue en su momento el script más extendido para transferencias simples y directas. Sigue siendo el formato por defecto previo a SegWit.",
  longDescription:
    "Un script Pay-to-Public-Key-Hash (P2PKH) es un tipo común de script de transacción de Bitcoin que permite enviar bitcoins a una dirección de Bitcoin específica. El script bloquea los bitcoins sobre el hash de una clave pública, exigiendo una firma de la clave privada correspondiente para gastarlos. Al gastarlos, el emisor proporciona un scriptSig que contiene la clave pública y una firma válida.",
  opCodeReview:
    "P2PKH requiere tres (3) elementos de datos y cuatro (4) op_codes. Los tres (3) elementos de datos modificables requeridos se muestran a continuación.",
  inUse: "Sí",
  descriptionText: [
    "Pone <signature> en la pila",
    "Pone <pubkey> en la pila",
    "Duplica el elemento superior de la pila",
    "Aplica el hash al elemento superior de la pila",
    "Pone en la pila el <pubkey> con hash",
    "Verifica que los dos elementos superiores de la pila sean iguales",
    "Saca dos elementos (clave pública y firma) de la pila y verifica la firma ECDSA",
  ],
};
