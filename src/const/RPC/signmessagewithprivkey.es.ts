import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "signmessagewithprivkey")!;

export const signmessagewithprivkeyEs: RPCFunctionParams = {
  ...English,
  category: "Utilidades",
  summary:
    "Firma un mensaje con una clave privada arbitraria.",
  description:
    "Produce una firma de mensaje sin necesidad de la cartera.",
  howIsThisUsed:
    "Este comando se utiliza cuando se dispone de acceso directo a una clave privada y no es necesario recurrir a una cartera o frase de contraseña. Permite firmar mensajes con una clave privada específica, lo que puede resultar útil para firmar mensajes sin conexión o cuando el firmante desea un control total sobre el proceso. Se emplea habitualmente para mensajes de autenticación o para la verificación criptográfica de la identidad.",
  inputs: [
    {
      ...English.inputs[0],
      description: "La clave privada (WIF).",
    },
    {
      ...English.inputs[1],
      description: "El mensaje a firmar.",
    },
  ],
};
