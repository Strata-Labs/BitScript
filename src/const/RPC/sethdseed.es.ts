import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "sethdseed")!;

export const sethdseedEs: RPCFunctionParams = {
  ...English,
  category: "Billetera",
  summary:
    "Establece el hdseed de la billetera.",
  description:
    "Configura el hdseed determinista jerárquico utilizado para derivar las claves.",
  howIsThisUsed:
    "Este comando se utiliza para gestionar el hdseed de una billetera Bitcoin. Se puede generar un nuevo hdseed o proporcionar uno propio. Al establecer un nuevo hdseed, se garantiza que las claves derivadas posteriormente provienen de ese hdseed, reforzando la seguridad y la privacidad de la billetera. Es crucial realizar un nuevo respaldo de la billetera tras esta operación para protegerse contra la pérdida de fondos.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Si es verdadero, vacía el keypool.",
    },
    {
      ...English.inputs[1],
      description: "hdseed en hex (opcional).",
    },
  ],
};
