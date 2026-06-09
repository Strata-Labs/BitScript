import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getdeploymentinfo")!;

export const getdeploymentinfoEs: RPCFunctionParams = {
  ...English,
  category: "Blockchain",
  summary:
    "Devuelve el estado de los deployments de soft-fork.",
  description:
    "Proporciona el estado de las activaciones de soft-forks mediante BIP9/BIP8.",
  howIsThisUsed:
    "Imagine formar parte de una comunidad que decide nuevas reglas o modificaciones mediante consenso colectivo. Para decidir con conocimiento de causa o comprender el estado actual de las reglas, necesitaría un medio fiable para hacer seguimiento de qué propuestas han sido aceptadas, cuáles están pendientes y cuáles se han aplicado plenamente. En la red Bitcoin, «getdeploymentinfo» cumple esta función para el seguimiento de los cambios en las reglas de consenso, implementados mediante mecanismos como los soft forks.",
};
