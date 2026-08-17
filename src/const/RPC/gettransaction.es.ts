import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "gettransaction")!;

export const gettransactionEs: RPCFunctionParams = {
  ...English,
  category: "Billetera",
  summary:
    "Devuelve la información detallada de una transacción de la billetera.",
  description:
    "Recupera los detalles de una transacción conocida por la billetera, incluyendo los destinatarios y las categorías.",
  howIsThisUsed:
    "Sirve para hacer seguimiento y auditar las transacciones de la billetera, ofreciendo una visión de su estado, su impacto en el saldo y más, esencial para el seguimiento financiero y la elaboración de informes.",
  inputs: [
    {
      ...English.inputs[0],
      description: "El identificador de la transacción.",
    },
    {
      ...English.inputs[1],
      description: "Incluir las transacciones watch-only.",
    },
    {
      ...English.inputs[2],
      description: "Decodificar la transacción cruda en la respuesta.",
    },
  ],
};
