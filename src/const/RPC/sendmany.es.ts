import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "sendmany")!;

export const sendmanyEs: RPCFunctionParams = {
  ...English,
  category: "Billetera",
  summary:
    "Envía bitcoins a varias direcciones en una sola transacción.",
  description:
    "Crea y difunde una transacción multi-destinatario desde la billetera.",
  howIsThisUsed:
    "El comando sendmany sirve para simplificar la distribución de Bitcoin a numerosas direcciones en una sola transacción. Es una herramienta clave para empresas, organizaciones o particulares que necesitan realizar pagos o desembolsos masivos de manera eficiente.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Cuenta de origen (obsoleto). Usar «».",
    },
    {
      ...English.inputs[1],
      description: "Objeto JSON {dirección: cantidad} de los destinatarios.",
    },
    {
      ...English.inputs[2],
      description: "Número mínimo de confirmaciones para los UTXO de origen.",
    },
    {
      ...English.inputs[3],
      description: "Un comentario almacenado localmente.",
    },
    {
      ...English.inputs[4],
      description: "Arreglo de direcciones que pagarán las comisiones.",
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
