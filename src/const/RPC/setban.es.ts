import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "setban")!;

export const setbanEs: RPCFunctionParams = {
  ...English,
  category: "Red",
  summary:
    "Añade o elimina un baneo de una dirección IP o de una subred.",
  description:
    "Banea (« add ») o desbanea (« remove ») una dirección o subred del nodo.",
  howIsThisUsed:
    "Este comando se utiliza para banear determinadas direcciones IP o subredes con el fin de impedir que se conecten a la red Bitcoin. Resulta útil para limitar el spam, prevenir ataques o bloquear nodos maliciosos. También ofrece flexibilidad para definir la duración del baneo, ya sea puntual o indefinida.",
  inputs: [
    {
      ...English.inputs[0],
      description: "La dirección IP o subred a banear.",
    },
    {
      ...English.inputs[1],
      description: "Acción: « add » o « remove ».",
    },
    {
      ...English.inputs[2],
      description: "Duración del baneo en segundos (0 = por defecto).",
    },
    {
      ...English.inputs[3],
      description: "Si es verdadero, trata « bantime » como una marca de tiempo absoluta.",
    },
  ],
};
