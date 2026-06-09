import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "decodescript")!;

export const decodescriptEs: RPCFunctionParams = {
  ...English,
  category: "Transacciones sin procesar",
  summary:
    "Decodifica un script (hex) a una representación legible.",
  description:
    "Devuelve el análisis de un script en op_codes y datos.",
  howIsThisUsed:
    "Imagine descubrir un pergamino antiguo con instrucciones escritas en una lengua codificada y misteriosa. Ese pergamino guarda los secretos para desbloquear un tesoro, pero solo si sabe descifrar sus instrucciones. En Bitcoin, los scripts son esas instrucciones, que guían cómo se procesan y aseguran las transacciones. Sin embargo, suelen estar escritos en un formato compacto, codificado en hex, poco legible. El comando «decodescript» es la llave que traduce esas instrucciones cifradas a un lenguaje comprensible, revelando el propósito, la estructura y los detalles operativos del script.",
  inputs: [
    {
      ...English.inputs[0],
      description: "El script en hex a decodificar.",
    },
  ],
};
