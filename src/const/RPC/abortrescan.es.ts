import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "abortrescan")!;

export const abortrescanEs: RPCFunctionParams = {
  ...English,
  category: "Billetera",
  summary:
    "Detiene el reescaneo en curso de la billetera en busca de transacciones.",
  description:
    "Este comando RPC se utiliza para interrumpir una operación de reescaneo en curso en la billetera.",
  howIsThisUsed:
    "¿Tu computadora está a pleno rendimiento analizando cada transacción de tu billetera de Bitcoin y cambias de opinión? Igual que uno puede decidir a mitad de camino que organizar las fotos digitales es demasiado tedioso, el comando «abortrescan» ofrece una vía de escape. Cuando un reescaneo de la billetera —que verifica el historial de transacciones— se vuelve innecesario, demasiado largo o se inicia por accidente, «abortrescan» entra en acción. Este comando detiene el reescaneo al instante, libera tu billetera (y tu paciencia) de la espera y te permite usarla de inmediato, ahorrando tiempo y recursos.",
};
