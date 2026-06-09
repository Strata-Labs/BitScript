import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "createrawtransaction")!;

export const createrawtransactionEs: RPCFunctionParams = {
  ...English,
  category: "Transacciones sin procesar",
  summary:
    "Crea una transacción sin procesar a partir de entradas y salidas dadas.",
  description:
    "Construye una transacción sin firmar a partir de los UTXO y destinatarios proporcionados.",
  howIsThisUsed:
    "Imagine crear una tarjeta de felicitación personalizada. Tiene todos los materiales extendidos sobre la mesa pero todavía no ha pegado nada. El comando «createrawtransaction» de Bitcoin funciona de forma similar: permite disponer todas las piezas de una transacción de Bitcoin —quién envía, quién recibe— sin finalizar nada. Este paso equivale a preparar su tarjeta pero esperar a escribir un mensaje personal antes de enviarla.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Array de las entradas {txid, vout}.",
    },
    {
      ...English.inputs[1],
      description: "Objeto o array de las salidas {dirección: importe}.",
    },
  ],
};
