import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "ping")!;

export const pingEs: RPCFunctionParams = {
  ...English,
  category: "Red",
  summary:
    "Solicita un ping hacia todos los pares conectados.",
  description:
    "Envía un mensaje ping a cada par para medir el tiempo de respuesta.",
  howIsThisUsed:
    "El RPC ping sirve para medir el tiempo de ping hacia los demás nodos de la red Bitcoin. Al enviar una solicitud ping a todos los demás nodos, un nodo puede medir el tiempo de ida y vuelta. Esta información es valiosa para evaluar la latencia y la salud general de la red. Los resultados del ping, incluidos pingtime y pingwait, ofrecen una visión de la capacidad de respuesta de la red y de un posible retraso de procesamiento. Útil para el diagnóstico y la supervisión del rendimiento del nodo Bitcoin.",
};
