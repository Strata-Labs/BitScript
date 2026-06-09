import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "analyzepsbt")!;

export const analyzepsbtEs: RPCFunctionParams = {
  ...English,
  category: "Transacciones sin procesar",
  summary:
    "Analiza un PSBT e indica los siguientes pasos necesarios.",
  description:
    "Examina un PSBT y señala lo que queda por firmar, finalizar, etc.",
  howIsThisUsed:
    "Imagine montar un rompecabezas complicado con varios amigos, donde cada pieza representa una parte de una transacción que debe ser firmada por distintas personas. El comando «analyzepsbt» equivale a disponer de una guía que le indica qué piezas del rompecabezas ya están colocadas y cuáles faltan todavía, facilitando entender qué queda por hacer para completar la imagen.",
  inputs: [
    {
      ...English.inputs[0],
      description: "El PSBT en base64 a analizar.",
    },
  ],
};
