import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "backupwallet")!;

export const backupwalletEs: RPCFunctionParams = {
  ...English,
  category: "Cartera",
  summary:
    "Realiza una copia de seguridad del archivo de la cartera en el destino especificado.",
  description:
    "Este comando crea una copia de seguridad del archivo de la cartera en la ubicación indicada.",
  howIsThisUsed:
    "Considere su cartera de Bitcoin como una caja fuerte digital —un álbum de fotos, salvo que en lugar de imágenes guarda bitcoins—. De la misma forma que se hacen copias de fotos familiares valiosas para evitar perderlas tras una avería, el comando «backupwallet» permite crear una copia segura de su cartera de Bitcoin. Es como duplicar toda la colección en una memoria USB o en un servicio en la nube, garantizando que, si el ordenador falla, sus activos digitales permanezcan a salvo y recuperables.",
  inputs: [
    {
      ...English.inputs[0],
      description: "El destino de la copia de seguridad. Puede ser un directorio o una ruta de archivo.",
    },
  ],
};
