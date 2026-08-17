import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getnetworkinfo")!;

export const getnetworkinfoFr: RPCFunctionParams = {
  ...English,
  category: "Réseau",
  summary:
    "Renvoie des informations détaillées sur l'état du réseau pair-à-pair.",
  description:
    "Fournit la version, les services, le tarif relais minimum et l'état des connexions.",
  howIsThisUsed:
    "Essentielle pour comprendre la connectivité et l'état opérationnel du nœud au sein du réseau Bitcoin, facilitant le diagnostic et la surveillance du réseau.",
};
