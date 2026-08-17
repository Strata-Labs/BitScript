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
    "Imagina un videojuego donde puedes crear recursos u objetos al instante para probar estrategias o avanzar más rápido. En el desarrollo de Bitcoin, el comando «generatetoaddress» cumple un papel parecido, pero en entornos de prueba. Con él, los desarrolladores pueden minar al instante una cantidad determinada de bloques y enviar todas las recompensas a una dirección concreta. Es muy útil cuando necesitas simular rápido la creación de bloques para probar transacciones, confirmaciones y el reparto de recompensas de minería sin esperar condiciones reales.",
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
