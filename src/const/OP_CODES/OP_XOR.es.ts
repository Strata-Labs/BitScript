import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_XOR as English } from "./OP_XOR";

export const OP_XOREs: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Aritmética",
  type: "Sacar e Insertar",
  shortDescription:
    "Realiza una operación XOR bit a bit entre los dos elementos superiores de la pila.",
  longDescription:
    "OP_XOR realiza una operación XOR bit a bit entre los dos elementos superiores de la pila. Saca esos dos elementos, los interpreta como enteros, aplica la operación XOR bit a bit sobre su representación binaria y pone el resultado en la pila. Esta operación se utiliza habitualmente en los scripts de Bitcoin para diversas operaciones criptográficas y aritméticas que requieren manipulación a nivel de bits.",
  visualProps: {
    ...English.visualProps,
    title: "Demostración del OP_Code",
    description:
      "Realiza una operación XOR bit a bit entre los dos elementos superiores de la pila.",
    steps: [
      "Sacar los dos números de la pila",
      "Aplicar XOR bit a bit sobre los dos números",
      "Poner el resultado en la pila",
    ],
  },
};
