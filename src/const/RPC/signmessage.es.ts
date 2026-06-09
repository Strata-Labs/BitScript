import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "signmessage")!;

export const signmessageEs: RPCFunctionParams = {
  ...English,
  category: "Cartera",
  summary:
    "Firma un mensaje con la clave privada de una dirección.",
  description:
    "Produce una firma que demuestra la posesión de una dirección.",
  howIsThisUsed:
    "Este comando se utiliza para aportar una prueba criptográfica de posesión o autoría de un mensaje firmándolo con la clave privada correspondiente a una dirección Bitcoin. La firma obtenida puede verificarse posteriormente mediante el comando verifymessage. Se emplea habitualmente para demostrar la posesión de una dirección Bitcoin, firmar mensajes con fines de autenticación o realizar la verificación criptográfica de la identidad.",
  inputs: [
    {
      ...English.inputs[0],
      description: "La dirección Bitcoin utilizada para firmar.",
    },
    {
      ...English.inputs[1],
      description: "El mensaje a firmar.",
    },
  ],
};
