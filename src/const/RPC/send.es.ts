import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "send")!;

export const sendEs: RPCFunctionParams = {
  ...English,
  category: "Billetera",
  summary:
    "Envía bitcoins a varios destinatarios en una sola transacción.",
  description:
    "Construye, firma y difunde una transacción hacia varias direcciones.",
  howIsThisUsed:
    "Este comando sirve para iniciar transacciones Bitcoin, permitiendo transferir fondos a destinatarios designados o inscribir datos en la blockchain. Es esencial para realizar transacciones de manera segura y eficiente en la red Bitcoin.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Arreglo JSON {dirección: cantidad} de los destinatarios.",
    },
    {
      ...English.inputs[1],
      description: "Objetivo de confirmación en número de bloques.",
    },
    {
      ...English.inputs[2],
      description: "Modo de estimación de comisiones: «unset», «economical» o «conservative».",
    },
    {
      ...English.inputs[3],
      description: "Comisión en BTC/kvB.",
    },
    {
      ...English.inputs[4],
      description: "Opciones adicionales (sustracción de comisiones, etc.).",
    },
  ],
};
