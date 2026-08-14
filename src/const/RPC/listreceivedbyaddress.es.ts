import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "listreceivedbyaddress")!;

export const listreceivedbyaddressEs: RPCFunctionParams = {
  ...English,
  category: "Billetera",
  summary:
    "Lista los bitcoins recibidos por dirección.",
  description:
    "Devuelve cada dirección de la billetera con el total recibido.",
  howIsThisUsed:
    "Sirve para obtener una visión completa de los saldos vinculados a las direcciones de recepción de la billetera. Proporciona la información esencial para el seguimiento de los pagos entrantes, la confirmación de transacciones y la gestión de saldos. Además, ofrece flexibilidad gracias a diversas opciones para filtrar y personalizar los resultados según las necesidades.",
  inputs: [
    {
      ...English.inputs[0],
      description: "El número mínimo de confirmaciones.",
    },
    {
      ...English.inputs[1],
      description: "Incluir las direcciones que no hayan recibido nada.",
    },
    {
      ...English.inputs[2],
      description: "Incluir las direcciones watch-only.",
    },
    {
      ...English.inputs[3],
      description: "Filtrar por una dirección concreta.",
    },
  ],
};
