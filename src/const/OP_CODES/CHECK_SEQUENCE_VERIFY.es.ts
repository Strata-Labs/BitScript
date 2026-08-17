import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import English from "./CHECK_SEQUENCE_VERIFY";

export const OP_CHECK_SEQUENCE_VERIFYEs: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Bloqueo temporal",
  type: "Verificar",
  shortDescription:
    "Impide el gasto de un UTXO durante un número relativo de bloques o una duración desde su confirmación.",
  longDescription:
    "Impide el gasto de un UTXO durante un número concreto de bloques tras su confirmación, o durante una duración dada después de su inclusión en un bloque. También llamado CSV, este opcode define un mecanismo de timelock *relativo*; a diferencia de checklocktimeverify (CLTV), bloquea el UTXO en función de la antigüedad o del tiempo transcurrido desde su confirmación, en lugar de un punto fijo de la cronología de Bitcoin. Cuando el valor de entrada es inferior a 500 000 000, representa una altura de bloque relativa; en caso contrario, representa una duración relativa en segundos. Resulta especialmente valioso para protocolos como Lightning, que dependen de timelocks relativos para imponer condiciones de penalización. Para que la operación tenga éxito, el valor del campo sequence de la entrada de la transacción debe estar desactivado o, si está activado, ser menor o igual al valor sequence del script y mayor o igual al mínimo basado en la versión.",
  visualProps: {
    ...English.visualProps,
    title: "Demostración del OP_Code",
    description:
      "Impide el gasto de un UTXO durante un número relativo de bloques o una duración desde su confirmación.",
    steps: [
      "Saca el elemento superior (valor de timelock relativo)",
      "Determina si se trata de una altura de bloque o una marca de tiempo Unix según el valor",
      "Compara el valor con el campo sequence de la entrada gastada",
      "Verifica la transacción según el resultado booleano (falla o continúa)",
    ],
  },
};
