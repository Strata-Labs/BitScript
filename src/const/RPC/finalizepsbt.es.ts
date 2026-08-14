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
    "Imagina un proyecto en equipo donde cada quien debe aprobar la versión final antes de poder entregarla. De forma similar, en Bitcoin ciertas transacciones necesitan la aprobación (firmas) de varias partes antes de poder cerrarse —por ejemplo, cuando los fondos están en una billetera multifirma, que agrega seguridad al exigir el acuerdo de varias personas—. El comando «finalizepsbt» equivale a juntar esas últimas firmas, verificar que todo esté en orden y que la transacción tenga todas las autorizaciones necesarias. Una vez validada, sella la transacción y la deja lista para transmitirse a la red.",
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
