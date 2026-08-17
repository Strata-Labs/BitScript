import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_WITHIN as English } from "./WHITHIN";

export const OP_WITHINEs: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Matemáticas",
  type: "Condicional",
  shortDescription:
    "Verifica si el tercer elemento de la pila está dentro del rango definido por los dos elementos superiores.",
  longDescription:
    "OP_WITHIN sirve para verificar que un número determinado se encuentra dentro de un rango dado. Toma tres valores de la pila: x, min y max, y comprueba que min <= x < max. Si x está dentro del rango, el opcode pone verdadero (1) en la pila; de lo contrario, pone falso (0). Esta operación es útil en los scripts que deben validar que una entrada cumple condiciones numéricas específicas.",
  visualProps: {
    ...English.visualProps,
    title: "Demostración del OP_Code",
    description:
      "Verifica si el tercer elemento de la pila está dentro del rango definido por los dos elementos superiores.",
    steps: [
      "Sacar el elemento superior (max)",
      "Sacar el elemento siguiente (min)",
      "Sacar el elemento siguiente (x)",
      "Verificar el intervalo",
      "Poner el resultado en la pila",
    ],
  },
};
