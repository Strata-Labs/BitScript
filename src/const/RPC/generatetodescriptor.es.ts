import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "generatetodescriptor")!;

export const generatetodescriptorEs: RPCFunctionParams = {
  ...English,
  category: "Generación",
  summary:
    "Mina bloques inmediatamente hacia un descriptor.",
  description:
    "Genera un número dado de bloques y envía la recompensa al descriptor proporcionado.",
  howIsThisUsed:
    "Imagine un chef que experimenta con recetas y necesita que ciertos ingredientes sean entregados instantáneamente para probar diferentes platos. En Bitcoin, el comando « generatetodescriptor » actúa como un servicio de entrega directa de las recompensas de bloque, permitiendo a los desarrolladores minar instantáneamente bloques y dirigir las recompensas a salidas definidas por un descriptor preciso. Este descriptor describe exactamente cómo deben distribuirse las recompensas, ofreciendo precisión en la asignación de los bitcoins minados. Es particularmente útil en entornos de desarrollo y prueba donde se necesita simular la creación de bloques bajo condiciones precisas para probar aplicaciones de blockchain, smart contracts o funcionalidades de cartera.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Número de bloques a generar.",
    },
    {
      ...English.inputs[1],
      description: "El descriptor que recibe la coinbase.",
    },
    {
      ...English.inputs[2],
      description: "Número máximo de iteraciones de minería (opcional).",
    },
  ],
};
