import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_2MUL as English } from "./2MUL";

export const OP_2MULEs: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Aritmética",
  type: "Sacar y empujar",
  shortDescription: "Multiplica por 2 el elemento superior de la pila.",
  longDescription:
    "OP_2MUL multiplica por 2 el elemento superior de la pila. Saca dicho elemento, lo interpreta como un entero, lo multiplica por 2 y empuja el resultado. Esta operación se utiliza comúnmente en scripts de Bitcoin para diversas operaciones aritméticas.",
  visualProps: {
    ...English.visualProps,
    title: "Demostración del OP_Code",
    description: "Multiplica por 2 el elemento superior de la pila.",
    steps: [
      "Saca el número de la pila",
      "Multiplica el número por 2",
      "Empuja el resultado",
    ],
  },
};
