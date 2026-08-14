import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "dumpwallet")!;

export const dumpwalletEs: RPCFunctionParams = {
  ...English,
  category: "Billetera",
  summary:
    "Exporta todas las claves de la billetera a un archivo legible por humanos.",
  description:
    "Este comando guarda todas las claves privadas de la billetera en un archivo de texto.",
  howIsThisUsed:
    "Imagina una caja fuerte llena de objetos valiosos, cada uno con su propia cerradura y su propia llave. El comando «dumpwallet» equivale a armar un mapa detallado que enumera cada llave y su cerradura. Ese mapa se guarda en un archivo legible, así que puedes ver qué llave abre cuál cerradura. Al usarlo, creas un respaldo completo de todas las claves (incluidas las secretas) del Bitcoin guardado en tu billetera. Es esencial para asegurar el acceso a tus bitcoins, sobre todo si el software de la billetera deja de funcionar, si tu computadora falla o si decides cambiar de billetera.",
  inputs: [
    {
      ...English.inputs[0],
      description: "La ruta del archivo donde exportar las claves de la billetera.",
    },
  ],
};
