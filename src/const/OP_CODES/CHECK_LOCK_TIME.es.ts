import { OP_CODE_PAGE_PROPS } from "@/comp/opCodes/OpCodeView";
import English from "./CHECK_LOCK_TIME";

export const OP_CHECKLOCKTIMEVERIFYEs: OP_CODE_PAGE_PROPS = {
  ...English,
  category: "Bloqueo temporal",
  type: "Empujar",
  shortDescription:
    "Impide el gasto de un UTXO antes de una altura de bloque absoluta o una marca de tiempo dada.",
  longDescription:
    "Impide el gasto de un UTXO hasta que se alcance una altura de bloque dada o haya pasado un instante concreto. También llamado CLTV, este opcode define un mecanismo de timelock absoluto; a diferencia de checksequenceverify (CSV), exige que el UTXO permanezca bloqueado hasta una altura de bloque *absoluta* o una marca de tiempo Unix concreta. Cuando el valor de entrada es inferior a 500 000 000, representa una altura de bloque; en caso contrario, representa una marca de tiempo Unix. Esto permite construir contratos como los canales de pago Lightning o los intercambios atómicos, donde deben cumplirse condiciones tras cierto plazo. Para que la operación tenga éxito, el valor de la cima de la pila debe ser menor o igual al campo `nLockTime` de la transacción y mayor o igual a la altura de bloque o marca de tiempo actual.",
  visualProps: {
    ...English.visualProps,
    title: "Demostración del OP_Code",
    description:
      "Impide el gasto de un UTXO antes de una altura de bloque absoluta o una marca de tiempo dada.",
    steps: [
      "Saca el elemento superior (valor de locktime)",
      "Determina si se trata de una altura de bloque o una marca de tiempo Unix según el valor",
      "Compara con el nLockTime de la transacción",
      "Verifica la transacción según el resultado booleano (falla o continúa)",
    ],
  },
};
