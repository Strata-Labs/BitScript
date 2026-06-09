import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "finalizepsbt")!;

export const finalizepsbtEs: RPCFunctionParams = {
  ...English,
  category: "Transacciones crudas",
  summary:
    "Finaliza un PSBT y extrae la transacción cruda correspondiente.",
  description:
    "Combina las firmas y produce la transacción lista para transmitir.",
  howIsThisUsed:
    "Imagine un proyecto grupal en el que cada uno debe validar la versión final antes de poder entregarla. De forma similar, en Bitcoin, ciertas transacciones requieren la aprobación (firmas) de varias partes antes de poder ser finalizadas — por ejemplo porque los fondos están en una cartera multi-firma, que añade una capa de seguridad al exigir el acuerdo de varias personas. El comando « finalizepsbt » equivale a recopilar esas últimas firmas y aprobaciones, verificar que todo está en orden y que la transacción tiene todas las autorizaciones necesarias. Una vez validada, sella la transacción, lista para ser transmitida en la red Bitcoin para su confirmación.",
  inputs: [
    {
      ...English.inputs[0],
      description: "El PSBT en base64 a finalizar.",
    },
    {
      ...English.inputs[1],
      description: "Si es verdadero, extrae la transacción neta; en caso contrario devuelve un PSBT.",
    },
  ],
};
