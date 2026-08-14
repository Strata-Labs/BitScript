import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "listtransactions")!;

export const listtransactionsEs: RPCFunctionParams = {
  ...English,
  category: "Billetera",
  summary:
    "Devuelve las transacciones más recientes de la billetera.",
  description:
    "Lista las transacciones de la billetera con paginación por cuenta o etiqueta.",
  howIsThisUsed:
    "El comando listtransactions sirve para recuperar un número determinado de transacciones recientes del historial de la billetera. Ayuda a los usuarios y a las aplicaciones a hacer seguimiento de la actividad, supervisar los pagos entrantes y salientes y administrar las finanzas. Asimismo, ofrece flexibilidad para filtrar por etiqueta, lo que permite organizar y analizar las transacciones con mayor eficacia.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Etiqueta por la que filtrar. «*» para todas.",
    },
    {
      ...English.inputs[1],
      description: "Número de transacciones a devolver.",
    },
    {
      ...English.inputs[2],
      description: "Desplazamiento a partir del cual devolver.",
    },
    {
      ...English.inputs[3],
      description: "Incluir las transacciones watch-only.",
    },
  ],
};
