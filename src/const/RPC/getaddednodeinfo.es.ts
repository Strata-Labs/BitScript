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
    "Imagine que ha invitado a un grupo de amigos a una reunión privada y desea verificar quién ha llegado y quién no. De forma similar, el comando « getaddednodeinfo » de la red Bitcoin ayuda a hacer seguimiento de pares (nodos) específicos que ha invitado manualmente (agregado). Al usarlo, ve cuáles están actualmente conectados a su nodo y obtiene información detallada sobre su estado. Es particularmente útil para el diagnóstico de red y la gestión de las relaciones con los pares, asegurándose de que su nodo se comunica eficazmente con los que ha seleccionado.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Limitar el resultado a un nodo específico.",
    },
  ],
};
