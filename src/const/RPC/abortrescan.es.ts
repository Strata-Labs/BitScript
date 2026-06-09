import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "abortrescan")!;

export const abortrescanEs: RPCFunctionParams = {
  ...English,
  category: "Cartera",
  summary:
    "Detiene el reescaneo en curso de la cartera en busca de transacciones.",
  description:
    "Este comando RPC se utiliza para interrumpir una operación de reescaneo en curso en la cartera.",
  howIsThisUsed:
    "¿Su ordenador funciona a pleno rendimiento, analizando cada transacción de su cartera de Bitcoin, y cambia de opinión? Igual que uno puede decidir a mitad de camino que organizar las fotos digitales es demasiado tedioso, el comando «abortrescan» ofrece una vía de escape. Cuando un reescaneo de la cartera —que verifica el historial de transacciones— se vuelve innecesario, demasiado largo o se inicia por accidente, «abortrescan» entra en acción. Este comando detiene instantáneamente el reescaneo, libera su cartera (y su paciencia) de la espera y permite utilizar la cartera de inmediato, ahorrando tiempo y recursos.",
};
