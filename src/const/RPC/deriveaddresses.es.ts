import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "deriveaddresses")!;

export const deriveaddressesEs: RPCFunctionParams = {
  ...English,
  category: "Utilidades",
  summary:
    "Deriva un conjunto de direcciones a partir de un descriptor.",
  description:
    "Calcula las direcciones correspondientes a un descriptor en un rango dado.",
  howIsThisUsed:
    "Imagine un libro mágico capaz de crear llaves a partir de instrucciones precisas. Cada juego de instrucciones (o «descriptor») puede producir no una sino todo un conjunto de llaves, cada una abriendo una cerradura distinta. En el mundo de Bitcoin, el comando «deriveaddresses» actúa como ese libro mágico. Al proporcionarle un descriptor de salida —un juego de instrucciones especial— se generan una o varias direcciones de Bitcoin. Esas direcciones son como las llaves de cajas fuertes digitales donde se puede recibir Bitcoin. Resulta particularmente útil cuando se necesita crear una serie de direcciones a partir de un mismo punto de partida, agilizando la gestión de múltiples transacciones entrantes o la organización de fondos entre distintas direcciones por motivos de privacidad u organización.",
  inputs: [
    {
      ...English.inputs[0],
      description: "El descriptor de salida.",
    },
    {
      ...English.inputs[1],
      description: "Rango de índices [inicio, fin] (opcional).",
    },
  ],
};
