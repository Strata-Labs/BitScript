import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "walletlock")!;

export const walletlockEs: RPCFunctionParams = {
  ...English,
  category: "Cartera",
  summary:
    "Bloquea la cartera, borrando la frase de contraseña de la memoria.",
  description:
    "Bloquea inmediatamente las operaciones que requieren la frase de contraseña.",
  howIsThisUsed:
    "El comando walletlock se utiliza para reforzar la seguridad de la cartera bloqueándola cuando no está en uso. Impide cualquier acceso no autorizado a las funciones y fondos de la cartera, especialmente cuando esta no está activa. Es una buena práctica recomendada bloquear la cartera en reposo para prevenir accesos no autorizados y posibles robos.",
};
