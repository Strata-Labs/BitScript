import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "decoderawtransaction")!;

export const decoderawtransactionEs: RPCFunctionParams = {
  ...English,
  category: "Transacciones sin procesar",
  summary:
    "Decodifica una transacción sin procesar (hex) a un objeto JSON.",
  description:
    "Lee una transacción sin procesar y devuelve su estructura (entradas, salidas, scripts).",
  howIsThisUsed:
    "Imagine recibir un mensaje secreto escrito en un código que parece una sucesión aleatoria de letras y números; ese código contiene información importante, pero resulta indescifrable sin la herramienta adecuada. El comando «decoderawtransaction» actúa como ese traductor para las transacciones de Bitcoin. Toma una transacción codificada en un formato complejo (hexadecimal) y la convierte en un formato (JSON) fácil de leer, exponiendo todos los detalles de la transacción: quién envía qué, a quién y con qué comisión.",
  inputs: [
    {
      ...English.inputs[0],
      description: "La transacción sin procesar en hex.",
    },
    {
      ...English.inputs[1],
      description: "Si es verdadero, considera que se trata de una transacción SegWit.",
    },
  ],
};
