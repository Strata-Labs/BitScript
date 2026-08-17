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
    "Imagina recibir invitados en casa y haberles negado la entrada a algunos por un malentendido. Una vez resuelto, quieres permitirles entrar de nuevo. El comando «clearbanned» hace algo muy parecido con tus conexiones de red. Es como volver a abrirles la puerta a los invitados que habías excluido por error. Este comando retira todos los bloqueos que habías impuesto sobre determinadas direcciones IP o subredes y les permite reconectarse a tu nodo.",
};
