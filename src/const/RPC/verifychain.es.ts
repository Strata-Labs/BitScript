import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "verifychain")!;

export const verifychainEs: RPCFunctionParams = {
  ...English,
  category: "Blockchain",
  summary:
    "Verifica la integridad de la base de datos de la blockchain.",
  description:
    "Realiza una verificación de coherencia sobre los últimos N bloques.",
  howIsThisUsed:
    "El comando verifychain se utiliza para garantizar la integridad y exactitud de la base de datos local de la blockchain. Al verificar la validez de cada bloque y de los datos asociados, ayuda a mantener la fiabilidad y seguridad de la blockchain. Los distintos niveles de verificación permiten personalizar el proceso según las necesidades y los recursos disponibles.",
  inputs: [
    {
      ...English.inputs[0],
      description: "Nivel de verificación (0 a 4).",
    },
    {
      ...English.inputs[1],
      description: "Número de bloques a verificar (0 = todos).",
    },
  ],
};
