import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "combinepsbt")!;

export const combinepsbtEs: RPCFunctionParams = {
  ...English,
  category: "Transacciones sin procesar",
  summary:
    "Combina varios PSBT para la misma transacción en uno solo.",
  description:
    "Fusiona varias versiones de un PSBT firmadas por distintos participantes.",
  howIsThisUsed:
    "Un grupo de amigos trabaja en construir una maqueta de avión. Cada uno tiene piezas y herramientas diferentes necesarias para el proyecto. El comando «combinepsbt» equivale a reunir todas esas piezas que aporta cada persona y ensamblarlas en una maqueta completa. En Bitcoin, una transacción puede requerir entradas (firmas o aprobaciones) de varias partes antes de estar completa. «combinepsbt» toma esas piezas separadas —transacciones firmadas parcialmente por distintas personas— y las fusiona en una única transacción lista para finalizar y enviar.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Array de PSBT (en base64) a combinar.",
    },
  ],
};
