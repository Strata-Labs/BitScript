import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "listdescriptors")!;

export const listdescriptorsEs: RPCFunctionParams = {
  ...English,
  category: "Cartera",
  summary:
    "Lista los descriptores presentes en la cartera.",
  description:
    "Devuelve todos los descriptores (output descriptors) registrados en la cartera.",
  howIsThisUsed:
    "Sirve para obtener la lista de los descriptores importados en una cartera basada en descriptores. Ayuda a comprender la composición de la cartera y las características de cada descriptor. También permite revisar los descriptores privados cuando sea necesario, ofreciendo visibilidad sobre la configuración y el uso de la cartera.",
};
