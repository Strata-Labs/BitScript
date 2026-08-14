import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getbalance")!;

export const getbalanceEs: RPCFunctionParams = {
  ...English,
  category: "Billetera",
  summary:
    "Devuelve el saldo total de los fondos confirmados y no confirmados de la billetera.",
  description:
    "Devuelve el saldo de la billetera, con opciones para filtrar por cuenta, confirmaciones mínimas, etc.",
  howIsThisUsed:
    "Imagina abrir tu aplicación bancaria para ver cuánto dinero tienes en todas tus cuentas: ahorro, corriente, cuentas especiales. Quieres una foto rápida y precisa del total para decidir con criterio sobre tus gastos, ahorros o transferencias. El comando «getbalance» hace lo mismo con tu billetera de Bitcoin. Te da una visión inmediata de los bitcoins disponibles en total, sumando todas las direcciones o etiquetas. Toma en cuenta las transacciones que ya alcanzaron cierto número de confirmaciones, lo que lo vuelve una forma confiable de conocer tu posición financiera en la red en cualquier momento.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Cuenta (obsoleta). Usa «*» para todas las cuentas.",
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
