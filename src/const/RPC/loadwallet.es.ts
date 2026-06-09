import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "loadwallet")!;

export const loadwalletEs: RPCFunctionParams = {
  ...English,
  category: "Cartera",
  summary:
    "Carga una cartera desde un archivo o directorio.",
  description:
    "Abre una cartera existente en bitcoind.",
  howIsThisUsed:
    "El RPC loadwallet sirve para cargar dinámicamente carteras en el nodo Bitcoin Core, permitiendo gestionar eficientemente múltiples carteras. Permite alternar entre carteras y facilita añadir nuevas carteras según se necesite. Es especialmente útil para quienes trabajan regularmente con varias carteras o desean que ciertas carteras se carguen automáticamente al iniciar. La posibilidad de definir si la cartera cargada debe guardarse en la configuración persistente brinda comodidad al asegurar que las carteras deseadas estén listas para usar.",
  inputs: [
    {
      ...English.inputs[0],
      description: "El nombre de la cartera a cargar.",
    },
    {
      ...English.inputs[1],
      description: "Cargar la cartera en el próximo inicio.",
    },
  ],
};
