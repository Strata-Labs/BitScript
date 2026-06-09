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
    "Imagine al responsable de un equipo de seguridad encargado de proteger un objeto valioso. Cada miembro del equipo posee una llave especial necesaria para el acceso. De forma similar, en Bitcoin, los firmantes externos (hardware wallets o dispositivos de seguridad especiales) desempeñan el papel de esos miembros, cada uno con una llave (capacidad de firma) para autorizar transacciones. El comando « enumeratesigners » equivale a pasar lista para ver qué miembros del equipo de seguridad (firmantes externos) están presentes y listos para proteger su Bitcoin. Lista todos los dispositivos o servicios externos configurados para funcionar con su cartera Bitcoin, proporcionando detalles como sus identificadores únicos y sus nombres. Esto ayuda a gestionar y verificar los dispositivos autorizados a firmar transacciones, garantizando la seguridad de su Bitcoin.",
};
