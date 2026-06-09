import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "pruneblockchain")!;

export const pruneblockchainEs: RPCFunctionParams = {
  ...English,
  category: "Blockchain",
  summary:
    "Poda los bloques anteriores a una altura o timestamp dados.",
  description:
    "Libera espacio en disco eliminando los bloques antiguos en un nodo podado.",
  howIsThisUsed:
    "El RPC pruneblockchain sirve principalmente para reducir el espacio en disco requerido para ejecutar un full node, eliminando los datos antiguos de la blockchain que ya no son necesarios para la validación o el consenso. Es especialmente útil para nodos con poco almacenamiento o que se ejecutan en dispositivos con recursos limitados. Al podar periódicamente la blockchain, se mantiene un nodo funcional minimizando la sobrecarga de almacenamiento. La poda también puede mejorar el tiempo de sincronización para nuevos nodos al reducir la cantidad de datos que deben descargar y validar.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Altura objetivo o timestamp Unix hasta donde podar.",
    },
  ],
};
