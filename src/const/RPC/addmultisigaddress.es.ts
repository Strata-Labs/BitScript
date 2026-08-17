import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "addmultisigaddress")!;

export const addmultisigaddressEs: RPCFunctionParams = {
  ...English,
  category: "Billetera",
  summary:
    "Crea una dirección multifirma con N firmas requeridas de entre M claves públicas proporcionadas.",
  description:
    "Sirve para crear una dirección multifirma.",
  howIsThisUsed:
    "¿Tu grupo organiza un fondo común para un regalo o una inversión compartida y exige que cualquier gasto pase por la aprobación de la mayoría? El comando «addmultisigaddress» añade una capa de seguridad a ese trabajo colaborativo, como la creación de una billetera compartida y segura. Establece una dirección de Bitcoin única que exige varias aprobaciones (firmas) de los miembros seleccionados del grupo para iniciar una transacción. Piénsala como una caja fuerte colectiva que solo se abre cuando suficientes titulares de confianza giran sus llaves al mismo tiempo. Esta configuración garantiza que los fondos solo salgan con consenso, protegiendo los activos del grupo mediante un mecanismo de aprobación integrado.",
  inputs: [
    {
      ...English.inputs[0],
      description: "El número de firmas requeridas de entre las n claves o direcciones.",
    },
    {
      ...English.inputs[1],
      description: "Las direcciones de Bitcoin o claves públicas codificadas en hex.",
    },
    {
      ...English.inputs[2],
      description: "Una etiqueta para asignar a las direcciones.",
    },
  ],
};
