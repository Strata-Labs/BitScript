import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "dumpwallet")!;

export const dumpwalletEs: RPCFunctionParams = {
  ...English,
  category: "Cartera",
  summary:
    "Exporta todas las claves de la cartera a un archivo legible por humanos.",
  description:
    "Este comando guarda todas las claves privadas de la cartera en un archivo de texto.",
  howIsThisUsed:
    "Imagine una caja fuerte llena de objetos valiosos, cada uno con su propia cerradura y su propia llave. El comando «dumpwallet» equivale a elaborar un mapa detallado que enumera cada llave para cada cerradura de la caja. Ese mapa se guarda en un archivo legible, lo que permite comprender qué llave abre qué cerradura. Al usarlo, crea una copia de seguridad completa de todas las claves (incluidas las secretas) del Bitcoin almacenado en su cartera. Es esencial para garantizar el acceso a sus bitcoins, en particular si el software de la cartera deja de funcionar, si su ordenador falla o si decide cambiar de cartera de Bitcoin.",
  inputs: [
    {
      ...English.inputs[0],
      description: "La ruta del archivo donde exportar las claves de la cartera.",
    },
  ],
};
