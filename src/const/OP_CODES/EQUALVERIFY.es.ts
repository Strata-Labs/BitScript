import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import { OP_EQUALVERIFY as English } from "./EQUALVERIFY";

export const OP_EQUALVERIFYEs: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Lógica",
  type: "Condicional",
  shortDescription:
    "Compara los dos elementos superiores para verificar igualdad sin poner ningún resultado en la pila.",
  longDescription:
    "Uno de los op_codes más utilizados, ya que prácticamente cada script verifica alguna forma de igualdad. La principal diferencia entre OP_EQUALVERIFY y OP_EQUAL es que el primero NO pone NADA en la pila. O bien falla (si es 0 o vacío), o simplemente se consume sin efecto.",
  visualProps: {
    ...English.visualProps,
    title: "Demostración del OP_Code",
    description: "Verifica la equivalencia; falla si es falso.",
    steps: [
      "Sacar el elemento superior",
      "Sacar el elemento superior",
      "Verificar la igualdad; si es verdadero (distinto de 0), no hace nada; en caso contrario, falla",
      "Continuar la ejecución del script",
    ],
  },
};
