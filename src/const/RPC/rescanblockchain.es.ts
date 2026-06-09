import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "rescanblockchain")!;

export const rescanblockchainEs: RPCFunctionParams = {
  ...English,
  category: "Cartera",
  summary:
    "Reescanea la blockchain en busca de transacciones de la cartera.",
  description:
    "Fuerza a la cartera a analizar la cadena en el rango de bloques indicado.",
  howIsThisUsed:
    "El RPC rescanblockchain es utilizado habitualmente por las carteras para sincronizar su historial con la blockchain. Si una cartera está fuera de línea o desincronizada durante un tiempo, puede perderse nuevas transacciones o actualizaciones. Al lanzar un rescan, identifica las transacciones relevantes ocurridas durante el período fuera de línea y actualiza su historial. Esto garantiza la exactitud del saldo y del historial. También resulta práctico si el wallet.dat se traslada a un nuevo dispositivo o se restaura desde una copia de seguridad, reindexando las transacciones a partir de una altura dada.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Altura de bloque desde la cual comenzar el rescan.",
    },
    {
      ...English.inputs[1],
      description: "Altura de bloque en la que detener el rescan.",
    },
  ],
};
