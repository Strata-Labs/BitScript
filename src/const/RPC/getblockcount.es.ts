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
    "Imagine que sube una montaña y quiere saber con precisión a qué altura está respecto al nivel del mar para medir su progreso. En la blockchain Bitcoin, el comando « getblockcount » ofrece una medida análoga: cuántos bloques se han añadido a la blockchain desde el primero — el bloque genesis. Este conteo da una idea clara de la longitud de la blockchain, indicador directo de su crecimiento y de su actividad a lo largo del tiempo.",
};
