import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import English from "./DROP";

export const OP_DROPEs: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Pila",
  type: "Sacar",
  shortDescription: "Descarta el elemento superior de la pila.",
  longDescription:
    "Una operación simple pero potente, diseñada para sacar y descartar por completo el elemento superior de la pila (siempre siguiendo un orden LIFO). Drop, junto con Return, es uno de los op_codes más utilizados para almacenar datos en Bitcoin. En lugar de poner simplemente datos en la pila, el uso de OP_DROP garantiza que el script seguirá siendo válido.",
  visualProps: {
    ...English.visualProps,
    title: "Demostración del OP_Code",
    description: "Descarta el elemento superior de la pila.",
    steps: ["Sacar el elemento superior", "Continuar la ejecución del script"],
  },
};
