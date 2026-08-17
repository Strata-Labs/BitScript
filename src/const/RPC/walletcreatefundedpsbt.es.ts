import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "walletcreatefundedpsbt")!;

export const walletcreatefundedpsbtEs: RPCFunctionParams = {
  ...English,
  category: "Billetera",
  summary:
    "Construye y financia un PSBT a partir de la billetera.",
  description:
    "Crea una transacción parcialmente firmada (PSBT) seleccionando los UTXO de la billetera.",
  howIsThisUsed:
    "El comando walletcreatefundedpsbt se utiliza para construir y financiar transacciones de forma segura dentro de la billetera Bitcoin. Resulta especialmente útil para construir transacciones complejas con requisitos específicos, como multifirma o comisiones personalizadas. Este comando ofrece flexibilidad y control sobre el proceso de creación, garantizando que las transacciones cumplan los criterios deseados antes de su finalización y difusión en la red Bitcoin.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Matriz de entradas a utilizar (opcional).",
    },
    {
      ...English.inputs[1],
      description: "Objeto JSON de destinatarios {dirección: importe}.",
    },
    {
      ...English.inputs[2],
      description: "Locktime a aplicar.",
    },
    {
      ...English.inputs[3],
      description: "Opciones de financiación (comisiones, replaceable, etc.).",
    },
    {
      ...English.inputs[4],
      description: "Incluir información bip32 para los firmantes.",
    },
  ],
};
