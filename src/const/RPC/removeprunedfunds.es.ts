import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "removeprunedfunds")!;

export const removeprunedfundsEs: RPCFunctionParams = {
  ...English,
  category: "Cartera",
  summary:
    "Elimina fondos importados a través de `importprunedfunds`.",
  description:
    "Retira una transacción podada importada previamente.",
  howIsThisUsed:
    "El RPC removeprunedfunds sirve sobre todo, en carteras podadas, para eliminar transacciones que ya no son necesarias. Una cartera podada solo almacena un subconjunto de la blockchain, descartando los datos antiguos para ahorrar espacio en disco. Incluso en modo podado, se puede querer gestionar los fondos o limpiar el historial. Este comando permite retirar transacciones individuales de la cartera, útil para mejorar el rendimiento o por privacidad al borrar detalles sensibles.",
  inputs: [
    {
      ...English.inputs[0],
      description: "El identificador de la transacción a retirar.",
    },
  ],
};
