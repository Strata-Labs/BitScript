import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "addnode")!;

export const addnodeEs: RPCFunctionParams = {
  ...English,
  category: "Red",
  summary:
    "Gestiona las conexiones a otros nodos: añadir, eliminar o conectar bajo demanda.",
  description:
    "Este comando permite gestionar manualmente las conexiones de pares: añadir, retirar o intentar una conexión única.",
  howIsThisUsed:
    "Considere su cartera de Bitcoin como parte de una gran red, como vivir en una ciudad inmensa y bulliciosa. Igual que uno puede querer entablar nuevas amistades, evitar a ciertas personas o reencontrarse ocasionalmente con alguien para tomar un café, el comando «addnode» ayuda a gestionar con quién se comunica su cartera en la red de Bitcoin.",
  inputs: [
    {
      ...English.inputs[0],
      description: "La dirección del par al que conectarse.",
    },
    {
      ...English.inputs[1],
      description: "Acción: «add», «remove» o «onetry».",
    },
    {
      ...English.inputs[2],
      description: "Versión v2 a utilizar (opcional).",
    },
  ],
};
