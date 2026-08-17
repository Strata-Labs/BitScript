import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "restorewallet")!;

export const restorewalletEs: RPCFunctionParams = {
  ...English,
  category: "Billetera",
  summary:
    "Restaura una billetera a partir de un respaldo.",
  description:
    "Carga una billetera desde un archivo de respaldo.",
  howIsThisUsed:
    "El comando restorewallet es esencial para recuperar billeteras a partir de archivos de respaldo cuando la billetera original se ha perdido, está corrupta o es inaccesible. Permite recrear los datos de la billetera, claves privadas e historial de transacciones, a partir de un respaldo previo. Es especialmente útil para transferir una billetera a un nuevo dispositivo, recuperarse de una eliminación accidental o solucionar un problema de billetera.",
};
