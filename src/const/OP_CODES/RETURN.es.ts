import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_RETURN as English } from "./RETURN";

export const OP_RETURNEs: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Control de flujo",
  type: "Control de script",
  shortDescription:
    "Marca la transacción como inválida y devuelve los bytes restantes como mensaje de error.",
  longDescription:
    "OP_RETURN es un opcode utilizado para marcar una salida de transacción como no gastable. Permite incluir una pequeña cantidad de datos en una transacción, que queda registrada de forma permanente en la blockchain. Este opcode interrumpe inmediatamente la ejecución del script y marca la salida como inválida, garantizando que no podrá utilizarse para futuras transacciones. Se emplea ampliamente para incrustar datos arbitrarios en la blockchain (marcas de tiempo, mensajes simples) sin inflar el conjunto de UTXO.",
  visualProps: {
    ...English.visualProps,
    title: "Demostración del OP_Code",
    description:
      "Marca la transacción como inválida y devuelve los bytes restantes del script como mensaje de error.",
    steps: [
      "El script falla",
      "Los bytes restantes se devuelven como mensaje de error",
    ],
  },
};
