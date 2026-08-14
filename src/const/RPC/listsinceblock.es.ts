import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "listsinceblock")!;

export const listsinceblockEs: RPCFunctionParams = {
  ...English,
  category: "Billetera",
  summary:
    "Lista todas las transacciones desde un bloque dado.",
  description:
    "Devuelve todas las transacciones de la billetera ocurridas desde el block hash especificado.",
  howIsThisUsed:
    "El comando listsinceblock sirve para recuperar el historial de transacciones desde un bloque dado, lo que ayuda a hacer seguimiento de la actividad de la billetera y a confirmar el estado de las transacciones. Resulta especialmente útil para supervisar las transacciones entrantes y salientes, sobre todo en escenarios en los que una reorganización pueda afectar al historial.",
  inputs: [
    {
      ...English.inputs[0],
      description: "El hash del bloque de referencia.",
    },
    {
      ...English.inputs[1],
      description: "El número mínimo de confirmaciones.",
    },
    {
      ...English.inputs[2],
      description: "Incluir las transacciones watch-only.",
    },
    {
      ...English.inputs[3],
      description: "Incluir las transacciones retiradas (removed).",
    },
  ],
};
