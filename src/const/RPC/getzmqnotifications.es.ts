import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "getzmqnotifications")!;

export const getzmqnotificationsEs: RPCFunctionParams = {
  ...English,
  category: "ZMQ",
  summary:
    "Devuelve la configuración de las notificaciones ZMQ.",
  description:
    "Lista los endpoints ZMQ activos y los temas asociados.",
  howIsThisUsed:
    "Este comando es esencial para los usuarios que aprovechan las notificaciones ZeroMQ en su aplicación o infraestructura Bitcoin. Ofrece una visión de los tipos de notificaciones recibidas, así como de las direcciones de publicación asociadas y la configuración del procesamiento de mensajes. Comprender las notificaciones ZeroMQ activas es crucial para supervisar e integrar eficazmente los eventos y los flujos de datos relacionados con Bitcoin en sistemas y aplicaciones externas.",
};
