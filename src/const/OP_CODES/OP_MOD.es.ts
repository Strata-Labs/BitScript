import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_MOD as English } from "./OP_MOD";

export const OP_MODEs: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Aritmética",
  type: "Sacar y Poner",
  shortDescription:
    "Realiza un módulo entre los dos elementos superiores de la pila.",
  longDescription:
    "OP_MOD realiza una operación módulo entre los dos elementos superiores de la pila. Saca de la pila estos dos elementos, los interpreta como enteros, efectúa el módulo y pone el resultado en la pila. La operación devuelve el resto de la división del primer elemento por el segundo. OP_MOD se utiliza habitualmente en los scripts de Bitcoin para diversas operaciones aritméticas.",
  visualProps: {
    ...English.visualProps,
    title: "Demostración del OP_Code",
    description:
      "Realiza un módulo entre los dos elementos superiores de la pila.",
    steps: [
      "Sacar de la pila los dos números",
      "Realizar el módulo entre los dos números",
      "Poner el resultado en la pila",
    ],
  },
};
