import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "listunspent")!;

export const listunspentEs: RPCFunctionParams = {
  ...English,
  category: "Billetera",
  summary:
    "Lista las salidas sin gastar (UTXO) de la billetera.",
  description:
    "Devuelve todos los UTXO controlados por la billetera con sus importes y direcciones.",
  howIsThisUsed:
    "El comando listunspent sirve para recuperar la lista de salidas sin gastar (UTXO) dentro de un rango de confirmaciones determinado. Es esencial para construir nuevas transacciones, ya que aporta información sobre los fondos disponibles. La posibilidad de filtrar por direcciones permite obtener los UTXO de direcciones concretas, facilitando la creación dirigida de transacciones. El parámetro include_unsafe permite controlar la inclusión de salidas que no son seguras de gastar, ofreciendo flexibilidad en la gestión de los fondos.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Número mínimo de confirmaciones.",
    },
    {
      ...English.inputs[1],
      description: "Número máximo de confirmaciones.",
    },
    {
      ...English.inputs[2],
      description: "Lista de direcciones a incluir.",
    },
    {
      ...English.inputs[3],
      description: "Incluir UTXO no seguros.",
    },
    {
      ...English.inputs[4],
      description: "Opciones de filtro (minimumAmount, maximumAmount, etc.).",
    },
  ],
};
