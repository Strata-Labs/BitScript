import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "importwallet")!;

export const importwalletEs: RPCFunctionParams = {
  ...English,
  category: "Cartera",
  summary:
    "Importa las claves de un archivo dump en la cartera.",
  description:
    "Carga las claves exportadas con `dumpwallet` en la cartera actual.",
  howIsThisUsed:
    "Este comando es esencial para restaurar o transferir una cartera importando las claves desde un archivo de dump. Permite conservar el acceso a los fondos y al historial de transacciones. Debe utilizarse al migrar entre instancias o al recuperar la cartera a partir de una copia de seguridad. El rescaneo automático garantiza que el historial de la cartera quede sincronizado con la blockchain tras la importación.",
  inputs: [
    {
      ...English.inputs[0],
      description: "La ruta del archivo de dump a importar.",
    },
  ],
};
