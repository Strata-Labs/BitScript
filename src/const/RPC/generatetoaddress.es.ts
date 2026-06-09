import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "generatetoaddress")!;

export const generatetoaddressEs: RPCFunctionParams = {
  ...English,
  category: "Generación",
  summary:
    "Mina bloques inmediatamente hacia una dirección (regtest).",
  description:
    "Genera un número dado de bloques y envía la recompensa a la dirección proporcionada.",
  howIsThisUsed:
    "Imagine un videojuego en el que puede crear instantáneamente recursos u objetos para probar diferentes estrategias o avanzar más rápido. En el mundo del desarrollo Bitcoin, el comando « generatetoaddress » cumple un rol similar pero en entornos de prueba. Al usarlo, los desarrolladores pueden minar instantáneamente un número dado de bloques, enviando todas las recompensas a una dirección Bitcoin precisa. Es particularmente útil en desarrollo y pruebas cuando se necesita simular rápidamente la creación de bloques para probar transacciones, confirmaciones y la asignación de recompensas de minería sin esperar condiciones reales.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Número de bloques a generar.",
    },
    {
      ...English.inputs[1],
      description: "La dirección Bitcoin que recibe la coinbase.",
    },
    {
      ...English.inputs[2],
      description: "Número máximo de iteraciones de minería (opcional).",
    },
  ],
};
