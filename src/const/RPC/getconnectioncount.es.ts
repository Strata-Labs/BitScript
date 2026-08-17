import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getconnectioncount")!;

export const getconnectioncountEs: RPCFunctionParams = {
  ...English,
  category: "Red",
  summary:
    "Devuelve el número de conexiones activas hacia otros nodos.",
  description:
    "Indica cuántos pares están actualmente conectados.",
  howIsThisUsed:
    "Imagina manejar una red de comunicación para una organización grande y tener que verificar que tu punto central esté bien enlazado con todos los servicios para agilizar el flujo de información. De manera análoga, en la red Bitcoin, el comando «getconnectioncount» ofrece a los operadores de nodo una herramienta para comprobar la calidad de su conexión con el resto de la red. Indica el número total de conexiones activas de su nodo con otros nodos, ofreciendo una instantánea de su conectividad y del estado de salud de la red. Una buena conectividad es crucial para recibir y retransmitir rápidamente transacciones y bloques, y mantenerse al día con los últimos datos de la blockchain.",
};
