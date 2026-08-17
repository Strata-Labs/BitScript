import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getblockcount")!;

export const getblockcountEs: RPCFunctionParams = {
  ...English,
  category: "Blockchain",
  summary:
    "Devuelve la altura actual de la blockchain.",
  description:
    "Devuelve el número de bloques presentes en la cadena más larga.",
  howIsThisUsed:
    "Imagina que subes una montaña y quieres saber con precisión a qué altura estás sobre el nivel del mar para medir tu avance. En la blockchain de Bitcoin, el comando «getblockcount» da una medida parecida: cuántos bloques se han agregado desde el primero, el bloque génesis. Ese conteo da una idea clara de la longitud de la cadena, que es un indicador directo de su crecimiento y de su actividad con el tiempo.",
};
