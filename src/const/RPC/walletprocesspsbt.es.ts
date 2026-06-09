import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "walletprocesspsbt")!;

export const walletprocesspsbtEs: RPCFunctionParams = {
  ...English,
  category: "Cartera",
  summary:
    "Actualiza y firma un PSBT con los datos de la cartera.",
  description:
    "Intenta firmar el PSBT y añadirle los UTXO de la cartera.",
  howIsThisUsed:
    "Se utiliza para avanzar una transacción actualizando un PSBT (Partially Signed Bitcoin Transaction) con la información de entrada almacenada en la cartera. También facilita la firma de las entradas que puedan ser firmadas. Este comando es esencial para fluidificar el flujo de trabajo y garantizar que las entradas necesarias estén incluidas y firmadas de forma eficiente, contribuyendo a la finalización de la transacción.",
  inputs: [
    {
      ...English.inputs[0],
      description: "El PSBT en base64.",
    },
    {
      ...English.inputs[1],
      description: "Si firmar o no con la cartera.",
    },
  ],
};
