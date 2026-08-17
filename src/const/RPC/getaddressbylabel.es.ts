import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getaddressbylabel")!;

export const getaddressbylabelEs: RPCFunctionParams = {
  ...English,
  category: "Billetera",
  summary:
    "Devuelve la lista de direcciones asociadas a la etiqueta dada.",
  description:
    "Recupera las direcciones de la billetera clasificadas bajo la etiqueta especificada.",
  howIsThisUsed:
    "Tu billetera tiene varias direcciones que usas para distintos fines: algunas para transacciones personales, otras para el trabajo, otras para donaciones. Ponerle una etiqueta a cada grupo de direcciones ayuda a organizarlas. Si necesitas revisar transacciones o saldos de un ámbito específico de tu vida o de tu actividad, un comando como «getaddressbylabel» lista rápido todas las direcciones que están bajo una misma etiqueta.",
  inputs: [
    {
      ...English.inputs[0],
      description: "La etiqueta cuyas direcciones se desean listar.",
    },
  ],
};
