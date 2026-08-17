import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "utxoupdatepsbt")!;

export const utxoupdatepsbtEs: RPCFunctionParams = {
  ...English,
  category: "Transacciones brutas",
  summary:
    "Actualiza un PSBT con los UTXO y descriptores necesarios.",
  description:
    "Añade la información de UTXO y descriptores que falta en un PSBT.",
  howIsThisUsed:
    "El comando utxoupdatepsbt se utiliza para mejorar la integridad y exactitud de un PSBT actualizando sus entradas y salidas SegWit con la información proveniente de los descriptores de salida, del conjunto UTXO o del mempool. Resulta crucial para preparar un PSBT para su finalización y difusión en la red Bitcoin, asegurando que contenga los datos de transacción más recientes y cumpla con los requisitos de la red.",
  inputs: [
    {
      ...English.inputs[0],
      description: "El PSBT en base64.",
    },
    {
      ...English.inputs[1],
      description: "Matriz de descriptores (opcional).",
    },
  ],
};
