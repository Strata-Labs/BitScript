import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "enumeratesigners")!;

export const enumeratesignersEs: RPCFunctionParams = {
  ...English,
  category: "Firmante",
  summary:
    "Lista los firmantes externos conectados.",
  description:
    "Enumera los dispositivos firmantes (hardware wallets) detectados.",
  howIsThisUsed:
    "Imagina al responsable de un equipo de seguridad encargado de proteger algo valioso. Cada miembro del equipo tiene una llave especial que hace falta para el acceso. De forma similar, en Bitcoin los firmantes externos (hardware wallets o dispositivos de seguridad) hacen el papel de esos miembros, cada uno con una llave (capacidad de firma) para autorizar transacciones. El comando «enumeratesigners» equivale a pasar lista para ver qué miembros del equipo están presentes y listos para proteger tu Bitcoin. Lista todos los dispositivos o servicios externos configurados para funcionar con tu billetera, con detalles como sus identificadores únicos y sus nombres. Así puedes revisar y verificar qué dispositivos están autorizados a firmar transacciones.",
};
