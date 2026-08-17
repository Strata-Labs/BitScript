import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "walletpassphrase")!;

export const walletpassphraseEs: RPCFunctionParams = {
  ...English,
  category: "Billetera",
  summary:
    "Desbloquea la billetera durante un periodo determinado.",
  description:
    "Almacena temporalmente la frase de contraseña para autorizar las firmas.",
  howIsThisUsed:
    "Se utiliza para desbloquear temporalmente la billetera almacenando la clave de descifrado en memoria durante un periodo determinado. Es necesario antes de realizar operaciones que utilicen las claves privadas (enviar bitcoins). Al proporcionar la frase de contraseña y la duración, se desbloquea la billetera durante una ventana limitada — ejecución segura de las transacciones sin exponer la clave de descifrado durante demasiado tiempo. Esto mejora la seguridad de la billetera al minimizar la exposición de información sensible permitiendo a la vez las operaciones necesarias.",
  inputs: [
    {
      ...English.inputs[0],
      description: "La frase de contraseña de la billetera.",
    },
    {
      ...English.inputs[1],
      description: "Duración en segundos durante la cual la billetera permanece desbloqueada.",
    },
  ],
};
