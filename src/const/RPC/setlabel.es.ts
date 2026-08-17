import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "setlabel")!;

export const setlabelEs: RPCFunctionParams = {
  ...English,
  category: "Billetera",
  summary:
    "Asocia una etiqueta a una dirección.",
  description:
    "Establece o actualiza la etiqueta de una dirección de la billetera.",
  howIsThisUsed:
    "Este comando se utiliza para asignar una etiqueta a una dirección Bitcoin de la billetera. Es posible que quieras etiquetar las direcciones para clasificarlas por uso o asociarlas a transacciones o destinatarios específicos. La etiqueta establecida puede emplearse posteriormente como referencia al gestionar las direcciones.",
  inputs: [
    {
      ...English.inputs[0],
      description: "La dirección Bitcoin a etiquetar.",
    },
    {
      ...English.inputs[1],
      description: "La nueva etiqueta.",
    },
  ],
};
