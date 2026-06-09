import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "submitheader")!;

export const submitheaderEs: RPCFunctionParams = {
  ...English,
  category: "Mining",
  summary:
    "Envía una cabecera de bloque para su validación.",
  description:
    "Envía una cabecera de bloque para que sea añadida al índice de cabeceras.",
  howIsThisUsed:
    "Este comando se utiliza en el proceso de mining para decodificar y enviar una cabecera de bloque como candidata al próximo chain tip. Constituye un paso crucial en la validación y la adición de nuevos bloques a la blockchain.",
  inputs: [
    {
      ...English.inputs[0],
      description: "La cabecera de bloque en hex.",
    },
  ],
};
