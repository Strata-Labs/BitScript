import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "signrawtransactionwithwallet")!;

export const signrawtransactionwithwalletEs: RPCFunctionParams = {
  ...English,
  category: "Billetera",
  summary:
    "Firma una transacción cruda con las claves de la billetera.",
  description:
    "Intenta firmar cada entrada de una transacción cruda utilizando la billetera.",
  howIsThisUsed:
    "Este comando se utiliza para firmar las entradas de una transacción cruda con las claves almacenadas en la billetera, es un método práctico para firmar sin especificar manualmente las claves privadas. Facilita la firma con las claves gestionadas por la billetera, garantizando seguridad y simplicidad. Devuelve la transacción firmada junto con información sobre su integridad y cualquier error de verificación de script que se haya producido durante el proceso.",
  inputs: [
    {
      ...English.inputs[0],
      description: "La transacción cruda en hex.",
    },
    {
      ...English.inputs[1],
      description: "Arreglo JSON de los UTXO previos (opcional).",
    },
  ],
};
