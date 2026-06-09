import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_ABS as English } from "./ABS";

export const OP_ABSEs: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Matemáticas",
  type: "Sacar y empujar",
  shortDescription: "Valor absoluto del elemento superior de la pila.",
  longDescription:
    "OP_ABS toma el elemento superior de la pila y lo reemplaza por su valor absoluto. Esta operación es esencial en scripts donde solo importa la magnitud de un número, independientemente de su signo, por ejemplo al comparar distancias, diferencias o cualquier otro cálculo en el que el signo no sea relevante.",
  visualProps: {
    ...English.visualProps,
    title: "Demostración del OP_Code",
    description: "Valor absoluto del elemento superior de la pila.",
    steps: [
      "Saca el elemento superior",
      "Calcula el valor absoluto del elemento",
      "Empuja el elemento",
    ],
  },
};
