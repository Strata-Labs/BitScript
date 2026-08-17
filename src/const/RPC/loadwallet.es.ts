import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "loadwallet")!;

export const loadwalletEs: RPCFunctionParams = {
  ...English,
  category: "Billetera",
  summary:
    "Carga una billetera desde un archivo o directorio.",
  description:
    "Abre una billetera existente en bitcoind.",
  howIsThisUsed:
    "El RPC loadwallet sirve para cargar dinámicamente billeteras en el nodo Bitcoin Core, permitiendo gestionar eficientemente múltiples billeteras. Permite alternar entre billeteras y facilita añadir nuevas billeteras según se necesite. Es especialmente útil para quienes trabajan regularmente con varias billeteras o desean que ciertas billeteras se carguen automáticamente al iniciar. La posibilidad de definir si la billetera cargada debe guardarse en la configuración persistente brinda comodidad al asegurar que las billeteras deseadas estén listas para usar.",
  inputs: [
    {
      ...English.inputs[0],
      description: "El nombre de la billetera a cargar.",
    },
    {
      ...English.inputs[1],
      description: "Cargar la billetera en el próximo inicio.",
    },
  ],
};
