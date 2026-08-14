import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "encryptwallet")!;

export const encryptwalletEs: RPCFunctionParams = {
  ...English,
  category: "Billetera",
  summary:
    "Cifra la billetera con una frase de contraseña.",
  description:
    "Este comando cifra la billetera para proteger las claves privadas mediante una frase de contraseña.",
  howIsThisUsed:
    "Piensa en tu billetera de Bitcoin como una caja fuerte digital donde guardas tu dinero. Igual que cierras una caja fuerte física con una combinación, el comando «encryptwallet» te permite definir una frase de contraseña que bloquea la billetera. Una vez definida, hace falta esa frase para abrir la billetera o autorizar una transacción, lo que agrega una capa de seguridad. Es clave para proteger tus fondos de cualquier acceso no autorizado, ya sea por hackers, software malicioso o incluso el robo físico de tu computadora o dispositivo.",
  inputs: [
    {
      ...English.inputs[0],
      description: "La frase de contraseña utilizada para cifrar la billetera.",
    },
  ],
};
