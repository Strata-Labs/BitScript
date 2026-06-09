import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "submitblock")!;

export const submitblockEs: RPCFunctionParams = {
  ...English,
  category: "Mining",
  summary:
    "Envía un nuevo bloque a la red.",
  description:
    "Envía un bloque minado para que sea validado y propagado por la red.",
  howIsThisUsed:
    "Este comando se utiliza para propagar bloques recién minados a la red Bitcoin para su validación y eventual inclusión en la blockchain. Desempeña un papel crucial en el proceso de mining, facilitando la expansión y la seguridad de la red.",
  inputs: [
    {
      ...English.inputs[0],
      description: "El bloque crudo en hex.",
    },
    {
      ...English.inputs[1],
      description: "Parámetro obsoleto (ignorar).",
    },
  ],
};
