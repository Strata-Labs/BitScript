import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "setwalletflag")!;

export const setwalletflagEs: RPCFunctionParams = {
  ...English,
  category: "Cartera",
  summary:
    "Activa o desactiva un wallet flag.",
  description:
    "Permite modificar indicadores de comportamiento de la cartera.",
  howIsThisUsed:
    "Este comando se utiliza para gestionar comportamientos o ajustes específicos de la cartera activando o desactivando wallet flags. Por ejemplo, el flag « avoid_reuse » mejora la privacidad y la seguridad al impedir que la cartera gaste desde direcciones ya utilizadas. Al cambiar el estado de flags como « avoid_reuse », se personaliza el comportamiento de la cartera según las preferencias y los requisitos de seguridad del usuario.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Nombre del wallet flag a modificar.",
    },
    {
      ...English.inputs[1],
      description: "Valor booleano del wallet flag.",
    },
  ],
};
