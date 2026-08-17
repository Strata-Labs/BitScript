import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "walletlock")!;

export const walletlockEs: RPCFunctionParams = {
  ...English,
  category: "Billetera",
  summary:
    "Bloquea la billetera, borrando la frase de contraseña de la memoria.",
  description:
    "Bloquea inmediatamente las operaciones que requieren la frase de contraseña.",
  howIsThisUsed:
    "El comando walletlock se utiliza para reforzar la seguridad de la billetera bloqueándola cuando no está en uso. Impide cualquier acceso no autorizado a las funciones y fondos de la billetera, especialmente cuando esta no está activa. Es una buena práctica recomendada bloquear la billetera en reposo para prevenir accesos no autorizados y posibles robos.",
};
