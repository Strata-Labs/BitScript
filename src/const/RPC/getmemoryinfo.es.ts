import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getmemoryinfo")!;

export const getmemoryinfoEs: RPCFunctionParams = {
  ...English,
  category: "Control",
  summary:
    "Devuelve información sobre el uso de memoria del nodo.",
  description:
    "Proporciona el estado del asignador de memoria utilizado por bitcoind.",
  howIsThisUsed:
    "Imagina operar un sistema informático complejo para una empresa grande y tener que vigilar de forma permanente el uso de memoria para que funcione con eficiencia. En la red Bitcoin, el comando «getmemoryinfo» desempeña una función similar para operadores de nodos y desarrolladores. Permite supervisar la memoria utilizada por su nodo de Bitcoin, lo que facilita diagnosticar posibles problemas o ineficiencias que puedan afectar al rendimiento.",
};
