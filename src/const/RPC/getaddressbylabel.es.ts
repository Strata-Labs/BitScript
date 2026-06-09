import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getaddressbylabel")!;

export const getaddressbylabelEs: RPCFunctionParams = {
  ...English,
  category: "Cartera",
  summary:
    "Devuelve la lista de direcciones asociadas a la etiqueta dada.",
  description:
    "Recupera las direcciones de la cartera clasificadas bajo la etiqueta especificada.",
  howIsThisUsed:
    "Su cartera contiene varias direcciones utilizadas para distintos fines — algunas para transacciones personales, otras para lo profesional, otras para donaciones. Asignar una etiqueta a cada grupo de direcciones ayuda a organizarlas. Si necesita revisar transacciones o saldos vinculados a un ámbito específico de su vida o de su actividad, un comando como « getaddressbylabel » lista rápidamente todas las direcciones bajo una etiqueta dada.",
  inputs: [
    {
      ...English.inputs[0],
      description: "La etiqueta cuyas direcciones se desean listar.",
    },
  ],
};
