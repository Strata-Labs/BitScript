import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "importaddress")!;

export const importaddressEs: RPCFunctionParams = {
  ...English,
  category: "Cartera",
  summary:
    "Añade una dirección o un script (en hex) que se puede seguir sin clave privada.",
  description:
    "Importa una dirección en modo watch-only en la cartera para hacer seguimiento de sus transacciones.",
  howIsThisUsed:
    "Útil para supervisar direcciones o scripts externos en la cartera, ofreciendo visibilidad sobre sus transacciones y saldos sin controlar los fondos. Se utiliza habitualmente para seguir direcciones de almacenamiento en frío, exchanges u otros servicios externos.",
  inputs: [
    {
      ...English.inputs[0],
      description: "La dirección o el script en hex a importar.",
    },
    {
      ...English.inputs[1],
      description: "Una etiqueta opcional para asociar a la dirección.",
    },
    {
      ...English.inputs[2],
      description: "Si es verdadero, vuelve a escanear la blockchain en busca de transacciones de esta dirección.",
    },
    {
      ...English.inputs[3],
      description: "Si es verdadero, considera el argumento como un P2SH que envuelve el script.",
    },
  ],
};
