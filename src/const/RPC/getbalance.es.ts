import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getbalance")!;

export const getbalanceEs: RPCFunctionParams = {
  ...English,
  category: "Cartera",
  summary:
    "Devuelve el saldo total de los fondos confirmados y no confirmados de la cartera.",
  description:
    "Devuelve el saldo de la cartera, con opciones para filtrar por cuenta, confirmaciones mínimas, etc.",
  howIsThisUsed:
    "Imagine abrir su aplicación bancaria para ver cuánto dinero tiene en todas sus cuentas — ahorro, corriente, cuentas especiales. Quiere una instantánea rápida y precisa del total para decidir con conocimiento de causa sobre sus gastos, ahorros o transferencias. El comando « getbalance » hace lo mismo para su cartera Bitcoin. Ofrece una visión inmediata de los bitcoins disponibles en total, sumando todas las direcciones o etiquetas. Tiene en cuenta las transacciones que han alcanzado un cierto número de confirmaciones, lo que lo convierte en una forma fiable de comprender su posición financiera en la red Bitcoin en cualquier momento.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Cuenta (obsoleta). Utilice « * » para todas las cuentas.",
    },
    {
      ...English.inputs[1],
      description: "El número mínimo de confirmaciones requerido para incluir una transacción.",
    },
    {
      ...English.inputs[2],
      description: "Incluye las transacciones de las direcciones watch-only.",
    },
    {
      ...English.inputs[3],
      description: "Evita la recarga del mempool si es verdadero.",
    },
  ],
};
