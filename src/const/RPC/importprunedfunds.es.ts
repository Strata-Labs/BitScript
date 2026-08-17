import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "importprunedfunds")!;

export const importprunedfundsEs: RPCFunctionParams = {
  ...English,
  category: "Billetera",
  summary:
    "Importa los fondos correspondientes a una transacción podada.",
  description:
    "Se utiliza cuando se trabaja con un nodo podado y aun así se desea importar una transacción.",
  howIsThisUsed:
    "Resulta especialmente útil para los usuarios de billeteras podadas que desean importar fondos procedentes de determinadas transacciones. Al importarlos sin activar un rescaneo, los fondos se gestionan de forma eficiente sin necesidad de sincronizarse con toda la blockchain. Permite trabajar con una configuración podada y, al mismo tiempo, acceder a los fondos y administrarlos. Atención: cualquier transacción posterior que gaste las salidas importadas también debe importarse, o bien debe realizarse un rescaneo para actualizar el estado de la billetera.",
  inputs: [
    {
      ...English.inputs[0],
      description: "La transacción cruda en hex.",
    },
    {
      ...English.inputs[1],
      description: "La prueba TXout en hex.",
    },
  ],
};
