import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_CHECKSIG as English } from "./CHECKSIG";

export const OP_CHECKSIGEs: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Criptografía",
  type: "Sacar y empujar",
  shortDescription:
    "Verifica una firma criptográfica a partir de una clave pública y un mensaje.",
  longDescription:
    "Conocido como uno de los OpSigs, es uno de los op_codes más críticos del lenguaje de script. En resumen, verifica que una firma proporcionada sea válida para una clave pública dada y devuelve verdadero (1) o falso (0). A tener en cuenta: según la estructura de la transacción (legacy/SegWit/Taproot), la serialización del mensaje/transacción y el propio esquema de firma (ECDSA o Schnorr) pueden diferir. CheckSig se utiliza en la mayoría de los scripts habituales, entre ellos P2PK y P2PKH.",
  visualProps: {
    ...English.visualProps,
    title: "Demostración del OP_Code",
    description:
      "Verifica una firma criptográfica a partir de una clave pública y un mensaje.",
    steps: [
      "Saca el elemento superior (clave pública)",
      "Saca el elemento superior (firma)",
      "Realiza la verificación de la firma (ECDSA o Schnorr)",
      "Empuja el resultado de la verificación (0 o 1)",
    ],
  },
};
