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
    "Imagina a un chef que experimenta con recetas y necesita que ciertos ingredientes le lleguen al instante para probar distintos platos. En Bitcoin, el comando «generatetodescriptor» funciona como ese servicio de entrega directa de las recompensas de bloque: permite a los desarrolladores minar bloques al instante y dirigir las recompensas a salidas definidas por un descriptor. Ese descriptor indica exactamente cómo deben repartirse las recompensas, lo que da precisión al asignar los bitcoins minados. Es muy útil en entornos de desarrollo y prueba donde necesitas simular la creación de bloques bajo condiciones precisas para probar aplicaciones, smart contracts o funciones de billetera.",
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
