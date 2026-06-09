import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "clearbanned")!;

export const clearbannedEs: RPCFunctionParams = {
  ...English,
  category: "Red",
  summary:
    "Borra la lista de pares baneados.",
  description:
    "Restablece la lista de baneos mantenida por el nodo.",
  howIsThisUsed:
    "Imagine recibir invitados en casa y haber decidido apartar a algunos por malentendidos. Una vez resueltas esas diferencias, quiere volver a acogerlos. El comando «clearbanned» en Bitcoin hace algo muy parecido con sus conexiones de red. Es como abrir de par en par las puertas tras darse cuenta de que se había excluido por error a ciertos invitados. Este comando retira todos los bloqueos que había impuesto sobre determinadas direcciones IP o subredes, permitiéndoles reconectarse a su nodo.",
};
