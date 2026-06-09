import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getindexinfo")!;

export const getindexinfoEs: RPCFunctionParams = {
  ...English,
  category: "Utilidades",
  summary:
    "Devuelve el estado de los índices opcionales (txindex, coinstatsindex, etc.).",
  description:
    "Indica el estado de sincronización de los índices habilitados en el nodo.",
  howIsThisUsed:
    "Imagine gestionar una biblioteca con varios catálogos que indexan distintos tipos de libros: ficción, ciencia, historia. Necesita saber qué catálogos están actualizados para informar a los lectores sobre disponibilidad y novedades. De manera análoga, en la blockchain de Bitcoin, el comando «getindexinfo» ayuda a operadores de nodos y desarrolladores a verificar el estado de los distintos índices gestionados por su nodo: índice de transacciones, de direcciones o cualquier otro índice especializado que mejore la capacidad del nodo para consultar eficientemente los datos de la blockchain.",
};
