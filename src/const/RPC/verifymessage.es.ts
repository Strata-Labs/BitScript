import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "verifymessage")!;

export const verifymessageEs: RPCFunctionParams = {
  ...English,
  category: "Utilidades",
  summary:
    "Verifica que un mensaje haya sido firmado por el propietario de una dirección.",
  description:
    "Verifica una firma de mensaje generada por `signmessage`.",
  howIsThisUsed:
    "Sirve para demostrar la propiedad de una dirección Bitcoin o para verificar que un remitente posee la clave privada, lo que refuerza la seguridad y la confianza en las comunicaciones relacionadas con las transacciones Bitcoin.",
  inputs: [
    {
      ...English.inputs[0],
      description: "La dirección Bitcoin utilizada para firmar.",
    },
    {
      ...English.inputs[1],
      description: "La firma en base64.",
    },
    {
      ...English.inputs[2],
      description: "El mensaje firmado.",
    },
  ],
};
