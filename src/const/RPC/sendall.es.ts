import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "sendall")!;

export const sendallEs: RPCFunctionParams = {
  ...English,
  category: "Billetera",
  summary:
    "Envía todo el saldo disponible a uno o varios destinos.",
  description:
    "Vacía la billetera (o un subconjunto) hacia los destinatarios indicados.",
  howIsThisUsed:
    "El comando sendall sirve para gestionar y redistribuir eficientemente los fondos contenidos en la billetera. Permite consolidar los UTXO y pagar a varios destinatarios en una sola transacción, lo que simplifica la gestión de la billetera y reduce las comisiones.",
};
