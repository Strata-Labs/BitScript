import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "submitpackage")!;

export const submitpackageEs: RPCFunctionParams = {
  ...English,
  category: "Transacciones crudas",
  summary:
    "Envía un paquete de transacciones para que sean validadas conjuntamente en el mempool.",
  description:
    "Permite enviar varias transacciones vinculadas (paquete) para que sean validadas como un grupo.",
  howIsThisUsed:
    "Sirve para enviar cadenas de transacciones interdependientes con el fin de lograr una aceptación más eficiente por parte del mempool, particularmente útil para construcciones complejas que incluyen múltiples dependencias.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Arreglo de las transacciones crudas en hex.",
    },
  ],
};
