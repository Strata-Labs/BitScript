import { SCRIPTS_PAGE_PROPS } from "@/comp/scripts/ScriptView";
import English from "./P2SH";

export const P2SHEs: SCRIPTS_PAGE_PROPS = {
  ...English,
  longHand: "(pago a hash de script)",
  shortDescription:
    "El formato Legacy estándar para transacciones más complejas que requieren un script.",
  longDescription: [
    "  Un script Pay-to-Script-Hash (P2SH) es el script estándar en Legacy para tipos de transacciones más complejos (como las multifirma). En lugar de enviar Bitcoin directamente a un script específico, el pubKeyScript de salida contiene el hash del lock script; el ScriptSig de entrada asociado deberá tanto demostrar que conoce el lock script original como proporcionar los datos y op_codes necesarios para desbloquearlo. Por tanto, el ScriptSig de desbloqueo en la entrada contiene tanto el unlock script *como* el lock script / redeem script original. Vamos a desglosarlo en dos pasos claros:",

    "1. Verificar que el lock script hasheado de la entrada coincide con el lock script hasheado de la salida anterior. Para gastar Bitcoin enviado a un script hasheado, primero hay que demostrar que el script que se está desbloqueando coincide con el script hasheado original. La pila consume entonces el lock script / redeem script completo como un único array y le aplica HASH160. El resultado se compara después con el script hasheado original mediante OP_EQUAL.",
    "2. Ejecución del unlock script y del lock script. Si el último op_code (OP_EQUAL) del paso de validación anterior devuelve 1/verdadero, se puede pasar entonces al desbloqueo efectivo del lock script poniendo el script en la pila (ahora descompuesto en los bytes de datos y op_codes correspondientes). Se trata de una ejecución más clásica en la que todos los elementos se ponen en la pila y se procesan según el comportamiento LIFO habitual. ",
  ],
  opCodeReview:
    "P2SH requiere dos (2) elementos de datos, los scripts, y tres (3) op_codes.",
  inUse: "Sí",
};
