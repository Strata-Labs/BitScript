import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getaddednodeinfo")!;

export const getaddednodeinfoEs: RPCFunctionParams = {
  ...English,
  category: "Red",
  summary:
    "Devuelve información sobre los nodos agregados manualmente.",
  description:
    "Lista los pares agregados mediante `addnode` y su estado de conexión.",
  howIsThisUsed:
    "Imagina que invitaste a un grupo de amigos a una reunión privada y quieres ver quién llegó y quién no. De forma similar, el comando «getaddednodeinfo» te ayuda a seguirle la pista a los pares (nodos) que agregaste manualmente. Al usarlo ves cuáles están conectados a tu nodo en este momento y obtienes información detallada sobre su estado. Es muy útil para diagnosticar la red y manejar tus conexiones, para asegurarte de que tu nodo se comunica bien con los que elegiste.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Limitar el resultado a un nodo específico.",
    },
  ],
};
