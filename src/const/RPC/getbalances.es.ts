import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getbalances")!;

export const getbalancesEs: RPCFunctionParams = {
  ...English,
  category: "Cartera",
  summary:
    "Devuelve un objeto con todos los saldos (mine, watchonly, etc.).",
  description:
    "Ofrece una vista detallada de los saldos de la cartera por categoría.",
  howIsThisUsed:
    "Imagine disponer de un panel financiero detallado para todos sus activos, que muestra no solo el total sino también la distribución según el estado actual — lo que está disponible de inmediato, lo que está pendiente, lo que está bloqueado por un período determinado. El comando « getbalances » cumple ese papel para su cartera Bitcoin. Desglosa sus tenencias en categorías detalladas: saldo de confianza (bitcoins que han recibido suficientes confirmaciones para ser considerados seguros y gastables), saldo pendiente no fiable (transacciones entrantes aún no confirmadas, potencialmente reversibles), saldo inmaduro (recompensas de minería o de staking aún no gastables hasta que se alcance un cierto número de confirmaciones). Este comando ofrece una visión completa de su situación financiera, ayudándole a comprender no solo cuántos bitcoins tiene en total, sino también qué parte es accesible frente a la pendiente o inmadura.",
};
