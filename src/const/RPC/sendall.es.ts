import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "sendall")!;

export const sendallEs: RPCFunctionParams = {
  ...English,
  category: "Cartera",
  summary:
    "Envía todo el saldo disponible a uno o varios destinos.",
  description:
    "Vacía la cartera (o un subconjunto) hacia los destinatarios indicados.",
  howIsThisUsed:
    "El comando sendall sirve para gestionar y redistribuir eficientemente los fondos contenidos en la cartera. Permite consolidar los UTXO y pagar a varios destinatarios en una sola transacción, lo que simplifica la gestión de la cartera y reduce las comisiones.",
};
