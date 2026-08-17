import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getaddressinfo")!;

export const getaddressinfoEs: RPCFunctionParams = {
  ...English,
  category: "Billetera",
  summary:
    "Devuelve información detallada sobre una dirección Bitcoin de la billetera.",
  description:
    "Recupera los metadatos de una dirección que pertenece a la billetera (clave pública, etiqueta, tipo, etc.).",
  howIsThisUsed:
    "Imagina revisar a fondo un auto que estás pensando comprar: historial, estado actual, cualquier detalle relevante antes de decidir. De forma similar, cuando tienes una dirección de Bitcoin enfrente muchas veces quieres saber más: si es válida, si está vinculada a tu billetera y cualquier otro dato que pueda influir en cómo la usas. El comando «getaddressinfo» responde a esa necesidad y te da una visión general de la dirección.",
  inputs: [
    {
      ...English.inputs[0],
      description: "La dirección Bitcoin a inspeccionar.",
    },
  ],
};
