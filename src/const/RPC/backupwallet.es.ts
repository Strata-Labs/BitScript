import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "backupwallet")!;

export const backupwalletEs: RPCFunctionParams = {
  ...English,
  category: "Billetera",
  summary:
    "Realiza un respaldo del archivo de la billetera en el destino especificado.",
  description:
    "Este comando crea un respaldo del archivo de la billetera en la ubicación indicada.",
  howIsThisUsed:
    "Piensa en tu billetera de Bitcoin como una caja fuerte digital —un álbum de fotos, salvo que en lugar de imágenes guarda bitcoins—. De la misma forma que se hacen copias de fotos familiares valiosas para evitar perderlas tras una avería, el comando «backupwallet» te permite crear una copia segura de tu billetera de Bitcoin. Es como duplicar toda la colección en una memoria USB o en un servicio en la nube, garantizando que, si la computadora falla, tus activos digitales permanezcan a salvo y recuperables.",
  inputs: [
    {
      ...English.inputs[0],
      description: "El destino del respaldo. Puede ser un directorio o una ruta de archivo.",
    },
  ],
};
