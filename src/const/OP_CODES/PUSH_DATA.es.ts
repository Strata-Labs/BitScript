import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_PUSHDATA as English } from "./PUSH_DATA";

export const OP_PUSHDATAEs: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Datos",
  type: "Insertar",
  shortDescription: "Pone datos arbitrarios en la pila.",
  longDescription:
    "OP_PUSHDATA es un opcode genérico que sirve para poner datos arbitrarios en la pila. Permite añadir a la pila de ejecución datos de longitud variable. La longitud de los datos se determina mediante los bytes de longitud que siguen al opcode. Este opcode es versátil y se utiliza para trabajar con distintos tipos de datos, como claves públicas, firmas y datos personalizados.",
  visualProps: {
    ...English.visualProps,
    title: "Demostración del OP_Code",
    description: "Pone datos arbitrarios en la pila.",
    steps: [
      "Analizar la longitud de los datos",
      "Extraer los datos",
      "Poner los datos en la pila",
    ],
  },
};
