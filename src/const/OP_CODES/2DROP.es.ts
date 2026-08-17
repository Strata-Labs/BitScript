import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import English from "./2DROP";

export const OP_2DROPEs: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Pila",
  type: "Sacar",
  shortDescription: "Retira los dos elementos superiores de la pila.",
  longDescription:
    "Esta operación retira los dos elementos superiores de la pila. Resulta útil para limpiar la pila descartando valores innecesarios. Es una operación habitual en los scripts de Bitcoin cuando es necesario descartar resultados intermedios para preservar el estado correcto de la pila antes de las siguientes operaciones.",
  visualProps: {
    ...English.visualProps,
    title: "Demostración del OP_Code",
    description: "Retira los dos elementos superiores de la pila.",
    steps: [
      "Saca los 2 elementos superiores",
      "Continúa la ejecución del script",
    ],
  },
};
