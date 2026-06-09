import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getblocktemplate")!;

export const getblocktemplateEs: RPCFunctionParams = {
  ...English,
  category: "Mining",
  summary:
    "Devuelve una plantilla de bloque para mining.",
  description:
    "Proporciona los datos necesarios (template) para que un minero construya un nuevo bloque.",
  howIsThisUsed:
    "Imagine a un arquitecto a punto de comenzar un nuevo edificio. Antes de empezar, necesita un plano que describa qué construir, los materiales a utilizar y otras especificaciones. De manera análoga, en el mining de Bitcoin, el comando «getblocktemplate» sirve como plano para construir un nuevo bloque. Proporciona a los mineros la información necesaria para iniciar el minado de un nuevo bloque: qué transacciones incluir, las comisiones asociadas a esas transacciones y diversos otros parámetros críticos para el proceso de mining.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Objeto JSON con las reglas y capacidades del cliente.",
    },
  ],
};
