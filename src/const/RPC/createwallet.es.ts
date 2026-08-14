import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "createwallet")!;

export const createwalletEs: RPCFunctionParams = {
  ...English,
  category: "Billetera",
  summary:
    "Crea y carga una nueva billetera con el nombre y los parámetros especificados.",
  description:
    "Este comando inicializa una nueva billetera con un nombre y opciones configurables.",
  howIsThisUsed:
    "Imagina que tu billetera física pudiera crear sobre la marcha compartimentos distintos para cada necesidad: uno para la compra, otro para el ahorro, un tercero para el ocio. El comando «createwallet» de Bitcoin Core lleva esa idea a tu dinero digital. Permite crear nuevas billeteras separadas dentro del mismo Bitcoin Core, cada una con su propio nombre y parámetros adaptados a un objetivo concreto —como tantos bolsillos personalizados para tus distintas necesidades de almacenamiento—.",
  inputs: [
    {
      ...English.inputs[0],
      description: "El nombre de la nueva billetera.",
    },
    {
      ...English.inputs[1],
      description: "Si es verdadero, desactiva las claves privadas para esta billetera.",
    },
    {
      ...English.inputs[2],
      description: "Si es verdadero, crea una billetera en blanco sin clave HD ni claves importadas.",
    },
    {
      ...English.inputs[3],
      description: "Frase de contraseña para cifrar la billetera. Vacía si no está cifrada.",
    },
    {
      ...English.inputs[4],
      description: "Si es verdadero, desactiva las funciones de reutilización de direcciones.",
    },
    {
      ...English.inputs[5],
      description: "Si es verdadero, utiliza descriptores en lugar de la gestión de claves legacy.",
    },
    {
      ...English.inputs[6],
      description: "Si es verdadero, carga la billetera al iniciar el nodo.",
    },
  ],
};
