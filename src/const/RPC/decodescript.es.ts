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
    "Imagina descubrir un pergamino antiguo con instrucciones escritas en una lengua misteriosa. Ese pergamino guarda los secretos para desbloquear un tesoro, pero solo si sabes descifrar sus instrucciones. En Bitcoin, los scripts son esas instrucciones: guían cómo se procesan y se aseguran las transacciones. Pero suelen estar escritos en un formato compacto, codificado en hex, poco legible. El comando «decodescript» es la llave que traduce esas instrucciones cifradas a un lenguaje claro, revelando el propósito, la estructura y los detalles operativos del script.",
  inputs: [
    {
      ...English.inputs[0],
      description: "El script en hex a decodificar.",
    },
  ],
};
