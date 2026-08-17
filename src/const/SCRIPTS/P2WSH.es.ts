import { SCRIPTS_PAGE_PROPS } from "@/comp/scripts/ScriptView";
import English from "./P2WSH";

export const P2WSHEs: SCRIPTS_PAGE_PROPS = {
  ...English,
  longHand: "(pago a hash de witness script)",
  shortDescription:
    "El formato SegWit estándar para transacciones más complejas que requieren un script.",
  longDescription: [
    "Los scripts P2WSH desempeñan un papel similar a P2SH en el universo SegWit, orientado a tipos de transacciones más complejos. La lógica del witness script P2WSH y del pubKeyScript de salida es exactamente la misma que la del ScriptSig de entrada y el pubKeyScript de salida en P2SH. Sin embargo, existe una gran diferencia en los op_codes presentes explícitamente en la transacción cruda. Las billeteras/clientes saben que, cuando se detecta una salida P2WSH, deberán insertar los op_codes habituales de P2SH; por tanto, un pubKeyScript P2WSH solo necesita un único elemento específico: el hash del lock script. A continuación, un desglose paso a paso:",
    "1. Verificar que el lock script con hash de la entrada coincide con el lock script con hash de la salida anterior. Para gastar Bitcoin enviado a un script con hash, primero hay que demostrar que el script que se está desbloqueando coincide con el script con hash original. La pila consume entonces el lock script / redeem script completo como un único array y le aplica HASH160. El resultado se compara después con el script con hash original mediante OP_EQUAL.",
    "2. Ejecución del unlock script y del lock script. Si el último op_code (OP_EQUAL) del paso de validación anterior devuelve 1/verdadero, se puede pasar entonces al desbloqueo efectivo del lock script poniendo el script en la pila (ahora descompuesto en los bytes de datos y op_codes correspondientes). Se trata de una ejecución más clásica en la que todos los elementos se ponen en la pila y se procesan según el comportamiento LIFO habitual.",
  ],
  opCodeReview:
    "P2WSH requiere dos (2) elementos de datos, los scripts, y cuatro (4) op_codes.",
  inUse: "Sí",
  descriptionText: [
    "Decodifica el witness para extraer <sig>, <witness script>",
    "Pone el witness script y <sig> en la pila,",
    "Aplica el hash al witness script (hash sha256)",
    "Inserta el hash del witness script en la pila",
    "Decodifica el scriptPubKey para obtener <OP_0> y [witness script hash]",
    "Ejecuta OP_EQUAL para comparar el hash del script con el hash del witness script",
    "Pone [witness script] en la pila",
    "Decodifica el witness script en <pubkey> y <OP_CHECKSIG>",
    "Pone <pubkey> y <OP_CHECKSIG> en la pila",
    "Ejecuta OP_CHECKSIG para validar la firma",
  ],
};
