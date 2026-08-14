import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "newkeypool")!;

export const newkeypoolEs: RPCFunctionParams = {
  ...English,
  category: "Billetera",
  summary:
    "Recarga completamente el keypool con nuevas claves.",
  description:
    "Vacía y recrea el pool de claves de la billetera.",
  howIsThisUsed:
    "El RPC newkeypool sirve para refrescar el keypool de una billetera Bitcoin, asegurando que se puedan generar nuevas direcciones para recibir transacciones. Es esencial para mantener la seguridad y el buen funcionamiento de la billetera, en particular en billeteras no-HD donde la gestión de claves no es automática. Al vaciar y luego rellenar el keypool, se genera un nuevo conjunto de claves para recibir fondos de forma segura. Es necesario un respaldo inmediato después de esta operación, sobre todo en billeteras no-HD, para incluir las nuevas claves. En caso de restaurar un respaldo HD, ejecutar newkeypool y luego un rescan es necesario para que los fondos recibidos en las nuevas direcciones sean reconocidos.",
};
