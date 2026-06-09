import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "importprivkey")!;

export const importprivkeyEs: RPCFunctionParams = {
  ...English,
  category: "Cartera",
  summary:
    "Importa una clave privada (en formato WIF) en la cartera.",
  description:
    "Añade una clave privada existente a la cartera para poder gastar los fondos asociados.",
  howIsThisUsed:
    "Este comando es esencial para acceder a fondos asociados a claves privadas ajenas a su cartera. Permite importar una clave privada para poder gastar o gestionar los fondos correspondientes desde la cartera. Puede asignar una etiqueta para organizar las claves importadas y elegir si desea activar un rescaneo de la blockchain para sincronizar las transacciones. Se utiliza habitualmente para consolidar fondos procedentes de distintas fuentes o para gestionar direcciones de almacenamiento en frío desde la cartera.",
  inputs: [
    {
      ...English.inputs[0],
      description: "La clave privada de Bitcoin (en formato WIF).",
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
