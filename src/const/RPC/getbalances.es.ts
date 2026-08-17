import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getbalances")!;

export const getbalancesEs: RPCFunctionParams = {
  ...English,
  category: "Billetera",
  summary:
    "Devuelve un objeto con todos los saldos (mine, watchonly, etc.).",
  description:
    "Ofrece una vista detallada de los saldos de la billetera por categoría.",
  howIsThisUsed:
    "Imagina tener un panel financiero detallado de todos tus activos, que muestra no solo el total sino también cómo se reparte según su estado: lo que está disponible de inmediato, lo pendiente y lo que está bloqueado por un tiempo. El comando «getbalances» cumple ese papel para tu billetera de Bitcoin. Desglosa tus tenencias en categorías: saldo confiable (bitcoins con suficientes confirmaciones para considerarse seguros y gastables), saldo pendiente no confiable (transacciones entrantes aún sin confirmar, que podrían revertirse) y saldo inmaduro (recompensas de minería que todavía no se pueden gastar hasta alcanzar cierto número de confirmaciones). Así ves no solo cuántos bitcoins tienes en total, sino qué parte puedes usar ya y qué parte sigue pendiente o inmadura.",
};
