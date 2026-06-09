import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "importpubkey")!;

export const importpubkeyEs: RPCFunctionParams = {
  ...English,
  category: "Cartera",
  summary:
    "Añade una clave pública (en hex) como watch-only a la cartera.",
  description:
    "Importa una clave pública para realizar el seguimiento de los fondos enviados a ella sin poder gastarlos.",
  howIsThisUsed:
    "Resulta útil cuando se desea supervisar una clave pública concreta en la cartera sin permitir su gasto. Permite hacer seguimiento de las transacciones vinculadas a esa clave. Puede asignar una etiqueta para organizar las claves públicas importadas y optar por realizar un rescaneo para sincronizar la cartera con la blockchain. Resulta especialmente útil para gestionar varias claves públicas dentro de la cartera y dar seguimiento a sus transacciones asociadas.",
  inputs: [
    {
      ...English.inputs[0],
      description: "La clave pública en hex.",
    },
    {
      ...English.inputs[1],
      description: "Una etiqueta opcional que asociar.",
    },
    {
      ...English.inputs[2],
      description: "Si es verdadero, rescanea la blockchain en busca de transacciones asociadas.",
    },
  ],
};
