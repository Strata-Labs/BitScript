import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getwalletinfo")!;

export const getwalletinfoEs: RPCFunctionParams = {
  ...English,
  category: "Cartera",
  summary:
    "Devuelve diversa información sobre el estado de la cartera.",
  description:
    "Proporciona una instantánea de la cartera: saldo, versión, claves, transacciones, etc.",
  howIsThisUsed:
    "Este comando es crucial para comprender el estado y la configuración de su cartera. Proporciona la información esencial para la gestión de recursos, el seguimiento de saldos, la configuración de comisiones y la seguridad. Permite hacer seguimiento de la actividad, gestionar las claves y ajustar la configuración según sus necesidades, garantizando el correcto funcionamiento y la seguridad de su cartera Bitcoin.",
};
