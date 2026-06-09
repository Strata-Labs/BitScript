import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "listreceivedbylabel")!;

export const listreceivedbylabelEs: RPCFunctionParams = {
  ...English,
  category: "Cartera",
  summary:
    "Lista los bitcoins recibidos por etiqueta.",
  description:
    "Devuelve cada etiqueta de la cartera con el total recibido por sus direcciones.",
  howIsThisUsed:
    "El comando listreceivedbylabel sirve para hacer seguimiento de las transacciones recibidas, agrupadas por etiqueta. Resulta especialmente útil para gestionar y organizar las transacciones dentro de la cartera, ya que permite hacer seguimiento de los pagos entrantes asociados a etiquetas o categorías específicas. También facilita el análisis y la elaboración de informes financieros al ofrecer una visión de la distribución de los fondos recibidos entre las distintas etiquetas.",
  inputs: [
    {
      ...English.inputs[0],
      description: "El número mínimo de confirmaciones.",
    },
    {
      ...English.inputs[1],
      description: "Incluir las etiquetas que no hayan recibido nada.",
    },
    {
      ...English.inputs[2],
      description: "Incluir las direcciones watch-only.",
    },
  ],
};
