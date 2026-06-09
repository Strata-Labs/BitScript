import { RPC_METHODS, RPCFunctionParams } from "../RPC";

const English = RPC_METHODS.find((m) => m.method === "restorewallet")!;

export const restorewalletEs: RPCFunctionParams = {
  ...English,
  category: "Cartera",
  summary:
    "Restaura una cartera a partir de una copia de seguridad.",
  description:
    "Carga una cartera desde un archivo de copia de seguridad.",
  howIsThisUsed:
    "El comando restorewallet es esencial para recuperar carteras a partir de archivos de copia de seguridad cuando la cartera original se ha perdido, está corrupta o es inaccesible. Permite recrear los datos de la cartera, claves privadas e historial de transacciones, a partir de una copia de seguridad previa. Es especialmente útil para transferir una cartera a un nuevo dispositivo, recuperarse de una eliminación accidental o solucionar un problema de cartera.",
};
