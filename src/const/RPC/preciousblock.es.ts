import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "preciousblock")!;

export const preciousblockEs: RPCFunctionParams = {
  ...English,
  category: "Blockchain",
  summary:
    "Marca un bloque como «preferido» para que sea elegido en caso de fork.",
  description:
    "Influye en la elección de la cadena a favor de un bloque concreto.",
  howIsThisUsed:
    "El RPC preciousblock se utiliza generalmente con fines de prueba o en escenarios donde el operador de un nodo necesita manipular el orden de recepción de los bloques. Al marcar un bloque como preferido, un nodo puede privilegiarlo sobre otros con el mismo trabajo, modificando así el historial percibido de la blockchain dentro del contexto del nodo. Es práctico para simular diversas condiciones de red o verificar el comportamiento de un nodo Bitcoin. Sus efectos son temporales y no persisten tras un reinicio, lo que lo hace especialmente adecuado para pruebas y debugging.",
  inputs: [
    {
      ...English.inputs[0],
      description: "El hash del bloque a privilegiar.",
    },
  ],
};
