import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "walletpassphrasechange")!;

export const walletpassphrasechangeEs: RPCFunctionParams = {
  ...English,
  category: "Billetera",
  summary:
    "Cambia la frase de contraseña de la billetera.",
  description:
    "Sustituye la antigua frase de contraseña por una nueva.",
  howIsThisUsed:
    "Se utiliza para actualizar la frase de contraseña de la billetera pasando de la antigua a una nueva. Resulta crucial para mantener la seguridad al permitir cambiar regularmente la frase de contraseña, lo que reduce el riesgo de acceso no autorizado o compromiso. Al proporcionar la frase de contraseña actual y la nueva, se garantiza que la billetera permanezca protegida por medidas actualizadas. Esencial para las prácticas de seguridad proactivas, refuerza la protección global de los activos e información sensible.",
  inputs: [
    {
      ...English.inputs[0],
      description: "La frase de contraseña antigua.",
    },
    {
      ...English.inputs[1],
      description: "La nueva frase de contraseña.",
    },
  ],
};
