import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "encryptwallet")!;

export const encryptwalletEs: RPCFunctionParams = {
  ...English,
  category: "Cartera",
  summary:
    "Cifra la cartera con una frase de contraseña.",
  description:
    "Este comando cifra la cartera para proteger las claves privadas mediante una frase de contraseña.",
  howIsThisUsed:
    "Considere su cartera de Bitcoin como una caja fuerte digital donde guarda su dinero. Igual que se cierra una caja fuerte física con una combinación, el comando «encryptwallet» permite definir una frase de contraseña (una contraseña compleja) que bloquea la cartera. Una vez definida, esa frase de contraseña es necesaria para abrir la cartera o autorizar una transacción, añadiendo una capa de seguridad. Resulta crucial para proteger sus fondos frente a cualquier acceso no autorizado, ya sea por parte de piratas, software malicioso o incluso un robo físico de su ordenador o dispositivo.",
  inputs: [
    {
      ...English.inputs[0],
      description: "La frase de contraseña utilizada para cifrar la cartera.",
    },
  ],
};
