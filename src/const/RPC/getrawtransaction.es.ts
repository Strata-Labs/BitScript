import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getrawtransaction")!;

export const getrawtransactionEs: RPCFunctionParams = {
  ...English,
  category: "Transacciones crudas",
  summary:
    "Recupera una transacción cruda por su identificador.",
  description:
    "Devuelve la transacción cruda (hex) o su objeto decodificado según el modo solicitado.",
  howIsThisUsed:
    "Este comando se utiliza ampliamente para el análisis de la blockchain, la depuración de transacciones y la verificación de los detalles de una transacción fuera del contexto de la billetera. Permite a desarrolladores, analistas y usuarios acceder a los detalles de la composición de una transacción: entradas y salidas, tamaño, inclusión en un bloque. Es particularmente útil para las aplicaciones que verifican los detalles de la transacción de forma programática o para quienes realizan un análisis exhaustivo de los flujos y los datos de la blockchain.",
  inputs: [
    {
      ...English.inputs[0],
      description: "El identificador de la transacción.",
    },
    {
      ...English.inputs[1],
      description: "Nivel de verbosidad (0 = hex, 1 = objeto, 2 = objeto con prevouts).",
    },
    {
      ...English.inputs[2],
      description: "Hash del bloque en el que buscar (opcional).",
    },
  ],
};
