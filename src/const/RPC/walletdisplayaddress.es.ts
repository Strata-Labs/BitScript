import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "walletdisplayaddress")!;

export const walletdisplayaddressEs: RPCFunctionParams = {
  ...English,
  category: "Cartera",
  summary:
    "Muestra una dirección en la pantalla de un firmante externo.",
  description:
    "Solicita al firmante hardware que muestre la dirección para su verificación.",
  howIsThisUsed:
    "El comando walletdisplayaddress se utiliza para verificar la autenticidad de una dirección Bitcoin mostrándola en un firmante externo. Resulta especialmente útil cuando se requieren medidas de seguridad adicionales, como confirmar la corrección de una dirección antes de iniciar una transacción. Comparando la dirección mostrada con la proporcionada, se asegura de que no haya sido alterada y puede proceder con total confianza.",
};
