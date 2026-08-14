import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "upgradewallet")!;

export const upgradewalletEs: RPCFunctionParams = {
  ...English,
  category: "Billetera",
  summary:
    "Actualiza el formato de la billetera a la versión actual.",
  description:
    "Convierte la billetera a una versión más reciente del formato de almacenamiento.",
  howIsThisUsed:
    "Este comando se utiliza para asegurar que la billetera utiliza la última versión disponible, que puede incluir correcciones de seguridad importantes o mejoras. Es esencial actualizar periódicamente para mantener la compatibilidad con la red Bitcoin y beneficiarse de las últimas mejoras de funcionalidad y seguridad.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Versión objetivo (opcional).",
    },
  ],
};
