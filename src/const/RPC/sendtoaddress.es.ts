import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "sendtoaddress")!;

export const sendtoaddressEs: RPCFunctionParams = {
  ...English,
  category: "Billetera",
  summary:
    "Envía bitcoins a una dirección dada.",
  description:
    "Crea y difunde una transacción hacia una dirección Bitcoin específica.",
  howIsThisUsed:
    "Este comando es esencial para transferir Bitcoin de una dirección a otra. Resulta especialmente útil para transacciones puntuales, como pagos personales, donaciones o transacciones comerciales.",
  inputs: [
    {
      ...English.inputs[0],
      description: "La dirección Bitcoin del destinatario.",
    },
    {
      ...English.inputs[1],
      description: "El importe en BTC.",
    },
    {
      ...English.inputs[2],
      description: "Un comentario almacenado localmente sobre la transacción.",
    },
    {
      ...English.inputs[3],
      description: "Un comentario relativo al destinatario.",
    },
    {
      ...English.inputs[4],
      description: "Si es verdadero, las comisiones se deducen del importe enviado.",
    },
    {
      ...English.inputs[5],
      description: "Activar replace-by-fee.",
    },
    {
      ...English.inputs[6],
      description: "Objetivo de confirmación en bloques.",
    },
    {
      ...English.inputs[7],
      description: "Modo de estimación de comisiones.",
    },
    {
      ...English.inputs[8],
      description: "Comisión en BTC/kvB.",
    },
  ],
};
